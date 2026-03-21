import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import {
  calculateQuote,
  DEFAULTS,
  TAX_RATES,
} from '../lib/calculator';
import { CATALOG, getCatalogItemById } from '../lib/catalog';
import type { LayerHeight, Material, Quality, Supports } from '../lib/types';

declare global {
  interface Window {
    track3d3d?: (eventName: string, detail?: Record<string, unknown>) => void;
  }
}

const FORM_ENDPOINT = 'https://formspree.io/f/mldlydbl';
const ACCEPT_ATTR = '.stl,.3mf,.step,.stp,.obj,.pdf,.png,.jpg,.jpeg,.webp';
const MAX_FILES = 5;
const MAX_TOTAL_BYTES = 20 * 1024 * 1024;

const MATERIAL_OPTIONS: Array<{ value: Material; label: string; hint: string }> = [
  { value: 'PLA', label: 'PLA', hint: 'Best for everyday parts and prototypes' },
  { value: 'PETG', label: 'PETG', hint: 'Durable utility parts with more flex' },
  { value: 'TPU', label: 'TPU', hint: 'Flexible prints and protective pieces' },
  { value: 'ABS', label: 'ABS', hint: 'Tougher parts with a classic finish' },
  { value: 'ASA', label: 'ASA', hint: 'Outdoor-ready parts with UV resistance' },
];

const QUALITY_OPTIONS: Array<{ value: Quality; label: string; hint: string }> = [
  { value: 'draft', label: 'Draft', hint: 'Faster turnaround with visible layers' },
  { value: 'standard', label: 'Standard', hint: 'Balanced quality for most orders' },
  { value: 'fine', label: 'Fine', hint: 'Higher detail with longer print time' },
];

const LAYER_HEIGHT_OPTIONS: Array<{ value: LayerHeight; label: string; hint: string }> = [
  { value: '0.1', label: '0.1 mm', hint: 'Detail-first surface finish' },
  { value: '0.2', label: '0.2 mm', hint: 'Best overall balance' },
  { value: '0.3', label: '0.3 mm', hint: 'Coarser layers for speed' },
];

const SUPPORT_OPTIONS: Array<{ value: Supports; label: string; hint: string }> = [
  { value: 'none', label: 'None', hint: 'No support material added' },
  { value: 'minimal', label: 'Minimal', hint: 'Only where needed for stability' },
  { value: 'full', label: 'Full', hint: 'Maximum support for complex geometry' },
];

const PROVINCE_OPTIONS = [
  'AB',
  'BC',
  'MB',
  'NB',
  'NL',
  'NS',
  'NT',
  'NU',
  'ON',
  'PE',
  'QC',
  'SK',
  'YT',
] as const;

const PROVINCE_LABELS: Record<(typeof PROVINCE_OPTIONS)[number], string> = {
  AB: 'Alberta',
  BC: 'British Columbia',
  MB: 'Manitoba',
  NB: 'New Brunswick',
  NL: 'Newfoundland and Labrador',
  NS: 'Nova Scotia',
  NT: 'Northwest Territories',
  NU: 'Nunavut',
  ON: 'Ontario',
  PE: 'Prince Edward Island',
  QC: 'Quebec',
  SK: 'Saskatchewan',
  YT: 'Yukon',
};

const SUPPORTED_EXTENSIONS = ['stl', '3mf', 'step', 'stp', 'obj', 'pdf', 'png', 'jpg', 'jpeg', 'webp'];

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 2,
  }).format(value);
}

function formatTaxRate(value: number) {
  return `${(value * 100).toFixed(value * 100 % 1 === 0 ? 0 : 3).replace(/0+$/, '').replace(/\.$/, '')}%`;
}

function formatBytes(size: number) {
  if (size < 1024 * 1024) return `${Math.max(1, Math.round(size / 1024))} KB`;
  return `${(size / (1024 * 1024)).toFixed(1).replace(/\.0$/, '')} MB`;
}

function getExtension(fileName: string) {
  return fileName.split('.').pop()?.toLowerCase() ?? '';
}

