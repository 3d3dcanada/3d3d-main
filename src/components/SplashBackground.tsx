import { type CSSProperties } from 'react';

import { ACCENT_HEX, SPLASH_SECTIONS } from '../data/splashSections';

interface SplashBackgroundProps {
  activeIndex?: number;
}

export default function SplashBackground({
  activeIndex = 0,
}: SplashBackgroundProps) {
  const activeSection = SPLASH_SECTIONS[activeIndex] ?? SPLASH_SECTIONS[0];
  const accentColor = ACCENT_HEX[activeSection.accent];

  return (
    <div
      className="splash-background"
      aria-hidden="true"
      style={{ '--bg-accent': accentColor } as CSSProperties}
    >
      <div className="splash-background__static" />

      {/* ── Sliding gallery strip ── */}
      <div
        className="splash-background__gallery"
        style={{ transform: `translateX(calc(-${activeIndex} * 100vw))` }}
      >
        {SPLASH_SECTIONS.map((section, index) => {
          const isActive = index === activeIndex;
          const isPrev = index === activeIndex - 1;
          const isNext = index === activeIndex + 1;
          const isNear = isActive || isPrev || isNext;
          const hasImage = section.backgroundImage.trim().length > 0;
          const itemAccent = ACCENT_HEX[section.accent];

          return (
            <div
              key={section.id}
              className={[
                'splash-background__gallery-item',
                isActive && 'splash-background__gallery-item--active',
                isPrev && 'splash-background__gallery-item--prev',
                isNext && 'splash-background__gallery-item--next',
              ]
                .filter(Boolean)
                .join(' ')}
              style={{ '--item-accent': itemAccent } as CSSProperties}
            >
              {/* Slash-shaped image viewport */}
              <div className="splash-background__image-wrapper">
                <div
                  className="splash-background__image"
                  style={
                    hasImage
                      ? { backgroundImage: `url('${section.backgroundImage}')` }
                      : undefined
                  }
                />
              </div>

              {/* Accent edge-light on the leading slash edge */}
              {isNear && <div className="splash-background__edge-glow" />}
            </div>
          );
        })}
      </div>

      {/* ── Cinematic overlays ── */}
      <div className="splash-background__vignette" />
      <div className="splash-background__scrim" />
      <div className="splash-background__grain" />
    </div>
  );
}
