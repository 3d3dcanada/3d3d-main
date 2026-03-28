import { Center, Float, Text3D } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import type { Group, MeshStandardMaterial } from 'three';

import type { SplashTheme } from '../lib/splash-theme';

const FONT_URL = '/fonts/helvetiker_bold.typeface.json';

interface SplashCenterLogoProps {
  reducedMotion: boolean;
  theme: SplashTheme;
}

const PrusaPrinter = ({ isDark }: { isDark: boolean }) => {
  const frameMat = { color: isDark ? '#10161d' : '#cec8c1', metalness: 0.52, roughness: 0.3 };
  const baseMat = { color: isDark ? '#1a212a' : '#e7e1d9', metalness: 0.62, roughness: 0.34 };
  const railMat = { color: isDark ? '#c0c0c0' : '#a8a8a8', metalness: 0.85, roughness: 0.15 };
  const panelMat = {
    color: isDark ? '#131b24' : '#d6d0ca',
    metalness: 0.28,
    roughness: 0.42,
    transparent: true,
    opacity: isDark ? 0.7 : 0.58,
  };

  return (
    <group position={[0, -0.2, 0]}>
      {/* Base plate */}
      <mesh position={[0, -0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 0.2, 1.6]} />
        <meshStandardMaterial {...baseMat} />
      </mesh>

      {/* 4 corner uprights */}
      {[[-0.74, -0.74], [0.74, -0.74], [-0.74, 0.74], [0.74, 0.74]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.3, z]} castShadow>
          <boxGeometry args={[0.1, 1.4, 0.1]} />
          <meshStandardMaterial {...frameMat} />
        </mesh>
      ))}

      {/* Enclosure panels */}
      <mesh position={[-0.79, 0.3, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.04, 1.34, 1.44]} />
        <meshStandardMaterial {...panelMat} />
      </mesh>
      <mesh position={[0.79, 0.3, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.04, 1.34, 1.44]} />
        <meshStandardMaterial {...panelMat} />
      </mesh>
      <mesh position={[0, 0.3, -0.79]} castShadow receiveShadow>
        <boxGeometry args={[1.44, 1.34, 0.04]} />
        <meshStandardMaterial {...panelMat} />
      </mesh>

      {/* Top plate */}
      <mesh position={[0, 1.02, 0]} castShadow>
        <boxGeometry args={[1.6, 0.1, 1.6]} />
        <meshStandardMaterial {...baseMat} />
      </mesh>

      {/* --- Linear rails (X-axis, front and back) --- */}
      <mesh position={[0, 0.84, -0.74]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.035, 0.035, 1.4, 8]} />
        <meshStandardMaterial {...railMat} />
      </mesh>
      <mesh position={[0, 0.84, 0.74]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.035, 0.035, 1.4, 8]} />
        <meshStandardMaterial {...railMat} />
      </mesh>

      {/* --- Y-axis gantry rail (connects front to back) --- */}
      <mesh position={[0.18, 0.84, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.035, 0.035, 1.38, 8]} />
        <meshStandardMaterial {...railMat} />
      </mesh>

      {/* --- Carriage block on Y rail --- */}
      <mesh position={[0.18, 0.84, 0.12]} castShadow>
        <boxGeometry args={[0.18, 0.12, 0.22]} />
        <meshStandardMaterial {...frameMat} />
      </mesh>

      {/* --- Hotend assembly --- */}
      <group position={[0.18, 0.54, 0.12]}>
        {/* Heat sink (ribbed cylinder) */}
        <mesh castShadow>
          <cylinderGeometry args={[0.1, 0.1, 0.25, 12]} />
          <meshStandardMaterial {...railMat} />
        </mesh>
        {/* Heat sink fins (3 rings) */}
        {[-0.08, 0, 0.08].map((yOff, i) => (
          <mesh key={i} position={[0, yOff, 0]} castShadow>
            <cylinderGeometry args={[0.13, 0.13, 0.03, 12]} />
            <meshStandardMaterial {...railMat} />
          </mesh>
        ))}
        {/* Heat block */}
        <mesh position={[0, -0.18, 0]} castShadow>
          <boxGeometry args={[0.14, 0.1, 0.14]} />
          <meshStandardMaterial color={isDark ? '#2a2a2a' : '#888'} metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Nozzle cone */}
        <mesh position={[0, -0.28, 0]} castShadow>
          <coneGeometry args={[0.06, 0.1, 8]} />
          <meshStandardMaterial color="#40C4C4" emissive="#40C4C4" emissiveIntensity={isDark ? 3.5 : 1.8} userData={{ printerGlow: true }} />
        </mesh>
        {/* Nozzle tip */}
        <mesh position={[0, -0.35, 0]}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshStandardMaterial color="#FF6B2B" emissive="#FF6B2B" emissiveIntensity={isDark ? 5 : 3} userData={{ printerGlow: true }} />
        </mesh>
      </group>

      {/* Filament spool */}
      <mesh position={[0.48, 1.12, -0.75]} castShadow>
        <boxGeometry args={[0.08, 0.14, 0.08]} />
        <meshStandardMaterial {...frameMat} />
      </mesh>
      <mesh position={[0.62, 1.18, -0.86]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.32, 10]} />
        <meshStandardMaterial {...railMat} />
      </mesh>
      <group position={[0.82, 1.18, -0.86]}>
        <mesh rotation={[0, Math.PI / 2, 0]} castShadow>
          <torusGeometry args={[0.17, 0.055, 16, 36]} />
          <meshStandardMaterial
            color="#40C4C4"
            metalness={0.45}
            roughness={0.22}
            emissive="#40C4C4"
            emissiveIntensity={isDark ? 1.25 : 0.8}
            userData={{ printerGlow: true }}
          />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.055, 0.055, 0.1, 16]} />
          <meshStandardMaterial {...railMat} />
        </mesh>
      </group>

      {/* --- Heated bed (orange glow) --- */}
      <mesh position={[0, -0.18, 0]}>
        <boxGeometry args={[1.08, 0.05, 1.08]} />
        <meshStandardMaterial color="#FF6B2B" emissive="#FF6B2B" emissiveIntensity={1.5} userData={{ printerGlow: true }} />
      </mesh>
      {/* PEI print surface on top of bed */}
      <mesh position={[0, -0.14, 0]}>
        <boxGeometry args={[1, 0.02, 1]} />
        <meshStandardMaterial color={isDark ? '#2a3028' : '#3a4538'} metalness={0.3} roughness={0.6} />
      </mesh>

      {/* --- Small "print" on the bed (teal cube, like the original but smaller) --- */}
      <mesh position={[0, 0.01, 0]}>
        <boxGeometry args={[0.25, 0.25, 0.25]} />
        <meshStandardMaterial color="#40C4C4" emissive="#40C4C4" emissiveIntensity={isDark ? 3 : 1.5} userData={{ printerGlow: true }} />
      </mesh>
    </group>
  );
};

