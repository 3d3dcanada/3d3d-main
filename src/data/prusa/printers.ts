/**
 * Prusa 3D Printers Database
 * Scraped from prusa3d.com/category/3d-printers/
 * Last updated: 2025-03-30
 * Currency: CAD
 * Markup: 15-20% (using 17.5% default)
 */
import type { PrusaPrinter, PrinterCategoryMeta } from '../../lib/prusaTypes';
import { calculateOurPrice, DEFAULT_MARKUP_PERCENT } from '../../lib/prusaTypes';

// ============ PRINTER CATEGORY METADATA ============
export const PRINTER_CATEGORIES: PrinterCategoryMeta[] = [
  {
    id: 'CORE',
    name: 'Prusa CORE Series',
    description: 'Professional-grade enclosed printers with advanced features and high-speed printing.',
    minPrice: 1439,
    maxPrice: 2589,
    targetAudience: ['Professionals', 'Businesses', 'Advanced Users'],
  },
  {
    id: 'XL',
    name: 'Original Prusa XL',
    description: 'Large-format printers with massive build volumes and toolchanger capabilities.',
    minPrice: 3309,
    maxPrice: 3309,
    targetAudience: ['Professional', 'Industrial', 'Large Format Users'],
  },
  {
    id: 'MK4S',
    name: 'Original Prusa MK4S',
    description: 'The latest and most advanced MK series printer with Input Shaper and faster speeds.',
    minPrice: 1019,
    maxPrice: 1439,
    targetAudience: ['Enthusiasts', 'Intermediate', 'Advanced'],
  },
  {
    id: 'MINI',
    name: 'Original Prusa MINI+',
    description: 'Compact, affordable printers perfect for beginners and hobbyists.',
    minPrice: 789,
    maxPrice: 789,
    targetAudience: ['Beginners', 'Hobbyists', 'Educators'],
  },
  {
    id: 'SL1S',
    name: 'Original Prusa SL1S',
    description: 'High-resolution SLA/resin printers for detailed miniature and jewelry printing.',
    minPrice: 3109,
    maxPrice: 4039,
    targetAudience: ['Jewelry Makers', 'Miniature Printers', 'High Detail Users'],
  },
];

