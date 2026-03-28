export type SplashAccent = 'teal' | 'magenta' | 'orange';

export interface SplashSection {
  id: 'market' | 'services' | 'network' | 'learn' | 'about';
  icon?: string;
  kicker: string;
  title: string;
  tagline?: string;
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
    icon: '◎',
    kicker: 'Shop / Store',
    title: 'The Market',
    tagline: 'Useful prints, files, and gear without the junk-drawer sprawl.',
    description:
      'Browse ready-made prints, STL files, and cooperative-made goods that are already worth your time. It is a tighter, cleaner storefront for people who want practical parts, giftable objects, and digital products without marketplace sludge.',
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
    icon: '◧',
    kicker: 'Printing / Consulting',
    title: 'Services',
    tagline: 'From prototype panic to field deployment, with a real operator attached.',
    description:
      'Bring in custom fabrication, scanning, prototyping, and problem solving when the job cannot be reduced to a generic quote form. We help shape the brief, pressure-test the design, and get physical output moving fast when the stakes are real.',
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
    icon: '◌',
    kicker: 'Collective / Cooperative',
    title: 'The Network',
    tagline: 'A working mesh of people, tools, and capacity you can actually tap into.',
    description:
      '3D3D is a cooperative mesh of builders, makers, and specialists sharing reach instead of guarding turf. It is designed as an open alternative to closed marketplaces, with room for collaboration, referrals, and regional production capacity.',
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
    icon: '◇',
    kicker: 'Blog / Knowledge',
    title: 'Learn',
    tagline: 'Sharper instincts for materials, machines, and making decisions under pressure.',
    description:
      'Read material guides, practical tutorials, and field notes built for people who prefer signal over filler. The goal is to make you faster at choosing processes, avoiding waste, and understanding what actually works in the shop.',
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
    icon: '✦',
    kicker: 'Mission / Story',
    title: 'About 3D3D',
    tagline: 'Why this cooperative exists, and what it is trying to prove in public.',
    description:
      'Get the founder story, the cooperative philosophy, and the logic behind building this platform in the open. It is the clearest view into the values, tradeoffs, and long-game that shape every part of 3D3D.',
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
