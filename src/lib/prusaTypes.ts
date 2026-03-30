/**
 * Type definitions for Prusa Research products
 * Used for the unofficial 3D3D reseller catalog
 */

// ============ PRINTER TYPES ============

export type PrinterSeries = 'CORE' | 'XL' | 'MK4S' | 'MINI' | 'SL1S';
export type PrinterType = 'FDM' | 'SLA';
export type AssemblyType = 'assembled' | 'kit' | 'semi-assembled';

export interface PrinterSpecs {
  buildVolume: {
    x: number; // mm
    y: number;
    z: number;
  };
  layerHeight: {
    min: number; // mm
    max: number;
  };
  nozzleDiameter?: number; // mm (FDM only)
  maxNozzleTemp?: number; // °C
  maxBedTemp?: number; // °C
  printSpeed?: string;
  materials: string[];
  controller: string;
  connectivity: string[];
  display?: string;
  filamentDiameter?: number; // mm (FDM only)
  // SLA specific
  xyResolution?: number; // μm
  layerResolution?: string;
  wavelength?: number; // nm
  resinTankVolume?: string;
}

export interface PrusaPrinter {
  id: string;
  name: string;
  slug: string;
  series: PrinterSeries;
  type: PrinterType;
  assemblyType: AssemblyType;
  isSpecialEdition?: boolean;
  specialEditionType?: string; // e.g., 'Ultimate', 'Critical Infrastructure'

  // Pricing
  basePriceCAD: number;
  ourPriceCAD: number;
  markupPercent: number;

  // Stock
  stockStatus: 'in_stock' | 'high_demand' | 'lead_time' | 'out_of_stock' | 'special_order';
  leadTimeWeeks?: string;

  // Content
  description: string;
  shortDescription?: string;
  seoTitle?: string;
  seoDescription?: string;
  specs: PrinterSpecs;

  // Images
  images: string[];
  featuredImage: string;

  // Links
  prusaProductUrl: string;
  isActive: boolean;
  dateAdded: string;
  lastUpdated: string;
}

// ============ FILAMENT TYPES ============

export type FilamentMaterial =
  | 'PLA'
  | 'PETG'
  | 'ASA'
  | 'ABS'
  | 'PC'
  | 'PA'
  | 'TPU'
  | 'PVB'
  | 'Composite'
  | 'Resin';

export interface FilamentColor {
  name: string;
  hex: string;
  prusaSku?: string;
  inStock: boolean;
}

export interface FilamentSpecs {
  diameter: string; // e.g., '1.75mm'
  weight: number; // grams
  printTemp: {
    min: number;
    max: number;
  };
  bedTemp: {
    min: number;
    max: number;
  };
  properties: string[]; // e.g., ['easy to print', 'durable', 'weather resistant']
  useCases: string[];
  compatibility: string[]; // printer IDs
}

export interface BulkPricingTier {
  minSpools: number;
  maxSpools?: number;
  pricePerSpoolCAD: number;
  discountPercent: number;
}

export interface PrusaFilament {
  id: string;
  name: string;
  slug: string;
  material: FilamentMaterial;
  variant?: string; // e.g., 'Carbon Fiber', 'Metallic'

  // Pricing (per spool)
  basePriceCAD: number;
  ourPriceCAD: number;
  markupPercent: number;

  // Colors
  colors: FilamentColor[];

  // Bulk
  bulkPricing: BulkPricingTier[];

  // Specs
  specs: FilamentSpecs;

  // Stock
  stockStatus: 'in_stock' | 'limited' | 'out_of_stock' | 'discontinued';

  // Content
  description: string;
  seoTitle?: string;
  seoDescription?: string;

  // Images
  images: string[];
  featuredImage: string;

  // Links
  prusaProductUrl: string;
  isActive: boolean;
  dateAdded: string;
  lastUpdated: string;
}

// ============ PART TYPES ============

export type PartCategory =
  | 'nozzle'
  | 'heatbreak'
  | 'thermistor'
  | 'heater_cartridge'
  | 'build_plate'
  | 'electronics'
  | 'mechanical'
  | 'belts'
  | 'fans'
  | 'maintenance_kit'
  | 'upgrade_kit'
  | 'lcd'
  | 'cables'
  | 'extruder_parts';

export interface PrusaPart {
  id: string;
  name: string;
  slug: string;
  category: PartCategory;
  subCategory?: string;

  // Compatibility
  compatiblePrinters: string[]; // printer IDs
  compatibleSeries?: PrinterSeries[];

  // Pricing
  basePriceCAD: number;
  ourPriceCAD: number;
  markupPercent: number;

  // Details
  description: string;
  specifications?: Record<string, string>; // e.g., { 'Diameter': '0.4mm', 'Material': 'Brass' }
  isEssential?: boolean;
  isUpgrade?: boolean;

  // Stock
  stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock';

  // Images
  images: string[];
  featuredImage: string;

  // Links
  prusaProductUrl: string;
  isActive: boolean;
  dateAdded: string;
  lastUpdated: string;
}

// ============ BUNDLE/KIT TYPES ============

export interface PrusaBundle {
  id: string;
  name: string;
  slug: string;
  description: string;
  items: {
    productId: string;
    productType: 'printer' | 'filament' | 'part';
    quantity: number;
  }[];
  basePriceCAD: number;
  ourPriceCAD: number;
  markupPercent: number;
  savings?: number; // compared to buying separately
  images: string[];
  isActive: boolean;
}

// ============ CATEGORY METADATA ============

export interface PrinterCategoryMeta {
  id: PrinterSeries;
  name: string;
  description: string;
  minPrice: number;
  maxPrice: number;
  targetAudience: string[];
}

export interface FilamentCategoryMeta {
  id: FilamentMaterial;
  name: string;
  shortName: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  typicalUseCases: string[];
}

// ============ UTILITY TYPES ============

export interface ScrapeResult<T> {
  data: T[];
  errors: string[];
  scrapedAt: string;
  source: string;
}

export interface PriceUpdate {
  productId: string;
  productType: 'printer' | 'filament' | 'part';
  oldPrice: number;
  newPrice: number;
  oldOurPrice: number;
  newOurPrice: number;
  detectedAt: string;
}

// ============ MARKUP CALCULATOR ============

export function calculateOurPrice(basePrice: number, markupPercent: number): number {
  return Math.round((basePrice * (1 + markupPercent / 100)) * 100) / 100;
}

export function formatPriceCAD(price: number): string {
  return `CA$ ${price.toFixed(2)}`;
}

// ============ DEFAULT VALUES ============

export const DEFAULT_MARKUP_PERCENT = 17.5; // Middle of 15-20% range
export const MIN_MARKUP_PERCENT = 15;
export const MAX_MARKUP_PERCENT = 20;
