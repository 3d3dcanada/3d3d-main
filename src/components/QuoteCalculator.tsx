import { useState, useMemo } from 'react';
import {
  calculateQuote,
  MATERIAL_RATES,
  QUALITY_MULTIPLIERS,
  LAYER_HEIGHT_MULTIPLIERS,
  SUPPORT_MATERIAL_FACTORS,
  DEFAULTS,
  TAX_RATES,
} from '../lib/calculator';
import type { Material, Quality, LayerHeight, Supports, InfillType } from '../lib/types';

const MATERIALS = Object.keys(MATERIAL_RATES) as Material[];
const QUALITIES = Object.keys(QUALITY_MULTIPLIERS) as Quality[];
const LAYER_HEIGHTS = Object.keys(LAYER_HEIGHT_MULTIPLIERS) as LayerHeight[];
const SUPPORTS_OPTIONS = Object.keys(SUPPORT_MATERIAL_FACTORS) as Supports[];
const INFILL_TYPES: InfillType[] = ['grid', 'gyroid', 'honeycomb', 'lightning'];
const PROVINCES = Object.keys(TAX_RATES);

const T = {
  bg: '#0D0E1A',
  surface: '#141525',
  surface2: '#1C1D30',
  border: 'rgba(255,255,255,0.07)',
  text: '#E8E8F2',
  muted: '#7878A0',
  dimmed: '#4A4A6A',
  teal: '#00C4CC',
  magenta: '#FF2D92',
};

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
  return (
    <div>
      <label style={{ display: 'block', fontFamily: 'var(--font-tech)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em', color: T.dimmed, marginBottom: '6px' }}>
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: '100%', padding: '10px 12px', background: T.surface2, border: `1px solid ${T.border}`, borderRadius: '8px', color: T.text, fontSize: '13px', fontFamily: 'var(--font-sans)', outline: 'none' }}
      >
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

function Slider({ label, value, onChange, min, max, step, unit }: { label: string; value: number; onChange: (v: number) => void; min: number; max: number; step: number; unit: string }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
        <label style={{ fontFamily: 'var(--font-tech)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em', color: T.dimmed }}>{label}</label>
        <span style={{ fontFamily: 'var(--font-tech)', fontSize: '12px', fontWeight: 700, color: T.teal }}>{value}{unit}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: '100%', accentColor: T.teal }}
      />
    </div>
  );
}

