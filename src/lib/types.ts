export type Material = 'PLA' | 'PETG' | 'TPU' | 'ABS' | 'ASA';
export type Quality = 'draft' | 'standard' | 'fine';
export type LayerHeight = '0.1' | '0.2' | '0.3';
export type Supports = 'none' | 'minimal' | 'full';
export type InfillType = 'grid' | 'gyroid' | 'honeycomb' | 'lightning';
export type CatalogSource = 'printables' | 'thingiverse' | 'makerworld' | '3d3d' | 'custom';
export type CatalogCategory = 'home-decor' | 'tools-repair' | 'diy-makers' | 'crafts-gifts' | 'automotive' | 'marine' | 'masks-costume' | 'toys-collectibles' | 'seasonal-holiday' | 'small-business-hospitality';

export interface CatalogCategoryMeta {
  id: CatalogCategory;
  label: string;
  description: string;
}

export interface CatalogMaterialPricing {
  material: Material;
  price: number;
  isDefault?: boolean;
}

export interface CatalogPurchaseOption {
  id: string;
  label: string;
  description?: string;
  pricing: CatalogMaterialPricing[];
  isDefault?: boolean;
}

export interface SizePreset {
  label: string;
  scale: number;
}

export interface PrintSettings {
  layerHeight: LayerHeight;
  infill: number;
  infillType: InfillType;
  supports: Supports;
  walls: number;
  notes?: string;
}

export interface CatalogItem {
  id: string;
  name: string;
  description: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  category: CatalogCategory;
  grams: number;
  hours: number;
  material: Material;
  colors: string[];
  basePrice: number;
  purchaseOptions?: CatalogPurchaseOption[];
  images: string[];
  tags: string[];
  isPopular?: boolean;
  isTrending?: boolean;
  isNew?: boolean;
  makerNote?: string;
  source?: CatalogSource;
  sizePresets?: SizePreset[];
  recommendedSettings?: PrintSettings;
}

export interface QuoteResult {
  baseCost: number;
  overhead: number;
  finalPrice: number;
  makerPayout: number;
  surchargeBreakdown: {
    materialWaste: number;
    recycling: number;
    shopSupplies: number;
    fuelSurcharge: number;
  };
  perUnit: number;
}

export const CATEGORY_LABELS: Record<CatalogCategory, string> = {
  'home-decor': 'Home Decor',
  'tools-repair': 'Tools & Repair',
  'diy-makers': 'DIY Makers',
  'crafts-gifts': 'Crafts & Gifts',
  'automotive': 'Automotive',
  'marine': 'Marine',
  'masks-costume': 'Masks & Costume',
  'toys-collectibles': 'Toys & Collectibles',
  'seasonal-holiday': 'Seasonal & Holiday',
  'small-business-hospitality': 'Small Business & Hospitality',
};

export const SOURCE_LABELS: Record<CatalogSource, { label: string; color: string }> = {
  printables: { label: 'Printables', color: '#FA6831' },
  thingiverse: { label: 'Thingiverse', color: '#248BFB' },
  makerworld: { label: 'MakerWorld', color: '#1AB4B4' },
  '3d3d': { label: '3D3D Original', color: '#00C4CC' },
  custom: { label: 'Community', color: '#A855F7' },
};
