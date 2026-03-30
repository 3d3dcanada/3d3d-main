/**
 * Prusa Filaments Database (Prusament)
 * Based on prusa3d.com/category/prusament/
 * Last updated: 2025-03-30
 * Currency: CAD
 * Markup: 17.5% (middle of 15-20% range)
 */
import type { PrusaFilament, FilamentCategoryMeta } from '../../lib/prusaTypes';
import { calculateOurPrice, DEFAULT_MARKUP_PERCENT } from '../../lib/prusaTypes';

// ============ FILAMENT CATEGORY METADATA ============
export const FILAMENT_CATEGORIES: FilamentCategoryMeta[] = [
  {
    id: 'PLA',
    name: 'Prusament PLA',
    shortName: 'PLA',
    description: 'Easy to print, environmentally friendly, perfect for beginners and prototypes.',
    difficulty: 'beginner',
    typicalUseCases: ['Prototypes', 'Cosplay Props', 'Decorative Items', 'Educational Projects'],
  },
  {
    id: 'PETG',
    name: 'Prusament PETG',
    shortName: 'PETG',
    description: 'Durable, temperature resistant, chemical resistant. Great for functional parts.',
    difficulty: 'beginner',
    typicalUseCases: ['Functional Parts', 'Mechanical Components', 'Outdoor Items', 'Food-Safe Containers'],
  },
  {
    id: 'ASA',
    name: 'Prusament ASA',
    shortName: 'ASA',
    description: 'UV stable, weather resistant. Perfect for outdoor applications.',
    difficulty: 'intermediate',
    typicalUseCases: ['Outdoor Applications', 'Automotive Parts', 'Marine Applications', 'UV-Exposed Items'],
  },
  {
    id: 'ABS',
    name: 'Prusament ABS',
    shortName: 'ABS',
    description: 'High temperature resistance, strong and durable. Requires enclosure.',
    difficulty: 'advanced',
    typicalUseCases: ['High-Temp Parts', 'Automotive', 'Industrial Applications', 'Vapor Smoothing'],
  },
  {
    id: 'PC',
    name: 'Prusament PC (Polycarbonate)',
    shortName: 'PC',
    description: 'Extremely strong and heat resistant. Professional grade material.',
    difficulty: 'advanced',
    typicalUseCases: ['Engineering Parts', 'High-Load Components', 'Transparent Parts', 'Industrial Use'],
  },
  {
    id: 'PA',
    name: 'Prusament PA (Nylon)',
    shortName: 'PA',
    description: 'Flexible yet strong, excellent chemical resistance. Requires proper storage.',
    difficulty: 'advanced',
    typicalUseCases: ['Living Hinges', 'Gears', 'Wearable Parts', 'Chemical-Resistant Items'],
  },
  {
    id: 'TPU',
    name: 'Prusament Flex (TPU)',
    shortName: 'TPU',
    description: 'Highly flexible rubber-like material. Great for grips and seals.',
    difficulty: 'intermediate',
    typicalUseCases: ['Phone Cases', 'Seals', 'Grips', 'Wearable Items', 'Shock Absorption'],
  },
  {
    id: 'PVB',
    name: 'Prusament PVB',
    shortName: 'PVB',
    description: 'Smooth, low odor, easy post-processing with alcohol.',
    difficulty: 'intermediate',
    typicalUseCases: ['Cosmetic Parts', 'Models', 'Easy Supports', 'Smooth Surfaces'],
  },
];

