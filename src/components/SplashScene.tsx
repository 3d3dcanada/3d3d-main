import { ContactShadows, PerspectiveCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useEffect } from 'react';
import { RectAreaLightUniformsLib } from 'three/addons/lights/RectAreaLightUniformsLib.js';

import type { SplashOrbitItem } from '../lib/splash-orbit';
import { ORBIT_TILT, easeOutCubic } from '../lib/splash-orbit';
import { SPLASH_SECTIONS, type SplashSection } from '../data/splashSections';
import SplashCenterLogo from './SplashCenterLogo';
import SplashObject from './SplashObject';

RectAreaLightUniformsLib.init();

interface SplashSceneProps {
  items: SplashOrbitItem[];
  activeIndex: number;
  focusIndex: number;
  entryProgress: number;
  isMobile: boolean;
  reducedMotion: boolean;
  saveDataMode: boolean;
  hoveredSection: SplashSection | null;
  onHoverIndexChange: (index: number | null) => void;
  onReady: () => void;
}

export default function SplashScene({
  items,
  activeIndex,
  focusIndex,
  entryProgress,
  isMobile,
  reducedMotion,
  saveDataMode,
  hoveredSection,
  onHoverIndexChange,
  onReady,
}: SplashSceneProps) {
  useEffect(() => {
    onReady();
  }, [onReady]);

  const entry = reducedMotion ? 1 : easeOutCubic(entryProgress);

  return (
    <Canvas
      className="splash-scene__canvas"
      dpr={saveDataMode ? [1, 1.1] : [1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      onCreated={({ gl, camera }) => {
        gl.setClearColor(0x000000, 0);
        camera.position.set(0, 4.2, 22);
        camera.lookAt(0, 2.4, 0);
      }}
    >
      <PerspectiveCamera makeDefault position={[0, 4.2, 22]} fov={36} />

      <ambientLight intensity={0.3} />

      <rectAreaLight
        width={12}
        height={8}
        position={[0, -1.5, 2]}
        rotation={[-Math.PI / 2, 0, 0]}
        intensity={6}
        color="#ffffff"
      />

      <pointLight
        position={[0, -2, 6]}
        intensity={4}
        color="#FFF5E8"
        distance={20}
      />

      <directionalLight
        position={[0, 3, -8]}
        intensity={0.4}
        color="#C8D8E8"
      />

      <hemisphereLight
        intensity={0.2}
        color="#E8E4E0"
        groundColor="#1a1a1a"
      />

      <group position={[0, 2.6, 0]}>
        <SplashCenterLogo
          isMobile={isMobile}
          reducedMotion={reducedMotion}
          hoveredSection={hoveredSection}
          activeSection={SPLASH_SECTIONS[activeIndex] ?? SPLASH_SECTIONS[0]}
        />

        <group rotation={[ORBIT_TILT, 0, 0]} position={[0, 0.08, 0]}>
          {items.map((item) => {
            const x = item.scatter[0] + (item.x - item.scatter[0]) * entry;
            const y = item.scatter[1] + (item.y - item.scatter[1]) * entry;
            const z = item.scatter[2] + (item.z - item.scatter[2]) * entry;
            const scale = 0.52 + (item.scale - 0.52) * entry;

            return (
              <group
                key={item.section.id}
                position={[x, y, z]}
                scale={scale}
                rotation={[0, item.rotationY, 0]}
              >
                <SplashObject
                  section={item.section}
                  active={item.index === activeIndex}
                  focused={item.index === focusIndex}
                  opacity={item.opacity}
                  onHoverChange={(hovered) => onHoverIndexChange(hovered ? item.index : null)}
                />
              </group>
            );
          })}
        </group>
      </group>

      <ContactShadows
        position={[0, -0.12, 0]}
        opacity={0.26}
        scale={9.2}
        blur={2.8}
        far={5}
      />
    </Canvas>
  );
}
