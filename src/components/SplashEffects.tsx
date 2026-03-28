import { Bloom, EffectComposer } from '@react-three/postprocessing';

interface SplashEffectsProps {
  enabled: boolean;
}

export default function SplashEffects({ enabled }: SplashEffectsProps) {
  if (!enabled) return null;

  return (
    <EffectComposer>
      <Bloom
        luminanceThreshold={0.6}
        luminanceSmoothing={0.3}
        intensity={0.4}
        radius={0.6}
        mipmapBlur
      />
    </EffectComposer>
  );
}
