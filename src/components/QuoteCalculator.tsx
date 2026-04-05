import { useEffect, useRef, useState } from 'react';
import { CATALOG, getCatalogItemById } from '../lib/catalog';
import type { Material } from '../lib/types';

declare global {
  interface Window {
    track3d3d?: (eventName: string, detail?: Record<string, unknown>) => void;
  }
}

const FORM_ENDPOINT = 'https://formspree.io/f/mldlydbl';
const ACCEPT_ATTR = '.stl,.3mf,.step,.stp,.obj,.pdf,.png,.jpg,.jpeg,.webp';
const MAX_FILES = 5;
const MAX_TOTAL_BYTES = 20 * 1024 * 1024;

const MATERIALS: Array<{ value: Material | ''; label: string }> = [
  { value: '', label: 'Not sure / let me know' },
  { value: 'PLA', label: 'PLA — Everyday parts & prototypes' },
  { value: 'PETG', label: 'PETG — Durable utility parts' },
  { value: 'TPU', label: 'TPU — Flexible / protective' },
  { value: 'ABS', label: 'ABS — Tougher with classic finish' },
  { value: 'ASA', label: 'ASA — Outdoor & UV-resistant' },
];

const SUPPORTED_EXT = ['stl', '3mf', 'step', 'stp', 'obj', 'pdf', 'png', 'jpg', 'jpeg', 'webp'];

function formatBytes(size: number) {
  if (size < 1024 * 1024) return `${Math.max(1, Math.round(size / 1024))} KB`;
  return `${(size / (1024 * 1024)).toFixed(1).replace(/\.0$/, '')} MB`;
}

function getExt(name: string) {
  return name.split('.').pop()?.toLowerCase() ?? '';
}