// ============ FILAMENT DATA ============
// Based on actual Prusament products
export const PRUSA_FILAMENTS: PrusaFilament[] = [
  // PLA COLLECTION
  {
    id: 'prusament-pla-galaxy-black',
    name: 'Prusament PLA Galaxy Black',
    slug: 'prusament-pla-galaxy-black',
    material: 'PLA',
    variant: 'Galaxy',
    basePriceCAD: 29.99,
    ourPriceCAD: calculateOurPrice(29.99, DEFAULT_MARKUP_PERCENT),
    markupPercent: DEFAULT_MARKUP_PERCENT,
    colors: [{ name: 'Galaxy Black', hex: '#1a1a2e', inStock: true }],
    bulkPricing: [
      { minSpools: 10, maxSpools: 49, pricePerSpoolCAD: 26.99, discountPercent: 10 },
      { minSpools: 50, pricePerSpoolCAD: 23.99, discountPercent: 20 },
    ],
    specs: {
      diameter: '1.75mm',
      weight: 1000,
      printTemp: { min: 190, max: 220 },
      bedTemp: { min: 20, max: 60 },
      properties: ['Easy to print', 'Biodegradable', 'Matte finish', 'Sparkle effect'],
      useCases: ['Cosmetic prints', 'Decorative items', 'Prototypes'],
      compatibility: ['MK4S', 'XL', 'MINI', 'CORE'],
    },
    stockStatus: 'in_stock',
    description: 'Galaxy Black PLA with subtle metallic flakes for a premium matte finish.',
    images: [],
    featuredImage: '',
    prusaProductUrl: 'https://www.prusa3d.com/product/prusament-pla-galaxy-black-1kg/',
    isActive: true,
    dateAdded: '2025-03-30',
    lastUpdated: '2025-03-30',
  },
  {
    id: 'prusament-pla-jet-black',
    name: 'Prusament PLA Jet Black',
    slug: 'prusament-pla-jet-black',
    material: 'PLA',
    variant: 'Standard',
    basePriceCAD: 26.99,
    ourPriceCAD: calculateOurPrice(26.99, DEFAULT_MARKUP_PERCENT),
    markupPercent: DEFAULT_MARKUP_PERCENT,
    colors: [{ name: 'Jet Black', hex: '#0a0a0a', inStock: true }],
    bulkPricing: [
      { minSpools: 10, maxSpools: 49, pricePerSpoolCAD: 24.29, discountPercent: 10 },
      { minSpools: 50, pricePerSpoolCAD: 21.59, discountPercent: 20 },
    ],
    specs: {
      diameter: '1.75mm',
      weight: 1000,
      printTemp: { min: 190, max: 220 },
      bedTemp: { min: 20, max: 60 },
      properties: ['Easy to print', 'Biodegradable', 'Deep black color'],
      useCases: ['Prototypes', 'Functional parts', 'Everyday printing'],
      compatibility: ['MK4S', 'XL', 'MINI', 'CORE'],
    },
    stockStatus: 'in_stock',
    description: 'Pure black PLA filament perfect for everyday printing.',
    images: [],
    featuredImage: '',
    prusaProductUrl: 'https://www.prusa3d.com/product/prusament-pla-jet-black-1kg/',
    isActive: true,
    dateAdded: '2025-03-30',
    lastUpdated: '2025-03-30',
  },
  {
    id: 'prusament-pla-gentleman-grey',
    name: 'Prusament PLA Gentleman Grey',
    slug: 'prusament-pla-gentleman-grey',
    material: 'PLA',
    variant: 'Standard',
    basePriceCAD: 26.99,
    ourPriceCAD: calculateOurPrice(26.99, DEFAULT_MARKUP_PERCENT),
    markupPercent: DEFAULT_MARKUP_PERCENT,
    colors: [{ name: 'Gentleman Grey', hex: '#6b6b6b', inStock: true }],
    bulkPricing: [
      { minSpools: 10, maxSpools: 49, pricePerSpoolCAD: 24.29, discountPercent: 10 },
      { minSpools: 50, pricePerSpoolCAD: 21.59, discountPercent: 20 },
    ],
    specs: {
      diameter: '1.75mm',
      weight: 1000,
      printTemp: { min: 190, max: 220 },
      bedTemp: { min: 20, max: 60 },
      properties: ['Easy to print', 'Sophisticated color', 'Professional look'],
      useCases: ['Professional prints', 'Prototypes', 'Display models'],
      compatibility: ['MK4S', 'XL', 'MINI', 'CORE'],
    },
    stockStatus: 'in_stock',
    description: 'Elegant grey PLA for professional-looking prints.',
    images: [],
    featuredImage: '',
    prusaProductUrl: 'https://www.prusa3d.com/product/prusament-pla-gentleman-grey-1kg/',
    isActive: true,
    dateAdded: '2025-03-30',
    lastUpdated: '2025-03-30',
  },
  {
    id: 'prusament-pla-orange',
    name: 'Prusament PLA Prusa Orange',
    slug: 'prusament-pla-prusa-orange',
    material: 'PLA',
    variant: 'Standard',
    basePriceCAD: 26.99,
    ourPriceCAD: calculateOurPrice(26.99, DEFAULT_MARKUP_PERCENT),
    markupPercent: DEFAULT_MARKUP_PERCENT,
    colors: [{ name: 'Prusa Orange', hex: '#f15a24', inStock: true }],
    bulkPricing: [
      { minSpools: 10, maxSpools: 49, pricePerSpoolCAD: 24.29, discountPercent: 10 },
      { minSpools: 50, pricePerSpoolCAD: 21.59, discountPercent: 20 },
    ],
    specs: {
      diameter: '1.75mm',
      weight: 1000,
      printTemp: { min: 190, max: 220 },
      bedTemp: { min: 20, max: 60 },
      properties: ['Easy to print', 'Iconic Prusa color', 'High visibility'],
      useCases: ['Prusa upgrades', 'Visible parts', 'Orange accents'],
      compatibility: ['MK4S', 'XL', 'MINI', 'CORE'],
    },
    stockStatus: 'in_stock',
    description: 'The iconic Prusa Orange - perfect for printer parts and upgrades.',
    images: [],
    featuredImage: '',
    prusaProductUrl: 'https://www.prusa3d.com/product/prusament-pla-prusa-orange-1kg/',
    isActive: true,
    dateAdded: '2025-03-30',
    lastUpdated: '2025-03-30',
  },
  {
    id: 'prusament-pla-royal-blue',
    name: 'Prusament PLA Royal Blue',
    slug: 'prusament-pla-royal-blue',
    material: 'PLA',
    variant: 'Standard',
    basePriceCAD: 26.99,
    ourPriceCAD: calculateOurPrice(26.99, DEFAULT_MARKUP_PERCENT),
    markupPercent: DEFAULT_MARKUP_PERCENT,
    colors: [{ name: 'Royal Blue', hex: '#1e3a8a', inStock: true }],
    bulkPricing: [
      { minSpools: 10, maxSpools: 49, pricePerSpoolCAD: 24.29, discountPercent: 10 },
      { minSpools: 50, pricePerSpoolCAD: 21.59, discountPercent: 20 },
    ],
    specs: {
      diameter: '1.75mm',
      weight: 1000,
      printTemp: { min: 190, max: 220 },
      bedTemp: { min: 20, max: 60 },
      properties: ['Easy to print', 'Rich color', 'Great contrast'],
      useCases: ['Marine themes', 'Decorative pieces', 'Prototypes'],
      compatibility: ['MK4S', 'XL', 'MINI', 'CORE'],
    },
    stockStatus: 'in_stock',
    description: 'Deep royal blue PLA for eye-catching prints.',
    images: [],
    featuredImage: '',
    prusaProductUrl: 'https://www.prusa3d.com/product/prusament-pla-royal-blue-1kg/',
    isActive: true,
    dateAdded: '2025-03-30',
    lastUpdated: '2025-03-30',
  },
  {
    id: 'prusament-pla-carmine-red',
    name: 'Prusament PLA Carmine Red',
    slug: 'prusament-pla-carmine-red',
    material: 'PLA',
    variant: 'Standard',
    basePriceCAD: 26.99,
    ourPriceCAD: calculateOurPrice(26.99, DEFAULT_MARKUP_PERCENT),
    markupPercent: DEFAULT_MARKUP_PERCENT,
    colors: [{ name: 'Carmine Red', hex: '#dc2626', inStock: true }],
    bulkPricing: [
      { minSpools: 10, maxSpools: 49, pricePerSpoolCAD: 24.29, discountPercent: 10 },
      { minSpools: 50, pricePerSpoolCAD: 21.59, discountPercent: 20 },
    ],
    specs: {
      diameter: '1.75mm',
      weight: 1000,
      printTemp: { min: 190, max: 220 },
      bedTemp: { min: 20, max: 60 },
      properties: ['Easy to print', 'Vibrant color', 'High impact'],
      useCases: ['Attention-grabbing parts', 'Models', 'Art pieces'],
      compatibility: ['MK4S', 'XL', 'MINI', 'CORE'],
    },
    stockStatus: 'in_stock',
    description: 'Vivid red PLA for striking prints.',
    images: [],
    featuredImage: '',
    prusaProductUrl: 'https://www.prusa3d.com/product/prusament-pla-carmine-red-1kg/',
    isActive: true,
    dateAdded: '2025-03-30',
    lastUpdated: '2025-03-30',
  },
  {
    id: 'prusament-pla-olive-green',
    name: 'Prusament PLA Olive Green',
    slug: 'prusament-pla-olive-green',
    material: 'PLA',
    variant: 'Standard',
    basePriceCAD: 26.99,
    ourPriceCAD: calculateOurPrice(26.99, DEFAULT_MARKUP_PERCENT),
    markupPercent: DEFAULT_MARKUP_PERCENT,
    colors: [{ name: 'Olive Green', hex: '#65a30d', inStock: true }],
    bulkPricing: [
      { minSpools: 10, maxSpools: 49, pricePerSpoolCAD: 24.29, discountPercent: 10 },
      { minSpools: 50, pricePerSpoolCAD: 21.59, discountPercent: 20 },
    ],
    specs: {
      diameter: '1.75mm',
      weight: 1000,
      printTemp: { min: 190, max: 220 },
      bedTemp: { min: 20, max: 60 },
      properties: ['Easy to print', 'Natural tone', 'Earthy color'],
      useCases: ['Nature themes', 'Military models', 'Camo parts'],
      compatibility: ['MK4S', 'XL', 'MINI', 'CORE'],
    },
    stockStatus: 'in_stock',
    description: 'Natural olive green PLA for earthy aesthetic.',
    images: [],
    featuredImage: '',
    prusaProductUrl: 'https://www.prusa3d.com/product/prusament-pla-olive-green-1kg/',
    isActive: true,
    dateAdded: '2025-03-30',
    lastUpdated: '2025-03-30',
  },

  // PETG COLLECTION
  {
    id: 'prusament-petg-anthracite',
    name: 'Prusament PETG Anthracite',
    slug: 'prusament-petg-anthracite',
    material: 'PETG',
    variant: 'Standard',
    basePriceCAD: 34.99,
    ourPriceCAD: calculateOurPrice(34.99, DEFAULT_MARKUP_PERCENT),
    markupPercent: DEFAULT_MARKUP_PERCENT,
    colors: [{ name: 'Anthracite', hex: '#374151', inStock: true }],
    bulkPricing: [
      { minSpools: 10, maxSpools: 49, pricePerSpoolCAD: 31.49, discountPercent: 10 },
      { minSpools: 50, pricePerSpoolCAD: 27.99, discountPercent: 20 },
    ],
    specs: {
      diameter: '1.75mm',
      weight: 1000,
      printTemp: { min: 230, max: 250 },
      bedTemp: { min: 80, max: 90 },
      properties: ['Durable', 'Chemical resistant', 'Food safe', 'Easy to print'],
      useCases: ['Mechanical parts', 'Containers', 'Outdoor use', 'Functional prototypes'],
      compatibility: ['MK4S', 'XL', 'MINI', 'CORE'],
    },
    stockStatus: 'in_stock',
    description: 'Professional anthracite PETG for durable functional parts.',
    images: [],
    featuredImage: '',
    prusaProductUrl: 'https://www.prusa3d.com/product/prusament-petg-anthracite-1kg/',
    isActive: true,
    dateAdded: '2025-03-30',
    lastUpdated: '2025-03-30',
  },
  {
    id: 'prusament-petg-clear',
    name: 'Prusament PETG Clear',
    slug: 'prusament-petg-clear',
    material: 'PETG',
    variant: 'Clear',
    basePriceCAD: 36.99,
    ourPriceCAD: calculateOurPrice(36.99, DEFAULT_MARKUP_PERCENT),
    markupPercent: DEFAULT_MARKUP_PERCENT,
    colors: [{ name: 'Clear Transparent', hex: '#f0f0f0', inStock: true }],
    bulkPricing: [
      { minSpools: 10, maxSpools: 49, pricePerSpoolCAD: 33.29, discountPercent: 10 },
      { minSpools: 50, pricePerSpoolCAD: 29.59, discountPercent: 20 },
    ],
    specs: {
      diameter: '1.75mm',
      weight: 1000,
      printTemp: { min: 230, max: 250 },
      bedTemp: { min: 80, max: 90 },
      properties: ['Transparent', 'Durable', 'Food safe', 'High clarity'],
      useCases: ['Light diffusers', 'Enclosures', 'Containers', 'LED projects'],
      compatibility: ['MK4S', 'XL', 'MINI', 'CORE'],
    },
    stockStatus: 'in_stock',
    description: 'Crystal clear PETG for transparent applications.',
    images: [],
    featuredImage: '',
    prusaProductUrl: 'https://www.prusa3d.com/product/prusament-petg-clear-1kg/',
    isActive: true,
    dateAdded: '2025-03-30',
    lastUpdated: '2025-03-30',
  },
  {
    id: 'prusament-petg-jet-black',
    name: 'Prusament PETG Jet Black',
    slug: 'prusament-petg-jet-black',
    material: 'PETG',
    variant: 'Standard',
    basePriceCAD: 34.99,
    ourPriceCAD: calculateOurPrice(34.99, DEFAULT_MARKUP_PERCENT),
    markupPercent: DEFAULT_MARKUP_PERCENT,
    colors: [{ name: 'Jet Black', hex: '#0a0a0a', inStock: true }],
    bulkPricing: [
      { minSpools: 10, maxSpools: 49, pricePerSpoolCAD: 31.49, discountPercent: 10 },
      { minSpools: 50, pricePerSpoolCAD: 27.99, discountPercent: 20 },
    ],
    specs: {
      diameter: '1.75mm',
      weight: 1000,
      printTemp: { min: 230, max: 250 },
      bedTemp: { min: 80, max: 90 },
      properties: ['Durable', 'Black finish', 'Chemical resistant'],
      useCases: ['Mechanical parts', 'Enclosures', 'Functional prints'],
      compatibility: ['MK4S', 'XL', 'MINI', 'CORE'],
    },
    stockStatus: 'in_stock',
    description: 'Strong black PETG for demanding applications.',
    images: [],
    featuredImage: '',
    prusaProductUrl: 'https://www.prusa3d.com/product/prusament-petg-jet-black-1kg/',
    isActive: true,
    dateAdded: '2025-03-30',
    lastUpdated: '2025-03-30',
  },

  // SPECIALTY FILAMENTS
  {
    id: 'prusament-asa-black',
    name: 'Prusament ASA Black',
    slug: 'prusament-asa-black',
    material: 'ASA',
    variant: 'Standard',
    basePriceCAD: 38.99,
    ourPriceCAD: calculateOurPrice(38.99, DEFAULT_MARKUP_PERCENT),
    markupPercent: DEFAULT_MARKUP_PERCENT,
    colors: [{ name: 'Black', hex: '#0a0a0a', inStock: true }],
    bulkPricing: [
      { minSpools: 10, maxSpools: 49, pricePerSpoolCAD: 35.09, discountPercent: 10 },
      { minSpools: 50, pricePerSpoolCAD: 31.19, discountPercent: 20 },
    ],
    specs: {
      diameter: '1.75mm',
      weight: 1000,
      printTemp: { min: 250, max: 260 },
      bedTemp: { min: 100, max: 110 },
      properties: ['UV stable', 'Weather resistant', 'High impact', 'Outdoor rated'],
      useCases: ['Outdoor parts', 'Marine applications', 'Automotive', 'UV-exposed items'],
      compatibility: ['MK4S', 'XL', 'MINI', 'CORE'],
    },
    stockStatus: 'in_stock',
    description: 'UV-stable ASA for outdoor applications that resist sun and weather.',
    images: [],
    featuredImage: '',
    prusaProductUrl: 'https://www.prusa3d.com/product/prusament-asa-black-1kg/',
    isActive: true,
    dateAdded: '2025-03-30',
    lastUpdated: '2025-03-30',
  },
  {
    id: 'prusament-tpu-black',
    name: 'Prusament Flex TPU Black',
    slug: 'prusament-tpu-black',
    material: 'TPU',
    variant: 'Standard',
    basePriceCAD: 42.99,
    ourPriceCAD: calculateOurPrice(42.99, DEFAULT_MARKUP_PERCENT),
    markupPercent: DEFAULT_MARKUP_PERCENT,
    colors: [{ name: 'Black', hex: '#0a0a0a', inStock: true }],
    bulkPricing: [
      { minSpools: 10, maxSpools: 49, pricePerSpoolCAD: 38.69, discountPercent: 10 },
      { minSpools: 50, pricePerSpoolCAD: 34.39, discountPercent: 20 },
    ],
    specs: {
      diameter: '1.75mm',
      weight: 500,
      printTemp: { min: 220, max: 240 },
      bedTemp: { min: 40, max: 60 },
      properties: ['Flexible', 'Elastic', 'Shore 95A', 'Shock absorbing'],
      useCases: ['Phone cases', 'Seals', 'Grips', 'Shock mounts', 'Wearable items'],
      compatibility: ['MK4S', 'XL', 'MINI', 'CORE'],
    },
    stockStatus: 'in_stock',
    description: 'Shore 95A flexible TPU for rubber-like parts.',
    images: [],
    featuredImage: '',
    prusaProductUrl: 'https://www.prusa3d.com/product/prusament-flex-95a-black-500g/',
    isActive: true,
    dateAdded: '2025-03-30',
    lastUpdated: '2025-03-30',
  },
];

