export interface WorkshopPricing {
  label: string
  price: string
  note?: string
}

export interface Workshop {
  id: string
  title: string
  type: 'workshop' | 'event' | 'bootcamp'
  duration: string
  audience: string
  capacity: string
  pricing: WorkshopPricing[]
  description: string
  whatYouGet: string[]
  tags: string[]
}

export const WORKSHOPS: Workshop[] = [
  {
    id: 'intro-3d-printing',
    title: 'Introduction to 3D Printing',
    type: 'workshop',
    duration: '2–4 hours',
    audience: 'Adults, youth (14+), beginners',
    capacity: '10–20 participants',
    pricing: [
      { label: 'Standard', price: '$50' },
      { label: 'Early Bird', price: '$40', note: '2+ weeks advance' },
      { label: 'Student / Senior', price: '$25', note: '50% discount' },
      { label: 'Group (5+)', price: '$35 each', note: '30% discount' },
    ],
    description:
      'A complete introduction to 3D printing technology. Participants learn the full workflow — from CAD design to slicing to a live print. Hands-on experience with real hardware. You leave with a printed part you made yourself.',
    whatYouGet: [
      'History and types of 3D printing',
      'Materials overview (PLA, PETG, ABS)',
      'Live printer demonstration',
      'Hands-on: slice and print your own model',
      'Take home your first 3D printed creation',
      'Resource pack for continued learning',
    ],
    tags: ['Beginner', 'Hands-on', 'All Ages'],
  },
  {
    id: 'cardboard-boat-regatta',
    title: 'Cardboard Boat Regatta',
    type: 'event',
    duration: 'Half-day (4–6 hours)',
    audience: 'Families, youth groups, teams',
    capacity: '20–50 teams',
    pricing: [
      { label: 'Team Entry', price: '$25/team' },
      { label: 'Spectator', price: 'Free' },
    ],
    description:
      'Build a boat from cardboard and tape. Race it. Try not to sink. A community competition that promotes engineering thinking, teamwork, and controlled chaos at the waterfront. 3D printed hardware upgrades allowed.',
    whatYouGet: [
      'Building materials package per team',
      'Waterfront race venue',
      'Prizes for speed, design, and best sinking',
      'Live 3D printing station on-site',
      'Professional photography',
      'Community BBQ and awards ceremony',
    ],
    tags: ['Competition', 'Family', 'Outdoor'],
  },
  {
    id: 'youth-stem-day',
    title: 'Youth STEM Discovery Day',
    type: 'event',
    duration: 'Full day (6–8 hours)',
    audience: 'Youth ages 8–16',
    capacity: '50–100 participants',
    pricing: [
      { label: 'Standard', price: '$25' },
      { label: 'Sponsored', price: 'Free', note: 'When grant/sponsor funded' },
    ],
    description:
      'A full day of hands-on STEM activities built around 3D printing. Multiple stations: CAD design, live printing, material science, real-world engineering challenges. Designed to make technology feel accessible and exciting.',
    whatYouGet: [
      'Multiple hands-on activity stations',
      'Introduction to CAD with Tinkercad',
      'Live 3D printing demonstrations',
      'Engineering design challenges',
      'Take-home 3D printed creation',
      'Lunch and snacks included',
    ],
    tags: ['Youth', 'STEM', 'Full Day'],
  },
  {
    id: 'library-workshop',
    title: 'Library 3D Printing Workshop',
    type: 'workshop',
    duration: '1.5–2 hours',
    audience: 'Library patrons, all ages',
    capacity: '10–15 participants',
    pricing: [
      { label: 'Partnership', price: 'Free', note: 'Sponsored by library' },
      { label: 'Public Session', price: '$25' },
    ],
    description:
      'A condensed, accessible introduction to 3D printing designed for public library settings. Low barrier to entry, no experience required. Libraries provide the space; we bring the printers and the knowledge.',
    whatYouGet: [
      'Introduction to 3D printing concepts',
      'Live demonstration with library context',
      'Hands-on design with free software',
      'Printed takeaway item',
      'Resource list for further exploration',
    ],
    tags: ['Beginner', 'Community', 'Partnership'],
  },
  {
    id: 'festival-booth',
    title: 'Festival & Event Booth',
    type: 'event',
    duration: 'Full event duration',
    audience: 'General public, all ages',
    capacity: 'Unlimited (walk-up)',
    pricing: [{ label: 'Sponsor Funded', price: 'Contact us', note: 'Custom activation' }],
    description:
      'A live 3D printing activation booth for festivals, fairs, and community events. Walk-up demonstrations, live prints, and hands-on mini activities. Your brand on the enclosure if sponsored.',
    whatYouGet: [
      'Portable 3D printing station',
      'Live demonstrations throughout event',
      'Walk-up mini design activities',
      'Branded printed giveaways',
      'Professional setup and teardown',
      'Social media coverage',
    ],
    tags: ['Event', 'Activation', 'Sponsor'],
  },
  {
    id: 'youth-3d-printing',
    title: 'Youth 3D Printing Adventure',
    type: 'workshop',
    duration: '2 hours',
    audience: 'Youth ages 10–14',
    capacity: '8–15 participants',
    pricing: [
      { label: 'Standard', price: '$25' },
      { label: 'Group (school)', price: '$20 each', note: '10+ students' },
    ],
    description:
      'A workshop built specifically for younger makers. Design a simple 3D model using Tinkercad, watch it print, and take it home. Age-appropriate pace, no prior experience needed.',
    whatYouGet: [
      'Learn what 3D printing is and how it works',
      'Design a model in Tinkercad (free, browser-based)',
      'Watch your design get printed live',
      'Take home your creation',
      'Identify real-world applications',
    ],
    tags: ['Youth', 'Beginner', 'Tinkercad'],
  },
  {
    id: 'seniors-tech',
    title: '3D Printing for Seniors',
    type: 'workshop',
    duration: '1.5 hours',
    audience: 'Adults 55+',
    capacity: '6–12 participants',
    pricing: [
      { label: 'Standard', price: '$25' },
      { label: 'Community Centre', price: 'Free', note: 'When centre funded' },
    ],
    description:
      'Technology made simple. A relaxed, no-pressure introduction to 3D printing designed for seniors. Large-print materials, comfortable pacing, real-world applications relevant to daily life. No experience needed whatsoever.',
    whatYouGet: [
      'Simple explanation of 3D printing',
      'Real-world applications for daily life',
      'Hold and examine printed objects',
      'Comfortable pace and environment',
      'Large-print handouts to take home',
      'Where to learn more',
    ],
    tags: ['Seniors', 'Beginner', 'Accessible'],
  },
  {
    id: 'advanced-techniques',
    title: 'Advanced 3D Printing Techniques',
    type: 'bootcamp',
    duration: '4 hours (with break)',
    audience: 'Adults with basic experience',
    capacity: '6–10 participants',
    pricing: [
      { label: 'Standard', price: '$100' },
      { label: 'Member Rate', price: '$80', note: '20% discount' },
    ],
    description:
      'For people who already own a printer or have completed our intro workshop. Optimize print settings, master advanced slicer features, troubleshoot common problems, and learn post-processing techniques. Bring your laptop.',
    whatYouGet: [
      'Optimize print settings for different applications',
      'Advanced slicer features (supports, variable layer height, modifiers)',
      'Troubleshooting common problems hands-on',
      'Post-processing techniques (sanding, painting, acetone smoothing)',
      'Design-for-printing principles',
      'Multi-material and multi-color strategies',
    ],
    tags: ['Advanced', 'Slicer', 'Troubleshooting'],
  },
]
