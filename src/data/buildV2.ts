export type AccentKey = 'teal' | 'magenta' | 'orange' | 'lime'
export type SectionTone = 'dark' | 'light' | 'pink' | 'green' | 'orange' | 'lime'

export const CONTACT_EMAIL = 'info@3d3d.ca'
export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mldlydbl'

export const ACCENTS: Record<AccentKey, string> = {
  teal: '#40C4C4',
  magenta: '#E84A8A',
  orange: '#FF6B2B',
  lime: '#AAFF2A',
}

export const SERVICE_BULLETS = [
  'Hard-to-source parts',
  'Marine & restoration fabrication',
  'Field-ready problem solving',
] as const

export type Cta = {
  label: string
  href: string
  ghost?: boolean
}

export type ContentCard = {
  title: string
  body: string
  meta?: string
  href?: string
  image?: string
  accent?: AccentKey
}

export type ContentSection = {
  id?: string
  tone: SectionTone
  accent: AccentKey
  eyebrow: string
  title: string
  image?: string
  copy?: string[]
  cards?: ContentCard[]
  ctas?: Cta[]
}

export type PageSpec = {
  path: string
  title: string
  description: string
  currentPath?: string
  hero: {
    eyebrow: string
    title: string
    subtitle: string
    image: string
    accent: AccentKey
    ctas: Cta[]
  }
  sections: ContentSection[]
}

export const trustRail = [
  '20,000+ nautical miles sailed',
  'North Atlantic crossed in 11 days',
  '3 Atlantic crossings on the JB-welded prop',
  '6 printers in active service',
  '35 software projects shipped',
] as const

export const materialPricing = [
  { title: 'PLA', body: '$0.12/g - prototypes, gifts, display parts', image: '/media/workshop/galaxy-vase.jpg', accent: 'teal' },
  { title: 'PETG', body: '$0.20/g - outdoor functional parts', image: '/media/workshop/custom-tv-mount.jpg', accent: 'magenta' },
  { title: 'TPU', body: '$0.25/g - seals, bumpers, flexible parts', image: '/media/workshop/mouse-body-petgcf.jpg', accent: 'orange' },
  { title: 'ABS', body: '$0.25/g - heat resistance and post-processing', image: '/media/workshop/nomad-joe-holder.jpg', accent: 'lime' },
  { title: 'ASA', body: '$0.30/g - marine, UV-stable, outdoor work', image: '/media/workshop/winch-cup-holder.jpg', accent: 'teal' },
  { title: 'PA-CF', body: 'By quote - load-bearing and structural work', image: '/media/workshop/fan-reducers.jpg', accent: 'magenta' },
] satisfies ContentCard[]

export const strxPricing = [
  {
    title: 'Single deployment',
    body: '$1,200 CAD/day, 2 day minimum. Travel and per diem billed at cost.',
    meta: 'Solo operator on-site, printer and tools, design, print, install, daily debrief.',
    image: '/media/real/race-morning-crew.jpg',
    accent: 'orange',
  },
  {
    title: 'Race campaign embed',
    body: '$5,500 CAD/week. Full embed with a race team for pre-race through post-race.',
    meta: 'A week of the operation being unstuck.',
    image: '/media/race/crew-racing-whiteshirts.jpg',
    accent: 'teal',
  },
  {
    title: 'Multi-week embed',
    body: '$18,000 CAD/month. Two to twelve week embedded field engineering.',
    meta: 'Priority over other commitments and weekly reporting.',
    image: '/media/real/marina-night-01.jpg',
    accent: 'lime',
  },
  {
    title: 'Custom retainer',
    body: 'From $4,000 CAD/month. Three month minimum.',
    meta: 'Standby status, first four response hours, and priority parts work.',
    image: '/media/real/dawn-approach.jpg',
    accent: 'magenta',
  },
] satisfies ContentCard[]

export const sponsorTiers = [
  { title: 'Crew', body: '$25 CAD - name on the campaign page and post-race update.', image: '/media/race/fb-race-01.jpg', accent: 'teal' },
  { title: 'Supporter', body: '$100 CAD - Crew tier plus sticker pack and video credit.', image: '/media/race/crew-deck-offshore.jpg', accent: 'magenta' },
  { title: 'Partner', body: '$500 CAD - Supporter tier plus signed thank-you and Bermuda dock photo.', image: '/media/race/bermuda-marina-night.jpg', accent: 'orange' },
  { title: 'Sponsor', body: '$2,500 CAD - Partner tier plus printer or dock signage where approvals allow.', image: '/media/race/dragon-sail-racing.jpg', accent: 'lime' },
  { title: 'Title', body: '$10,000+ CAD - co-branded content and six months of priority response.', image: '/media/race/helm-racing-wake.jpg', accent: 'teal' },
] satisfies ContentCard[]

export const missionBriefs = [
  {
    title: 'Mission 001 - The Five-Day Sprint',
    body: 'UK and France, 2025. CSM needed someone on the ground for Fastnet logistics. Fredericton to London, rail to Southampton, ferry to Cherbourg, three oversized suitcases, storage sorted, transfer complete, home the following Sunday.',
    meta: 'Five days. Three countries. Zero failures.',
    image: '/media/race/fastnet-fleet-horizon.jpg',
    accent: 'lime',
  },
  {
    title: 'Mission 002 - The Thailand Operation',
    body: 'Thailand, 2023. Inventory flow for a resort development built partly from shipping containers. Vendor network, tracking software, scooter imports, rerouting around armed rebel activity, and the credit card returned clean.',
    meta: '$50,000 managed without unauthorized spend.',
    image: '/media/workshop/machine-parts-flatlay.jpg',
    accent: 'orange',
  },
  {
    title: 'Mission 003 - The Hurricane',
    body: 'North Atlantic, February 2016. First time offshore, two-man crew, 75 knot sustained wind, 90+ knot gusts, waves over 30 ft, four days of storm, then nine more days to Antigua.',
    meta: 'The foundation for every later pressure decision.',
    image: '/media/race/night-watch-offshore.jpg',
    accent: 'teal',
  },
] satisfies ContentCard[]