export default function SplashCenterLogo({
  reducedMotion,
  theme,
}: SplashCenterLogoProps) {
  const rootRef = useRef<Group>(null);
  const isDark = theme === 'dark';
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowLogo((s) => !s);
    }, 6500);
    return () => clearInterval(interval);
  }, []);

  useFrame(({ clock }, delta) => {
    if (!reducedMotion && rootRef.current) {
      rootRef.current.rotation.y += delta * 0.12;
      rootRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.4) * 0.015;

      const ambientGlowBase = isDark ? 0.22 : 0.12;
      const ambientGlowRange = isDark ? 0.3 : 0.15;
      const ambientGlow =
        ambientGlowBase + ((Math.sin(clock.elapsedTime * 2.5) + 1) * 0.5) * ambientGlowRange;
      const logoGlowBase = isDark ? 1.8 : 1.2;
      const logoGlowRange = isDark ? 0.24 : 0.18;
      const logoGlow =
        logoGlowBase + ((Math.sin(clock.elapsedTime * 2.1) + 1) * 0.5) * logoGlowRange;

      rootRef.current.traverse((child) => {
        if (!('material' in child)) return;
        const material = child.material;
        if (material && typeof material === 'object' && 'emissiveIntensity' in material) {
          const m = material as MeshStandardMaterial;
          if (m.userData?.logoGlow) {
            m.emissiveIntensity = logoGlow;
          } else if (!m.userData?.printerGlow) {
            m.emissiveIntensity = ambientGlow;
          }
        }
      });
    }

  });

  return (
    <Float
      speed={reducedMotion ? 0 : 1.4}
      rotationIntensity={reducedMotion ? 0 : 0.12}
      floatIntensity={reducedMotion ? 0 : 0.2}
    >
      <group ref={rootRef} scale={1.22}>
        {showLogo ? (
          <Center position={[0, -0.05, 0.34]}>
            <group>
              <Text3D
                font={FONT_URL}
                size={0.95}
                height={0.4}
                curveSegments={12}
                bevelEnabled
                bevelSize={0.04}
                bevelThickness={0.03}
                bevelSegments={5}
              >
                3D
                <meshStandardMaterial
                  color="#0A0A0A"
                  metalness={0.5}
                  roughness={0.2}
                  emissive="#40C4C4"
                  emissiveIntensity={isDark ? 1.8 : 1.2}
                  userData={{ logoGlow: true }}
                />
              </Text3D>
              <Text3D
                position={[1.85, 0, 0]}
                font={FONT_URL}
                size={0.95}
                height={0.4}
                curveSegments={12}
                bevelEnabled
                bevelSize={0.04}
                bevelThickness={0.03}
                bevelSegments={5}
              >
                3D
                <meshStandardMaterial
                  color="#0A0A0A"
                  metalness={0.5}
                  roughness={0.2}
                  emissive="#E84A8A"
                  emissiveIntensity={isDark ? 1.8 : 1.2}
                  userData={{ logoGlow: true }}
                />
              </Text3D>
            </group>
          </Center>
        ) : (
          <PrusaPrinter isDark={isDark} />
        )}
      </group>
    </Float>
  );
}