function clampNumber(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

function validateIncomingFiles(incoming: File[]) {
  if (incoming.length > MAX_FILES) {
    return { accepted: [] as File[], error: `Please upload ${MAX_FILES} files or fewer.` };
  }

  const invalid = incoming.find((file) => !SUPPORTED_EXTENSIONS.includes(getExtension(file.name)));
  if (invalid) {
    return {
      accepted: [] as File[],
      error: `Unsupported file type for ${invalid.name}. Send STL, 3MF, STEP, STP, OBJ, PDF, PNG, JPG, JPEG, or WEBP.`,
    };
  }

  const totalBytes = incoming.reduce((sum, file) => sum + file.size, 0);
  if (totalBytes > MAX_TOTAL_BYTES) {
    return {
      accepted: [] as File[],
      error: `Total upload size must stay under ${formatBytes(MAX_TOTAL_BYTES)}.`,
    };
  }

  return { accepted: incoming, error: '' };
}

function QuoteField({
  label,
  htmlFor,
  hint,
  required = false,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="quote-field" htmlFor={htmlFor}>
      <span className="quote-field__label">
        {label}
        {required ? <em>Required</em> : null}
      </span>
      {children}
      {hint ? <span className="quote-field__hint">{hint}</span> : null}
    </label>
  );
}

function trackQuoteEvent(eventName: string, detail: Record<string, unknown>) {
  if (typeof window !== 'undefined') {
    window.track3d3d?.(eventName, detail);
  }
}

export default function QuoteCalculator() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const startedRef = useRef(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [projectDetails, setProjectDetails] = useState('');
  const [quantity, setQuantity] = useState(DEFAULTS.quantity);
  const [materialPreference, setMaterialPreference] = useState<Material | ''>('');
  const [deadline, setDeadline] = useState('');
  const [location, setLocation] = useState('');
  const [consent, setConsent] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [source, setSource] = useState('quote-page');
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [showEstimate, setShowEstimate] = useState(false);

  const [grams, setGrams] = useState(50);
  const [hours, setHours] = useState(2);
  const [material, setMaterial] = useState<Material>(DEFAULTS.material);
  const [quality, setQuality] = useState<Quality>(DEFAULTS.quality);
  const [infill, setInfill] = useState(DEFAULTS.infill);
  const [layerHeight, setLayerHeight] = useState<LayerHeight>(DEFAULTS.layerHeight);
  const [supports, setSupports] = useState<Supports>(DEFAULTS.supports);
  const [scale, setScale] = useState(DEFAULTS.scale);
  const [walls, setWalls] = useState(DEFAULTS.walls);
  const [province, setProvince] = useState<(typeof PROVINCE_OPTIONS)[number]>('NB');

  const selectedProduct = useMemo(
    () => (selectedProductId ? getCatalogItemById(selectedProductId) ?? null : null),
    [selectedProductId],
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const productParam = params.get('product');
    const sourceParam = params.get('source');

    if (sourceParam) setSource(sourceParam);

    if (productParam) {
      const product = getCatalogItemById(productParam);
      if (product) {
        setSelectedProductId(product.id);
        setMaterialPreference(product.material);
        setMaterial(product.material);
        setGrams(Math.max(5, Math.round(product.grams)));
        setHours(Math.max(0.5, Math.round(product.hours * 2) / 2));

        if (product.recommendedSettings) {
          setLayerHeight(product.recommendedSettings.layerHeight);
          setInfill(product.recommendedSettings.infill);
          setSupports(product.recommendedSettings.supports);
          setWalls(product.recommendedSettings.walls);
        }

        setProjectDetails((current) =>
          current
            ? current
            : `I'm interested in ${product.name}. Please quote this item and let me know the next steps.`,
        );
      }
    }
  }, []);

  const quote = useMemo(
    () =>
      calculateQuote(
        grams,
        hours,
        material,
        quantity,
        quality,
        infill,
        layerHeight,
        supports,
        scale,
        walls,
      ),
    [grams, hours, infill, layerHeight, material, quality, quantity, scale, supports, walls],
  );

  const taxRate = TAX_RATES[province] ?? 0;
  const tax = quote.finalPrice * taxRate;
  const total = quote.finalPrice + tax;

  const markStarted = (reason: string) => {
    if (startedRef.current) return;
    startedRef.current = true;
    trackQuoteEvent('quote_started', {
      source,
      reason,
      product: selectedProductId || null,
    });
  };

  const applyProductSelection = (productId: string) => {
    setSelectedProductId(productId);

    const product = getCatalogItemById(productId);
    if (!product) return;

    setMaterialPreference(product.material);
    setMaterial(product.material);
    setGrams(Math.max(5, Math.round(product.grams)));
    setHours(Math.max(0.5, Math.round(product.hours * 2) / 2));

    if (product.recommendedSettings) {
      setLayerHeight(product.recommendedSettings.layerHeight);
      setInfill(product.recommendedSettings.infill);
      setSupports(product.recommendedSettings.supports);
      setWalls(product.recommendedSettings.walls);
    }

    if (!projectDetails.trim()) {
      setProjectDetails(`I'm interested in ${product.name}. Please quote this item and let me know the next steps.`);
    }
  };

  const updateFiles = (incomingFiles: File[]) => {
    const { accepted, error } = validateIncomingFiles(incomingFiles);
    setFileError(error);
    if (error) return;
    setFiles(accepted);
    if (accepted.length) {
      markStarted('file_upload');
      trackQuoteEvent('file_attached', {
        source,
        count: accepted.length,
        product: selectedProductId || null,
      });
    }
  };

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateFiles(Array.from(event.target.files ?? []));
  };

  const handleDrop = (event: React.DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setDragActive(false);
    updateFiles(Array.from(event.dataTransfer.files ?? []));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const honeypot = event.currentTarget.querySelector<HTMLInputElement>('input[name="_gotcha"]')?.value ?? '';
    if (honeypot.trim()) return;
    markStarted('form_submit');

    if (!projectDetails.trim() && files.length === 0) {
      setSubmitError('Add a project description or attach at least one file so we know what to quote.');
      return;
    }

    if (!consent) {
      setSubmitError('Please confirm consent so we can reply to your quote request.');
      return;
    }

    setSubmitting(true);
    setSubmitError('');

    try {
      const formData = new FormData();
      formData.append('_subject', selectedProduct ? `Quote Request — ${selectedProduct.name}` : 'Quote Request — 3D3D');
      formData.append('name', name);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('company', company);
      formData.append('project_description', projectDetails);
      formData.append('quantity', String(quantity));
      formData.append('material_preference', materialPreference || 'No preference');
      formData.append('target_deadline', deadline);
      formData.append('location', location);
      formData.append('casl_consent', consent ? 'yes' : 'no');
      formData.append('originating_product', selectedProduct?.name ?? 'Custom / not listed');
      formData.append('originating_product_id', selectedProductId || '');
      formData.append('source', source);
      formData.append('estimate_material', material);
      formData.append('estimate_quality', quality);
      formData.append('estimate_layer_height', layerHeight);
      formData.append('estimate_supports', supports);
      formData.append('estimate_grams', String(grams));
      formData.append('estimate_hours', String(hours));
      formData.append('estimate_total', formatCurrency(total));
      formData.append('estimate_tax_region', `${province} ${formatTaxRate(taxRate)}`);

      files.forEach((file) => formData.append('files', file));

      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('The quote request could not be sent right now.');
      }

      setSuccess(true);
      trackQuoteEvent('quote_submitted', {
        source,
        product: selectedProductId || null,
        attachments: files.length,
      });
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'The quote request could not be sent right now.');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <>
        <div className="quote-shell quote-shell--success surface-panel">
          <div className="quote-success">
            <span className="eyebrow">Quote request received</span>
            <h2 className="quote-success__title">Thanks. We have your project details.</h2>
            <p className="quote-success__copy">
              We will review the files, notes, and timeline you sent, then follow up with final
              pricing and next steps. If the part needs clarification, we will ask before moving
              ahead.
            </p>

            <div className="quote-success__grid">
              <div>
                <strong>What happens next</strong>
                <span>File review, routing to the right maker, then quote confirmation.</span>
              </div>
              <div>
                <strong>Typical follow-up</strong>
                <span>Usually within the next business day for standard requests.</span>
              </div>
            </div>

            <div className="quote-success__actions">
              <a href="/shop" className="btn btn-primary">
                Browse products
              </a>
              <a href="/quote?source=quote-success-reset" className="btn btn-secondary">
                Start another quote
              </a>
            </div>
          </div>
        </div>

        <style>{quoteStyles}</style>
      </>
    );
  }

  return (
    <>
      <div className="quote-shell">
        <div className="quote-grid">
          <form className="quote-card quote-card--form" onSubmit={handleSubmit}>
            <div className="quote-intro">
              <span className="eyebrow">Lead-first quote intake</span>
              <h2 className="quote-title">Send the project first. Tune the print later.</h2>
              <p className="quote-copy">
                Upload your files, describe the part, tell us how many you need, and share the
                timeline. The instant estimate is optional support for people who want it.
              </p>
            </div>

            <div className="quote-card__section">
              <div className="quote-section-head">
                <div>
                  <h3>Project intake</h3>
                  <p>The core information we need to qualify and quote the job properly.</p>
                </div>
              </div>

              <div
                aria-hidden="true"
                style={{ position: 'absolute', left: '-100vw', width: '1px', height: '1px', overflow: 'hidden' }}
              >
                <label htmlFor="quote-website">Leave this field blank</label>
                <input id="quote-website" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="quote-form-grid">
                <QuoteField label="Full name" htmlFor="quote-name" required>
                  <input
                    id="quote-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={name}
                    onFocus={() => markStarted('name_focus')}
                    onChange={(event) => setName(event.target.value)}
                    required
                  />
                </QuoteField>

                <QuoteField label="Email" htmlFor="quote-email" required>
                  <input
                    id="quote-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onFocus={() => markStarted('email_focus')}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </QuoteField>

                <QuoteField label="Phone" htmlFor="quote-phone" hint="Optional, only if you want a call back.">
                  <input
                    id="quote-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                  />
                </QuoteField>

                <QuoteField label="Company" htmlFor="quote-company" hint="Optional. Useful for business or hospitality orders.">
                  <input
                    id="quote-company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    value={company}
                    onChange={(event) => setCompany(event.target.value)}
                  />
                </QuoteField>

                <QuoteField label="Originating product" htmlFor="quote-product" hint="Choose a catalog item or leave it as custom work.">
                  <select
                    id="quote-product"
                    name="originating_product_id"
                    value={selectedProductId}
                    onChange={(event) => applyProductSelection(event.target.value)}
                  >
                    <option value="">Custom / not listed</option>
                    {CATALOG.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </QuoteField>

                <QuoteField label="Quantity" htmlFor="quote-quantity" required>
                  <input
                    id="quote-quantity"
                    name="quantity"
                    type="number"
                    min={1}
                    max={500}
                    value={quantity}
                    onChange={(event) => setQuantity(clampNumber(Number(event.target.value) || 1, 1, 500))}
                    required
                  />
                </QuoteField>

                <QuoteField label="Material preference" htmlFor="quote-material" hint="Optional. Choose only if you already know the material.">
                  <select
                    id="quote-material"
                    name="material_preference"
                    value={materialPreference}
                    onChange={(event) => setMaterialPreference((event.target.value as Material | '') || '')}
                  >
                    <option value="">No preference</option>
                    {MATERIAL_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </QuoteField>

                <QuoteField label="Target deadline" htmlFor="quote-deadline" hint="Optional. If it is time-sensitive, tell us now.">
                  <input
                    id="quote-deadline"
                    name="target_deadline"
                    type="date"
                    value={deadline}
                    onChange={(event) => setDeadline(event.target.value)}
                  />
                </QuoteField>

                <QuoteField label="City / province or postal code" htmlFor="quote-location" required hint="Used for routing and shipping context.">
                  <input
                    id="quote-location"
                    name="location"
                    type="text"
                    autoComplete="postal-code"
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    required
                  />
                </QuoteField>
              </div>

              <QuoteField
                label="Project description / notes"
                htmlFor="quote-project"
                required
                hint="Tell us what the part does, where it will be used, size expectations, finish requirements, and anything unusual."
              >
                <textarea
                  id="quote-project"
                  name="project_description"
                  rows={6}
                  value={projectDetails}
                  onChange={(event) => {
                    markStarted('project_details');
                    setProjectDetails(event.target.value);
                  }}
                  required
                />
              </QuoteField>

              <div className="quote-field">
                <span className="quote-field__label">
                  File upload
                  <em>Optional but recommended</em>
                </span>

                <button
                  type="button"
                  className={`quote-dropzone ${dragActive ? 'is-active' : ''}`}
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(event) => {
                    event.preventDefault();
                    setDragActive(true);
                  }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={handleDrop}
                >
                  <strong>Drag and drop files here</strong>
                  <span>or click to choose files</span>
                  <small>{ACCEPT_ATTR.replaceAll(',', ' · ').replaceAll('.', '').toUpperCase()}</small>
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  name="files"
                  accept={ACCEPT_ATTR}
                  multiple
                  onChange={handleFileInput}
                  hidden
                />

                {fileError ? <span className="quote-field__error">{fileError}</span> : null}

                {files.length ? (
                  <div className="quote-files">
                    {files.map((file) => (
                      <div className="quote-file-chip" key={`${file.name}-${file.size}`}>
                        <span>{file.name}</span>
                        <small>{formatBytes(file.size)}</small>
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="quote-field__hint">
                    Up to {MAX_FILES} files, {formatBytes(MAX_TOTAL_BYTES)} total. STL, 3MF, STEP,
                    STP, OBJ, PDF, PNG, JPG, JPEG, and WEBP accepted.
                  </span>
                )}
              </div>
            </div>

            <div className="quote-card__section">
              <button
                type="button"
                className="quote-toggle"
                onClick={() => {
                  markStarted('estimate_open');
                  setShowEstimate((current) => !current);
                }}
              >
                <span>I know my print settings</span>
                <small>{showEstimate ? 'Hide optional estimate controls' : 'Open optional estimate controls'}</small>
              </button>

              {showEstimate ? (
                <div className="quote-advanced">
                  <p className="quote-advanced__copy">
                    This is optional. Use it when you already know the print profile and want a
                    faster planning estimate.
                  </p>

                  <div className="quote-form-grid">
                    <QuoteField label="Material for estimate" htmlFor="estimate-material">
                      <select
                        id="estimate-material"
                        value={material}
                        onChange={(event) => setMaterial(event.target.value as Material)}
                      >
                        {MATERIAL_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </QuoteField>

                    <QuoteField label="Quality" htmlFor="estimate-quality">
                      <select
                        id="estimate-quality"
                        value={quality}
                        onChange={(event) => setQuality(event.target.value as Quality)}
                      >
                        {QUALITY_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </QuoteField>

                    <QuoteField label="Layer height" htmlFor="estimate-layer">
                      <select
                        id="estimate-layer"
                        value={layerHeight}
                        onChange={(event) => setLayerHeight(event.target.value as LayerHeight)}
                      >
                        {LAYER_HEIGHT_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </QuoteField>

                    <QuoteField label="Supports" htmlFor="estimate-supports">
                      <select
                        id="estimate-supports"
                        value={supports}
                        onChange={(event) => setSupports(event.target.value as Supports)}
                      >
                        {SUPPORT_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </QuoteField>

                    <QuoteField label="Province for tax" htmlFor="estimate-province">
                      <select
                        id="estimate-province"
                        value={province}
                        onChange={(event) => setProvince(event.target.value as (typeof PROVINCE_OPTIONS)[number])}
                      >
                        {PROVINCE_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {PROVINCE_LABELS[option]} ({option})
                          </option>
                        ))}
                      </select>
                    </QuoteField>
                  </div>

                  <div className="quote-sliders">
                    <QuoteField label="Part weight" htmlFor="estimate-grams" hint="Material usage scales the estimate immediately.">
                      <div className="quote-slider-row">
                        <input
                          id="estimate-grams"
                          type="range"
                          min={5}
                          max={2000}
                          step={5}
                          value={grams}
                          onChange={(event) => setGrams(Number(event.target.value))}
                        />
                        <strong>{grams}g</strong>
                      </div>
                    </QuoteField>

                    <QuoteField label="Machine time" htmlFor="estimate-hours" hint="Longer print time increases machine cost.">
                      <div className="quote-slider-row">
                        <input
                          id="estimate-hours"
                          type="range"
                          min={0.5}
                          max={100}
                          step={0.5}
                          value={hours}
                          onChange={(event) => setHours(Number(event.target.value))}
                        />
                        <strong>{hours}h</strong>
                      </div>
                    </QuoteField>

                    <QuoteField label="Infill" htmlFor="estimate-infill">
                      <div className="quote-slider-row">
                        <input
                          id="estimate-infill"
                          type="range"
                          min={5}
                          max={100}
                          step={5}
                          value={infill}
                          onChange={(event) => setInfill(Number(event.target.value))}
                        />
                        <strong>{infill}%</strong>
                      </div>
                    </QuoteField>

                    <QuoteField label="Walls" htmlFor="estimate-walls">
                      <div className="quote-slider-row">
                        <input
                          id="estimate-walls"
                          type="range"
                          min={1}
                          max={8}
                          step={1}
                          value={walls}
                          onChange={(event) => setWalls(Number(event.target.value))}
                        />
                        <strong>{walls}</strong>
                      </div>
                    </QuoteField>

                    <QuoteField label="Scale" htmlFor="estimate-scale">
                      <div className="quote-slider-row">
                        <input
                          id="estimate-scale"
                          type="range"
                          min={0.5}
                          max={3}
                          step={0.1}
                          value={scale}
                          onChange={(event) => setScale(Number(event.target.value))}
                        />
                        <strong>{scale.toFixed(1).replace(/\.0$/, '')}x</strong>
                      </div>
                    </QuoteField>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="quote-consent">
              <label className="quote-consent__checkbox" htmlFor="quote-consent">
                <input
                  id="quote-consent"
                  name="casl_consent"
                  type="checkbox"
                  checked={consent}
                  onChange={(event) => setConsent(event.target.checked)}
                />
                <span>
                  I consent to receiving project-related messages from 3D3D Atlantic Cooperative.
                  You may unsubscribe at any time. See the <a href="/casl">CASL policy</a> and{' '}
                  <a href="/privacy">privacy policy</a>.
                </span>
              </label>
            </div>

            {submitError ? <div className="quote-submit-error">{submitError}</div> : null}

            <div className="quote-submit-row">
              <button type="submit" className="btn btn-primary quote-submit" disabled={submitting}>
                {submitting ? 'Sending quote request...' : 'Send quote request'}
              </button>
              <p>
                We now capture the full intake here instead of dropping you into a raw email draft.
              </p>
            </div>
          </form>

          <aside className="quote-card quote-card--sidebar">
            <div className="quote-sidebar__block">
              <span className="eyebrow">Quote summary</span>
              <h3>What you are sending</h3>
              <div className="quote-summary-list">
                <div>
                  <span>Project type</span>
                  <strong>{selectedProduct ? selectedProduct.name : 'Custom print request'}</strong>
                </div>
                <div>
                  <span>Attachments</span>
                  <strong>{files.length ? `${files.length} file${files.length === 1 ? '' : 's'}` : 'No files yet'}</strong>
                </div>
                <div>
                  <span>Quantity</span>
                  <strong>{quantity} unit{quantity === 1 ? '' : 's'}</strong>
                </div>
                <div>
                  <span>Material preference</span>
                  <strong>{materialPreference || 'No preference'}</strong>
                </div>
              </div>
            </div>

            <div className="quote-sidebar__block quote-sidebar__block--estimate">
              <span className="eyebrow">Optional planning estimate</span>
              <h3>{formatCurrency(total)}</h3>
              <p>
                Ballpark only. Based on material, machine time, operating surcharges, and tax for{' '}
                {PROVINCE_LABELS[province]}.
              </p>

              <div className="quote-estimate-list">
                <div>
                  <span>Base production</span>
                  <strong>{formatCurrency(quote.baseCost)}</strong>
                </div>
                <div>
                  <span>Operating surcharges</span>
                  <strong>{formatCurrency(quote.overhead)}</strong>
                </div>
                <div>
                  <span>Tax</span>
                  <strong>{formatCurrency(tax)}</strong>
                </div>
                <div>
                  <span>Maker payout</span>
                  <strong>{formatCurrency(quote.makerPayout)}</strong>
                </div>
              </div>
            </div>

            <div className="quote-sidebar__block">
              <span className="eyebrow">What happens next</span>
              <ul className="quote-steps">
                <li>We review files, notes, and timeline details.</li>
                <li>We check printability, routing, and materials.</li>
                <li>We send the final quote and next-step confirmation.</li>
              </ul>
            </div>

            <div className="quote-sidebar__block quote-sidebar__block--soft">
              <span className="eyebrow">Accepted file types</span>
              <p>STL, 3MF, STEP, STP, OBJ, PDF, PNG, JPG, JPEG, and WEBP.</p>
            </div>
          </aside>
        </div>
      </div>

      <style>{quoteStyles}</style>
    </>
  );
}

const quoteStyles = `
  .quote-shell {
    width: min(100%, 1240px);
    margin-inline: auto;
  }

  .quote-grid {
    display: grid;
    gap: 1.2rem;
    grid-template-columns: minmax(0, 1.45fr) minmax(280px, 0.8fr);
    align-items: start;
  }

  .quote-card {
    position: relative;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.72);
    border-radius: 32px;
    background: rgba(250, 252, 252, 0.86);
    box-shadow: 0 20px 60px rgba(35, 51, 71, 0.08);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
  }

  .quote-card--form {
    padding: 1.35rem;
  }

  .quote-card--sidebar {
    padding: 1.35rem;
    position: sticky;
    top: calc(var(--site-header-height) + var(--site-action-height) + 1rem);
  }

  .quote-intro {
    padding-bottom: 1.2rem;
    border-bottom: 1px solid var(--color-border-subtle);
  }

  .quote-title {
    margin: 0.9rem 0 0.6rem;
    font-family: var(--font-display);
    font-size: clamp(2rem, 3vw, 2.9rem);
    line-height: 1;
    letter-spacing: -0.04em;
  }

  .quote-copy,
  .quote-section-head p,
  .quote-advanced__copy,
  .quote-submit-row p,
  .quote-sidebar__block p {
    color: var(--color-text-secondary);
    line-height: 1.7;
  }

  .quote-card__section + .quote-card__section {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid var(--color-border-subtle);
  }

  .quote-section-head {
    margin-bottom: 1rem;
  }

  .quote-section-head h3,
  .quote-sidebar__block h3 {
    margin: 0;
    font-size: 1.2rem;
  }

  .quote-form-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.95rem;
  }

  .quote-field {
    display: grid;
    gap: 0.45rem;
  }

  .quote-field__label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    font-family: var(--font-display);
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-text-primary);
  }

  .quote-field__label em {
    font-style: normal;
    color: var(--color-text-muted);
    font-size: 0.68rem;
  }

  .quote-field__hint,
  .quote-field__error {
    font-size: 0.85rem;
    line-height: 1.55;
  }

  .quote-field__hint {
    color: var(--color-text-muted);
  }

  .quote-field__error,
  .quote-submit-error {
    color: #a63f63;
  }

  .quote-dropzone {
    display: grid;
    place-items: center;
    gap: 0.35rem;
    min-height: 10rem;
    border-radius: 24px;
    border: 2px dashed rgba(64, 196, 196, 0.34);
    background: linear-gradient(135deg, rgba(212, 240, 240, 0.62), rgba(248, 224, 236, 0.52));
    text-align: center;
    cursor: pointer;
    color: var(--color-text-primary);
    transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
  }

  .quote-dropzone.is-active,
  .quote-dropzone:hover {
    transform: translateY(-2px);
    border-color: var(--color-teal-primary);
    background: linear-gradient(135deg, rgba(212, 240, 240, 0.82), rgba(248, 224, 236, 0.78));
  }

  .quote-dropzone strong {
    font-family: var(--font-display);
    font-size: 1.1rem;
  }

  .quote-dropzone span,
  .quote-dropzone small {
    color: var(--color-text-secondary);
  }

  .quote-files {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
  }

  .quote-file-chip {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    padding: 0.55rem 0.8rem;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.76);
    box-shadow: inset 0 0 0 1px rgba(64, 196, 196, 0.18);
  }

  .quote-file-chip small {
    color: var(--color-text-muted);
  }

  .quote-toggle {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1rem 1.1rem;
    border-radius: 22px;
    border: 1px solid rgba(64, 196, 196, 0.14);
    background: rgba(255, 255, 255, 0.68);
    text-align: left;
    cursor: pointer;
  }

  .quote-toggle span,
  .quote-toggle small {
    display: block;
  }

  .quote-toggle span {
    font-family: var(--font-display);
    font-size: 1rem;
    font-weight: 700;
    color: var(--color-text-primary);
  }

  .quote-toggle small {
    color: var(--color-text-secondary);
  }

  .quote-advanced {
    margin-top: 1rem;
  }

  .quote-sliders {
    display: grid;
    gap: 0.9rem;
    margin-top: 1rem;
  }

  .quote-slider-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
    gap: 0.9rem;
  }

  .quote-slider-row strong {
    min-width: 4rem;
    font-family: var(--font-display);
    color: var(--color-teal-dark);
    text-align: right;
  }

  .quote-consent {
    margin-top: 1rem;
  }

  .quote-consent__checkbox {
    display: flex;
    align-items: flex-start;
    gap: 0.8rem;
    color: var(--color-text-secondary);
    line-height: 1.65;
  }

  .quote-consent__checkbox input {
    width: 1rem;
    height: 1rem;
    margin-top: 0.2rem;
    accent-color: var(--color-teal-primary);
  }

  .quote-submit-row {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
    margin-top: 1rem;
  }

  .quote-submit {
    min-width: 14rem;
  }

  .quote-submit:disabled {
    opacity: 0.7;
    cursor: wait;
  }

  .quote-sidebar__block + .quote-sidebar__block {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid var(--color-border-subtle);
  }

  .quote-summary-list,
  .quote-estimate-list {
    display: grid;
    gap: 0.8rem;
    margin-top: 0.95rem;
  }

  .quote-summary-list div,
  .quote-estimate-list div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  .quote-summary-list span,
  .quote-estimate-list span {
    color: var(--color-text-secondary);
  }

  .quote-summary-list strong,
  .quote-estimate-list strong {
    color: var(--color-text-primary);
    font-family: var(--font-display);
  }

  .quote-sidebar__block--estimate h3 {
    margin-top: 0.65rem;
    font-size: 2.3rem;
    color: var(--color-teal-dark);
  }

  .quote-steps {
    margin: 0.95rem 0 0;
    padding-left: 1.2rem;
    color: var(--color-text-secondary);
  }

  .quote-steps li + li {
    margin-top: 0.5rem;
  }

  .quote-sidebar__block--soft {
    background: rgba(255, 255, 255, 0.58);
    padding: 1rem;
    border-radius: 22px;
    border-top: none;
  }

  .quote-shell--success {
    padding: 1.8rem;
  }

  .quote-success {
    position: relative;
    z-index: 1;
  }

  .quote-success__title {
    margin: 0.9rem 0 0.6rem;
    font-size: clamp(2rem, 3vw, 3rem);
    line-height: 1;
  }

  .quote-success__copy {
    max-width: 48rem;
    color: var(--color-text-secondary);
    line-height: 1.75;
  }

  .quote-success__grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
    margin-top: 1.2rem;
  }

  .quote-success__grid div {
    padding: 1rem;
    border-radius: 24px;
    background: rgba(255, 255, 255, 0.64);
  }

  .quote-success__grid strong,
  .quote-success__grid span {
    display: block;
  }

  .quote-success__grid span {
    margin-top: 0.35rem;
    color: var(--color-text-secondary);
    line-height: 1.65;
  }

  .quote-success__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
    margin-top: 1.4rem;
  }

  @media (max-width: 1023px) {
    .quote-grid {
      grid-template-columns: 1fr;
    }

    .quote-card--sidebar {
      position: static;
    }
  }

  @media (max-width: 720px) {
    .quote-card--form,
    .quote-card--sidebar,
    .quote-shell--success {
      padding: 1rem;
    }

    .quote-form-grid,
    .quote-success__grid {
      grid-template-columns: 1fr;
    }

    .quote-toggle,
    .quote-slider-row,
    .quote-summary-list div,
    .quote-estimate-list div {
      grid-template-columns: 1fr;
    }

    .quote-slider-row strong {
      text-align: left;
    }
  }
`;
