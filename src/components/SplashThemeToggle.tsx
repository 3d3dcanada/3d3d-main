import type { SplashTheme } from '../lib/splash-theme';

interface SplashThemeToggleProps {
  theme: SplashTheme;
  onToggle: () => void;
}

export default function SplashThemeToggle({
  theme,
  onToggle,
}: SplashThemeToggleProps) {
  return (
    <button
      type="button"
      className="splash-theme-toggle"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      aria-pressed={theme === 'dark'}
      onClick={onToggle}
      data-analytics-event="splash_theme_toggle"
      data-analytics-source={`theme-${theme}`}
    >
      <span className="splash-theme-toggle__label">Appearance</span>
      <span className="splash-theme-toggle__options" aria-hidden="true">
        <span
          className={`splash-theme-toggle__option${
            theme === 'light' ? ' splash-theme-toggle__option--active' : ''
          }`}
        >
          Light
        </span>
        <span
          className={`splash-theme-toggle__option${
            theme === 'dark' ? ' splash-theme-toggle__option--active' : ''
          }`}
        >
          Dark
        </span>
      </span>
    </button>
  );
}