// ============ UTILITY FUNCTIONS ============
export function getFilamentsByMaterial(material: string): PrusaFilament[] {
  return PRUSA_FILAMENTS.filter(f => f.material === material);
}

export function getFilamentsByStockStatus(status: PrusaFilament['stockStatus']): PrusaFilament[] {
  return PRUSA_FILAMENTS.filter(f => f.stockStatus === status);
}

export function getFilamentById(id: string): PrusaFilament | undefined {
  return PRUSA_FILAMENTS.find(f => f.id === id);
}

export function getFilamentsInStock(): PrusaFilament[] {
  return PRUSA_FILAMENTS.filter(f => f.stockStatus === 'in_stock');
}

export function getFilamentColors(filamentId: string): string[] {
  const filament = getFilamentById(filamentId);
  return filament?.colors.map(c => c.name) || [];
}

export function calculateBulkPrice(
  filament: PrusaFilament,
  quantity: number
): { perSpool: number; total: number; discountPercent: number } {
  // Sort bulk pricing by minSpools descending to find best tier
  const tiers = [...filament.bulkPricing].sort((a, b) => b.minSpools - a.minSpools);
  
  for (const tier of tiers) {
    if (quantity >= tier.minSpools && (!tier.maxSpools || quantity <= tier.maxSpools)) {
      return {
        perSpool: tier.pricePerSpoolCAD,
        total: tier.pricePerSpoolCAD * quantity,
        discountPercent: tier.discountPercent,
      };
    }
  }
  
  // No bulk tier matched - use standard price
  return {
    perSpool: filament.ourPriceCAD,
    total: filament.ourPriceCAD * quantity,
    discountPercent: 0,
  };
}

// Export stats
export const FILAMENT_STATS = {
  total: PRUSA_FILAMENTS.length,
  byMaterial: {
    PLA: getFilamentsByMaterial('PLA').length,
    PETG: getFilamentsByMaterial('PETG').length,
    ASA: getFilamentsByMaterial('ASA').length,
    ABS: getFilamentsByMaterial('ABS').length,
    PC: getFilamentsByMaterial('PC').length,
    PA: getFilamentsByMaterial('PA').length,
    TPU: getFilamentsByMaterial('TPU').length,
    PVB: getFilamentsByMaterial('PVB').length,
  },
  inStock: getFilamentsInStock().length,
};
