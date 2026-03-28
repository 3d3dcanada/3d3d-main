export type SplashAccent = 'teal' | 'magenta' | 'orange';

export interface SplashSection {
  id: 'market' | 'services' | 'network' | 'learn' | 'about';
  kicker: string;
  title: string;
  description: string;
  subtitle: string;
  longDescription: string;
  highlights: string[];
  tags: string[];
  ctaLabel: string;
  href: string;
  accent: SplashAccent;
  naturalColors: string[];
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
    subtitle: 'Tested designs. Real materials. Ships worldwide.',
    longDescription:
      'A curated catalogue of production-ready prints, downloadable STL files, and cooperative-made goods — all printed in engineering-grade materials and tested in the field before they ever hit the shelf.',
    highlights: ['PLA, PETG, ASA, TPU, ABS', 'Worldwide shipping', '24-48h turnaround', 'Material specs included'],
    tags: ['Ready-made prints', 'STL files', 'Community goods'],
    ctaLabel: 'Browse the Market',
    href: '/shop',
    accent: 'orange',
    naturalColors: ['#F5E6D3', '#D4A574', '#8B6914'],
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
    subtitle: 'Real operators. Real problem solving.',
    longDescription:
      'Custom fabrication for marine, motorsport, and restoration — from reverse-engineered boat hardware to field-deployable mounting systems. No intake forms. Direct operator access.',
    highlights: ['Marine-grade parts', 'Motorsport components', 'Reverse engineering', 'Field deployment'],
    tags: ['Custom fabrication', 'Scanning', 'Consulting'],
    ctaLabel: 'Get a Quote',
    href: '/quote',
    accent: 'teal',
    naturalColors: ['#B8B8B8', '#7A7A7A', '#4A4A4A'],
    ariaLabel: 'Services. Get a quote for custom fabrication, scanning, consulting, or deployment work.',
    modelPath: '/models/services.glb',
    modelScale: 1.34,
    modelRotation: [0, 0, 0],
    modelOffset: [0, -0.06, 0],
  },
  {
    id: 'network',
    kicker: 'Collective / Cooperative',
    title: 'The Network',
    description:
      'A cooperative mesh of builders, makers, and specialists working together as an open alternative to closed marketplaces.',
    subtitle: 'An open alternative to closed marketplaces.',
    longDescription:
      'A cooperative mesh of builders, makers, and specialists sharing capacity, knowledge, and revenue. Maker-first economics — no platform fees eating your margins.',
    highlights: ['Revenue sharing', 'Maker-first economics', 'Open source ethos', 'Global reach'],
    tags: ['Makers', 'Cooperative', 'Open network'],
    ctaLabel: 'Join the Network',
    href: '/opportunities',
    accent: 'magenta',
    naturalColors: ['#E8E8E8', '#A0A0A0', '#505050'],
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
    subtitle: 'Sharper instincts. Less fluff. Field-tested.',
    longDescription:
      'Material deep-dives from actual marine and racing deployments, build logs from the workshop floor, and printer setup guides written by someone who runs the machines daily.',
    highlights: ['Material deep-dives', 'Build logs', 'Race deployment stories', 'Printer setup guides'],
    tags: ['Tutorials', 'Material guides', 'Field notes'],
    ctaLabel: 'Start Learning',
    href: '/blog',
    accent: 'teal',
    naturalColors: ['#2C1810', '#8B4513', '#F5E6D3'],
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
    subtitle: 'Founder-operated. Route-based. Proof over promises.',
    longDescription:
      'Started in an RV, proven on transatlantic crossings and the Newport Bermuda Race. A one-operator fabrication company built on the Prusa ecosystem and a cooperative philosophy.',
    highlights: ['Founder-operated', 'Marine & motorsport focus', 'Prusa ecosystem', 'Open source'],
    tags: ['Founder-operated', 'Cooperative', 'Open source'],
    ctaLabel: 'Our Story',
    href: '/about',
    accent: 'magenta',
    naturalColors: ['#1A1A1A', '#333333', '#666666'],
    ariaLabel: 'About 3D3D. Learn the founder story, cooperative mission, and platform philosophy.',
    modelPath: '/models/about.glb',
    modelScale: 1.22,
    modelRotation: [0.06, 0.48, 0],
    modelOffset: [0, -0.1, 0],
  },
];
