import { Center, Float, Text3D } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type { Group, MeshStandardMaterial } from 'three';

const FONT_URL = '/fonts/helvetiker_bold.typeface.json';

interface SplashCenterLogoProps {
  reducedMotion: boolean;
}

export default function SplashCenterLogo({ reducedMotion }: SplashCenterLogoProps) {
  const rootRef = useRef<Group>(null);

  useFrame(({ clock }, delta) => {
    if (!rootRef.current || reducedMotion) return;

    rootRef.current.rotation.y += delta * 0.08;

    const glow = 0.08 + ((Math.sin(clock.elapsedTime * 1.6) + 1) * 0.5) * 0.08;
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
            color="#D8CEC4"
            metalness={0.2}
            roughness={0.34}
            emissive="#FF6B2B"
            emissiveIntensity={0.12}
          />
        </mesh>

        <mesh position={[0, -0.02, 0.1]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
          <torusGeometry args={[1.56, 0.08, 16, 100]} />
          <meshStandardMaterial
            color="#F4F1EC"
            metalness={0.26}
            roughness={0.28}
            emissive="#40C4C4"
            emissiveIntensity={0.18}
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
              color="#2A2520"
              metalness={0.28}
              roughness={0.22}
              emissive="#40C4C4"
              emissiveIntensity={0.08}
            />
          </Text3D>
        </Center>
      </group>
    </Float>
  );
}