// ============ PRINTER DATA ============
// TODO: Scrape complete specs from individual product pages
export const PRUSA_PRINTERS: PrusaPrinter[] = [
  // === CORE SERIES ===
  {
    id: 'core-one-plus-assembled',
    name: 'Prusa CORE One+',
    slug: 'prusa-core-one-plus',
    series: 'CORE',
    type: 'FDM',
    assemblyType: 'assembled',
    basePriceCAD: 1869,
    ourPriceCAD: calculateOurPrice(1869, DEFAULT_MARKUP_PERCENT),
    markupPercent: DEFAULT_MARKUP_PERCENT,
    stockStatus: 'in_stock',
    description: 'Professional-grade enclosed 3D printer with active temperature control, high-speed printing capabilities, and advanced connectivity options.',
    shortDescription: 'Professional enclosed printer with active temp control.',
    specs: {
      buildVolume: { x: 250, y: 220, z: 270 },
      layerHeight: { min: 0.05, max: 0.35 },
      materials: ['PLA', 'PETG', 'ASA', 'ABS', 'PC', 'PA', 'Flex'],
      controller: '32-bit board',
      connectivity: ['Wi-Fi', 'Ethernet', 'USB'],
    },
    images: [],
    featuredImage: '',
    prusaProductUrl: 'https://www.prusa3d.com/product/prusa-core-one-plus/',
    isActive: true,
    dateAdded: '2025-03-30',
    lastUpdated: '2025-03-30',
  },
  {
    id: 'core-one-plus-kit',
    name: 'Prusa CORE One+ kit',
    slug: 'prusa-core-one-plus-kit',
    series: 'CORE',
    type: 'FDM',
    assemblyType: 'kit',
    basePriceCAD: 1439,
    ourPriceCAD: calculateOurPrice(1439, DEFAULT_MARKUP_PERCENT),
    markupPercent: DEFAULT_MARKUP_PERCENT,
    stockStatus: 'in_stock',
    description: 'DIY kit version of the Prusa CORE One+. Same professional features but you assemble it yourself.',
    shortDescription: 'Kit version of the CORE One+. Build it yourself!',
    specs: {
      buildVolume: { x: 250, y: 220, z: 270 },
      layerHeight: { min: 0.05, max: 0.35 },
      materials: ['PLA', 'PETG', 'ASA', 'ABS', 'PC', 'PA', 'Flex'],
      controller: '32-bit board',
      connectivity: ['Wi-Fi', 'Ethernet', 'USB'],
    },
    images: [],
    featuredImage: '',
    prusaProductUrl: 'https://www.prusa3d.com/product/prusa-core-one-plus-kit/',
    isActive: true,
    dateAdded: '2025-03-30',
    lastUpdated: '2025-03-30',
  },
  {
    id: 'core-one-l',
    name: 'Prusa CORE One L',
    slug: 'prusa-core-one-l',
    series: 'CORE',
    type: 'FDM',
    assemblyType: 'assembled',
    basePriceCAD: 2589,
    ourPriceCAD: calculateOurPrice(2589, DEFAULT_MARKUP_PERCENT),
    markupPercent: DEFAULT_MARKUP_PERCENT,
    stockStatus: 'lead_time',
    leadTimeWeeks: '4-5',
    description: 'Large-format enclosed printer from the CORE series with extended build volume.',
    shortDescription: 'Large format enclosed printer with extended build volume.',
    specs: {
      buildVolume: { x: 350, y: 300, z: 350 }, // Estimated, verify actual
      layerHeight: { min: 0.05, max: 0.35 },
      materials: ['PLA', 'PETG', 'ASA', 'ABS', 'PC', 'PA', 'Flex'],
      controller: '32-bit board',
      connectivity: ['Wi-Fi', 'Ethernet', 'USB'],
    },
    images: [],
    featuredImage: '',
    prusaProductUrl: 'https://www.prusa3d.com/product/prusa-core-one-l/',
    isActive: true,
    dateAdded: '2025-03-30',
    lastUpdated: '2025-03-30',
  },
  {
    id: 'core-one-plus-ultimate-assembled',
    name: 'CORE One+ Ultimate Edition Assembled',
    slug: 'core-one-plus-ultimate-assembled',
    series: 'CORE',
    type: 'FDM',
    assemblyType: 'assembled',
    isSpecialEdition: true,
    specialEditionType: 'Ultimate',
    basePriceCAD: 2439,
    ourPriceCAD: calculateOurPrice(2439, DEFAULT_MARKUP_PERCENT),
    markupPercent: DEFAULT_MARKUP_PERCENT,
    stockStatus: 'in_stock',
    description: 'The Ultimate Edition CORE One+ comes with premium upgrades and accessories.',
    shortDescription: 'Ultimate edition with premium upgrades included.',
    specs: {
      buildVolume: { x: 250, y: 220, z: 270 },
      layerHeight: { min: 0.05, max: 0.35 },
      materials: ['PLA', 'PETG', 'ASA', 'ABS', 'PC', 'PA', 'Flex'],
      controller: '32-bit board',
      connectivity: ['Wi-Fi', 'Ethernet', 'USB'],
    },
    images: [],
    featuredImage: '',
    prusaProductUrl: 'https://www.prusa3d.com/product/core-one-plus-ultimate-assembled/',
    isActive: true,
    dateAdded: '2025-03-30',
    lastUpdated: '2025-03-30',
  },
  {
    id: 'core-one-plus-ultimate-kit',
    name: 'CORE One+ Ultimate Edition Kit',
    slug: 'core-one-plus-ultimate-kit',
    series: 'CORE',
    type: 'FDM',
    assemblyType: 'kit',
    isSpecialEdition: true,
    specialEditionType: 'Ultimate',
    basePriceCAD: 2009,
    ourPriceCAD: calculateOurPrice(2009, DEFAULT_MARKUP_PERCENT),
    markupPercent: DEFAULT_MARKUP_PERCENT,
    stockStatus: 'lead_time',
    leadTimeWeeks: '1-2',
    description: 'DIY kit version of the Ultimate Edition with all premium upgrades.',
    shortDescription: 'Ultimate edition kit - build it with premium parts!',
    specs: {
      buildVolume: { x: 250, y: 220, z: 270 },
      layerHeight: { min: 0.05, max: 0.35 },
      materials: ['PLA', 'PETG', 'ASA', 'ABS', 'PC', 'PA', 'Flex'],
      controller: '32-bit board',
      connectivity: ['Wi-Fi', 'Ethernet', 'USB'],
    },
    images: [],
    featuredImage: '',
    prusaProductUrl: 'https://www.prusa3d.com/product/core-one-plus-ultimate-kit/',
    isActive: true,
    dateAdded: '2025-03-30',
    lastUpdated: '2025-03-30',
  },

  // === XL SERIES ===
  {
    id: 'original-prusa-xl',
    name: 'Original Prusa XL',
    slug: 'original-prusa-xl',
    series: 'XL',
    type: 'FDM',
    assemblyType: 'assembled',
    basePriceCAD: 3309,
    ourPriceCAD: calculateOurPrice(3309, DEFAULT_MARKUP_PERCENT),
    markupPercent: DEFAULT_MARKUP_PERCENT,
    stockStatus: 'in_stock',
    description: 'Large-format CoreXY printer with toolchanger capability. Massive build volume for professional projects.',
    shortDescription: 'Large format CoreXY with toolchanger capability.',
    specs: {
      buildVolume: { x: 360, y: 360, z: 360 },
      layerHeight: { min: 0.05, max: 0.35 },
      materials: ['PLA', 'PETG', 'ASA', 'ABS', 'PC', 'PA', 'Flex'],
      controller: '32-bit board',
      connectivity: ['Wi-Fi', 'Ethernet', 'USB'],
    },
    images: [],
    featuredImage: '',
    prusaProductUrl: 'https://www.prusa3d.com/product/original-prusa-xl/',
    isActive: true,
    dateAdded: '2025-03-30',
    lastUpdated: '2025-03-30',
  },
  {
    id: 'original-prusa-xl-critical-infrastructure',
    name: 'Original Prusa XL - assembled Critical Infrastructure Edition',
    slug: 'original-prusa-xl-critical-infrastructure',
    series: 'XL',
    type: 'FDM',
    assemblyType: 'assembled',
    isSpecialEdition: true,
    specialEditionType: 'Critical Infrastructure',
    basePriceCAD: 3309,
    ourPriceCAD: calculateOurPrice(3309, DEFAULT_MARKUP_PERCENT),
    markupPercent: DEFAULT_MARKUP_PERCENT,
    stockStatus: 'lead_time',
    leadTimeWeeks: '3-4',
    description: 'Critical Infrastructure Edition of the Original Prusa XL.',
    shortDescription: 'Critical Infrastructure edition for specialized use.',
    specs: {
      buildVolume: { x: 360, y: 360, z: 360 },
      layerHeight: { min: 0.05, max: 0.35 },
      materials: ['PLA', 'PETG', 'ASA', 'ABS', 'PC', 'PA', 'Flex'],
      controller: '32-bit board',
      connectivity: ['Wi-Fi', 'Ethernet', 'USB'],
    },
    images: [],
    featuredImage: '',
    prusaProductUrl: 'https://www.prusa3d.com/product/original-prusa-xl-critical-infrastructure/',
    isActive: true,
    dateAdded: '2025-03-30',
    lastUpdated: '2025-03-30',
  },

  // === MK4S SERIES ===
  {
    id: 'original-prusa-mk4s-assembled',
    name: 'Original Prusa MK4S 3D Printer',
    slug: 'original-prusa-mk4s',
    series: 'MK4S',
    type: 'FDM',
    assemblyType: 'assembled',
    basePriceCAD: 1439,
    ourPriceCAD: calculateOurPrice(1439, DEFAULT_MARKUP_PERCENT),
    markupPercent: DEFAULT_MARKUP_PERCENT,
    stockStatus: 'in_stock',
    description: 'The latest MK series with Input Shaper, advanced extruder, and blazing fast print speeds.',
    shortDescription: 'Latest MK series with Input Shaper and fast speeds.',
    specs: {
      buildVolume: { x: 250, y: 210, z: 220 },
      layerHeight: { min: 0.05, max: 0.35 },
      materials: ['PLA', 'PETG', 'ASA', 'ABS', 'Flex'],
      controller: '32-bit board',
      connectivity: ['Wi-Fi', 'Ethernet', 'USB'],
    },
    images: [],
    featuredImage: '',
    prusaProductUrl: 'https://www.prusa3d.com/product/original-prusa-mk4s/',
    isActive: true,
    dateAdded: '2025-03-30',
    lastUpdated: '2025-03-30',
  },
  {
    id: 'original-prusa-mk4s-kit',
    name: 'Original Prusa MK4S 3D Printer kit',
    slug: 'original-prusa-mk4s-kit',
    series: 'MK4S',
    type: 'FDM',
    assemblyType: 'kit',
    basePriceCAD: 1019,
    ourPriceCAD: calculateOurPrice(1019, DEFAULT_MARKUP_PERCENT),
    markupPercent: DEFAULT_MARKUP_PERCENT,
    stockStatus: 'in_stock',
    description: 'DIY kit version of the MK4S. Build it yourself and learn every component.',
    shortDescription: 'MK4S kit - build your own high-speed printer!',
    specs: {
      buildVolume: { x: 250, y: 210, z: 220 },
      layerHeight: { min: 0.05, max: 0.35 },
      materials: ['PLA', 'PETG', 'ASA', 'ABS', 'Flex'],
      controller: '32-bit board',
      connectivity: ['Wi-Fi', 'Ethernet', 'USB'],
    },
    images: [],
    featuredImage: '',
    prusaProductUrl: 'https://www.prusa3d.com/product/original-prusa-mk4s-kit/',
    isActive: true,
    dateAdded: '2025-03-30',
    lastUpdated: '2025-03-30',
  },

  // === MINI+ SERIES ===
  {
    id: 'original-prusa-mini-plus-kit',
    name: 'Original Prusa MINI+ kit',
    slug: 'original-prusa-mini-plus-kit',
    series: 'MINI',
    type: 'FDM',
    assemblyType: 'kit',
    basePriceCAD: 789,
    ourPriceCAD: calculateOurPrice(789, DEFAULT_MARKUP_PERCENT),
    markupPercent: DEFAULT_MARKUP_PERCENT,
    stockStatus: 'in_stock',
    description: 'Compact, affordable printer perfect for beginners. Kit version for the DIY enthusiast.',
    shortDescription: 'Compact, affordable, perfect for beginners.',
    specs: {
      buildVolume: { x: 180, y: 180, z: 180 },
      layerHeight: { min: 0.05, max: 0.3 },
      materials: ['PLA', 'PETG', 'ASA'],
      controller: 'Buddy board',
      connectivity: ['USB', 'Optional Wi-Fi'],
    },
    images: [],
    featuredImage: '',
    prusaProductUrl: 'https://www.prusa3d.com/product/original-prusa-mini-plus-kit/',
    isActive: true,
    dateAdded: '2025-03-30',
    lastUpdated: '2025-03-30',
  },
  {
    id: 'original-prusa-mini-plus-semi-assembled',
    name: 'Original Prusa MINI+ Semi-assembled 3D Printer',
    slug: 'original-prusa-mini-plus',
    series: 'MINI',
    type: 'FDM',
    assemblyType: 'semi-assembled',
    basePriceCAD: 789,
    ourPriceCAD: calculateOurPrice(789, DEFAULT_MARKUP_PERCENT),
    markupPercent: DEFAULT_MARKUP_PERCENT,
    stockStatus: 'in_stock',
    description: 'Semi-assembled version of the MINI+. Quick to set up and start printing.',
    shortDescription: 'Semi-assembled, ready to print in minutes.',
    specs: {
      buildVolume: { x: 180, y: 180, z: 180 },
      layerHeight: { min: 0.05, max: 0.3 },
      materials: ['PLA', 'PETG', 'ASA'],
      controller: 'Buddy board',
      connectivity: ['USB', 'Optional Wi-Fi'],
    },
    images: [],
    featuredImage: '',
    prusaProductUrl: 'https://www.prusa3d.com/product/original-prusa-mini-plus/',
    isActive: true,
    dateAdded: '2025-03-30',
    lastUpdated: '2025-03-30',
  },

  // === SL1S SERIES (Resin/SLA) ===
  {
    id: 'original-prusa-sl1s-speed',
    name: 'Original Prusa SL1S SPEED 3D printer',
    slug: 'original-prusa-sl1s',
    series: 'SL1S',
    type: 'SLA',
    assemblyType: 'assembled',
    basePriceCAD: 3109,
    ourPriceCAD: calculateOurPrice(3109, DEFAULT_MARKUP_PERCENT),
    markupPercent: DEFAULT_MARKUP_PERCENT,
    stockStatus: 'in_stock',
    description: 'High-resolution MSLA printer for detailed resin prints, miniatures, and jewelry.',
    shortDescription: 'High-res MSLA printer for miniatures and detail work.',
    specs: {
      buildVolume: { x: 120, y: 68, z: 150 },
      layerHeight: { min: 0.01, max: 0.15 },
      xyResolution: 25,
      wavelength: 405,
      materials: ['Resin'],
      controller: '32-bit board',
      connectivity: ['Wi-Fi', 'Ethernet', 'USB'],
    },
    images: [],
    featuredImage: '',
    prusaProductUrl: 'https://www.prusa3d.com/product/original-prusa-sl1s-speed/',
    isActive: true,
    dateAdded: '2025-03-30',
    lastUpdated: '2025-03-30',
  },
  {
    id: 'original-prusa-sl1s-cw1s-bundle',
    name: 'Original Prusa SL1S SPEED 3D Printer + CW1S BUNDLE',
    slug: 'original-prusa-sl1s-cw1s-bundle',
    series: 'SL1S',
    type: 'SLA',
    assemblyType: 'assembled',
    basePriceCAD: 4039,
    ourPriceCAD: calculateOurPrice(4039, DEFAULT_MARKUP_PERCENT),
    markupPercent: DEFAULT_MARKUP_PERCENT,
    stockStatus: 'in_stock',
    description: 'SL1S printer bundled with the CW1S Curing and Washing station for complete resin workflow.',
    shortDescription: 'Printer + Curing/Washing station complete bundle.',
    specs: {
      buildVolume: { x: 120, y: 68, z: 150 },
      layerHeight: { min: 0.01, max: 0.15 },
      xyResolution: 25,
      wavelength: 405,
      materials: ['Resin'],
      controller: '32-bit board',
      connectivity: ['Wi-Fi', 'Ethernet', 'USB'],
    },
    images: [],
    featuredImage: '',
    prusaProductUrl: 'https://www.prusa3d.com/product/original-prusa-sl1s-cw1s-bundle/',
    isActive: true,
    dateAdded: '2025-03-30',
    lastUpdated: '2025-03-30',
  },

  // === CORE L Critical Infrastructure (need price) ===
  {
    id: 'prusa-core-one-l-critical-infrastructure',
    name: 'Prusa CORE One L Critical Infrastructure Edition',
    slug: 'prusa-core-one-l-critical-infrastructure',
    series: 'CORE',
    type: 'FDM',
    assemblyType: 'assembled',
    isSpecialEdition: true,
    specialEditionType: 'Critical Infrastructure',
    basePriceCAD: 0, // UNKNOWN - needs scraping
    ourPriceCAD: 0,
    markupPercent: DEFAULT_MARKUP_PERCENT,
    stockStatus: 'special_order',
    description: 'Critical Infrastructure Edition of the CORE One L.',
    shortDescription: 'CORE One L Critical Infrastructure edition.',
    specs: {
      buildVolume: { x: 350, y: 300, z: 350 },
      layerHeight: { min: 0.05, max: 0.35 },
      materials: ['PLA', 'PETG', 'ASA', 'ABS', 'PC', 'PA', 'Flex'],
      controller: '32-bit board',
      connectivity: ['Wi-Fi', 'Ethernet', 'USB'],
    },
    images: [],
    featuredImage: '',
    prusaProductUrl: 'https://www.prusa3d.com/product/prusa-core-one-l-critical-infrastructure/',
    isActive: true,
    dateAdded: '2025-03-30',
    lastUpdated: '2025-03-30',
  },
];