export const galleryBuckets = [
  {
    title: 'Offshore',
    body: 'North Atlantic, night watch, open water, and deck work.',
    image: '/media/race/crew-helm-offshore.jpg',
    accent: 'teal',
  },
  {
    title: 'Racing',
    body: 'Fastnet, starts, sail handling, helm focus, and crew pressure.',
    image: '/media/race/fleet-solent-racing.jpg',
    accent: 'magenta',
  },
  {
    title: 'Crew & helm',
    body: 'The hands on the wheel and the people behind the boat.',
    image: '/media/race/helm-offshore-cup.jpg',
    accent: 'orange',
  },
  {
    title: 'Night watch',
    body: 'Headlamps, dark horizons, and the hours nobody posts about.',
    image: '/media/race/night-watch-headlamp.jpg',
    accent: 'lime',
  },
  {
    title: 'Marina & Bermuda',
    body: 'Ports of call, dock work, and the return after a race.',
    image: '/media/race/bermuda-marina-night.jpg',
    accent: 'teal',
  },
  {
    title: 'Workshop builds',
    body: 'Printer action, fixtures, brackets, and parts that had to fit.',
    image: '/media/workshop/printer-action-cf.jpg',
    accent: 'magenta',
  },
  {
    title: 'RV lab',
    body: 'The early mobile shop: generator power, tight space, real work.',
    image: '/media/workshop/rv-lab-01.jpg',
    accent: 'orange',
  },
  {
    title: 'Custom prints',
    body: 'Mouse bodies, winch holders, nomad brackets, and one-off fixes.',
    image: '/media/workshop/winch-cup-holder.jpg',
    accent: 'lime',
  },
] satisfies ContentCard[]

export const projectCases = [
  {
    title: 'JB-welded variable-pitch propeller',
    body: 'A get-home repair for CSM became the anchor proof: 3 Atlantic crossings, 50,000+ miles, multiple races, still bolted to the boat.',
    href: '/projects/jb-welded-propeller',
    image: '/media/race/weddell-stern.jpg',
    accent: 'lime',
  },
  {
    title: 'Prusa Core One L to Bermuda',
    body: 'A compact additive manufacturing system rides aboard Osprey for Newport-Bermuda. The honest demo is dockside in Bermuda after arrival.',
    href: '/newport-bermuda',
    image: '/media/race/fastnet-fleet-horizon.jpg',
    accent: 'magenta',
  },
  {
    title: 'Ironclad AI',
    body: 'Structural metalwork estimating for Trevor, a steel fabricator in Atlantic Canada.',
    href: '/ora',
    image: '/media/workshop/modular-parts-flatlay.jpg',
    accent: 'orange',
  },
  {
    title: 'Invest East / Kingdom Builders',
    body: 'Web and AI work for Carly, kept consent-bound before naming more than public business context.',
    href: '/the-ken',
    image: '/media/workshop/machine-parts-flatlay.jpg',
    accent: 'teal',
  },
  {
    title: 'RV lab origin',
    body: '3D3D learned lean inside a motorhome: printers, generator, filament, heat, repairs, and parts that still had to ship.',
    href: '/blog/rv-origin',
    image: '/media/workshop/rv-lab-02.jpg',
    accent: 'lime',
  },
  {
    title: 'Marine material testing',
    body: 'ASA, PETG, TPU, and carbon-filled nylon chosen by environment, not by marketing copy.',
    href: '/materials',
    image: '/media/workshop/printer-bed-benchy.jpg',
    accent: 'magenta',
  },
] satisfies ContentCard[]