export default function QuoteCalculator({ initialProduct }: { initialProduct?: string }) {
  const [grams, setGrams] = useState(50);
  const [hours, setHours] = useState(2);
  const [material, setMaterial] = useState<Material>(DEFAULTS.material);
  const [quantity, setQuantity] = useState(DEFAULTS.quantity);
  const [quality, setQuality] = useState<Quality>(DEFAULTS.quality);
  const [infill, setInfill] = useState(DEFAULTS.infill);
  const [layerHeight, setLayerHeight] = useState<LayerHeight>(DEFAULTS.layerHeight);
  const [supports, setSupports] = useState<Supports>(DEFAULTS.supports);
  const [scale, setScale] = useState(DEFAULTS.scale);
  const [walls, setWalls] = useState(DEFAULTS.walls);
  const [province, setProvince] = useState('NB');

  const quote = useMemo(() => calculateQuote(
    grams, hours, material, quantity, quality, infill, layerHeight, supports, scale, walls,
  ), [grams, hours, material, quantity, quality, infill, layerHeight, supports, scale, walls]);

  const taxRate = TAX_RATES[province] ?? 0;
  const tax = quote.finalPrice * taxRate;
  const total = quote.finalPrice + tax;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px', maxWidth: '960px' }} className="lg:!grid-cols-[1fr_340px]">
      {/* Controls */}
      <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: '12px', padding: '24px' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, color: T.text, marginBottom: '20px' }}>Print Parameters</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
          <Slider label="Weight" value={grams} onChange={setGrams} min={5} max={2000} step={5} unit="g" />
          <Slider label="Print Time" value={hours} onChange={setHours} min={0.5} max={100} step={0.5} unit="h" />
          <Select label="Material" value={material} onChange={(v) => setMaterial(v as Material)} options={MATERIALS.map((m) => ({ value: m, label: `${m} — $${MATERIAL_RATES[m]}/g` }))} />
          <Select label="Quality" value={quality} onChange={(v) => setQuality(v as Quality)} options={QUALITIES.map((q) => ({ value: q, label: q.charAt(0).toUpperCase() + q.slice(1) }))} />
          <Select label="Layer Height" value={layerHeight} onChange={(v) => setLayerHeight(v as LayerHeight)} options={LAYER_HEIGHTS.map((h) => ({ value: h, label: `${h}mm` }))} />
          <Slider label="Infill" value={infill} onChange={setInfill} min={5} max={100} step={5} unit="%" />
          <Select label="Supports" value={supports} onChange={(v) => setSupports(v as Supports)} options={SUPPORTS_OPTIONS.map((s) => ({ value: s, label: s.charAt(0).toUpperCase() + s.slice(1) }))} />
          <Slider label="Walls" value={walls} onChange={setWalls} min={1} max={8} step={1} unit="" />
          <Slider label="Scale" value={scale} onChange={setScale} min={0.5} max={3.0} step={0.1} unit="×" />
          <Slider label="Quantity" value={quantity} onChange={setQuantity} min={1} max={50} step={1} unit="" />
          <Select label="Province" value={province} onChange={setProvince} options={PROVINCES.map((p) => ({ value: p, label: `${p} — ${(TAX_RATES[p] * 100).toFixed(1)}%` }))} />
        </div>

        {quantity >= 5 && (
          <div style={{ marginTop: '12px', padding: '8px 12px', borderRadius: '8px', background: 'rgba(0,196,204,0.08)', border: '1px solid rgba(0,196,204,0.15)', fontSize: '12px', color: T.teal }}>
            10% volume discount applied (5+ units)
          </div>
        )}
      </div>

      {/* Summary */}
      <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: '12px', padding: '24px', alignSelf: 'start', position: 'sticky', top: '80px' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, color: T.text, marginBottom: '16px' }}>Quote Summary</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Row label="Base cost" value={`$${quote.baseCost.toFixed(2)}`} />
          <Row label="Material waste" value={`$${quote.surchargeBreakdown.materialWaste.toFixed(2)}`} dim />
          <Row label="Recycling" value={`$${quote.surchargeBreakdown.recycling.toFixed(2)}`} dim />
          <Row label="Shop supplies" value={`$${quote.surchargeBreakdown.shopSupplies.toFixed(2)}`} dim />
          <Row label="Fuel surcharge" value={`$${quote.surchargeBreakdown.fuelSurcharge.toFixed(2)}`} dim />

          <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: '8px', marginTop: '4px' }}>
            <Row label="Subtotal" value={`$${quote.finalPrice.toFixed(2)}`} bold />
            <Row label={`Tax (${province} ${(taxRate * 100).toFixed(1)}%)`} value={`$${tax.toFixed(2)}`} />
          </div>

          <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: '8px', marginTop: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontFamily: 'var(--font-tech)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: T.text, fontWeight: 700 }}>Total</span>
              <span style={{ fontFamily: 'var(--font-tech)', fontSize: '28px', fontWeight: 900, color: T.teal }}>${total.toFixed(2)}</span>
            </div>
            {quantity > 1 && (
              <p style={{ textAlign: 'right', fontFamily: 'var(--font-tech)', fontSize: '11px', color: T.dimmed }}>
                ${quote.perUnit.toFixed(2)}/unit
              </p>
            )}
          </div>

          <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: '12px', marginTop: '4px' }}>
            <Row label="Maker payout (75%)" value={`$${quote.makerPayout.toFixed(2)}`} accent />
          </div>
        </div>

        <a
          href={`mailto:info@3d3d.ca?subject=Quote Request&body=Material: ${material}%0AQuantity: ${quantity}%0AEstimated: $${total.toFixed(2)}`}
          style={{ display: 'block', width: '100%', textAlign: 'center', padding: '12px', marginTop: '16px', borderRadius: '8px', background: T.teal, color: T.bg, fontWeight: 600, fontSize: '14px', textDecoration: 'none' }}
        >
          Request This Quote
        </a>
      </div>
    </div>
  );
}

function Row({ label, value, bold, dim, accent }: { label: string; value: string; bold?: boolean; dim?: boolean; accent?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontFamily: 'var(--font-tech)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: dim ? T.dimmed : T.muted }}>
        {label}
      </span>
      <span style={{ fontFamily: 'var(--font-tech)', fontSize: bold ? '16px' : '13px', fontWeight: bold ? 700 : 500, color: accent ? T.teal : (dim ? T.dimmed : T.text) }}>
        {value}
      </span>
    </div>
  );
}
