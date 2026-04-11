export interface Printer {
  id: string
  name: string
  nickname: string
  story: string
  type: 'FDM' | 'CoreXY'
  buildVolume: string
  firmware: string
  materials: string[]
  avgSpeed: string
  status: 'active' | 'maintenance' | 'standby'
  statusNote?: string
  highlights: string[]
  image: string
  accent: string
}

export const FLEET: Printer[] = [
  {
    id: 'creality-k1',
    name: 'Creality K1',
    nickname: 'The Workhorse',
    story:
      'Running Klipper with Fluidd and Mainsail. This is the speed demon of the fleet — fast production runs, high throughput, enclosed chamber. The printer that handles the daily queue.',
    type: 'CoreXY',
    buildVolume: '220 × 220 × 250 mm',
    firmware: 'Klipper (Fluidd + Mainsail)',
    materials: ['PLA', 'PETG', 'TPU', 'ABS', 'ASA'],
    avgSpeed: '300 mm/s cruise, 600 mm/s peak',
    status: 'active',
    highlights: [
      'Klipper firmware with input shaping',
      'Enclosed chamber for ABS and ASA',
      'Fluidd + Mainsail dual interface',
      'Primary production machine',
    ],
    image: '/media/fleet/creality-k1.jpg',
    accent: '#E84A8A',
  },
  {
    id: 'bambu-a1-mini',
    name: 'Bambu Lab A1 Mini',
    nickname: 'The $80 Find',
    story:
      'Found on Facebook Marketplace for $80. Paid for itself in two days. Compact, reliable, and absurdly capable for its size. The printer that proves you do not need to spend a fortune to produce professional results.',
    type: 'FDM',
    buildVolume: '180 × 180 × 180 mm',
    firmware: 'Bambu Lab Stock',
    materials: ['PLA', 'PETG', 'TPU'],
    avgSpeed: '500 mm/s peak',
    status: 'active',
    highlights: [
      '$80 marketplace find — ROI in 48 hours',
      'Auto bed leveling and flow calibration',
      'Near-silent operation',
      'Compact footprint, big output',
    ],
    image: '/media/fleet/bambu-a1-mini.jpg',
    accent: '#FF6B2B',
  },
  {
    id: 'bibo-2',
    name: 'Bibo 2',
    nickname: 'The Dual',
    story:
      'Dual extrusion workhorse. When a job needs two materials or soluble supports, this is the machine that handles it. Not the fastest, but the most versatile for complex prints.',
    type: 'FDM',
    buildVolume: '214 × 186 × 160 mm',
    firmware: 'Marlin',
    materials: ['PLA', 'PETG', 'PVA (soluble supports)'],
    avgSpeed: '80 mm/s',
    status: 'active',
    highlights: [
      'Dual extrusion — two materials in one print',
      'Soluble support capability (PVA)',
      'Heated bed with glass surface',
      'Multi-material complex geometry',
    ],
    image: '/media/fleet/bibo-2.jpg',
    accent: '#AAFF2A',
  },
  {
    id: 'prusa-mk25s-mmu2s',
    name: 'Prusa Mk2.5s MMU2S',
    nickname: 'The Precision',
    story:
      'The multi-material unit turns this into a 5-color machine. Proven Prusa reliability, open-source firmware, and the kind of dimensional accuracy that engineers trust. The printer for precision jobs and multi-color showpieces.',
    type: 'FDM',
    buildVolume: '250 × 210 × 200 mm',
    firmware: 'Prusa Firmware (Marlin fork)',
    materials: ['PLA', 'PETG', 'ASA', 'TPU', 'PA-CF'],
    avgSpeed: '200 mm/s',
    status: 'active',
    highlights: [
      'MMU2S — up to 5 colors and materials per print',
      'Prusa-grade dimensional accuracy',
      'Open-source firmware and hardware',
      'Battle-tested reliability',
    ],
    image: '/media/fleet/prusa-mk25s.jpg',
    accent: '#40C4C4',
  },
  {
    id: 'kobra-2-max',
    name: 'Anycubic Kobra 2 Max',
    nickname: 'The Big One',
    story:
      'Large format build volume for oversize parts. When a job does not fit on the other machines, this is where it goes. Helmets, enclosure panels, large marine hardware — the printer for projects that need room.',
    type: 'FDM',
    buildVolume: '420 × 420 × 500 mm',
    firmware: 'Anycubic Stock (Marlin-based)',
    materials: ['PLA', 'PETG', 'TPU'],
    avgSpeed: '300 mm/s peak',
    status: 'active',
    highlights: [
      'Massive build volume — 420 × 420 × 500 mm',
      'Auto bed leveling (LeviQ 2.0)',
      'Oversize parts: helmets, panels, marine hardware',
      'Direct drive extruder for flexible materials',
    ],
    image: '/media/fleet/kobra-2-max.jpg',
    accent: '#E84A8A',
  },
  {
    id: 'prusa-core-one-l',
    name: 'Prusa Core One L',
    nickname: 'The Flagship',
    story:
      'Arrived April 8, 2026. Heated chamber. 300 × 300 × 330 mm. Engineering plastics, marine-grade work, and the partnership machine from Prusa Research. This is the one pledged for the Newport-Bermuda 2026 race deployment.',
    type: 'CoreXY',
    buildVolume: '300 × 300 × 330 mm',
    firmware: 'Prusa ecosystem',
    materials: ['Engineering plastics', 'Marine-grade compounds', 'ASA', 'PA-CF'],
    avgSpeed: 'High-throughput enclosed production',
    status: 'active',
    statusNote: 'Partnership machine from Prusa Research. Arrived April 8, 2026.',
    highlights: [
      '300 × 300 × 330 mm build volume',
      'Heated chamber for engineering plastics',
      'Marine-grade deployment machine',
      'Prusa Research partnership machine',
    ],
    image: '/media/workshop/core-one-l.avif',
    accent: '#FF6B2B',
  },
]

export const FLEET_STATS = {
  totalPrinters: FLEET.length,
  materialsSupported: [...new Set(FLEET.flatMap((printer) => printer.materials))].length,
  maxBuildVolume: '420 × 420 × 500 mm',
}