export const softwareProjects = [
  ['ora', 'ORA', 'AI/agents', 'live', 'magenta', 'Constitutional AI operating system with hierarchical authority levels'],
  ['ora-rust', 'ORA Rust', 'AI/agents', 'live', 'orange', 'Security-first AI orchestration backend with HTTP, WebSocket, and MCP gateways'],
  ['pulz-kernel', 'PulZ Governance Kernel', 'AI/agents', 'live', 'teal', '47KB zero-dep TypeScript that enforces AI decision integrity'],
  ['sovereign-ai', 'Sovereign-AI', 'AI/agents', 'beta', 'lime', 'Self-hosted AI workstation that runs on an 8GB GTX 1070'],
  ['ken-ai', 'Ken AI', 'AI/agents', 'wip', 'magenta', 'Personal AI operating environment and CRM'],
  ['ironclad-ai', 'Ironclad AI', 'AI/agents', 'beta', 'orange', 'Structural metalwork estimating with NVIDIA NIM'],
  ['openkernel', 'OpenKernel', 'Education', 'beta', 'lime', 'Five emoji-native computational kernels for CS education'],
  ['harbourmesh', 'HarbourMesh', 'Infrastructure', 'live', 'teal', 'Offline-first marine IoT with vessel digital twin'],
  ['realm', 'Realm', 'Infrastructure', 'live', 'orange', 'Full-stack dev environment manager with process orchestration'],
  ['the-gothub', 'The GothHub', 'Web platform', 'live', 'magenta', 'Universal search and discovery for open source across platforms'],
  ['3d3d-crm', '3D3D CRM', 'Web platform', 'wip', 'lime', 'Cooperative CRM for distributed manufacturing'],
  ['3d3d-main', '3D3D Main', 'Web platform', 'wip', 'teal', 'Primary website for the distributed 3D printing cooperative'],
  ['revolution', 'Revolution', 'Web platform', 'wip', 'orange', 'Experimental next-gen web platform'],
  ['chatwrite', 'Chatwrite', 'Web platform', 'live', 'magenta', 'Real-time multi-user chat with Appwrite backend'],
  ['appchat', 'AppChat', 'Web platform', 'live', 'magenta', 'Embedded chat module for in-app messaging'],
  ['butter', 'Butter', 'Desktop apps', 'live', 'teal', 'Lightweight desktop framework with TypeScript and system WebView'],
  ['stim', 'Stim', 'Dev tools', 'live', 'magenta', 'DSL compiler for Claude Code commands with control flow'],
  ['ambry', 'Ambry', 'Dev tools', 'live', 'lime', 'Cross-platform DB client for Postgres, MySQL, and SQLite'],
  ['alfred', 'Alfred', 'Dev tools', 'live', 'orange', 'AI git workflow assistant using a local LLM and no API keys'],
  ['rove', 'Rove', 'Dev tools', 'live', 'teal', 'Fast PostgreSQL migration tool with up and down folders'],
  ['kami', 'Kami', 'Dev tools', 'live', 'magenta', 'YAML-manifest task runner faster than npm scripts'],
  ['groundwork', 'Groundwork', 'Dev tools', 'live', 'orange', 'OpenAPI codegen and database migration CLI'],
  ['purge', 'Purge', 'Dev tools', 'live', 'lime', 'macOS deep app uninstaller with interactive checklist'],
  ['fauxmail', 'FauxMail', 'Dev tools', 'live', 'teal', 'Local mock SMTP and email dev server with REST API'],
  ['motive', 'Motive', 'Dev tools', 'live', 'magenta', 'Lua-based dev environment and task runner'],
  ['gluon', 'Gluon', 'Dev tools', 'live', 'orange', 'Browser builder for custom Firefox forks'],
  ['zenolang', 'Zenolang', 'Libraries', 'live', 'teal', 'Transpiler for Zeno, a C-based functional language'],
  ['goose', 'Goose', 'Libraries', 'live', 'lime', 'C package manager'],
  ['trove', 'Trove', 'Libraries', 'live', 'orange', 'ARC memory management for C'],
  ['moody', 'Moody', 'Libraries', 'live', 'magenta', 'Tailwind wrapper for React layouts'],
  ['changeset', 'Changeset', 'Libraries', 'live', 'teal', 'Ecto-style data mapping and query toolkit for TypeScript'],
  ['valance', 'Valance', 'Libraries', 'live', 'lime', 'Grid-first CSS framework'],
  ['neon-string', 'Neon-String', 'Games', 'wip', 'magenta', '3D printing simulation RPG with cyberpunk economy'],
  ['neon-shadow', 'Neon-Shadow', 'Games', 'live', 'orange', 'Terraria-style sandbox with Randy Marsh against Karens over 3D printers'],
  ['tessatalk', 'TessaTalk', 'Web platform', 'archived', 'magenta', 'Early chat experiment superseded by Chatwrite'],
].map(([slug, name, category, status, accent, tagline]) => ({
  slug,
  name,
  category,
  status,
  accent: accent as AccentKey,
  tagline,
}))

export const oraDetailSlugs = new Set([
  'ora',
  'pulz-kernel',
  'sovereign-ai',
  'openkernel',
  'harbourmesh',
  'butter',
  'realm',
  'alfred',
  'ambry',
  'stim',
  'the-gothub',
  'neon-string',
  'neon-shadow',
  'zenolang',
])

export const cityPages = [
  ['fredericton', 'Fredericton'],
  ['moncton', 'Moncton'],
  ['saint-john', 'Saint John'],
  ['halifax', 'Halifax'],
  ['dartmouth', 'Dartmouth'],
  ['charlottetown', 'Charlottetown'],
  ['st-johns', "St. John's"],
  ['sydney', 'Sydney'],
  ['truro', 'Truro'],
  ['bathurst', 'Bathurst'],
].map(([slug, city]) => ({ slug, city }))

