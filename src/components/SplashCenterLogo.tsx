import { Center, Float, Text3D, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Box3, Color, Mesh, MeshStandardMaterial, Vector3, type Group } from 'three';

import type { SplashSection } from '../data/splashSections';
import { ACCENT_HEX } from '../data/splashSections';

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
    const { naturalColors } = section;
    let meshIdx = 0;

    c.traverse((child) => {
      if (!(child instanceof Mesh)) return;
      const colorHex = naturalColors[meshIdx % naturalColors.length];
      meshIdx += 1;
      child.material = new MeshStandardMaterial({
        color: colorHex,
        metalness: isDark ? 0.55 : 0.45,
        roughness: isDark ? 0.25 : 0.32,
        emissive: accentHex,
        emissiveIntensity: 0,
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
            emissiveIntensity={0}
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
            emissiveIntensity={0}
            metalness={0.6}
            roughness={0.2}
            envMapIntensity={1.0}
          />
        </mesh>
        {/* Nozzle tip */}
        <mesh position={[0, -0.35, 0]}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshStandardMaterial
            color="#FF6B2B"
            emissive="#FF6B2B"
            emissiveIntensity={0}
          />
        </mesh>
      </group>

      {/* Filament spool holder — bracket on top-right of frame */}
      <mesh position={[0.58, 1.12, -0.68]} castShadow>
        <boxGeometry args={[0.08, 0.16, 0.08]} />
        <meshStandardMaterial {...frameMat} />
      </mesh>
      {/* Spool axle */}
      <mesh position={[0.58, 1.24, -0.68]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.025, 0.025, 0.28, 10]} />
        <meshStandardMaterial {...railMat} />
      </mesh>
      {/* Filament spool — torus + hub centered on axle */}
      <group position={[0.58, 1.24, -0.52]}>
        {/* Spool flanges (two discs) */}
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.06]} castShadow>
          <cylinderGeometry args={[0.18, 0.18, 0.015, 20]} />
          <meshStandardMaterial color="#333" metalness={0.3} roughness={0.5} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.06]} castShadow>
          <cylinderGeometry args={[0.18, 0.18, 0.015, 20]} />
          <meshStandardMaterial color="#333" metalness={0.3} roughness={0.5} />
        </mesh>
        {/* Filament wound on spool */}
        <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
          <torusGeometry args={[0.12, 0.05, 16, 36]} />
          <meshStandardMaterial
            color="#40C4C4"
            metalness={0.35}
            roughness={0.45}
            emissive="#40C4C4"
            emissiveIntensity={0.08}
            envMapIntensity={0.8}
          />
        </mesh>
        {/* Hub core */}
        <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.045, 0.045, 0.1, 16]} />
          <meshStandardMaterial {...railMat} />
        </mesh>
      </group>

      {/* Heated bed */}
      <mesh position={[0, -0.18, 0]}>
        <boxGeometry args={[1.08, 0.05, 1.08]} />
        <meshStandardMaterial
          color="#FF6B2B"
          emissive="#FF6B2B"
          emissiveIntensity={0}
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
  isMobile: boolean;
  reducedMotion: boolean;
  hoveredSection: SplashSection | null;
  activeSection: SplashSection;
}

export default function SplashCenterLogo({
  isMobile,
  reducedMotion,
  hoveredSection,
  activeSection,
}: SplashCenterLogoProps) {
  const rootRef = useRef<Group>(null);
  const leftMatRef = useRef<MeshStandardMaterial>(null);
  const rightMatRef = useRef<MeshStandardMaterial>(null);
  const isDark = true;
  const [showLogo, setShowLogo] = useState(true);
  const rootScale = isMobile ? 0.96 : 1.22;
  const logoPosition: [number, number, number] = isMobile ? [0, 0.96, 5.25] : [0, -0.05, 0.34];

  // Determine target accent color from active section
  const accentHex = ACCENT_HEX[activeSection.accent];

  // Color pairs per accent — left "3D" gets a lighter tint, right gets the full accent
  const colorPairs: Record<string, { left: string; right: string }> = {
    '#FF6B2B': { left: '#FFD4B8', right: '#FF6B2B' },  // orange
    '#40C4C4': { left: '#B8F0F0', right: '#40C4C4' },  // teal
    '#E84A8A': { left: '#F5B8D4', right: '#E84A8A' },  // magenta
  };
  const targetColors = colorPairs[accentHex] ?? { left: '#B8F0F0', right: '#40C4C4' };

  useEffect(() => {
    setShowLogo(true);
    if (isMobile) return;

    const interval = setInterval(() => {
      setShowLogo((s) => !s);
    }, 6500);

    return () => clearInterval(interval);
  }, [isMobile]);

  useFrame(({ clock }, delta) => {
    if (!reducedMotion && rootRef.current) {
      if (isMobile) {
        rootRef.current.rotation.y = 0;
      } else {
        rootRef.current.rotation.y += delta * 0.12;
      }
      rootRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.4) * 0.01;
    }

    // Smoothly lerp logo colors toward current accent
    const lerpSpeed = 3.5 * delta;
    if (leftMatRef.current) {
      leftMatRef.current.color.lerp(new Color(targetColors.left), lerpSpeed);
      leftMatRef.current.emissive.lerp(new Color(accentHex), lerpSpeed);
      leftMatRef.current.emissiveIntensity += (0.18 - leftMatRef.current.emissiveIntensity) * lerpSpeed;
    }
    if (rightMatRef.current) {
      rightMatRef.current.color.lerp(new Color(targetColors.right), lerpSpeed);
      rightMatRef.current.emissive.lerp(new Color(accentHex), lerpSpeed);
      rightMatRef.current.emissiveIntensity += (0.28 - rightMatRef.current.emissiveIntensity) * lerpSpeed;
    }
  });

  const handlePrinterClick = () => {
    window.location.assign('https://oldgirl.3d3d.ca');
  };

  return (
    <Float
      speed={reducedMotion ? 0 : 1.4}
      rotationIntensity={reducedMotion || isMobile ? 0 : 0.12}
      floatIntensity={reducedMotion ? 0 : 0.2}
    >
      <group ref={rootRef} scale={rootScale}>
        {showLogo || isMobile ? (
          <Center position={logoPosition}>
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
                  ref={leftMatRef}
                  color={targetColors.left}
                  metalness={0.55}
                  roughness={0.18}
                  emissive={accentHex}
                  emissiveIntensity={0.18}
                  envMapIntensity={1.1}
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
                  ref={rightMatRef}
                  color={targetColors.right}
                  metalness={0.55}
                  roughness={0.18}
                  emissive={accentHex}
                  emissiveIntensity={0.28}
                  envMapIntensity={1.1}
                />
              </Text3D>
            </group>
          </Center>
        ) : (
          <group onClick={handlePrinterClick} onPointerOver={() => { document.body.style.cursor = 'pointer'; }} onPointerOut={() => { document.body.style.cursor = 'auto'; }}>
            <PrusaPrinter isDark={isDark} hoveredSection={hoveredSection} />
          </group>
        )}
      </group>
    </Float>
  );
}
