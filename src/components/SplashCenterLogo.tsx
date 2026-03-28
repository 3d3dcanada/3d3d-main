import { Center, Float, Text3D } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type { Group, MeshStandardMaterial } from 'three';

import type { SplashTheme } from '../lib/splash-theme';

const FONT_URL = '/fonts/helvetiker_bold.typeface.json';

interface SplashCenterLogoProps {
  reducedMotion: boolean;
  theme: SplashTheme;
}

export default function SplashCenterLogo({
  reducedMotion,
  theme,
}: SplashCenterLogoProps) {
  const rootRef = useRef<Group>(null);
  const isDark = theme === 'dark';

  useFrame(({ clock }, delta) => {
    if (!rootRef.current || reducedMotion) return;

    rootRef.current.rotation.y += delta * 0.08;

    const glowBase = isDark ? 0.12 : 0.08;
    const glowRange = isDark ? 0.12 : 0.08;
    const glow = glowBase + ((Math.sin(clock.elapsedTime * 1.6) + 1) * 0.5) * glowRange;
    rootRef.current.traverse((child) => {
      if (!('material' in child)) return;

      const material = child.material;
      if (material && typeof material === 'object' && 'emissiveIntensity' in material) {
        (material as MeshStandardMaterial).emissiveIntensity = glow;
      }
    });
  });

  return (
    <Float
      speed={reducedMotion ? 0 : 1.1}
      rotationIntensity={reducedMotion ? 0 : 0.06}
      floatIntensity={reducedMotion ? 0 : 0.14}
    >
      <group ref={rootRef} scale={1.08}>
        <mesh position={[0, 0, -0.18]} castShadow receiveShadow>
          <cylinderGeometry args={[1.82, 1.66, 0.38, 64]} />
          <meshStandardMaterial
            color={isDark ? '#151B21' : '#D8CEC4'}
            metalness={isDark ? 0.28 : 0.2}
            roughness={isDark ? 0.3 : 0.34}
            emissive="#FF6B2B"
            emissiveIntensity={isDark ? 0.18 : 0.12}
          />
        </mesh>

        <mesh position={[0, -0.02, 0.1]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
          <torusGeometry args={[1.56, 0.08, 16, 100]} />
          <meshStandardMaterial
            color={isDark ? '#F5EEE4' : '#F4F1EC'}
            metalness={isDark ? 0.32 : 0.26}
            roughness={isDark ? 0.22 : 0.28}
            emissive="#40C4C4"
            emissiveIntensity={isDark ? 0.28 : 0.18}
          />
        </mesh>

        <Center position={[0, -0.04, 0.34]}>
          <Text3D
            font={FONT_URL}
            size={0.68}
            height={0.28}
            curveSegments={10}
            bevelEnabled
            bevelSize={0.03}
            bevelThickness={0.02}
            bevelSegments={4}
          >
            3D3D
            <meshStandardMaterial
              color={isDark ? '#F6EFE6' : '#2A2520'}
              metalness={isDark ? 0.34 : 0.28}
              roughness={isDark ? 0.18 : 0.22}
              emissive="#40C4C4"
              emissiveIntensity={isDark ? 0.12 : 0.08}
            />
          </Text3D>
        </Center>
      </group>
    </Float>
  );
}
