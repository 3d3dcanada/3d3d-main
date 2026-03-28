export type SplashTheme = 'light' | 'dark';

export const SPLASH_THEME_STORAGE_KEY = '3d3d:splash-theme';

export function isSplashTheme(value: unknown): value is SplashTheme {
  return value === 'light' || value === 'dark';
}

export function getSystemSplashTheme(): SplashTheme {
  if (typeof window === 'undefined') return 'light';

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function getStoredSplashTheme(): SplashTheme | null {
  if (typeof window === 'undefined') return null;

  try {
    const storedTheme = window.localStorage.getItem(SPLASH_THEME_STORAGE_KEY);
    return isSplashTheme(storedTheme) ? storedTheme : null;
  } catch {
    return null;
  }
}
