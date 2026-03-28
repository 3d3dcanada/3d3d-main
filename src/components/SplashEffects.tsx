import { Bloom, EffectComposer } from '@react-three/postprocessing';

import type { SplashTheme } from '../lib/splash-theme';

interface SplashEffectsProps {
  enabled: boolean;
  theme: SplashTheme;
}

export default function SplashEffects({ enabled, theme }: SplashEffectsProps) {
  if (!enabled) return null;

  const isDark = theme === 'dark';

  return (
    <EffectComposer>
      <Bloom
        luminanceThreshold={isDark ? 0.38 : 0.55}
        luminanceSmoothing={0.3}
        intensity={isDark ? 1.1 : 0.55}
        radius={isDark ? 0.85 : 0.65}
        mipmapBlur
      />
    </EffectComposer>
  );
}
