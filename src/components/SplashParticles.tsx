import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import type { Points as ThreePoints } from 'three';

interface SplashParticlesProps {
  enabled: boolean;
}

const PARTICLE_COUNT = 300;
const BOUNDS = { x: 6, y: 4, z: { min: -8, max: 2 } };

export default function SplashParticles({ enabled }: SplashParticlesProps) {
  const pointsRef = useRef<ThreePoints>(null);

  const positions = useMemo(() => {
    const buffer = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      buffer[i3] = (Math.random() - 0.5) * BOUNDS.x * 2;
      buffer[i3 + 1] = (Math.random() - 0.5) * BOUNDS.y * 2;
      buffer[i3 + 2] = BOUNDS.z.min + Math.random() * (BOUNDS.z.max - BOUNDS.z.min);
    }
    return buffer;
  }, []);

  useFrame(({ clock }, delta) => {
    if (!pointsRef.current) return;
    const dt = Math.min(delta, 0.1);
    const posAttr = pointsRef.current.geometry.attributes.position;
    const array = posAttr.array as Float32Array;
    const time = clock.elapsedTime;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      // Drift downward
      array[i3 + 1] -= dt * 0.04;
      // Subtle horizontal oscillation
      array[i3] += Math.sin(time * 0.3 + i) * dt * 0.008;

      // Wrap around
      if (array[i3 + 1] < -BOUNDS.y) {
        array[i3 + 1] = BOUNDS.y;
      }
      if (array[i3] > BOUNDS.x) {
        array[i3] = -BOUNDS.x;
      } else if (array[i3] < -BOUNDS.x) {
        array[i3] = BOUNDS.x;
      }
    }

    posAttr.needsUpdate = true;
  });

  if (!enabled) return null;

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#a0b8d8"
        transparent
        opacity={0.35}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
