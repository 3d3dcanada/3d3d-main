import { Clone, Edges, Float, useGLTF } from '@react-three/drei';
import type { ThreeEvent } from '@react-three/fiber';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import {
  Box3,
  CanvasTexture,
  Color,
  Mesh,
  MeshStandardMaterial,
  NearestFilter,
  RepeatWrapping,
  Vector2,
  Vector3,
} from 'three';
import type { Group, Object3D, Texture } from 'three';

import { ACCENT_HEX, SPLASH_SECTIONS, type SplashSection } from '../data/splashSections';
import type { SplashTheme } from '../lib/splash-theme';

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
  theme: SplashTheme;
  onHoverChange: (hovered: boolean) => void;
}

function darkenHex(hex: string, amount: number) {
  const color = new Color(hex);
  color.multiplyScalar(1 - amount);
  return `#${color.getHexString()}`;
}

// Per-mesh metalness/roughness variation patterns (cycles through 4 profiles)
const MATERIAL_PROFILES = [
  { metalness: 0.72, roughness: 0.18, envMapIntensity: 1.4 }, // shiny metal
  { metalness: 0.45, roughness: 0.35, envMapIntensity: 0.9 }, // satin
  { metalness: 0.62, roughness: 0.24, envMapIntensity: 1.1 }, // semi-shiny
  { metalness: 0.3,  roughness: 0.48, envMapIntensity: 0.6 }, // matte
];

function buildModel(scene: Object3D, accentHex: string, theme: SplashTheme) {
  const clone = scene.clone(true);
  const isDark = theme === 'dark';
  const shadowHex = darkenHex(accentHex, 0.3);
  let meshIndex = 0;

  clone.traverse((child) => {
    if (!(child instanceof Mesh)) return;
    const colorHex = meshIndex % 2 === 0 ? accentHex : shadowHex;
    const profile = MATERIAL_PROFILES[meshIndex % MATERIAL_PROFILES.length];
    meshIndex += 1;

    child.castShadow = true;
    child.receiveShadow = true;
    const normalMap = getBrushedMetalNormal();
    const mat = new MeshStandardMaterial({
      color: colorHex,
      metalness: isDark ? profile.metalness : profile.metalness * 0.85,
      roughness: isDark ? profile.roughness : profile.roughness * 1.15,
      envMapIntensity: profile.envMapIntensity,
      emissive: accentHex,
      emissiveIntensity: isDark ? 0.35 : 0.25,
      normalMap,
      normalScale: new Vector2(0.35, 0.35),
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

    const envMapBoost = focused ? 1.6 : active ? 1.1 : 0.85;

    groupRef.current.traverse((child) => {
      if (!(child instanceof Mesh)) return;
      if (!(child.material instanceof MeshStandardMaterial)) return;

      child.material.emissiveIntensity = emissiveIntensity;
      child.material.envMapIntensity = (child.material.userData.baseEnvMap ?? 1.0) * envMapBoost;
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
