import type { CSSProperties } from 'react';

import { ACCENT_HEX, type SplashSection } from '../data/splashSections';

interface SplashNavPillProps {
  sections: SplashSection[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export default function SplashNavPill({
  sections,
  activeIndex,
  onSelect,
}: SplashNavPillProps) {
  return (
    <nav className="splash-nav" aria-label="Homepage sections">
      <div className="splash-nav__rail">
        {sections.map((section, index) => {
          const selected = index === activeIndex;
          const style = {
            '--accent': ACCENT_HEX[section.accent],
          } as CSSProperties;

          return (
            <button
              key={section.id}
              type="button"
              className={`splash-nav__pill${selected ? ' splash-nav__pill--active' : ''}`}
              style={style}
              aria-pressed={selected}
              onClick={() => onSelect(index)}
            >
              {section.title}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
