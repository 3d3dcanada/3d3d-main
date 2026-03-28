export type SplashAccent = 'teal' | 'magenta' | 'orange';

export interface SplashSection {
  id: 'market' | 'services' | 'network' | 'learn' | 'about';
  kicker: string;
  title: string;
  description: string;
  tags: string[];
  ctaLabel: string;
  href: string;
  accent: SplashAccent;
  ariaLabel: string;
  modelPath: string;
  modelScale: number;
  modelRotation: [number, number, number];
  modelOffset: [number, number, number];
}

export const ACCENT_HEX: Record<SplashAccent, string> = {
  orange: '#FF6B2B',
  teal: '#40C4C4',
  magenta: '#E84A8A',
};

export const SPLASH_SECTIONS: SplashSection[] = [
  {
    id: 'market',
    kicker: 'Shop / Store',
    title: 'The Market',
    description:
      'Ready-made prints, STL files, and cooperative-made goods you can browse, order, and ship without hunting through clutter.',
    tags: ['Ready-made prints', 'STL files', 'Community goods'],
    ctaLabel: 'Browse the Market',
    href: '/shop',
    accent: 'orange',
    ariaLabel: 'The Market. Browse ready-made prints, STL files, and community-made products.',
    modelPath: '/models/market.glb',
    modelScale: 1.08,
    modelRotation: [0.2, -0.52, 0.08],
    modelOffset: [0, -0.2, 0.04],
  },
  {
    id: 'services',
    kicker: 'Printing / Consulting',
    title: 'Services',
    description:
      'Custom fabrication, scanning, prototyping, and field-ready problem solving when the job needs a real operator instead of a generic intake form.',
    tags: ['Custom fabrication', 'Scanning', 'Consulting'],
    ctaLabel: 'Get a Quote',
    href: '/quote',
    accent: 'teal',
    ariaLabel: 'Services. Get a quote for custom fabrication, scanning, consulting, or deployment work.',
    modelPath: '/models/services.glb',
    modelScale: 1.34,
    modelRotation: [0.45, 0.82, -0.18],
    modelOffset: [0, -0.06, 0],
  },
  {
    id: 'network',
    kicker: 'Collective / Cooperative',
    title: 'The Network',
    description:
      'A cooperative mesh of builders, makers, and specialists working together as an open alternative to closed marketplaces.',
    tags: ['Makers', 'Cooperative', 'Open network'],
    ctaLabel: 'Join the Network',
    href: '/opportunities',
    accent: 'magenta',
    ariaLabel: 'The Network. Join the 3D3D cooperative of makers, builders, and specialists.',
    modelPath: '/models/network.glb',
    modelScale: 1.28,
    modelRotation: [0.16, 0.35, 0],
    modelOffset: [0, -0.06, 0],
  },
  {
    id: 'learn',
    kicker: 'Blog / Knowledge',
    title: 'Learn',
    description:
      'Material guides, practical tutorials, and field notes for people who want sharper instincts and less fluff.',
    tags: ['Tutorials', 'Material guides', 'Field notes'],
    ctaLabel: 'Start Learning',
    href: '/blog',
    accent: 'teal',
    ariaLabel: 'Learn. Read tutorials, material guides, and practical field knowledge.',
    modelPath: '/models/learn.glb',
    modelScale: 1.18,
    modelRotation: [0.16, -0.42, 0.1],
    modelOffset: [0, -0.14, 0.02],
  },
  {
    id: 'about',
    kicker: 'Mission / Story',
    title: 'About 3D3D',
    description:
      'The founder story, the cooperative philosophy, and the reason this platform exists in the first place.',
    tags: ['Founder-operated', 'Cooperative', 'Open source'],
    ctaLabel: 'Our Story',
    href: '/about',
    accent: 'magenta',
    ariaLabel: 'About 3D3D. Learn the founder story, cooperative mission, and platform philosophy.',
    modelPath: '/models/about.glb',
    modelScale: 1.22,
    modelRotation: [0.06, 0.48, 0],
    modelOffset: [0, -0.1, 0],
  },
];
