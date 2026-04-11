export type AccentKey = 'teal' | 'magenta' | 'orange' | 'lime'

export interface NavItem {
  label: string
  href: string
  accent: AccentKey
  description?: string
  external?: boolean
}

export const ACCENT_HEX: Record<AccentKey, string> = {
  teal: '#40C4C4',
  magenta: '#E84A8A',
  orange: '#FF6B2B',
  lime: '#AAFF2A',
}

export const PRIMARY_NAV: NavItem[] = [
  {
    label: 'Home',
    href: '/',
    accent: 'teal',
    description: 'One homepage. Four divisions.',
  },
  {
    label: '3D3D',
    href: '/3d3d',
    accent: 'teal',
    description: 'Distributed fabrication cooperative.',
  },
  {
    label: 'ORA',
    href: '/ora',
    accent: 'magenta',
    description: 'AI memory, governance, and waitlist.',
  },
  {
    label: 'STRX',
    href: '/strx',
    accent: 'orange',
    description: 'Rapid deployment field operations.',
  },
  {
    label: 'THE KEN',
    href: '/the-ken',
    accent: 'lime',
    description: 'Projects, proof, and the record.',
  },
]

export const ACTION_LINKS: NavItem[] = [
  {
    label: 'Email',
    href: 'mailto:info@3d3d.ca',
    accent: 'teal',
    description: 'Direct line.',
    external: true,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/3d3dcanada',
    accent: 'magenta',
    description: 'Open-source work.',
    external: true,
  },
]

export const BOTTOM_NAV: NavItem[] = [
  PRIMARY_NAV[0],
  PRIMARY_NAV[1],
  PRIMARY_NAV[2],
  PRIMARY_NAV[3],
  {
    ...PRIMARY_NAV[4],
    label: 'KEN',
  },
]

export interface SocialLink {
  label: string
  href: string
  viewBox: string
  path: string
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@3D3Dcanada',
    viewBox: '0 0 24 24',
    path: 'M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8ZM9.6 15.9V8.1l6.8 3.9Z',
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@3d3dcanada',
    viewBox: '0 0 24 24',
    path: 'M14.5 2c.5 2 1.7 3.6 3.5 4.6 1.1.7 2.3 1 3.5 1v3.6c-1.8 0-3.7-.5-5.2-1.5v6.2a6 6 0 1 1-6-6c.3 0 .7 0 1 .1v3.7a2.5 2.5 0 1 0 1.5 2.3V2h1.7Z',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/3d3dca/',
    viewBox: '0 0 24 24',
    path: 'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2.3A2.7 2.7 0 0 0 4.3 7v10A2.7 2.7 0 0 0 7 19.7h10a2.7 2.7 0 0 0 2.7-2.7V7A2.7 2.7 0 0 0 17 4.3Zm5 2.2A5.5 5.5 0 1 1 6.5 12 5.5 5.5 0 0 1 12 6.5Zm0 2.3A3.2 3.2 0 1 0 15.2 12 3.2 3.2 0 0 0 12 8.8Zm5.6-3.1a1.3 1.3 0 1 1-1.3 1.3 1.3 1.3 0 0 1 1.3-1.3Z',
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61575548079847',
    viewBox: '0 0 24 24',
    path: 'M13.4 21.9v-7h2.4l.4-2.9h-2.8v-1.9c0-.8.2-1.4 1.4-1.4h1.5V6.1c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8V12H8v2.9h2.4v7h3Z',
  },
  {
    label: 'Printables',
    href: 'https://www.printables.com/@KTK3D_3050116',
    viewBox: '0 0 24 24',
    path: 'M4 5.5 12 2l8 3.5V18L12 22l-8-4Zm2.2 1.4v9.7l5 2.4v-4.8l-2.6-1.2v-2.4l2.6 1.2 2.6-1.2v-2.6L12 6.8Zm9.6 0L14.8 8v4.8l-2.6 1.2v5l5-2.4Z',
  },
  {
    label: 'Ko-fi',
    href: 'https://ko-fi.com/3d3dca',
    viewBox: '0 0 24 24',
    path: 'M20 3H4v10a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4v-3h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm0 5h-2V5h2v3zm-4 13H8v2h8v-2z',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/3d3dcanada',
    viewBox: '0 0 24 24',
    path: 'M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21.5c0 .27.16.59.67.5A10.02 10.02 0 0 0 22 12 10 10 0 0 0 12 2Z',
  },
]

export function getActiveNavLabel(pathname: string) {
  return PRIMARY_NAV.find((item) => item.href === pathname)?.label ?? '3D3D'
}
