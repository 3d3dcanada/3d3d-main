import {
  ACCENTS,
  missionBriefs,
  projectCases,
  routeSpecs,
  softwareProjects,
  strxPricing,
  trustRail,
} from '@/data/buildV2'

export const TRUST_RAIL = [...trustRail]

export const HOME_HERO = {
  title: routeSpecs.home.hero.title,
  subtitle: routeSpecs.home.hero.subtitle,
}

export const DIVISION_CARDS = [
  {
    label: 'Marine',
    title: 'Marine field engineering',
    href: '/marine',
    accent: ACCENTS.teal,
    description: routeSpecs.marine.description,
    cta: 'Enter marine',
  },
  {
    label: 'ORA',
    title: 'Operational Reasoning Architecture',
    href: '/ora',
    accent: ACCENTS.magenta,
    description: routeSpecs.ora.description,
    cta: 'Explore ORA',
  },
  {
    label: 'STRX',
    title: 'Rapid-response field engineering',
    href: '/strx',
    accent: ACCENTS.orange,
    description: routeSpecs.strx.description,
    cta: 'Deploy STRX',
  },
  {
    label: 'The Ken',
    title: 'Operator record',
    href: '/the-ken',
    accent: ACCENTS.lime,
    description: routeSpecs.theKen.description,
    cta: 'Read the record',
  },
]

export const THREEDTHREED_PAGE = {
  heroTitle: routeSpecs.threed.hero.title,
  intro: routeSpecs.threed.hero.subtitle,
  supporting: routeSpecs.threed.description,
  serviceModes: routeSpecs.threed.sections[0]?.cards ?? [],
  quoteTitle: 'Start the quote workflow.',
  quoteCopy: routeSpecs.quote.description,
}

export const ORA_PAGE = {
  intro: routeSpecs.ora.hero.subtitle,
  portfolio: softwareProjects,
  correction: routeSpecs.ora.sections[0]?.copy ?? [],
}

export const STRX_PAGE = {
  intro: routeSpecs.strx.hero.subtitle,
  supporting: routeSpecs.strx.description,
  serviceModes: routeSpecs.strx.sections[0]?.cards ?? [],
  pricing: strxPricing,
}

export const THE_KEN_INTRO = routeSpecs.theKen.hero.subtitle
export const KEN_PROJECTS = projectCases
export const KEN_LINKS = [
  { label: '3D3D', href: '/' },
  { label: 'ORA', href: '/ora' },
  { label: 'Marine', href: '/marine' },
  { label: 'Projects', href: '/projects' },
]
export const MISSION_BRIEFS = missionBriefs
