export type SplashAccent = 'teal' | 'magenta' | 'orange';
export type SplashObjectKind = 'market' | 'services' | 'network' | 'learn' | 'about';

export interface SplashSection {
  id: string;
  kicker: string;
  title: string;
  description: string;
  tags: string[];
  ctaLabel: string;
  href: string;
  accent: SplashAccent;
  objectKind: SplashObjectKind;
  ariaLabel: string;
  modelPath?: string;
}

export const SPLASH_SECTIONS: SplashSection[] = [
  {
    id: 'market',
    kicker: 'Shop / Store',
    title: 'The Market',
    description:
      'Ready-made prints, STL files, community-made goods, and digital products that move from shelf to shipment without friction.',
    tags: ['Ready-made prints', 'STL files', 'Community crafts', 'Digital goods'],
    ctaLabel: 'Browse the Market',
    href: '/shop',
    accent: 'orange',
    objectKind: 'market',
    ariaLabel: 'Market. Browse ready-made prints, STL files, community crafts, and digital goods.',
  },
  {
    id: 'services',
    kicker: 'Printing / Consulting',
    title: 'Services',
    description:
      'Bring the hard problem: custom printing, fabrication, scanning, consulting, and field-ready deployment for one-offs or serious production.',
    tags: ['Custom printing', 'Fabrication', 'Consulting', 'On-site deployment'],
    ctaLabel: 'Get a Quote',
    href: '/quote',
    accent: 'teal',
    objectKind: 'services',
    ariaLabel: 'Services. Get a quote for custom printing, fabrication, consulting, or on-site deployment.',
  },
  {
    id: 'network',
    kicker: 'Collective / Cooperative',
    title: 'The Network',
    description:
      'A cooperative mesh of makers, designers, builders, and specialists working as an open-source alternative to closed marketplaces.',
    tags: ['Makers', 'Designers', 'Cooperative', 'Dedicated marketing'],
    ctaLabel: 'Join the Network',
    href: '/opportunities',
    accent: 'magenta',
    objectKind: 'network',
    ariaLabel: 'Network. Join the 3D3D collective of makers, designers, and cooperative builders.',
  },
  {
    id: 'learn',
    kicker: 'Blog / Knowledge',
    title: 'Learn',
    description:
      'Material guides, tutorials, case studies, and practical field knowledge for people who want sharper instincts, not fluff.',
    tags: ['Tutorials', 'Material guides', 'Community knowledge', '3D printing tips'],
    ctaLabel: 'Start Learning',
    href: '/blog',
    accent: 'teal',
    objectKind: 'learn',
    ariaLabel: 'Learn. Read tutorials, material guides, and practical community knowledge.',
  },
  {
    id: 'about',
    kicker: 'Mission / Story',
    title: 'About 3D3D',
    description:
      'Founder-operated, cooperative, and open-source at heart. The mission, the philosophy, and the reason this platform exists.',
    tags: ['Founder-operated', 'Cooperative', 'Open source', 'Worldwide'],
    ctaLabel: 'Our Story',
    href: '/about',
    accent: 'magenta',
    objectKind: 'about',
    ariaLabel: 'About 3D3D. Learn the founder story, cooperative mission, and platform philosophy.',
  },
];

export const PRIMARY_ORBIT_SECTION_IDS = ['market', 'services', 'network'] as const;
