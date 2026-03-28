import { Center, Float, Text3D, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Box3, Mesh, MeshStandardMaterial, Vector3, type Group } from 'three';

import type { SplashSection } from '../data/splashSections';
import { ACCENT_HEX } from '../data/splashSections';
import type { SplashTheme } from '../lib/splash-theme';

const FONT_URL = '/fonts/helvetiker_bold.typeface.json';

// ------------------------------------------------------------------
// Build plate: shows a cloned/scaled GLB when something is hovered,
// or a default teal cube when idle.
// ------------------------------------------------------------------
function BuildPlateModel({
  section,
  isDark,
}: {
  section: SplashSection;
  isDark: boolean;
}) {
  const { scene } = useGLTF(section.modelPath);
  const { clone, fitScale, center } = useMemo(() => {
    const c = scene.clone(true);
    const accentHex = ACCENT_HEX[section.accent];

    c.traverse((child) => {
      if (!(child instanceof Mesh)) return;
      child.material = new MeshStandardMaterial({
        color: accentHex,
        metalness: isDark ? 0.55 : 0.45,
        roughness: isDark ? 0.25 : 0.32,
        emissive: accentHex,
        emissiveIntensity: isDark ? 0.6 : 0.38,
      });
    });

    c.updateMatrixWorld(true);
    const box = new Box3().setFromObject(c);
    const boxCenter = box.getCenter(new Vector3());
    const size = box.getSize(new Vector3());
    const scale = 0.55 / Math.max(size.x, size.y, size.z, 0.001);

    return { clone: c, fitScale: scale, center: boxCenter };
  }, [scene, section, isDark]);

  return (
    <group scale={fitScale} position={[-center.x * fitScale, -center.y * fitScale + 0.28, -center.z * fitScale]}>
      <primitive object={clone} />
    </group>
  );
}

function BuildPlatePreview({
  hoveredSection,
  isDark,
}: {
  hoveredSection: SplashSection | null;
  isDark: boolean;
}) {
  const accentHex = hoveredSection ? ACCENT_HEX[hoveredSection.accent] : '#40C4C4';

  return (
    <group position={[0, -0.14, 0]}>
      {hoveredSection ? (
        <BuildPlateModel section={hoveredSection} isDark={isDark} />
      ) : (
        <mesh position={[0, 0.125, 0]}>
          <boxGeometry args={[0.25, 0.25, 0.25]} />
          <meshStandardMaterial
            color={accentHex}
            emissive={accentHex}
            emissiveIntensity={isDark ? 3 : 1.5}
            userData={{ printerGlow: true }}
          />
        </mesh>
      )}
    </group>
  );
}

