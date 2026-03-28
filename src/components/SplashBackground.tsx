import type { SplashTheme } from '../lib/splash-theme';

interface SplashBackgroundProps {
  staticMode?: boolean;
  theme: SplashTheme;
}

const DARK_VIDEO_SRC = '/media/backgrounds/network-grid-loop.mp4';
const LIGHT_VIDEO_SRC = '/media/backgrounds/print-field-loop.mp4';

export default function SplashBackground({
  staticMode = false,
  theme,
}: SplashBackgroundProps) {
  const isDark = theme === 'dark';
  const videoSrc = isDark ? DARK_VIDEO_SRC : LIGHT_VIDEO_SRC;

  return (
    <div className="splash-background" aria-hidden="true">
      {staticMode ? (
        <div className="splash-background__static" />
      ) : (
        <video
          key={videoSrc}
          className="splash-background__video"
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          preload="auto"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}
      <div className="splash-background__overlay" />
      <div className="splash-background__grain" />
    </div>
  );
}
