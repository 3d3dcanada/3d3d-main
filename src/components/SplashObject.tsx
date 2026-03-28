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
import type { Group, Material, Object3D, Texture } from 'three';

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
  depthRatio: number;
  opacity: number;
  theme: SplashTheme;
  onHoverChange: (hovered: boolean) => void;
}

function darkenHex(hex: string, amount: number) {
  const color = new Color(hex);
  color.multiplyScalar(1 - amount);
  return `#${color.getHexString()}`;
}

const MATERIAL_PROFILES = [
  { metalness: 0.78, roughness: 0.18, envMapIntensity: 1.35 },
  { metalness: 0.48, roughness: 0.32, envMapIntensity: 0.92 },
  { metalness: 0.22, roughness: 0.68, envMapIntensity: 0.48 },
  { metalness: 0.08, roughness: 0.84, envMapIntensity: 0.3 },
];

const SECTION_PALETTES: Record<SplashSection['id'], string[]> = {
  market: ['#FF6B2B', '#F6F2EC', '#40C4C4', '#A4AAB3'],
  services: ['#40C4C4', '#F5F1EA', '#FF6B2B', '#77828E'],
  network: ['#E84A8A', '#40C4C4', '#F7F4EF', '#9CA6B2'],
  learn: ['#40C4C4', '#F4E0B7', '#F8F5EE', '#71808F'],
  about: ['#E84A8A', '#FF6B2B', '#F5E6D8', '#6F7782'],
};

function getColorfulness(color: Color) {
  const hsl = { h: 0, s: 0, l: 0 };
  color.getHSL(hsl);
  return hsl.s;
}

function getMaterialArray(material: Material | Material[] | null | undefined) {
  if (!material) return [];
  return Array.isArray(material) ? material : [material];
}

function isMetallicMesh(meshName: string, materialName: string, material: MeshStandardMaterial) {
  const needle = `${meshName} ${materialName}`.toLowerCase();
  return (
    material.metalness > 0.45 ||
    /metal|chrome|steel|gear|bolt|chain|spoke|wheel|hinge|frame|rail|bearing/.test(needle)
  );
}

function cloneMaterial(
  material: Material | undefined,
  fallbackHex: string,
  theme: SplashTheme,
  meshName: string,
  materialName: string,
  paletteIndex: number,
) {
  const profile = MATERIAL_PROFILES[paletteIndex % MATERIAL_PROFILES.length];
  const targetColor = new Color(fallbackHex);
  const baseMaterial = material instanceof MeshStandardMaterial ? material.clone() : new MeshStandardMaterial();
  const sourceColor = baseMaterial.color?.clone() ?? targetColor.clone();
  const sourceHasColor = getColorfulness(sourceColor) > 0.08;
  const needsStrongOverride = !material || !baseMaterial.color || getColorfulness(sourceColor) < 0.04;
  const nextColor = sourceColor.clone();

  nextColor.lerp(targetColor, needsStrongOverride ? 0.78 : sourceHasColor ? 0.18 : 0.48);

  const metallic = isMetallicMesh(meshName, materialName, baseMaterial);
  const metalness = metallic
    ? Math.max(baseMaterial.metalness ?? 0, profile.metalness)
    : Math.min(baseMaterial.metalness ?? profile.metalness, 0.26);
  const roughness = metallic
    ? Math.min(baseMaterial.roughness ?? profile.roughness, profile.roughness + 0.06)
    : Math.max(baseMaterial.roughness ?? profile.roughness, 0.52);

  baseMaterial.color = nextColor;
  baseMaterial.metalness = theme === 'dark' ? metalness : metalness * 0.88;
  baseMaterial.roughness = theme === 'dark' ? roughness : Math.min(0.92, roughness + 0.06);
  baseMaterial.envMapIntensity = profile.envMapIntensity + (metallic ? 0.25 : 0);
  baseMaterial.emissive = targetColor.clone().multiplyScalar(theme === 'dark' ? 0.18 : 0.1);
  baseMaterial.emissiveIntensity = theme === 'dark' ? (metallic ? 0.42 : 0.24) : metallic ? 0.18 : 0.12;

  if (metallic) {
    baseMaterial.normalMap = getBrushedMetalNormal();
    baseMaterial.normalScale = new Vector2(0.32, 0.32);
  } else {
    baseMaterial.normalMap = null;
  }

  baseMaterial.userData.baseEnvMap = baseMaterial.envMapIntensity;
  return baseMaterial;
}

function buildModel(scene: Object3D, section: SplashSection, accentHex: string, theme: SplashTheme) {
  const clone = scene.clone(true);
  const palette = SECTION_PALETTES[section.id] ?? [accentHex, darkenHex(accentHex, 0.18), '#F5F3EE'];
  let meshIndex = 0;

  clone.traverse((child) => {
    if (!(child instanceof Mesh)) return;
    const meshName = child.name || section.id;
    const materialPalette = getMaterialArray(child.material);

    child.castShadow = true;
    child.receiveShadow = true;

    if (!materialPalette.length) {
      child.material = cloneMaterial(undefined, palette[meshIndex % palette.length], theme, meshName, '', meshIndex);
      meshIndex += 1;
      return;
    }

    child.material = materialPalette.map((material, materialIndex) => {
      const colorHex = palette[(meshIndex + materialIndex) % palette.length];
      return cloneMaterial(
        material,
        colorHex,
        theme,
        meshName,
        material?.name ?? '',
        meshIndex + materialIndex,
      );
    });
    meshIndex += 1;
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
  depthRatio,
  opacity,
  theme,
  onHoverChange,
}: SplashObjectProps) {
  const groupRef = useRef<Group>(null);
  const accentHex = ACCENT_HEX[section.accent];
  const { scene } = useGLTF(section.modelPath);
  const preparedModel = useMemo(
    () => buildModel(scene, section, accentHex, theme),
    [scene, section, accentHex, theme],
  );
  const isDark = theme === 'dark';

  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    const [rx, ry, rz] = section.modelRotation;
    const sway = Math.sin(clock.elapsedTime * 0.72) * (0.015 + depthRatio * 0.055);
    const roll = Math.sin(clock.elapsedTime * 0.58 + depthRatio) * (0.01 + depthRatio * 0.03);
    const focusRock = focused ? Math.sin(clock.elapsedTime * 0.8) * Math.PI * 0.3 : 0;
    groupRef.current.rotation.set(rx + sway, ry + sway + focusRock, rz + roll);

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
      const materials = getMaterialArray(child.material);

      materials.forEach((material) => {
        if (!(material instanceof MeshStandardMaterial)) return;

        material.emissiveIntensity = emissiveIntensity;
        material.envMapIntensity = (material.userData.baseEnvMap ?? 1.0) * envMapBoost;
        material.opacity = opacity;
        material.transparent = opacity < 0.999;
      });
    });
  });

  const floatBoost = focused ? 1.12 : 1;

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
        speed={(0.4 + depthRatio * 1.1) * floatBoost}
        rotationIntensity={(0.02 + depthRatio * 0.08) * floatBoost}
        floatIntensity={(0.025 + depthRatio * 0.18) * floatBoost}
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