// ------------------------------------------------------------------
// Printer assembly — extracted so nozzle can be animated separately
// ------------------------------------------------------------------
const PrusaPrinter = ({
  isDark,
  hoveredSection,
}: {
  isDark: boolean;
  hoveredSection: SplashSection | null;
}) => {
  const carriageRef = useRef<Group>(null);
  const hotendRef = useRef<Group>(null);

  const frameMat = { color: isDark ? '#10161d' : '#cec8c1', metalness: 0.52, roughness: 0.3 };
  const baseMat = { color: isDark ? '#1a212a' : '#e7e1d9', metalness: 0.62, roughness: 0.34 };
  const railMat = { color: isDark ? '#c0c0c0' : '#a8a8a8', metalness: 0.88, roughness: 0.12, envMapIntensity: 1.4 };
  const panelMat = {
    color: isDark ? '#131b24' : '#d6d0ca',
    metalness: 0.28,
    roughness: 0.42,
    transparent: true,
    opacity: isDark ? 0.7 : 0.58,
  };

  useFrame(({ clock }) => {
    if (!carriageRef.current || !hotendRef.current) return;

    const t = clock.elapsedTime;
    // Lissajous print path — reduced amplitude when hovering to keep focus on build plate
    const amplitude = hoveredSection ? 0.12 : 0.26;
    const xFreq = 1.1;
    const zFreq = 0.75;

    carriageRef.current.position.x = Math.sin(t * xFreq) * amplitude;
    carriageRef.current.position.z = 0.12 + Math.sin(t * zFreq) * (amplitude * 0.55);
    hotendRef.current.position.x = Math.sin(t * xFreq) * amplitude;
    hotendRef.current.position.z = 0.12 + Math.sin(t * zFreq) * (amplitude * 0.55);
  });

  return (
    <group position={[0, -0.2, 0]}>
      {/* Base plate */}
      <mesh position={[0, -0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 0.2, 1.6]} />
        <meshStandardMaterial {...baseMat} />
      </mesh>

      {/* 4 corner uprights */}
      {([ [-0.74, -0.74], [0.74, -0.74], [-0.74, 0.74], [0.74, 0.74] ] as [number, number][]).map(([x, z], i) => (
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

      {/* Linear rails (X-axis) */}
      <mesh position={[0, 0.84, -0.74]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.035, 0.035, 1.4, 8]} />
        <meshStandardMaterial {...railMat} />
      </mesh>
      <mesh position={[0, 0.84, 0.74]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.035, 0.035, 1.4, 8]} />
        <meshStandardMaterial {...railMat} />
      </mesh>

      {/* Y-axis gantry rail */}
      <mesh position={[0.18, 0.84, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.035, 0.035, 1.38, 8]} />
        <meshStandardMaterial {...railMat} />
      </mesh>

      {/* Carriage block — animated */}
      <group ref={carriageRef} position={[0.18, 0.84, 0.12]}>
        <mesh castShadow>
          <boxGeometry args={[0.18, 0.12, 0.22]} />
          <meshStandardMaterial {...frameMat} />
        </mesh>
      </group>

      {/* Hotend assembly — animated in sync with carriage */}
      <group ref={hotendRef} position={[0.18, 0.54, 0.12]}>
        {/* Heat sink */}
        <mesh castShadow>
          <cylinderGeometry args={[0.1, 0.1, 0.25, 12]} />
          <meshStandardMaterial {...railMat} />
        </mesh>
        {/* Heat sink fins */}
        {([-0.08, 0, 0.08] as number[]).map((yOff, i) => (
          <mesh key={i} position={[0, yOff, 0]} castShadow>
            <cylinderGeometry args={[0.13, 0.13, 0.03, 12]} />
            <meshStandardMaterial {...railMat} />
          </mesh>
        ))}
        {/* Heat block */}
        <mesh position={[0, -0.18, 0]} castShadow>
          <boxGeometry args={[0.14, 0.1, 0.14]} />
          <meshStandardMaterial
            color={isDark ? '#2a2a2a' : '#888'}
            metalness={0.72}
            roughness={0.28}
            envMapIntensity={1.2}
          />
        </mesh>
        {/* Nozzle cone */}
        <mesh position={[0, -0.28, 0]} castShadow>
          <coneGeometry args={[0.06, 0.1, 8]} />
          <meshStandardMaterial
            color="#40C4C4"
            emissive="#40C4C4"
            emissiveIntensity={isDark ? 3.5 : 1.8}
            metalness={0.6}
            roughness={0.2}
            envMapIntensity={1.0}
            userData={{ printerGlow: true }}
          />
        </mesh>
        {/* Nozzle tip */}
        <mesh position={[0, -0.35, 0]}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshStandardMaterial
            color="#FF6B2B"
            emissive="#FF6B2B"
            emissiveIntensity={isDark ? 5 : 3}
            userData={{ printerGlow: true }}
          />
        </mesh>
      </group>

      {/* Filament spool holder */}
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
            metalness={0.5}
            roughness={0.2}
            emissive="#40C4C4"
            emissiveIntensity={isDark ? 1.25 : 0.8}
            envMapIntensity={1.2}
            userData={{ printerGlow: true }}
          />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.055, 0.055, 0.1, 16]} />
          <meshStandardMaterial {...railMat} />
        </mesh>
      </group>

      {/* Heated bed */}
      <mesh position={[0, -0.18, 0]}>
        <boxGeometry args={[1.08, 0.05, 1.08]} />
        <meshStandardMaterial
          color="#FF6B2B"
          emissive="#FF6B2B"
          emissiveIntensity={isDark ? 1.8 : 1.2}
          userData={{ printerGlow: true }}
        />
      </mesh>
      {/* PEI print surface */}
      <mesh position={[0, -0.14, 0]}>
        <boxGeometry args={[1, 0.02, 1]} />
        <meshStandardMaterial
          color={isDark ? '#2a3028' : '#3a4538'}
          metalness={0.35}
          roughness={0.55}
          envMapIntensity={0.6}
        />
      </mesh>

      {/* Build plate model / idle cube */}
      <BuildPlatePreview hoveredSection={hoveredSection} isDark={isDark} />
    </group>
  );
};

