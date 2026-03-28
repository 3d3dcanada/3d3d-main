import type { SplashSection } from '../data/splashSections';

export interface SplashOrbitItem {
  section: SplashSection;
  index: number;
  theta: number;
  x: number;
  y: number;
  z: number;
  normalizedDepth: number;
  scale: number;
  opacity: number;
  rotationY: number;
  scatter: [number, number, number];
}

export const ORBIT_TILT = Math.PI / 18;

const DESKTOP_ORBIT_RADIUS = 5.4;
const DESKTOP_ORBIT_DEPTH = 4.6;
const MOBILE_ORBIT_RADIUS = 5.95;
const MOBILE_ORBIT_DEPTH = 5.2;

const SCATTER_MAP: Record<SplashSection['id'], [number, number, number]> = {
  market: [-5.6, 2.8, -4.8],
  services: [5.1, 2.1, -4.4],
  network: [-5.4, -2.4, -4.6],
  learn: [5.8, -2.1, -4.9],
  about: [0.1, 3.4, -6.3],
};

export function getOrbitItems(
  sections: SplashSection[],
  angle: number,
  isMobile = false,
): SplashOrbitItem[] {
  const total = sections.length;
  const step = (Math.PI * 2) / total;
  const orbitRadius = isMobile ? MOBILE_ORBIT_RADIUS : DESKTOP_ORBIT_RADIUS;
  const orbitDepth = isMobile ? MOBILE_ORBIT_DEPTH : DESKTOP_ORBIT_DEPTH;
  const baseScale = isMobile ? 0.56 : 0.66;
  const scaleRange = isMobile ? 0.24 : 0.34;
  const opacityFloor = isMobile ? 0.38 : 0.32;

  return sections.map((section, index) => {
    const theta = index * step + angle;
    const x = Math.sin(theta) * orbitRadius;
    const z = Math.cos(theta) * orbitDepth;
    const y = Math.sin(theta * 0.5) * (isMobile ? 0.12 : 0.18);
    const normalizedDepth = (z + orbitDepth) / (orbitDepth * 2);

    return {
      section,
      index,
      theta,
      x,
      y,
      z,
      normalizedDepth,
      scale: baseScale + normalizedDepth * scaleRange,
      opacity: opacityFloor + normalizedDepth * (1 - opacityFloor),
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