// ============ UTILITY FUNCTIONS ============

export function getPrintersBySeries(series: string): PrusaPrinter[] {
  return PRUSA_PRINTERS.filter(p => p.series === series);
}

export function getPrintersByStockStatus(status: PrusaPrinter['stockStatus']): PrusaPrinter[] {
  return PRUSA_PRINTERS.filter(p => p.stockStatus === status);
}

export function getInStockPrinters(): PrusaPrinter[] {
  return PRUSA_PRINTERS.filter(p => p.stockStatus === 'in_stock');
}

export function getPrinterById(id: string): PrusaPrinter | undefined {
  return PRUSA_PRINTERS.find(p => p.id === id);
}

export function getPrinterBySlug(slug: string): PrusaPrinter | undefined {
  return PRUSA_PRINTERS.find(p => p.slug === slug);
}

export function updateMarkup(printer: PrusaPrinter, newMarkup: number): PrusaPrinter {
  return {
    ...printer,
    markupPercent: newMarkup,
    ourPriceCAD: calculateOurPrice(printer.basePriceCAD, newMarkup),
    lastUpdated: new Date().toISOString().split('T')[0],
  };
}

// Calculate price range for a category
export function getCategoryPriceRange(categoryId: string): { min: number; max: number } {
  const printers = getPrintersBySeries(categoryId);
  if (printers.length === 0) return { min: 0, max: 0 };
  
  const prices = printers.map(p => p.ourPriceCAD);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
}

// Export printer count stats
export const PRINTER_STATS = {
  total: PRUSA_PRINTERS.length,
  inStock: PRUSA_PRINTERS.filter(p => p.stockStatus === 'in_stock').length,
  leadTime: PRUSA_PRINTERS.filter(p => p.stockStatus === 'lead_time').length,
  bySeries: {
    CORE: getPrintersBySeries('CORE').length,
    XL: getPrintersBySeries('XL').length,
    MK4S: getPrintersBySeries('MK4S').length,
    MINI: getPrintersBySeries('MINI').length,
    SL1S: getPrintersBySeries('SL1S').length,
  },
};
