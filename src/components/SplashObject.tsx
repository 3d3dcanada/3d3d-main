import { Clone, Float, useGLTF } from '@react-three/drei';
import type { ThreeEvent } from '@react-three/fiber';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import {
  Box3,
  CanvasTexture,
  Mesh,
  MeshStandardMaterial,
  NearestFilter,
  RepeatWrapping,
  Vector2,
  Vector3,
} from 'three';
import type { Group, Object3D, Texture } from 'three';

import { ACCENT_HEX, SPLASH_SECTIONS, type SplashSection } from '../data/splashSections';

// Procedural brushed-metal normal map (64x64 canvas, no file loading)
let _brushedMetalNormal: Texture | null = null;

function getBrushedMetalNormal(): Texture {
  if (_brushedMetalNormal) return _brushedMetalNormal;

  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  // Flat normal base: RGB(128, 128, 255) = pointing straight out
  ctx.fillStyle = 'rgb(128, 128, 255)';
  ctx.fillRect(0, 0, size, size);

  // Draw horizontal brushed streaks with slight normal variation
  for (let y = 0; y < size; y++) {
    const strength = Math.random() * 0.35;
    const r = Math.round(128 + (Math.random() - 0.5) * 40 * strength);
    const g = Math.round(128 + (Math.random() - 0.5) * 18 * strength);
    ctx.strokeStyle = `rgb(${r}, ${g}, 255)`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, y + 0.5);
    ctx.lineTo(size, y + 0.5);
    ctx.stroke();
  }

  // Occasional deeper grooves
  for (let i = 0; i < 8; i++) {
    const y = Math.floor(Math.random() * size);
    const r = Math.round(128 + (Math.random() - 0.5) * 70);
    const g = Math.round(128 + (Math.random() - 0.5) * 30);
    ctx.strokeStyle = `rgb(${r}, ${g}, 248)`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, y + 0.5);
    ctx.lineTo(size, y + 0.5);
    ctx.stroke();
  }

  const texture = new CanvasTexture(canvas);
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.magFilter = NearestFilter;
  texture.repeat.set(3, 3);
  _brushedMetalNormal = texture;
  return texture;
}

interface SplashObjectProps {
  section: SplashSection;
  active: boolean;
  focused: boolean;
  opacity: number;
  onHoverChange: (hovered: boolean) => void;
}

// Per-mesh metalness/roughness variation patterns (cycles through 4 profiles)
const MATERIAL_PROFILES = [
  { metalness: 0.58, roughness: 0.34, envMapIntensity: 0.7 },
  { metalness: 0.42, roughness: 0.48, envMapIntensity: 0.55 },
  { metalness: 0.5, roughness: 0.4, envMapIntensity: 0.62 },
  { metalness: 0.28, roughness: 0.6, envMapIntensity: 0.4 },
];

function buildModel(scene: Object3D, accentHex: string, naturalColors: string[]) {
  const clone = scene.clone(true);
  let meshIndex = 0;

  clone.traverse((child) => {
    if (!(child instanceof Mesh)) return;
    const colorHex = naturalColors[meshIndex % naturalColors.length];
    const profile = MATERIAL_PROFILES[meshIndex % MATERIAL_PROFILES.length];
    meshIndex += 1;

    child.castShadow = true;
    child.receiveShadow = true;

    const useNormalMap = profile.metalness > 0.5;
    const mat = new MeshStandardMaterial({
      color: colorHex,
      metalness: profile.metalness,
      roughness: profile.roughness,
      envMapIntensity: profile.envMapIntensity,
      emissive: accentHex,
      emissiveIntensity: 0,
      ...(useNormalMap
        ? { normalMap: getBrushedMetalNormal(), normalScale: new Vector2(0.35, 0.35) }
        : {}),
    });
    mat.userData.baseEnvMap = profile.envMapIntensity;
    child.material = mat;
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
  onHoverChange,
}: SplashObjectProps) {
  const groupRef = useRef<Group>(null);
  const accentHex = ACCENT_HEX[section.accent];
  const { naturalColors } = section;
  const { scene } = useGLTF(section.modelPath, undefined, true);
  const preparedModel = useMemo(
    () => buildModel(scene, accentHex, naturalColors),
    [scene, accentHex, naturalColors],
  );

  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    const [rx, ry, rz] = section.modelRotation;
    const swayX = Math.sin(clock.elapsedTime * 0.42) * (focused ? 0.04 : 0.015);
    const swayY = Math.sin(clock.elapsedTime * 0.55) * (focused ? 0.08 : 0.03);
    groupRef.current.rotation.set(rx + swayX, ry + swayY, rz);

    groupRef.current.traverse((child) => {
      if (!(child instanceof Mesh)) return;
      if (!(child.material instanceof MeshStandardMaterial)) return;

      child.material.emissiveIntensity = 0;
      child.material.envMapIntensity = child.material.userData.baseEnvMap ?? 1.0;
      child.material.opacity = opacity;
      child.material.transparent = opacity < 0.999;
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
        speed={focused ? 1.1 : 0.85}
        rotationIntensity={focused ? 0.06 : 0.03}
        floatIntensity={focused ? 0.08 : 0.04}
      >
        <group
          ref={groupRef}
          position={section.modelOffset}
          scale={preparedModel.fitScale * section.modelScale}
        >
          {section.id === 'services' ? (
            <>
              <group position={[0, 0, 0.08]} rotation={[0, Math.PI / 2, Math.PI / 5]}>
                <Clone
                  object={preparedModel.clone}
                  position={[
                    -preparedModel.center.x,
                    -preparedModel.center.y,
                    -preparedModel.center.z,
                  ]}
                />
              </group>
              <group position={[0, 0, -0.08]} rotation={[0, Math.PI / 2, -Math.PI / 5]}>
                <Clone
                  object={preparedModel.clone}
                  position={[
                    -preparedModel.center.x,
                    -preparedModel.center.y,
                    -preparedModel.center.z,
                  ]}
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
            />
          )}
        </group>
      </Float>
    </group>
  );
}

SPLASH_SECTIONS.forEach((section) => {
  useGLTF.preload(section.modelPath, undefined, true);
});