export const blogPosts = [
  ['rv-origin', 'I Started a Fabrication Company in an RV', 'Three printers, a generator, $30 a day in gas, 35-degree heat. The origin story of 3D3D.', '2025-05-02', 'Story', '6 min'],
  ['first-sail', 'My First Sail Was a Category-One Storm', 'Halifax to Antigua with CSM. 70-knot sustained winds. What it taught me about fabrication.', '2025-05-20', 'Sailing', '7 min'],
  ['marine-materials', 'What Actually Survives Saltwater: A Material Reality Check', 'Not all filaments are created equal. ASA, PETG-CF, PPS, PPA, what works 600 miles from shore.', '2025-06-08', 'Materials', '6 min'],
  ['drag-car-parts', 'From Drag Cars to 3D Printers: Why Mechanics Make Better Fabricators', 'Ten years turning wrenches taught me what breaks, what holds, and what matters in a functional part.', '2025-06-25', 'Automotive', '5 min'],
  ['discontinued-parts', "The Part Doesn't Exist Anymore. I Make It Exist.", 'Reverse-engineering discontinued components and bringing dead parts back to life.', '2025-07-14', 'Fabrication', '5 min'],
  ['field-deployment', 'Fly Me to Your Problem', 'Field deployment: bringing fabrication to your location, your event, your boat.', '2025-08-01', 'Services', '4 min'],
  ['asa-outdoor', 'ASA: The Filament Nobody Talks About', 'UV-stable, weather-resistant, outdoor-capable. ASA is the quiet workhorse.', '2025-09-05', 'Materials', '5 min'],
  ['newport-bermuda-announcement', 'Newport-Bermuda 2026: The Campaign', 'The Prusa Core One L, Osprey, and the honest dockside fabrication demonstration after arrival.', '2025-10-01', 'Campaign', '6 min'],
  ['rolex-fastnet', 'What I Learned at the Rolex Fastnet Race', 'One of the premier offshore races. What breaks, what holds, and how it shapes the work.', '2025-10-20', 'Sailing', '6 min'],
  ['printer-setup-service', 'Fly-In Printer Setup and Training', 'On-site printer setup, training, and configuration for people who need the machine working on day one.', '2025-11-10', 'Services', '4 min'],
  ['open-source-why', 'The Files Are Open. Here Is Why.', 'Open-source philosophy, free downloads, shared knowledge, and why giving away files can still build trust.', '2025-12-01', 'Community', '5 min'],
  ['peek-pps-future', 'PEEK and PPS: The Materials That Change Everything', 'Aerospace-grade, chemical-resistant, 250 C capable materials and what actually matters.', '2025-12-18', 'Materials', '6 min'],
  ['shipping-printers', 'How to Ship a 3D Printer Without Destroying It', 'Practical packaging, crating, and shipping notes for printer relocation or deployment.', '2026-01-05', 'Guides', '5 min'],
  ['carbon-fibre-compounds', "Carbon Fibre Filaments: What They Actually Do", "PETG-CF, PA-CF, PPA-CF, expectations vs. reality, and when CF compounds are worth it.", '2026-01-20', 'Materials', '6 min'],
  ['csm-profile', 'Christopher Stanmore-Major: The Captain Behind the Campaign', "Who CSM is, the sailing partnership, and why he is the reason 3D3D ever touched a boat.", '2026-02-05', 'People', '5 min'],
  ['solo-saint-john', 'Two Days Solo on the Saint John River', 'Solo sailing up the Saint John River. What it proved and what it taught.', '2026-02-15', 'Sailing', '5 min'],
  ['ko-fi-support', 'Why Ko-fi and How Support Gets Used', 'Full transparency on materials, campaign prep, and operating costs.', '2026-02-25', 'Community', '4 min'],
  ['marine-case-study', 'Case Study: Custom Winch Components for Offshore Sailing', 'The problem, material selection, design process, and result for a real marine fabrication job.', '2026-03-05', 'Case Study', '6 min'],
  ['automotive-restoration', '3D Printing for Classic Car Restoration', "Bringing back parts that do not exist anymore: knobs, brackets, trim pieces, and functional components.", '2026-03-08', 'Automotive', '5 min'],
  ['material-guide-pla-petg-tpu', 'Material Guide: PLA vs PETG vs TPU', 'PLA for precision, PETG for durability, TPU for flex, and when to use each.', '2026-03-10', 'Materials', '7 min'],
  ['campaign-update-march', 'Newport Bermuda Campaign Update. March 2026', 'Boat prep, printer integration, gear testing, and where the campaign stood heading into spring.', '2026-03-12', 'Campaign', '5 min'],
  ['atlantic-canada-maker-network', 'Building a Maker Network Across Atlantic Canada', "From Moncton to Halifax, St. John's to Charlottetown, connecting makers across four provinces.", '2026-03-14', 'Community', '4 min'],
  ['advances-2026', 'The 3D Printing Breakthroughs of Early 2026', 'New printers, new materials, industry shifts, and what actually changed.', '2026-03-15', '3D Printing', '6 min'],
  ['global-impact', 'How 3D Printing Helps People Who Have Nothing', 'Disaster relief, remote communities, open-source designs, and humanitarian manufacturing.', '2026-03-18', 'Community', '5 min'],
  ['why-cooperative-3d-printing', 'Why Cooperative 3D Printing Works', 'Shared resources, distributed production, and community-driven manufacturing.', '2026-03-19', 'Community', '4 min'],
  ['buy-local-not-amazon-etsy-temu', 'Stop Buying 3D Prints from Amazon, Etsy, and Temu', 'Why buying local manufacturing is an economic infrastructure decision.', '2026-03-22', 'Manufacturing', '8 min'],
  ['best-3d-printers-march-2026', 'The 10 Best 3D Printers to Buy in March 2026', 'Current Canadian prices, honest assessments, and printer setup that gets you working on day one.', '2026-03-23', '3D Printers', '10 min'],
].map(([slug, title, excerpt, date, category, readTime]) => ({ slug, title, excerpt, date, category, readTime }))

export const legalPages = {
  privacy: {
    title: 'Privacy',
    description: 'How 3D3D handles contact form data, quote files, analytics, and consent.',
    copy: [
      '3D3D collects only what I need to respond to quote requests, contact messages, workshop inquiries, and campaign updates.',
      'Files sent for quotes are used to assess the work. They are not sold, published, or reused as marketing material without permission.',
      'Cloudflare may provide privacy-respecting aggregate analytics. Formspree handles form delivery for the current build.',
    ],
  },
  terms: {
    title: 'Terms',
    description: 'Terms for using the 3D3D website and requesting work.',
    copy: [
      'Quotes are project-specific and depend on material, machine time, tolerances, environment, and delivery requirements.',
      'Marine, field, and restoration parts are built for the described use case. Hidden loads, incorrect measurements, and undisclosed exposure conditions can change the risk profile.',
      'Do not upload files you do not own or have permission to share.',
    ],
  },
  cookies: {
    title: 'Cookies',
    description: 'Cookie and analytics notes for 3D3D.',
    copy: [
      'This rebuild is designed to keep tracking light. If analytics are enabled, they should be privacy-respecting and used to understand page performance, not to profile individual visitors.',
      'Third-party embeds, if added later, may set their own cookies. Those should be documented before launch.',
    ],
  },
  casl: {
    title: 'CASL',
    description: 'Canadian anti-spam consent for 3D3D forms.',
    copy: [
      'Forms that create an ongoing contact relationship require consent before I send follow-up emails beyond the direct response to your request.',
      'You can ask to be removed from future updates by emailing info@3d3d.ca.',
    ],
  },
  accessibility: {
    title: 'Accessibility',
    description: 'Accessibility statement for 3D3D.',
    copy: [
      'This site targets keyboard navigation, visible focus, readable contrast, meaningful labels, and mobile tap targets of at least 44px.',
      'If something blocks access, email info@3d3d.ca with the page and device. I will fix the issue.',
    ],
  },
} as const