// ------------------------------------------------------------------
// Main export
// ------------------------------------------------------------------
interface SplashCenterLogoProps {
  reducedMotion: boolean;
  theme: SplashTheme;
  hoveredSection: SplashSection | null;
}

type SplashCenterMode = 'logo' | 'printer';
type SplashCenterPhase = 'steady' | 'transition';

function applyGroupVisibility(group: Group | null, opacity: number, scale: number) {
  if (!group) return;

  group.visible = opacity > 0.001;
  group.scale.setScalar(scale);

  group.traverse((child) => {
    if (!(child instanceof Mesh)) return;

    const materials = Array.isArray(child.material) ? child.material : [child.material];
    materials.forEach((material) => {
      if (!(material instanceof MeshStandardMaterial)) return;
      material.opacity = opacity;
      material.transparent = opacity < 0.999;
      material.depthWrite = opacity > 0.2;
    });
  });
}

export default function SplashCenterLogo({
  reducedMotion,
  theme,
  hoveredSection,
}: SplashCenterLogoProps) {
  const rootRef = useRef<Group>(null);
  const logoGroupRef = useRef<Group>(null);
  const printerGroupRef = useRef<Group>(null);
  const transitionStartRef = useRef<number | null>(null);
  const isDark = theme === 'dark';
  const [mode, setMode] = useState<SplashCenterMode>('logo');
  const [phase, setPhase] = useState<SplashCenterPhase>('steady');

  useEffect(() => {
    if (reducedMotion) {
      setMode('logo');
      setPhase('steady');
      return;
    }

    const timeout = window.setTimeout(() => {
      if (phase === 'steady') {
        transitionStartRef.current = performance.now();
        setPhase('transition');
      } else {
        setMode((current) => (current === 'logo' ? 'printer' : 'logo'));
        setPhase('steady');
        transitionStartRef.current = null;
      }
    }, phase === 'steady' ? 6500 : 850);

    return () => window.clearTimeout(timeout);
  }, [mode, phase, reducedMotion]);

  useFrame(({ clock }, _delta) => {
    if (!reducedMotion && rootRef.current) {
      rootRef.current.rotation.y += _delta * 0.12;
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

    if (reducedMotion) {
      applyGroupVisibility(logoGroupRef.current, 1, 1);
      applyGroupVisibility(printerGroupRef.current, 0, 1.08);
      return;
    }

    if (phase === 'steady') {
      applyGroupVisibility(logoGroupRef.current, mode === 'logo' ? 1 : 0, mode === 'logo' ? 1 : 1.08);
      applyGroupVisibility(
        printerGroupRef.current,
        mode === 'printer' ? 1 : 0,
        mode === 'printer' ? 1 : 1.08,
      );
      return;
    }

    const fromMode = mode;
    const startedAt = transitionStartRef.current ?? performance.now();
    const progress = Math.min(1, (performance.now() - startedAt) / 820);

    const outgoingOpacity = 1 - progress;
    const incomingOpacity = progress;
    const outgoingScale = 1 - progress * 0.1;
    const incomingScale = 1.1 - progress * 0.1;

    applyGroupVisibility(
      logoGroupRef.current,
      fromMode === 'logo' ? outgoingOpacity : incomingOpacity,
      fromMode === 'logo' ? outgoingScale : incomingScale,
    );
    applyGroupVisibility(
      printerGroupRef.current,
      fromMode === 'printer' ? outgoingOpacity : incomingOpacity,
      fromMode === 'printer' ? outgoingScale : incomingScale,
    );
  });

  return (
    <Float
      speed={reducedMotion ? 0 : 1.4}
      rotationIntensity={reducedMotion ? 0 : 0.12}
      floatIntensity={reducedMotion ? 0 : 0.2}
    >
      <group ref={rootRef} scale={1.22}>
        <group ref={logoGroupRef}>
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
                  metalness={0.55}
                  roughness={0.18}
                  emissive="#40C4C4"
                  emissiveIntensity={isDark ? 1.8 : 1.2}
                  envMapIntensity={1.1}
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
                  metalness={0.55}
                  roughness={0.18}
                  emissive="#E84A8A"
                  emissiveIntensity={isDark ? 1.8 : 1.2}
                  envMapIntensity={1.1}
                  userData={{ logoGlow: true }}
                />
              </Text3D>
            </group>
          </Center>
        </group>

        <group ref={printerGroupRef}>
          <PrusaPrinter isDark={isDark} hoveredSection={hoveredSection} />
        </group>
      </group>
    </Float>
  );
}
