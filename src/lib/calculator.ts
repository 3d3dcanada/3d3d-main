import type { Material, Quality, LayerHeight, Supports, QuoteResult } from './types';

export const MATERIAL_RATES: Record<Material, number> = {
  PLA: 0.12,
  PETG: 0.20,
  TPU: 0.25,
  ASA: 0.30,
  ABS: 0.25,
};

export const MACHINE_RATE = 3.00;
export const OVERHEAD_SURCHARGE = 0.20;
export const PLATFORM_CUT = 0.25;
export const MIN_ORDER = 8.00;

export const QUALITY_MULTIPLIERS: Record<Quality, number> = {
  draft: 0.65,
  standard: 1.0,
  fine: 2.0,
};

export const LAYER_HEIGHT_MULTIPLIERS: Record<LayerHeight, number> = {
  '0.1': 1.5,
  '0.2': 1.0,
  '0.3': 0.75,
};

export const SUPPORT_MATERIAL_FACTORS: Record<Supports, number> = {
  none: 0,
  minimal: 0.05,
  full: 0.18,
};

export const DEFAULTS = {
  walls: 3,
  infill: 25,
  layerHeight: '0.2' as LayerHeight,
  supports: 'none' as Supports,
  infillType: 'gyroid' as const,
  scale: 1.0,
  quality: 'standard' as Quality,
  material: 'PLA' as Material,
  color: 'Black',
  quantity: 1,
};

export const TAX_RATES: Record<string, number> = {
  NB: 0.15, NS: 0.15, NL: 0.15, PE: 0.15,
  ON: 0.13, BC: 0.12, AB: 0.05, SK: 0.11,
  MB: 0.12, QC: 0.14975, YT: 0.05, NT: 0.05, NU: 0.05,
};

function getInfillMultiplier(infill: number): number {
  return 0.35 + (infill / 100) * 1.5;
}

export function calculateQuote(
  grams: number,
  hours: number,
  material: Material,
  quantity = 1,
  quality: Quality = 'standard',
  infill = 25,
  layerHeight: LayerHeight = '0.2',
  supports: Supports = 'none',
  scale = 1.0,
  walls = 3,
): QuoteResult {
  const scaleFactor = Math.pow(scale, 3);
  const scaledGrams = grams * scaleFactor;
  const scaledHours = hours * scaleFactor;

  const wallMultiplier = 1 + (walls - 3) * 0.05;
  const infillAdjustment = getInfillMultiplier(infill) / getInfillMultiplier(20);
  const layerMultiplier = LAYER_HEIGHT_MULTIPLIERS[layerHeight];
  const qualityMultiplier = QUALITY_MULTIPLIERS[quality];

  const adjustedGrams = scaledGrams * wallMultiplier * infillAdjustment;
  const adjustedHours = scaledHours * layerMultiplier * qualityMultiplier;

  const withSupports = adjustedGrams * (1 + SUPPORT_MATERIAL_FACTORS[supports]);

  const materialCost = withSupports * MATERIAL_RATES[material];
  const machineCost = adjustedHours * MACHINE_RATE;
  let baseCost = (materialCost + machineCost) * quantity;

  if (quantity >= 5) baseCost *= 0.9;

  const materialWaste = baseCost * 0.08;
  const recycling = baseCost * 0.04;
  const shopSupplies = baseCost * 0.04;
  const fuelSurcharge = baseCost * 0.04;
  const overhead = materialWaste + recycling + shopSupplies + fuelSurcharge;

  const finalPrice = Math.max(baseCost + overhead, MIN_ORDER * quantity);
  const makerPayout = finalPrice * (1 - PLATFORM_CUT);

  return {
    baseCost: Math.round(baseCost * 100) / 100,
    overhead: Math.round(overhead * 100) / 100,
    finalPrice: Math.round(finalPrice * 100) / 100,
    makerPayout: Math.round(makerPayout * 100) / 100,
    surchargeBreakdown: {
      materialWaste: Math.round(materialWaste * 100) / 100,
      recycling: Math.round(recycling * 100) / 100,
      shopSupplies: Math.round(shopSupplies * 100) / 100,
      fuelSurcharge: Math.round(fuelSurcharge * 100) / 100,
    },
    perUnit: Math.round((finalPrice / quantity) * 100) / 100,
  };
}
