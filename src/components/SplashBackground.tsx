import { MeshGradient } from '@paper-design/shaders-react';

interface SplashBackgroundProps {
  staticMode: boolean;
}

export default function SplashBackground({ staticMode }: SplashBackgroundProps) {
  return (
    <div className="splash-background" aria-hidden="true">
      {staticMode ? (
        <div className="splash-background__static" />
      ) : (
        <MeshGradient
          className="splash-background__mesh"
          colors={['#E8E4DF', '#D5D0CA', '#C8C3BC', '#40C4C4', '#E84A8A', '#FF6B2B']}
          speed={0.12}
          distortion={0.62}
          swirl={0.28}
          grainMixer={0.04}
          grainOverlay={0.02}
          style={{ width: '100%', height: '100%' }}
        />
      )}
      <div className="splash-background__wash" />
      <div className="splash-background__spots" />
      <div className="splash-background__grain" />
    </div>
  );
}
