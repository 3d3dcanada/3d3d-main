import { Clone, Edges, Float, useGLTF } from '@react-three/drei';
import type { ThreeEvent } from '@react-three/fiber';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { Box3, Color, Mesh, MeshStandardMaterial, Vector3 } from 'three';
import type { Group, Object3D } from 'three';

import { ACCENT_HEX, SPLASH_SECTIONS, type SplashSection } from '../data/splashSections';
import type { SplashTheme } from '../lib/splash-theme';

interface SplashObjectProps {
  section: SplashSection;
  active: boolean;
  focused: boolean;
  opacity: number;
  theme: SplashTheme;
  onHoverChange: (hovered: boolean) => void;
}

function darkenHex(hex: string, amount: number) {
  const color = new Color(hex);
  color.multiplyScalar(1 - amount);
  return `#${color.getHexString()}`;
}

function buildModel(scene: Object3D, accentHex: string, theme: SplashTheme) {
  const clone = scene.clone(true);
  const isDark = theme === 'dark';
  const shadowHex = darkenHex(accentHex, 0.3);
  let meshIndex = 0;

  clone.traverse((child) => {
    if (!(child instanceof Mesh)) return;
    const colorHex = meshIndex % 2 === 0 ? accentHex : shadowHex;
    meshIndex += 1;

    child.castShadow = true;
    child.receiveShadow = true;
    child.material = new MeshStandardMaterial({
      color: colorHex,
      metalness: isDark ? 0.6 : 0.5,
      roughness: isDark ? 0.22 : 0.28,
      emissive: accentHex,
      emissiveIntensity: isDark ? 0.35 : 0.25,
    });
  });

  clone.updateMatrixWorld(true);

  const box = new Box3().setFromObject(clone);
  const center = box.getCenter(new Vector3());
  const size = box.getSize(new Vector3());
  const fitScale = 2.2 / Math.max(size.x, size.y, size.z, 0.001);

  return { clone, center, fitScale };
}

export default function SplashObject({
  section,
  active,
  focused,
  opacity,
  theme,
  onHoverChange,
}: SplashObjectProps) {
  const groupRef = useRef<Group>(null);
  const accentHex = ACCENT_HEX[section.accent];
  const { scene } = useGLTF(section.modelPath);
  const preparedModel = useMemo(
    () => buildModel(scene, accentHex, theme),
    [scene, accentHex, theme],
  );
  const isDark = theme === 'dark';

  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    const [rx, ry, rz] = section.modelRotation;
    const sway = Math.sin(clock.elapsedTime * 0.75) * (focused ? 0.22 : 0.04);
    const spin = focused ? clock.elapsedTime * 1.5 : 0;
    groupRef.current.rotation.set(rx, ry + sway + spin, rz);

    const emissiveIntensity = focused
      ? (isDark ? 0.95 : 0.75) + ((Math.sin(clock.elapsedTime * Math.PI) + 1) * 0.5) * 0.3
      : active
        ? isDark
          ? 0.4
          : 0.32
        : isDark
          ? 0.24
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
          {section.id === 'services' ? (
            <>
              <group rotation={[0, 0, Math.PI / 4]}>
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
              <group rotation={[0, 0, -Math.PI / 4]}>
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
            </>
          ) : (
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
          )}
        </group>
      </Float>
    </group>
  );
}

SPLASH_SECTIONS.forEach((section) => {
  useGLTF.preload(section.modelPath);
});
