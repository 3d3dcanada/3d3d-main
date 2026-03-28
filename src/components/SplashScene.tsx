import { ContactShadows, Environment, PerspectiveCamera, Sparkles } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useEffect } from 'react';

import type { SplashTheme } from '../lib/splash-theme';
import type { SplashOrbitItem } from '../lib/splash-orbit';
import { ORBIT_TILT, easeOutCubic } from '../lib/splash-orbit';
import type { SplashSection } from '../data/splashSections';
import SplashCenterLogo from './SplashCenterLogo';
import SplashEffects from './SplashEffects';
import SplashObject from './SplashObject';

interface SplashSceneProps {
  items: SplashOrbitItem[];
  activeIndex: number;
  focusIndex: number;
  entryProgress: number;
  reducedMotion: boolean;
  saveDataMode: boolean;
  theme: SplashTheme;
  hoveredSection: SplashSection | null;
  onHoverIndexChange: (index: number | null) => void;
  onReady: () => void;
}

export default function SplashScene({
  items,
  activeIndex,
  focusIndex,
  entryProgress,
  reducedMotion,
  saveDataMode,
  theme,
  hoveredSection,
  onHoverIndexChange,
  onReady,
}: SplashSceneProps) {
  useEffect(() => {
    onReady();
  }, [onReady]);

  const entry = reducedMotion ? 1 : easeOutCubic(entryProgress);
  const isDark = theme === 'dark';

  const tealIntensity = isDark ? 9.35 : 4.8;
  const magentaIntensity = isDark ? 8.075 : 4.2;
  const orangeIntensity = isDark ? 6.8 : 3.6;

  return (
    <Canvas
      className="splash-scene__canvas"
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      onCreated={({ gl, camera }) => {
        gl.setClearColor(0x000000, 0);
        camera.position.set(0, 3.4, 15);
        camera.lookAt(0, 1.8, 0);
      }}
    >
      <PerspectiveCamera makeDefault position={[0, 3.4, 15]} fov={40} />

      <Environment preset="city" />

      <ambientLight intensity={isDark ? 0.45 : 1.1} />
      <hemisphereLight
        intensity={isDark ? 0.92 : 1.2}
        color={isDark ? '#D7E3F0' : '#FFF4EA'}
        groundColor={isDark ? '#0E1319' : '#CEC7BF'}
        position={[0, 6, 0]}
      />
      <directionalLight
        position={[6, 8, 9]}
        intensity={isDark ? 1.2 : 1.55}
        color={isDark ? '#F3EEE8' : '#FFF5EC'}
      />
      <directionalLight
        position={[-5, 4, -3]}
        intensity={isDark ? 0.72 : 0.55}
        color={isDark ? '#7EAAB0' : '#D8E8E6'}
      />

      {/* Accent point lights (reduced ~15%) */}
      <pointLight
        position={[3.6, 1.8, 5]}
        intensity={tealIntensity}
        color="#40C4C4"
        distance={isDark ? 8.5 : 10}
      />
      <pointLight
        position={[-4.2, 1.1, 3.8]}
        intensity={magentaIntensity}
        color="#E84A8A"
        distance={isDark ? 8.5 : 10}
      />
      <pointLight
        position={[0.2, 2.8, 5.8]}
        intensity={orangeIntensity}
        color="#FF6B2B"
        distance={isDark ? 10 : 12}
      />

      {/* Rim light — separates objects from bg */}
      <directionalLight
        position={[0, 2, -8]}
        intensity={isDark ? 0.65 : 0.38}
        color={isDark ? '#7EB8C8' : '#C8E0E8'}
      />

      {/* Spot on printer build plate */}
      <spotLight
        position={[0, 6, 3]}
        target-position={[0, 1.7, 0]}
        angle={0.28}
        penumbra={0.6}
        intensity={isDark ? 18 : 12}
        color={isDark ? '#FFFFFF' : '#FFF8F0'}
        distance={14}
        castShadow={false}
      />

      <group position={[0, 1.9, 0]}>
        <SplashCenterLogo
          reducedMotion={reducedMotion}
          theme={theme}
          hoveredSection={hoveredSection}
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
                  theme={theme}
                  onHoverChange={(hovered) => onHoverIndexChange(hovered ? item.index : null)}
                />
              </group>
            );
          })}
        </group>
      </group>

      {!saveDataMode && (
        <Sparkles
          count={30}
          scale={[10, 6, 8]}
          position={[0, 1.9, 0]}
          size={2.5}
          speed={0.3}
          opacity={isDark ? 0.55 : 0.3}
          color={isDark ? '#40C4C4' : '#D4C8B8'}
        />
      )}

      <ContactShadows
        position={[0, -0.12, 0]}
        opacity={isDark ? 0.3 : 0.18}
        scale={8.5}
        blur={2.6}
        far={5}
      />

      <SplashEffects enabled={!saveDataMode} theme={theme} />
    </Canvas>
  );
}
