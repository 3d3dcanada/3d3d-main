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
  scatter: [number, number, number];
}

const SCATTER_MAP: Record<string, [number, number, number]> = {
  market: [-4.8, 2.5, -4.4],
  services: [4.7, 2.8, -4.8],
  network: [-5.1, -1.9, -4.1],
  learn: [5.2, -2.2, -4.5],
  about: [0.2, 3.6, -6.2],
};

export function getOrbitItems(
  sections: SplashSection[],
  angle: number,
  compact: boolean,
): SplashOrbitItem[] {
  const total = sections.length;
  const step = (Math.PI * 2) / total;
  const radius = compact ? 2.45 : 3.8;
  const depthRadius = compact ? 1.45 : 2.5;
  const yAmplitude = compact ? 0.2 : 0.32;

  return sections.map((section, index) => {
    const theta = index * step + angle;
    const x = Math.sin(theta) * radius;
    const z = Math.cos(theta) * depthRadius;
    const y = Math.sin(theta * 0.55) * yAmplitude;
    const normalizedDepth = (z + depthRadius) / (depthRadius * 2);
    const scale = compact ? 0.78 + normalizedDepth * 0.28 : 0.72 + normalizedDepth * 0.4;
    const opacity = 0.25 + normalizedDepth * 0.75;

    return {
      section,
      index,
      theta,
      x,
      y,
      z,
      scale,
      opacity,
      scatter: SCATTER_MAP[section.id] ?? [0, 3.4, -5.6],
    };
  });
}

export function getNearestIndex(sections: SplashSection[], angle: number): number {
  if (sections.length === 0) return 0;

  const items = getOrbitItems(sections, angle, false);
  let highestDepth = Number.NEGATIVE_INFINITY;
  let nearest = 0;

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
