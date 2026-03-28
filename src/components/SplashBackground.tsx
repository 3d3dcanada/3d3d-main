import { MeshGradient } from '@paper-design/shaders-react';

import type { SplashTheme } from '../lib/splash-theme';

interface SplashBackgroundProps {
  staticMode: boolean;
  theme: SplashTheme;
}

const MESH_COLORS: Record<SplashTheme, string[]> = {
  light: ['#E8E4DF', '#D5D0CA', '#C8C3BC', '#40C4C4', '#E84A8A', '#FF6B2B'],
  dark: ['#090C11', '#10151C', '#1A222A', '#40C4C4', '#E84A8A', '#FF6B2B'],
};

export default function SplashBackground({ staticMode, theme }: SplashBackgroundProps) {
  return (
    <div className="splash-background" aria-hidden="true">
      {staticMode ? (
        <div className="splash-background__static" />
      ) : (
        <MeshGradient
          className="splash-background__mesh"
          colors={MESH_COLORS[theme]}
          speed={theme === 'dark' ? 0.1 : 0.12}
          distortion={theme === 'dark' ? 0.56 : 0.62}
          swirl={theme === 'dark' ? 0.22 : 0.28}
          grainMixer={theme === 'dark' ? 0.06 : 0.04}
          grainOverlay={theme === 'dark' ? 0.04 : 0.02}
          style={{ width: '100%', height: '100%' }}
        />
      )}
      <div className="splash-background__wash" />
      <div className="splash-background__spots" />
      <div className="splash-background__grain" />
    </div>
  );
}
