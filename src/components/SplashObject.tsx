import { Clone, Edges, Float, useGLTF } from '@react-three/drei';
import type { ThreeEvent } from '@react-three/fiber';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { Box3, Mesh, MeshStandardMaterial, Vector3 } from 'three';
import type { Group, Object3D } from 'three';

import { ACCENT_HEX, SPLASH_SECTIONS, type SplashSection } from '../data/splashSections';

interface SplashObjectProps {
  section: SplashSection;
  active: boolean;
  focused: boolean;
  opacity: number;
  onHoverChange: (hovered: boolean) => void;
}

function buildModel(scene: Object3D, accentHex: string) {
  const clone = scene.clone(true);

  clone.traverse((child) => {
    if (!(child instanceof Mesh)) return;

    child.castShadow = true;
    child.receiveShadow = true;
    child.material = new MeshStandardMaterial({
      color: '#F0EDE8',
      metalness: 0.15,
      roughness: 0.4,
      emissive: accentHex,
      emissiveIntensity: 0.2,
    });
  });

  clone.updateMatrixWorld(true);

  const box = new Box3().setFromObject(clone);
  const center = box.getCenter(new Vector3());
  const size = box.getSize(new Vector3());
  const fitScale = 1.55 / Math.max(size.x, size.y, size.z, 0.001);

  return { clone, center, fitScale };
}

export default function SplashObject({
  section,
  active,
  focused,
  opacity,
  onHoverChange,
}: SplashObjectProps) {
  const groupRef = useRef<Group>(null);
  const accentHex = ACCENT_HEX[section.accent];
  const { scene } = useGLTF(section.modelPath);
  const preparedModel = useMemo(
    () => buildModel(scene, accentHex),
    [scene, accentHex],
  );

  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    const [rx, ry, rz] = section.modelRotation;
    const sway = Math.sin(clock.elapsedTime * 0.75) * (focused ? 0.16 : 0.05);
    groupRef.current.rotation.set(rx, ry + sway, rz);

    const emissiveIntensity = focused
      ? 0.6 + ((Math.sin(clock.elapsedTime * Math.PI) + 1) * 0.5) * 0.2
      : active
        ? 0.32
        : 0.2;

    groupRef.current.traverse((child) => {
      if (!(child instanceof Mesh)) return;
      if (!(child.material instanceof MeshStandardMaterial)) return;

      child.material.emissiveIntensity = emissiveIntensity;
      child.material.opacity = opacity;
      child.material.transparent = opacity < 0.999;
      child.material.needsUpdate = true;
    });
  });

  const handlePointerOver = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    onHoverChange(true);
  };

  const handlePointerOut = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    onHoverChange(false);
  };

  return (
    <group
      aria-label={section.ariaLabel}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <Float
        speed={focused ? 1.8 : 1.2}
        rotationIntensity={focused ? 0.16 : 0.08}
        floatIntensity={focused ? 0.24 : 0.12}
      >
        <group
          ref={groupRef}
          position={section.modelOffset}
          scale={preparedModel.fitScale * section.modelScale}
        >
          <Clone
            object={preparedModel.clone}
            position={[
              -preparedModel.center.x,
              -preparedModel.center.y,
              -preparedModel.center.z,
            ]}
            inject={(object) =>
              object instanceof Mesh ? <Edges color={accentHex} threshold={18} /> : null
            }
          />
        </group>
      </Float>
    </group>
  );
}

SPLASH_SECTIONS.forEach((section) => {
  useGLTF.preload(section.modelPath);
});
