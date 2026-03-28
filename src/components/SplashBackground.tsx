import type { SplashTheme } from '../lib/splash-theme';

interface SplashBackgroundProps {
  staticMode?: boolean;
  theme: SplashTheme;
}

export default function SplashBackground({
  theme,
}: SplashBackgroundProps) {
  return (
    <div className="splash-background" aria-hidden="true">
      <div className="splash-background__static" />
      <div className="splash-background__mesh" />
      <div className="splash-background__dots" />
      <div className="splash-background__overlay" />
      <div className="splash-background__vignette" />
      <div className="splash-background__grain" />
    </div>
  );
}
