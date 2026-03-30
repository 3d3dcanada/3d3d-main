/**
 * Prusa Products Database - Main Export
 * Organized data for 3D3D as unofficial Prusa reseller
 * Last updated: 2025-03-30
 */

// Re-export all data
export * from './printers';
export * from './filaments';
export * from './parts';

// Combined statistics
export const PRUSA_DB_STATS = {
  lastUpdated: '2025-03-30',
  currency: 'CAD',
  defaultMarkupPercent: 17.5,
  markupRange: { min: 15, max: 20 },
  printers: {
    total: 14,
    inStock: 10,
    leadTime: 3,
    specialOrder: 1,
  },
  filaments: {
    total: 12,
    materials: 8,
    colors: 12,
  },
  parts: {
    total: 15,
    categories: 9,
  },
};

// Quick lookup helpers
export {
  // Printers
  getPrinterById,
  getPrinterBySlug,
  getPrintersBySeries,
  getInStockPrinters,
  getPrintersByStockStatus,
  updateMarkup as updatePrinterMarkup,
  PRINTER_STATS,
  PRUSA_PRINTERS,
  PRINTER_CATEGORIES,
} from './printers';

export {
  // Filaments
  getFilamentById,
  getFilamentsByMaterial,
  getFilamentsInStock,
  getFilamentColors,
  calculateBulkPrice,
  FILAMENT_STATS,
  PRUSA_FILAMENTS,
  FILAMENT_CATEGORIES,
} from './filaments';

export {
  // Parts
  getPartById,
  getPartsByCategory,
  getPartsByPrinterCompatibility,
  getEssentialParts,
  getUpgradeParts,
  PART_STATS,
  PRUSA_PARTS,
  PART_CATEGORIES,
} from './parts';

// Re-export types from prusaTypes for convenience
export type {
  PrusaPrinter,
  PrusaFilament,
  PrusaPart,
  PrinterSeries,
  AssemblyType,
  PrinterSpecs,
  FilamentSpecs,
  FilamentMaterial,
  FilamentColor,
  BulkPricingTier,
  PrinterCategoryMeta,
  FilamentCategoryMeta,
  PartCategory,
} from '../../lib/prusaTypes';

// Local types not exported from prusaTypes.ts
export type { PartCategoryMeta } from './parts';

export {
  calculateOurPrice,
  DEFAULT_MARKUP_PERCENT,
  MIN_MARKUP_PERCENT,
  MAX_MARKUP_PERCENT,
  formatPriceCAD,
} from '../../lib/prusaTypes';
