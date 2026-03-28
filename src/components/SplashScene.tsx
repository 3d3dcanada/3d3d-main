import { PerspectiveCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import type { WebGLRenderer } from 'three';

import type { SplashOrbitItem } from '../lib/splash-orbit';
import { easeOutCubic } from '../lib/splash-orbit';
import SplashEffects from './SplashEffects';
import SplashObject from './SplashObject';
import SplashParticles from './SplashParticles';

interface SplashSceneProps {
  items: SplashOrbitItem[];
  activeIndex: number;
  focusIndex: number;
  entryProgress: number;
  reducedMotion: boolean;
  saveData: boolean;
  onHoverIndexChange: (index: number | null) => void;
  onReady: () => void;
}

function isLowEndGPU(): boolean {
  if (typeof navigator === 'undefined') return false;
  return (navigator.hardwareConcurrency ?? 8) < 4;
}

export default function SplashScene({
  items,
  activeIndex,
  focusIndex,
  entryProgress,
  reducedMotion,
  saveData,
  onHoverIndexChange,
  onReady,
}: SplashSceneProps) {
  const [bloomEnabled, setBloomEnabled] = useState(false);
  const glRef = useRef<WebGLRenderer | null>(null);

  useEffect(() => {
    onReady();
  }, [onReady]);

  const entry = easeOutCubic(entryProgress);
  const particlesEnabled = !reducedMotion && !saveData;

  return (
    <Canvas
      className="splash-scene__canvas"
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        glRef.current = gl;

        // Enable bloom only on capable hardware
        if (!reducedMotion && !saveData && !isLowEndGPU()) {
          const maxTexture = gl.getContext().getParameter(gl.getContext().MAX_TEXTURE_SIZE);
          if (maxTexture > 4096) {
            setBloomEnabled(true);
          }
        }
      }}
    >
      <PerspectiveCamera makeDefault position={[0, 0.3, 8.6]} fov={42} />
      <ambientLight intensity={1.05} />
      <hemisphereLight intensity={0.6} groundColor="#04070b" color="#b7e7ff" />
      <directionalLight intensity={1.6} position={[6, 8, 6]} />
      <pointLight intensity={28} position={[0, 2, 3]} color="#40C4C4" distance={14} />
      <pointLight intensity={18} position={[-5, 1, -4]} color="#E84A8A" distance={18} />
      <pointLight intensity={12} position={[5, -2, -3]} color="#FF6B2B" distance={16} />

      <SplashParticles enabled={particlesEnabled} />

      <group rotation={[-0.26, 0.24, 0]}>
        {items.map((item) => {
          const x = item.scatter[0] + (item.x - item.scatter[0]) * entry;
          const y = item.scatter[1] + (item.y - item.scatter[1]) * entry;
          const z = item.scatter[2] + (item.z - item.scatter[2]) * entry;
          const scale = 0.45 + (item.scale - 0.45) * entry;

          return (
            <group
              key={item.section.id}
              position={[x, y, z]}
              scale={scale}
              rotation={[0, item.theta * 0.26, 0]}
            >
              <SplashObject
                kind={item.section.objectKind}
                accent={item.section.accent}
                label={item.section.ariaLabel}
                active={item.index === activeIndex}
                focused={item.index === focusIndex}
                opacity={item.opacity}
                onHoverChange={(hovered) => onHoverIndexChange(hovered ? item.index : null)}
              />
            </group>
          );
        })}
      </group>

      <mesh position={[0, -1.58, -0.18]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.6, 48]} />
        <meshBasicMaterial color="#020408" transparent opacity={0.24} />
      </mesh>

      <mesh position={[0, -1.56, -0.1]} rotation={[-Math.PI / 2, 0, 0]} scale={[1.5, 0.78, 1]}>
        <circleGeometry args={[1.8, 48]} />
        <meshBasicMaterial color="#081018" transparent opacity={0.16} />
      </mesh>

      <SplashEffects enabled={bloomEnabled} />
    </Canvas>
  );
}