export default function QuoteCalculator() {
  const fileRef = useRef<HTMLInputElement | null>(null);

  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [details, setDetails] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [material, setMaterial] = useState<Material | ''>('');
  const [deadline, setDeadline] = useState('');
  const [location, setLocation] = useState('');
  const [productId, setProductId] = useState('');
  const [designUrl, setDesignUrl] = useState('');
  const [consent, setConsent] = useState(false);
  const [source, setSource] = useState('quote-page');

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const p = params.get('product');
    const s = params.get('source');
    if (s) setSource(s);
    if (p) {
      const item = getCatalogItemById(p);
      if (item) {
        setProductId(item.id);
        setMaterial(item.material);
        setDetails(`I'm interested in ${item.name}. Please quote this item.`);
      }
    }
  }, []);

  const addFiles = (incoming: File[]) => {
    const merged = [...files, ...incoming].slice(0, MAX_FILES);
    const bad = merged.find(f => !SUPPORTED_EXT.includes(getExt(f.name)));
    if (bad) { setFileError(`Unsupported file: ${bad.name}`); return; }
    const total = merged.reduce((s, f) => s + f.size, 0);
    if (total > MAX_TOTAL_BYTES) { setFileError(`Total size must be under ${formatBytes(MAX_TOTAL_BYTES)}.`); return; }
    setFileError('');
    setFiles(merged);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setFileError('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const honeypot = e.currentTarget.querySelector<HTMLInputElement>('input[name="_gotcha"]')?.value ?? '';
    if (honeypot.trim()) return;

    if (!details.trim() && files.length === 0) {
      setError('Describe the part or attach a file so we know what to quote.');
      return;
    }
    if (!consent) {
      setError('Please confirm consent so we can reply.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const fd = new FormData();
      const product = productId ? getCatalogItemById(productId) : null;
      fd.append('_subject', product ? `Quote: ${product.name}` : 'Quote Request | 3D3D');
      fd.append('name', name);
      fd.append('email', email);
      fd.append('phone', phone);
      fd.append('company', company);
      fd.append('project_description', details);
      fd.append('quantity', String(quantity));
      fd.append('material_preference', material || 'No preference');
      fd.append('target_deadline', deadline);
      fd.append('location', location);
      fd.append('casl_consent', 'yes');
      fd.append('design_url', designUrl);
      fd.append('originating_product', product?.name ?? 'Custom');
      fd.append('source', source);
      files.forEach(f => fd.append('files', f));

      const res = await fetch(FORM_ENDPOINT, { method: 'POST', headers: { Accept: 'application/json' }, body: fd });
      if (!res.ok) throw new Error('Could not send. Try again or email info@3d3d.ca.');
      setSuccess(true);
      window.track3d3d?.('quote_submitted', { source, product: productId || null, attachments: files.length });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="qc">
        <div className="qc-success">
          <p className="qc-eyebrow">Quote request received</p>
          <h2 className="qc-heading">We have your project.</h2>
          <p className="qc-text">We'll review your files and details, then follow up with firm pricing and next steps — usually within the next business day.</p>
          <div className="qc-actions">
            <a href="/" className="qc-btn qc-btn--primary">Back to Home</a>
            <a href="/quote?source=reset" className="qc-btn qc-btn--ghost">Start Another Quote</a>
          </div>
        </div>
        <style>{styles}</style>
      </div>
    );
  }

  return (
    <>
      <form className="qc" onSubmit={handleSubmit} noValidate>
        {/* Honeypot */}
        <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px' }}>
          <input name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        {/* Step 1: Upload */}
        <fieldset className="qc-section">
          <legend className="qc-eyebrow">Step 1</legend>
          <h2 className="qc-heading">Upload your file</h2>
          <p className="qc-text">STL, 3MF, STEP, OBJ — or photos of the part you need reproduced.</p>

          <button
            type="button"
            className={`qc-drop ${dragActive ? 'qc-drop--active' : ''}`}
            onClick={() => fileRef.current?.click()}
            onDragOver={e => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={e => { e.preventDefault(); setDragActive(false); addFiles(Array.from(e.dataTransfer.files)); }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 16V4m0 0L8 8m4-4l4 4M4 17v2a1 1 0 001 1h14a1 1 0 001-1v-2"/></svg>
            <strong>Drag & drop files here</strong>
            <span>or tap to browse</span>
          </button>
          <input ref={fileRef} type="file" accept={ACCEPT_ATTR} multiple hidden onChange={e => addFiles(Array.from(e.target.files ?? []))} />

          {fileError && <p className="qc-error">{fileError}</p>}

          {files.length > 0 && (
            <div className="qc-files">
              {files.map((f, i) => (
                <div className="qc-file" key={`${f.name}-${f.size}`}>
                  <span>{f.name}</span>
                  <small>{formatBytes(f.size)}</small>
                  <button type="button" className="qc-file-rm" onClick={() => removeFile(i)} aria-label={`Remove ${f.name}`}>&times;</button>
                </div>
              ))}
            </div>
          )}

          <p className="qc-hint">Up to {MAX_FILES} files, {formatBytes(MAX_TOTAL_BYTES)} total. No file? No problem — paste a link or describe the part below.</p>

          <label className="qc-field" style={{marginTop: '0.75rem'}}>
            <span>Link to existing design (optional)</span>
            <input type="url" value={designUrl} onChange={e => setDesignUrl(e.target.value)} placeholder="https://printables.com/model/... or any URL" />
          </label>
          <p className="qc-hint">Printables, Thingiverse, MakerWorld, Google Drive, Dropbox — any link works.</p>
        </fieldset>

        {/* Step 2: Configure */}
        <fieldset className="qc-section">
          <legend className="qc-eyebrow">Step 2</legend>
          <h2 className="qc-heading">Tell us about the part</h2>

          <div className="qc-grid">
            <label className="qc-field">
              <span>Material preference</span>
              <select value={material} onChange={e => setMaterial(e.target.value as Material | '')}>
                {MATERIALS.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
              </select>
            </label>
            <label className="qc-field">
              <span>Quantity</span>
              <input type="number" min={1} max={500} value={quantity} onChange={e => setQuantity(Math.max(1, Number(e.target.value) || 1))} />
            </label>
          </div>

          <div className="qc-grid">
            <label className="qc-field">
              <span>From catalog (optional)</span>
              <select value={productId} onChange={e => {
                setProductId(e.target.value);
                const item = getCatalogItemById(e.target.value);
                if (item) { setMaterial(item.material); if (!details) setDetails(`Interested in ${item.name}.`); }
              }}>
                <option value="">Custom / not listed</option>
                {CATALOG.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
              </select>
            </label>
            <label className="qc-field">
              <span>Target deadline (optional)</span>
              <input type="date" value={deadline} onChange={e => setDeadline(e.target.value)} />
            </label>
          </div>

          <label className="qc-field">
            <span>Project description *</span>
            <textarea
              rows={4}
              value={details}
              onChange={e => setDetails(e.target.value)}
              placeholder="What does the part do? Where will it be used? Size, finish, tolerances, anything unusual."
              required
            />
          </label>
        </fieldset>

        {/* Step 3: Contact */}
        <fieldset className="qc-section">
          <legend className="qc-eyebrow">Step 3</legend>
          <h2 className="qc-heading">Your contact info</h2>

          <div className="qc-grid">
            <label className="qc-field">
              <span>Name *</span>
              <input type="text" autoComplete="name" value={name} onChange={e => setName(e.target.value)} required />
            </label>
            <label className="qc-field">
              <span>Email *</span>
              <input type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </label>
          </div>

          <div className="qc-grid">
            <label className="qc-field">
              <span>Phone (optional)</span>
              <input type="tel" autoComplete="tel" value={phone} onChange={e => setPhone(e.target.value)} />
            </label>
            <label className="qc-field">
              <span>Company (optional)</span>
              <input type="text" autoComplete="organization" value={company} onChange={e => setCompany(e.target.value)} />
            </label>
          </div>

          <label className="qc-field">
            <span>City / Province / Postal Code *</span>
            <input type="text" autoComplete="postal-code" value={location} onChange={e => setLocation(e.target.value)} required placeholder="Halifax, NS" />
          </label>
        </fieldset>

        {/* Consent + Submit */}
        <div className="qc-section qc-section--submit">
          <label className="qc-consent">
            <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} />
            <span>I consent to receiving project-related messages from 3D3D. <a href="/privacy">Privacy</a> · <a href="/casl">CASL</a></span>
          </label>

          {error && <p className="qc-error">{error}</p>}

          <button type="submit" className="qc-btn qc-btn--primary qc-btn--full" disabled={submitting}>
            {submitting ? 'Sending...' : 'Send Quote Request'}
          </button>

          <p className="qc-hint qc-hint--center">We respond within 24 hours. No automated pricing — a real person reviews every request.</p>
        </div>
      </form>

      <style>{styles}</style>
    </>
  );
}

const styles = `
  .qc {
    display: flex;
    flex-direction: column;
    gap: 0;
    width: 100%;
    max-width: 640px;
    margin: 0 auto;
  }

  .qc-section {
    border: none;
    margin: 0;
    padding: 1.5rem 0;
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }

  .qc-section--submit {
    border-bottom: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .qc-eyebrow {
    margin: 0 0 0.25rem;
    font-family: var(--font-tech, 'JetBrains Mono', monospace);
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #40C4C4;
  }

  .qc-heading {
    margin: 0 0 0.35rem;
    font-family: var(--font-display, 'Outfit', sans-serif);
    font-size: clamp(1.25rem, 1rem + 1vw, 1.6rem);
    font-weight: 700;
    color: #F6F7FA;
    letter-spacing: -0.02em;
  }

  .qc-text {
    margin: 0 0 1rem;
    font-size: 0.88rem;
    line-height: 1.6;
    color: rgba(246,247,250,0.55);
  }

  .qc-hint {
    margin: 0.5rem 0 0;
    font-size: 0.75rem;
    color: rgba(246,247,250,0.35);
    line-height: 1.5;
  }

  .qc-hint--center { text-align: center; }

  .qc-error {
    margin: 0.5rem 0 0;
    font-size: 0.82rem;
    color: #E84A8A;
    line-height: 1.5;
  }

  /* Drop zone */
  .qc-drop {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.35rem;
    width: 100%;
    min-height: 8rem;
    padding: 1.5rem;
    border: 2px dashed rgba(64,196,196,0.3);
    border-radius: 2px;
    background: rgba(64,196,196,0.04);
    color: rgba(246,247,250,0.6);
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s;
    text-align: center;
  }

  .qc-drop:hover, .qc-drop--active {
    border-color: #40C4C4;
    background: rgba(64,196,196,0.08);
  }

  .qc-drop strong {
    font-family: var(--font-display, 'Outfit', sans-serif);
    font-size: 0.95rem;
    color: #F6F7FA;
  }

  .qc-drop span {
    font-size: 0.78rem;
    color: rgba(246,247,250,0.4);
  }

  /* File chips */
  .qc-files {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    margin-top: 0.75rem;
  }

  .qc-file {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.55rem 0.75rem;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 2px;
    font-size: 0.82rem;
    color: #F6F7FA;
  }

  .qc-file span { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .qc-file small { color: rgba(246,247,250,0.4); flex-shrink: 0; }

  .qc-file-rm {
    flex-shrink: 0;
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: rgba(255,255,255,0.06);
    color: rgba(246,247,250,0.5);
    border-radius: 2px;
    cursor: pointer;
    font-size: 1rem;
    line-height: 1;
  }

  .qc-file-rm:hover { background: rgba(232,74,138,0.2); color: #E84A8A; }

  /* Form grid */
  .qc-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
    margin-bottom: 0.75rem;
  }

  @media (max-width: 560px) {
    .qc-grid { grid-template-columns: 1fr; }
  }

  /* Fields */
  .qc-field {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }

  .qc-field > span {
    font-family: var(--font-tech, 'JetBrains Mono', monospace);
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(246,247,250,0.5);
  }

  .qc-field input,
  .qc-field textarea,
  .qc-field select {
    width: 100%;
    padding: 0.7rem 0.8rem;
    background: rgba(0,0,0,0.35);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 2px;
    color: #F6F7FA;
    font-family: var(--font-body, 'DM Sans', sans-serif);
    font-size: 0.9rem;
    transition: border-color 0.15s;
    -webkit-appearance: none;
  }

  .qc-field input:focus,
  .qc-field textarea:focus,
  .qc-field select:focus {
    outline: none;
    border-color: #40C4C4;
  }

  .qc-field select {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23999' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.8rem center;
    padding-right: 2.4rem;
  }

  .qc-field textarea { resize: vertical; min-height: 5rem; }

  /* Consent */
  .qc-consent {
    display: flex;
    align-items: flex-start;
    gap: 0.6rem;
    cursor: pointer;
  }

  .qc-consent input[type="checkbox"] {
    width: 18px;
    height: 18px;
    margin-top: 2px;
    accent-color: #40C4C4;
    flex-shrink: 0;
  }

  .qc-consent span {
    font-size: 0.78rem;
    line-height: 1.5;
    color: rgba(246,247,250,0.45);
  }

  .qc-consent a { color: #40C4C4; }

  /* Buttons */
  .qc-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 3rem;
    padding: 0.75rem 1.6rem;
    border: 2px solid transparent;
    border-radius: 2px;
    font-family: var(--font-tech, 'JetBrains Mono', monospace);
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .qc-btn--primary {
    background: #40C4C4;
    color: #111214;
    border-color: #40C4C4;
  }

  .qc-btn--primary:hover {
    background: #53D3D3;
    transform: translateY(-1px);
    box-shadow: 0 8px 20px rgba(64,196,196,0.3);
  }

  .qc-btn--primary:disabled {
    opacity: 0.6;
    cursor: wait;
    transform: none;
  }

  .qc-btn--ghost {
    background: transparent;
    color: rgba(246,247,250,0.7);
    border-color: rgba(255,255,255,0.15);
  }

  .qc-btn--ghost:hover {
    border-color: #40C4C4;
    color: #40C4C4;
  }

  .qc-btn--full { width: 100%; }

  .qc-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: 1.5rem;
  }

  /* Success */
  .qc-success {
    padding: 2rem 0;
    text-align: center;
  }

  .qc-success .qc-heading {
    font-size: clamp(1.6rem, 1.2rem + 2vw, 2.4rem);
    margin-bottom: 0.5rem;
  }

  .qc-success .qc-text {
    max-width: 28rem;
    margin: 0 auto 0;
  }

  .qc-success .qc-actions {
    justify-content: center;
  }
`;
