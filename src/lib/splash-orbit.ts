import type { SplashSection } from '../data/splashSections';

export interface SplashOrbitItem {
  section: SplashSection;
  index: number;
  theta: number;
  x: number;
  y: number;
  z: number;
  scale: number;
  opacity: number;
  rotationY: number;
  scatter: [number, number, number];
}

export const ORBIT_TILT = Math.PI / 18;

const ORBIT_RADIUS = 5.4;
const ORBIT_DEPTH = 4.6;

const SCATTER_MAP: Record<SplashSection['id'], [number, number, number]> = {
  market: [-5.6, 2.8, -4.8],
  services: [5.1, 2.1, -4.4],
  network: [-5.4, -2.4, -4.6],
  learn: [5.8, -2.1, -4.9],
  about: [0.1, 3.4, -6.3],
};

export function getOrbitItems(sections: SplashSection[], angle: number): SplashOrbitItem[] {
  const total = sections.length;
  const step = (Math.PI * 2) / total;

  return sections.map((section, index) => {
    const theta = index * step + angle;
    const x = Math.sin(theta) * ORBIT_RADIUS;
    const z = Math.cos(theta) * ORBIT_DEPTH;
    const y = Math.sin(theta * 0.5) * 0.18;
    const normalizedDepth = (z + ORBIT_DEPTH) / (ORBIT_DEPTH * 2);

    return {
      section,
      index,
      theta,
      x,
      y,
      z,
      scale: 0.66 + normalizedDepth * 0.34,
      opacity: 0.32 + normalizedDepth * 0.68,
      rotationY: -theta * 0.28,
      scatter: SCATTER_MAP[section.id],
    };
  });
}

export function getNearestIndex(sections: SplashSection[], angle: number): number {
  if (!sections.length) return 0;

  const items = getOrbitItems(sections, angle);
  let nearest = 0;
  let highestDepth = Number.NEGATIVE_INFINITY;

  for (const item of items) {
    if (item.z > highestDepth) {
      highestDepth = item.z;
      nearest = item.index;
    }
  }

  return nearest;
}

export function getSnapAngle(currentAngle: number, targetIndex: number, total: number): number {
  const step = (Math.PI * 2) / total;
  const targetBaseAngle = -targetIndex * step;
  const fullTurn = Math.PI * 2;
  const turns = Math.round((currentAngle - targetBaseAngle) / fullTurn);

  return targetBaseAngle + turns * fullTurn;
}

export function shortestAngleDelta(currentAngle: number, targetAngle: number): number {
  const fullTurn = Math.PI * 2;
  let delta = targetAngle - currentAngle;

  while (delta > Math.PI) delta -= fullTurn;
  while (delta < -Math.PI) delta += fullTurn;

  return delta;
}

export function easeOutCubic(value: number): number {
  return 1 - Math.pow(1 - value, 3);
}