export const pageSpecs: Record<string, PageSpec> = {
  home: {
    path: '/',
    title: '3D3D',
    description: "You have a problem. Let's find a solution. Marine, restoration, field fabrication, and software depth from Atlantic Canada.",
    currentPath: '/',
    hero: {
      eyebrow: '3D3D - The Ken',
      title: "You have a problem. Let's find a solution.",
      subtitle: 'Hard-to-source parts. Marine and restoration fabrication. Field-ready problem solving.',
      image: '/media/race/crew-helm-offshore.jpg',
      accent: 'teal',
      ctas: [
        { label: 'Get a real quote', href: '/quote' },
        { label: 'See the proof', href: '/the-ken', ghost: true },
      ],
    },
    sections: [
      {
        tone: 'light',
        accent: 'teal',
        eyebrow: 'The work',
        title: 'Three things, always together.',
        cards: SERVICE_BULLETS.map((title, index) => ({
          title,
          body: [
            'When the catalog stops helping, I reverse-engineer the part.',
            'Marine hardware, restoration pieces, and functional components that need to survive real conditions.',
            'Dockside, shop-side, or remote. The answer depends on the failure.',
          ][index],
          accent: (['teal', 'magenta', 'orange'] as AccentKey[])[index],
        })),
      },
      {
        tone: 'dark',
        accent: 'lime',
        eyebrow: 'The receipt',
        title: 'The JB-welded prop is on its third Atlantic crossing.',
        image: '/media/race/weddell-stern.jpg',
        copy: [
          'A few years ago I welded a variable-pitch propeller for CSM with JB Weld. It was supposed to be a get-home fix.',
          'Three Atlantic crossings later, 50,000+ nautical miles, multiple races, and it is still bolted to the boat.',
          'That is the standard. The work has to hold.',
        ],
        ctas: [{ label: 'Read the case study', href: '/projects/jb-welded-propeller' }],
      },
      {
        tone: 'pink',
        accent: 'magenta',
        eyebrow: 'Live campaign',
        title: 'Osprey leaves Newport with the Prusa Core One L.',
        cards: [
          { title: 'Race start', body: 'June 19, 2026 at 1300 EDT from Fort Adams, Newport RI.', accent: 'magenta' },
          { title: 'Distance', body: '636 nautical miles to St. George\'s, Bermuda.', accent: 'orange' },
          { title: 'Honest frame', body: 'The printer rides with the boat. The fabrication demonstration happens dockside in Bermuda after arrival.', accent: 'lime' },
        ],
        ctas: [{ label: 'Follow the deployment', href: '/newport-bermuda' }],
      },
    ],
  },
  marine: {
    path: '/marine',
    title: 'Marine Field Engineering',
    description: 'Mobile fabrication for race teams and marine operators when catalog parts and normal timelines fail.',
    currentPath: '/marine',
    hero: {
      eyebrow: 'Marine field engineering',
      title: 'When something breaks 600 nautical miles from shore.',
      subtitle: "I build replacement parts, repair hardware, and engineer fixes when 'order it from the catalog' does not apply.",
      image: '/media/race/crew-sail-handling.jpg',
      accent: 'teal',
      ctas: [
        { label: 'Deployment inquiry', href: '/strx#deployment-inquiry' },
        { label: 'Read the receipts', href: '/the-ken#mission-briefs', ghost: true },
      ],
    },
    sections: [
      {
        tone: 'light',
        accent: 'teal',
        eyebrow: 'The lane',
        title: 'Mobile fabrication for race teams on retainer.',
        copy: [
          'Generic marine service providers handle the big yachts and shipping operators. Race teams in active campaigns need something different.',
          'Someone who can fly in, engineer a part, print it, install it, and stay until the boat sails.',
        ],
      },
      {
        tone: 'dark',
        accent: 'orange',
        eyebrow: 'Materials',
        title: 'What survives saltwater gets chosen first.',
        image: '/media/workshop/winch-cup-holder.jpg',
        cards: materialPricing.slice(1, 6),
        ctas: [{ label: 'Full material guide', href: '/materials' }],
      },
      {
        tone: 'pink',
        accent: 'lime',
        eyebrow: 'Field proof',
        title: 'Three field operations.',
        cards: missionBriefs,
        ctas: [{ label: 'The operator record', href: '/the-ken' }],
      },
    ],
  },
  about: {
    path: '/about',
    title: 'About',
    description: 'The company behind 3D3D: operator-built, marine-led, cooperative-minded, and based in Atlantic Canada.',
    currentPath: '/about',
    hero: {
      eyebrow: 'Company background',
      title: '3D3D is the umbrella. The work is operator-led.',
      subtitle: 'Fabrication, field response, software depth, and a cooperative manufacturing network built from Atlantic Canada.',
      image: '/media/backgrounds/about-print-lab.jpg',
      accent: 'teal',
      ctas: [
        { label: 'Start a quote', href: '/quote' },
        { label: 'The Ken', href: '/the-ken', ghost: true },
      ],
    },
    sections: [
      {
        tone: 'light',
        accent: 'teal',
        eyebrow: 'Model',
        title: 'Local machines, real accountability.',
        copy: [
          '3D3D started with functional parts, not merchandise. The cooperative model still matters: route work to capable machines, keep overhead lean, and make the person doing the work visible.',
        ],
      },
      {
        tone: 'dark',
        accent: 'lime',
        eyebrow: 'Proof',
        title: 'The site sells by showing receipts.',
        image: '/media/workshop/machine-parts-flatlay.jpg',
        cards: projectCases.slice(0, 3),
      },
    ],
  },
  contact: {
    path: '/contact',
    title: 'Contact',
    description: 'Email 3D3D for fabrication, field deployment, marine work, workshops, and ORA inquiries.',
    currentPath: '/contact',
    hero: {
      eyebrow: 'Contact',
      title: 'Email me the problem.',
      subtitle: 'Send the part, the timeline, the environment, and the failure mode. I will tell you if I can help.',
      image: '/media/workshop/printer-frame-shot.jpg',
      accent: 'teal',
      ctas: [
        { label: 'Open intake form', href: '#contact-form' },
        { label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}`, ghost: true },
      ],
    },
    sections: [
      {
        id: 'contact-paths',
        tone: 'light',
        accent: 'teal',
        eyebrow: 'Paths',
        title: 'Send the right signal.',
        cards: [
          { title: 'Marine hardware', body: 'Send photos, measurements, material, location, and when the boat has to move.', accent: 'teal' },
          { title: 'Field deployment', body: 'Send the port, timeline, failure, and who has authority on site.', accent: 'orange' },
          { title: 'ORA or software', body: 'Send the stack, the workflow, and where the current process breaks.', accent: 'magenta' },
        ],
      },
    ],
  },
  faq: {
    path: '/faq',
    title: 'FAQ',
    description: 'Answers about files, materials, pricing, shipping, field work, and cooperative policies.',
    currentPath: '/faq',
    hero: {
      eyebrow: 'FAQ',
      title: 'The practical questions.',
      subtitle: 'Files, materials, timelines, shipping, and what I need before I can quote the work.',
      image: '/media/workshop/modular-parts-flatlay.jpg',
      accent: 'lime',
      ctas: [{ label: 'Ask directly', href: `mailto:${CONTACT_EMAIL}` }],
    },
    sections: [
      {
        tone: 'light',
        accent: 'lime',
        eyebrow: 'Quote prep',
        title: 'What to send.',
        cards: [
          { title: 'No CAD file?', body: 'Photos and measurements can be enough to start. A broken part is better than a guess.', accent: 'teal' },
          { title: 'Marine part?', body: 'Tell me UV, saltwater, heat, load, and whether it lives inside or outside.', accent: 'magenta' },
          { title: 'Timeline?', body: 'Say when the part must be installed, not just when it would be nice to have it.', accent: 'orange' },
          { title: 'Shipping?', body: 'Small parts can ship. Field work gets scoped separately with travel at cost.', accent: 'lime' },
        ],
      },
    ],
  },
  materials: {
    path: '/materials',
    title: 'Materials',
    description: 'Material choices for prototypes, outdoor parts, flexible parts, marine exposure, and structural work.',
    currentPath: '/materials',
    hero: {
      eyebrow: 'Materials',
      title: 'Choose by environment first.',
      subtitle: 'Saltwater, UV, heat, load, flexibility, and chemical exposure matter more than filament hype.',
      image: '/media/workshop/printer-bed-benchy.jpg',
      accent: 'teal',
      ctas: [{ label: 'Start a quote', href: '/quote' }],
    },
    sections: [
      {
        tone: 'light',
        accent: 'teal',
        eyebrow: 'Pricing',
        title: 'Per-gram pricing from the old site.',
        cards: materialPricing,
      },
    ],
  },
  projects: {
    path: '/projects',
    title: 'Projects',
    description: 'Case studies and proof of work from 3D3D, The Ken, and the software portfolio.',
    currentPath: '/projects',
    hero: {
      eyebrow: 'Proof',
      title: 'Receipts beat pitch decks.',
      subtitle: 'Marine repair, field operations, software systems, and the parts that kept moving after the invoice.',
      image: '/media/race/weddell-stern.jpg',
      accent: 'lime',
      ctas: [{ label: 'Anchor case study', href: '/projects/jb-welded-propeller' }],
    },
    sections: [
      {
        tone: 'light',
        accent: 'lime',
        eyebrow: 'Case studies',
        title: 'Six things that already happened.',
        cards: projectCases,
      },
    ],
  },
  media: {
    path: '/media',
    title: 'Media',
    description: 'Real 3D3D media: offshore sailing, racing, workshop builds, RV lab, and product proof.',
    currentPath: '/media',
    hero: {
      eyebrow: 'Media',
      title: 'Real photos. No stock.',
      subtitle: 'Offshore, racing, workshop, RV lab, custom builds, and brand/product images from the actual archive.',
      image: '/media/race/crew-sunset-offshore.jpg',
      accent: 'magenta',
      ctas: [{ label: 'Start with the work', href: '/projects' }],
    },
    sections: [
      {
        tone: 'light',
        accent: 'magenta',
        eyebrow: 'Archive',
        title: 'Four gallery buckets are wired now.',
        cards: galleryBuckets,
      },
    ],
  },
  network: {
    path: '/network',
    title: 'Network',
    description: 'Operator recruitment for the future 3D3D cooperative manufacturing network.',
    currentPath: '/network',
    hero: {
      eyebrow: 'Claim your node',
      title: 'Local machines should earn local work.',
      subtitle: 'The network routes work to capable operators and keeps manufacturing close to the problem.',
      image: '/media/workshop/rv-lab-02.jpg',
      accent: 'lime',
      ctas: [{ label: 'Email interest', href: `mailto:${CONTACT_EMAIL}?subject=3D3D node interest` }],
    },
    sections: [
      {
        tone: 'green',
        accent: 'lime',
        eyebrow: 'Operator fit',
        title: 'What matters before scale.',
        cards: [
          { title: 'Quality', body: 'Parts need to fit and survive their stated use.', accent: 'teal' },
          { title: 'Reliability', body: 'A node that misses messages is not a node yet.', accent: 'magenta' },
          { title: 'Local proof', body: 'Atlantic Canada first. Ten city pages before a national sprawl.', accent: 'orange' },
        ],
      },
    ],
  },
}

export const corePageSlugs = ['marine', 'about', 'contact', 'faq', 'materials', 'projects', 'media', 'network'] as const

export const routeSpecs: Record<string, PageSpec> = {
  ...pageSpecs,
  threed: {
    path: '/3d3d',
    title: '3D3D Fabrication',
    description: '3D3D fabrication services for hard-to-source parts, marine work, restoration, materials, workshops, and local production.',
    currentPath: '/3d3d',
    hero: {
      eyebrow: 'Fabrication lane',
      title: 'The part does not have to exist for you to get it made.',
      subtitle: 'Reverse-engineering, marine materials, restoration pieces, printer setup, and cooperative manufacturing from Atlantic Canada.',
      image: '/media/workshop/printer-action-cf.jpg',
      accent: 'teal',
      ctas: [
        { label: 'Start the quote workflow', href: '/quote' },
        { label: 'See the fleet', href: '/fleet', ghost: true },
      ],
    },
    sections: [
      {
        tone: 'light',
        accent: 'teal',
        eyebrow: 'Service modes',
        title: 'Three ways the work starts.',
        cards: [
          { title: 'Remote assessment', body: 'Send the broken part, photos, measurements, and use case. I reverse-engineer the answer and ship the replacement.', accent: 'teal' },
          { title: 'On-site work', body: 'For boats, race venues, shops, and field locations where waiting on a vendor is the problem.', accent: 'orange' },
          { title: 'Extended support', body: 'Refit windows, campaign prep, workshops, and networked production that needs continuity.', accent: 'lime' },
        ],
      },
      {
        tone: 'dark',
        accent: 'magenta',
        eyebrow: 'Material reality',
        title: 'The environment picks the material.',
        image: '/media/workshop/blue-prototype-part.jpg',
        cards: materialPricing,
        ctas: [{ label: 'Material guide', href: '/materials' }],
      },
      {
        tone: 'orange',
        accent: 'orange',
        eyebrow: 'Capability',
        title: 'The fleet and workshops are part of the same system.',
        cards: [
          { title: 'Six active printers', body: 'Small, fast, enclosed, large-format, multi-material, and the Prusa Core One L for engineering plastics.', href: '/fleet', accent: 'teal' },
          { title: 'Workshops', body: 'Public, library, youth, senior, festival, and advanced sessions from the old scope.', href: '/workshops', accent: 'lime' },
          { title: 'Network', body: 'Future cooperative routing for capable local operators, Atlantic Canada first.', href: '/network', accent: 'magenta' },
        ],
      },
    ],
  },
  strx: {
    path: '/strx',
    title: 'STRX',
    description: 'STRX is the rapid-response field engineering service line for marine, logistics, project rescue, and on-site fabrication.',
    currentPath: '/strx',
    hero: {
      eyebrow: 'Stabilization · Tactical · Resource · eXecution',
      title: 'Field engineering when the normal plan has already failed.',
      subtitle: 'Solo-operator deployment, project rescue, cross-border logistics, fabrication, and continuity support for high-pressure work.',
      image: '/media/real/race-morning-crew.jpg',
      accent: 'orange',
      ctas: [
        { label: 'Deployment inquiry', href: '#deployment-inquiry' },
        { label: 'Mission briefs', href: '/the-ken#mission-briefs', ghost: true },
      ],
    },
    sections: [
      {
        tone: 'light',
        accent: 'orange',
        eyebrow: 'Use it when',
        title: 'STRX is not normal consulting.',
        cards: [
          { title: 'Project rescue', body: 'A key person leaves, the plan collapses, or the timeline stops matching the stakes.', accent: 'orange' },
          { title: 'Field fabrication', body: 'Parts, mounts, brackets, fixes, and prototypes that need to happen near the failure.', accent: 'teal' },
          { title: 'Marine operations', body: 'Race prep, shore support, logistics, and equipment continuity around boat movement.', accent: 'magenta' },
          { title: 'Systems setup', body: 'Inventory, AI workflow, automation, and communication tools when the situation calls for it.', accent: 'lime' },
        ],
      },
      {
        tone: 'dark',
        accent: 'lime',
        eyebrow: 'Pricing',
        title: 'Published deployment anchors.',
        image: '/media/real/marina-night-02.jpg',
        cards: strxPricing,
      },
      {
        id: 'deployment-inquiry',
        tone: 'orange',
        accent: 'orange',
        eyebrow: 'Start',
        title: 'Email the failure mode, location, authority chain, and deadline.',
        copy: [
          'If the problem can be handled as normal fabrication, I will route it that way.',
          'If it needs an embedded operator, travel and per diem stay visible instead of hidden inside fuzzy pricing.',
        ],
        ctas: [{ label: 'Email STRX inquiry', href: `mailto:${CONTACT_EMAIL}?subject=STRX deployment inquiry` }],
      },
    ],
  },
  newportBermuda: {
    path: '/newport-bermuda',
    title: 'Newport-Bermuda 2026',
    description: 'The Prusa Core One L rides aboard Osprey for Newport-Bermuda 2026, with the honest fabrication demo dockside after arrival.',
    currentPath: '/newport-bermuda',
    hero: {
      eyebrow: 'Newport-Bermuda 2026',
      title: 'The Prusa Core One L goes to Bermuda.',
      subtitle: 'Osprey leaves Newport on June 19, 2026. The printer rides with the boat. The fabrication demonstration happens dockside in Bermuda after arrival.',
      image: '/media/race/fastnet-fleet-horizon.jpg',
      accent: 'magenta',
      ctas: [
        { label: 'Sponsor inquiry', href: `mailto:${CONTACT_EMAIL}?subject=Newport-Bermuda sponsor inquiry` },
        { label: 'The operator record', href: '/the-ken', ghost: true },
      ],
    },
    sections: [
      {
        tone: 'light',
        accent: 'magenta',
        eyebrow: 'Honest frame',
        title: 'What is happening.',
        cards: [
          { title: 'The race', body: "636 nautical miles from Fort Adams, Newport RI to St. George's, Bermuda. Start: June 19, 2026 at 1300 EDT.", accent: 'magenta' },
          { title: 'The printer', body: 'The Prusa Core One L rides aboard Osprey as campaign hardware and proof of preparedness.', accent: 'teal' },
          { title: 'The demo', body: 'Live fabrication is framed as a dockside Bermuda demonstration after arrival, not an unbounded claim about production under sail.', accent: 'lime' },
        ],
      },
      {
        tone: 'dark',
        accent: 'orange',
        eyebrow: 'Why it matters',
        title: 'Small teams need better field tools.',
        image: '/media/race/weddell-stern.jpg',
        copy: [
          'This campaign is the clean version of the story: a capable operator, a real boat, a real race, a serious printer, and a dockside demonstration where crews can see parts become physical.',
          'No inflated claim is needed. The strongest version is the honest one.',
        ],
      },
      {
        tone: 'pink',
        accent: 'lime',
        eyebrow: 'Sponsor tiers',
        title: 'Support the underdog with visible scope.',
        cards: sponsorTiers,
      },
    ],
  },
  theKen: {
    path: '/the-ken',
    title: 'The Ken',
    description: 'The operator record behind 3D3D: offshore sailing, field logistics, fabrication, software systems, and mission briefs.',
    currentPath: '/the-ken',
    hero: {
      eyebrow: 'Operator record',
      title: 'GED. Mechanic. First time offshore, survived the storm.',
      subtitle: 'The proof is the work: offshore sailing, field operations, fabrication, and software built under constraint.',
      image: '/media/real/open-ocean-01.jpg',
      accent: 'lime',
      ctas: [
        { label: 'Mission briefs', href: '#mission-briefs' },
        { label: 'Projects', href: '/projects', ghost: true },
      ],
    },
    sections: [
      {
        id: 'mission-briefs',
        tone: 'light',
        accent: 'lime',
        eyebrow: 'Receipts',
        title: 'Three mission briefs.',
        cards: missionBriefs,
      },
      {
        tone: 'dark',
        accent: 'magenta',
        eyebrow: 'Built record',
        title: 'Software depth and physical work sit together.',
        image: '/media/workshop/rv-lab-03.jpg',
        cards: projectCases.slice(0, 4),
      },
      {
        tone: 'green',
        accent: 'teal',
        eyebrow: 'Trust rail',
        title: 'Numbers worth keeping.',
        cards: trustRail.map((item, index) => ({
          title: item,
          body: index === 0 ? 'Offshore experience shaping the marine fabrication lane.' : 'A practical proof point from the operator record.',
          accent: (['teal', 'magenta', 'orange', 'lime', 'teal'] as AccentKey[])[index],
        })),
      },
    ],
  },
  ora: {
    path: '/ora',
    title: 'ORA',
    description: 'ORA is Operational Reasoning Architecture: a 35-project software and governance portfolio, not a single-product pitch.',
    currentPath: '/ora',
    hero: {
      eyebrow: 'Operational Reasoning Architecture',
      title: 'ORA is the governance backbone for the software ecosystem.',
      subtitle: 'AI, infrastructure, developer tools, web platforms, games, and libraries. Thirty-five projects built by one operator over four years.',
      image: '/media/workshop/machine-parts-flatlay.jpg',
      accent: 'magenta',
      ctas: [
        { label: 'See the top projects', href: '#portfolio' },
        { label: 'Open GitHub', href: 'https://github.com/3d3dcanada/ora', ghost: true },
      ],
    },
    sections: [
      {
        tone: 'light',
        accent: 'magenta',
        eyebrow: 'Correction',
        title: 'Not a single-product pitch.',
        copy: [
          'ORA means Operational Reasoning Architecture. It is the constitutional governance and orchestration backbone for a software ecosystem.',
          'Some projects may surface as apps, tools, kernels, or interfaces. The category is architecture, not a single extension.',
        ],
      },
      {
        id: 'portfolio',
        tone: 'dark',
        accent: 'teal',
        eyebrow: 'Top 14',
        title: 'Detail pages are wired for the flagship projects.',
        image: '/media/workshop/modular-parts-flatlay.jpg',
        cards: softwareProjects
          .filter((project) => oraDetailSlugs.has(project.slug))
          .map((project) => ({
            title: project.name,
            body: project.tagline,
            meta: `${project.category} · ${project.status}`,
            href: `/ora/${project.slug}`,
            accent: project.accent,
          })),
      },
      {
        tone: 'pink',
        accent: 'orange',
        eyebrow: 'All projects',
        title: 'Thirty-five items stay visible, even when only fourteen have detail pages.',
        cards: softwareProjects.map((project) => ({
          title: project.name,
          body: project.tagline,
          meta: `${project.category} · ${project.status}`,
          href: oraDetailSlugs.has(project.slug) ? `/ora/${project.slug}` : undefined,
          accent: project.accent,
        })),
      },
    ],
  },
  quote: {
    path: '/quote',
    title: 'Quote',
    description: 'Multi-step 3D3D quote intake for fabrication, marine parts, field deployment, restoration, and ORA/software inquiries.',
    currentPath: '/quote',
    hero: {
      eyebrow: 'Quote intake',
      title: 'Give me the failure mode first.',
      subtitle: 'Upload the part or file, explain where it lives, say when it has to work, and confirm CASL consent.',
      image: '/media/workshop/custom-tv-mount.jpg',
      accent: 'orange',
      ctas: [
        { label: 'Open the form', href: '#quote-form' },
        { label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}`, ghost: true },
      ],
    },
    sections: [
      {
        tone: 'light',
        accent: 'orange',
        eyebrow: 'Before the form',
        title: 'The fastest quote includes four things.',
        cards: [
          { title: 'Photos or files', body: 'STL, STEP, 3MF, PDF, or clear photos with a ruler in frame.', accent: 'teal' },
          { title: 'Environment', body: 'Saltwater, UV, heat, load, flex, vibration, chemicals, and installation location.', accent: 'magenta' },
          { title: 'Deadline', body: 'Race start, refit window, show date, failure date, or normal timeline.', accent: 'orange' },
          { title: 'Risk', body: 'What happens if the part fails again. This changes material and process choices.', accent: 'lime' },
        ],
      },
    ],
  },
}
