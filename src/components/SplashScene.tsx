import { ContactShadows, PerspectiveCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useEffect } from 'react';

import type { SplashOrbitItem } from '../lib/splash-orbit';
import { ORBIT_TILT, easeOutCubic } from '../lib/splash-orbit';
import SplashCenterLogo from './SplashCenterLogo';
import SplashObject from './SplashObject';

interface SplashSceneProps {
  items: SplashOrbitItem[];
  activeIndex: number;
  focusIndex: number;
  entryProgress: number;
  reducedMotion: boolean;
  onHoverIndexChange: (index: number | null) => void;
  onReady: () => void;
}

export default function SplashScene({
  items,
  activeIndex,
  focusIndex,
  entryProgress,
  reducedMotion,
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
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      onCreated={({ gl, camera }) => {
        gl.setClearColor(0x000000, 0);
        camera.position.set(0, 3.2, 10);
        camera.lookAt(0, 1.15, 0);
      }}
    >
      <PerspectiveCamera makeDefault position={[0, 3.2, 10]} fov={40} />

      <ambientLight intensity={1.1} />
      <hemisphereLight
        intensity={1.2}
        color="#FFF4EA"
        groundColor="#CEC7BF"
        position={[0, 6, 0]}
      />
      <directionalLight position={[6, 8, 9]} intensity={1.55} color="#FFF5EC" />
      <directionalLight position={[-5, 4, -3]} intensity={0.55} color="#D8E8E6" />
      <pointLight position={[3.6, 1.8, 5]} intensity={8} color="#40C4C4" distance={10} />
      <pointLight position={[-4.2, 1.1, 3.8]} intensity={7} color="#E84A8A" distance={10} />
      <pointLight position={[0.2, 2.8, 5.8]} intensity={6} color="#FF6B2B" distance={12} />

      <group position={[0, 1.28, 0]}>
        <SplashCenterLogo reducedMotion={reducedMotion} />

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
        position={[0, -0.24, 0]}
        opacity={0.18}
        scale={8.5}
        blur={2.6}
        far={5}
      />
    </Canvas>
  );
}
