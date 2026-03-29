interface SplashBackgroundProps {
  activeImage?: string;
}

export default function SplashBackground({
  activeImage = '',
}: SplashBackgroundProps) {
  const hasActiveImage = activeImage.trim().length > 0;

  return (
    <div className="splash-background" aria-hidden="true">
      <div className="splash-background__static" />
      <div
        className={`splash-background__section${hasActiveImage ? ' splash-background__section--active' : ''}`}
        style={hasActiveImage ? { backgroundImage: `url('${activeImage}')` } : undefined}
      />
      <div className="splash-background__scrim" />
      <div className="splash-background__grain" />
    </div>
  );
}
