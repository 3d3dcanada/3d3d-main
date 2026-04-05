import { useEffect, useMemo, useRef, useState } from 'react';
import {
  REPOSITORY_CATEGORIES,
  searchRepositories,
  type Repository,
} from '../data/repositories';

const FORM_ENDPOINT = 'https://formspree.io/f/mldlydbl';
const ACCEPT_ATTR = '.stl,.3mf,.step,.stp,.obj,.pdf,.png,.jpg,.jpeg,.webp';
const MAX_FILES = 5;
const MAX_TOTAL_BYTES = 20 * 1024 * 1024;
const SUPPORTED_EXT = ['stl', '3mf', 'step', 'stp', 'obj', 'pdf', 'png', 'jpg', 'jpeg', 'webp'];

function formatBytes(size: number) {
  if (size < 1024 * 1024) return `${Math.max(1, Math.round(size / 1024))} KB`;
  return `${(size / (1024 * 1024)).toFixed(1).replace(/\.0$/, '')} MB`;
}

/* ═══════════════════════════════════════
   REPO CARD
   ═══════════════════════════════════════ */
function RepoCard({ repo, onRequest }: { repo: Repository; onRequest: (r: Repository) => void }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="qd-repo">
      <button type="button" className="qd-repo__head" onClick={() => setOpen(!open)}>
        <div className="qd-repo__info">
          <strong>{repo.name}</strong>
          <span className="qd-repo__count">{repo.modelCountLabel}</span>
        </div>
        <div className="qd-repo__tags">
          {repo.tags.map(t => <span key={t} className="qd-tag">{t}</span>)}
        </div>
        <svg className={`qd-chev ${open ? 'qd-chev--open' : ''}`} width="12" height="12" viewBox="0 0 12 12"><path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>
      </button>

      {/* Quick actions row */}
      <div className="qd-repo__actions">
        <a href={repo.url} target="_blank" rel="noopener noreferrer" className="qd-repo__btn">Open</a>
        {repo.searchUrlTemplate && (
          <a href={repo.searchUrlTemplate.replace('{query}', '')} target="_blank" rel="noopener noreferrer" className="qd-repo__btn">Search</a>
        )}
        <button type="button" className="qd-repo__btn qd-repo__btn--accent" onClick={() => onRequest(repo)}>Request Print</button>
      </div>

      {/* Expanded detail */}
      {open && (
        <div className="qd-repo__detail">
          <p>{repo.about}</p>
          <div className="qd-repo__meta">
            <div><strong>License:</strong> {repo.licenseNotes}</div>
            <div><strong>Content:</strong> {repo.safeContentNotes}</div>
          </div>
          {repo.topDesigners.length > 0 && (
            <div className="qd-repo__designers">
              <strong>Top Designers</strong>
              {repo.topDesigners.map(d => (
                <a key={d.name} href={d.profileUrl} target="_blank" rel="noopener noreferrer" className="qd-designer">
                  <span>{d.name}</span>
                  <small>{d.specialty}</small>
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════
   MAIN DRAWER
   ═══════════════════════════════════════ */
export default function QuoteDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [view, setView] = useState<'browse' | 'form'>('browse');
  const [search, setSearch] = useState('');
  const [expandedCats, setExpandedCats] = useState<Set<string>>(new Set(['featured']));
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);

  // Form state
  const [modelUrl, setModelUrl] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [details, setDetails] = useState('');
  const [material, setMaterial] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState('');
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const searchResults = useMemo(() => {
    if (!search.trim()) return null;
    return searchRepositories(search);
  }, [search]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // ESC to close
  useEffect(() => {
    const handle = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) document.addEventListener('keydown', handle);
    return () => document.removeEventListener('keydown', handle);
  }, [isOpen, onClose]);

  const toggleCat = (id: string) => {
    setExpandedCats(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const startRequest = (repo: Repository) => {
    setSelectedRepo(repo);
    setModelUrl('');
    setView('form');
  };

  const startCustom = () => {
    setSelectedRepo(null);
    setModelUrl('');
    setView('form');
  };

  const addFiles = (incoming: File[]) => {
    const merged = [...files, ...incoming].slice(0, MAX_FILES);
    const bad = merged.find(f => !SUPPORTED_EXT.includes(f.name.split('.').pop()?.toLowerCase() ?? ''));
    if (bad) { setFileError(`Unsupported: ${bad.name}`); return; }
    const total = merged.reduce((s, f) => s + f.size, 0);
    if (total > MAX_TOTAL_BYTES) { setFileError(`Max ${formatBytes(MAX_TOTAL_BYTES)} total.`); return; }
    setFileError('');
    setFiles(merged);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modelUrl.trim() && !details.trim() && files.length === 0) {
      setError('Paste a model URL, describe the part, or attach a file.');
      return;
    }
    if (!consent) { setError('Please confirm consent.'); return; }
    setSubmitting(true);
    setError('');

    try {
      const fd = new FormData();
      fd.append('_subject', selectedRepo ? `Quote via ${selectedRepo.name}` : 'Quote Request | 3D3D');
      fd.append('name', name);
      fd.append('email', email);
      fd.append('phone', phone);
      fd.append('model_url', modelUrl);
      fd.append('source_platform', selectedRepo?.name ?? 'Custom');
      fd.append('project_description', details);
      fd.append('material_preference', material || 'No preference');
      fd.append('quantity', String(quantity));
      fd.append('casl_consent', 'yes');
      fd.append('source', 'quote-drawer');
      files.forEach(f => fd.append('files', f));

      const res = await fetch(FORM_ENDPOINT, { method: 'POST', headers: { Accept: 'application/json' }, body: fd });
      if (!res.ok) throw new Error('Failed. Try info@3d3d.ca.');
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="qd-backdrop" onClick={onClose} />

      {/* Drawer panel */}
      <div className="qd-panel">
        {/* Header */}
        <div className="qd-header">
          <div>
            <h2 className="qd-header__title">
              {view === 'browse' ? 'Find a Model & Get a Quote' : (success ? 'Request Sent' : 'Request a Print')}
            </h2>
            <p className="qd-header__sub">
              {view === 'browse'
                ? `${REPOSITORY_CATEGORIES.reduce((s, c) => s + c.repositories.length, 0)} safe, legal sources`
                : selectedRepo ? `From ${selectedRepo.name}` : 'Custom request'}
            </p>
          </div>
          <button type="button" className="qd-close" onClick={onClose} aria-label="Close">&times;</button>
        </div>

        {/* Content */}
        <div className="qd-body">
          {view === 'browse' && (
            <>
              {/* Search */}
              <div className="qd-search-wrap">
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search repositories..."
                  className="qd-search"
                />
                {search && <button type="button" className="qd-search-clear" onClick={() => setSearch('')}>&times;</button>}
              </div>

              {/* Custom request CTA */}
              <button type="button" className="qd-custom-cta" onClick={startCustom}>
                <strong>Have your own file or idea?</strong>
                <span>Skip browsing — describe what you need directly</span>
              </button>

              {/* Search results or categories */}
              {searchResults ? (
                <div className="qd-results">
                  <p className="qd-results__count">{searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{search}"</p>
                  {searchResults.map(r => <RepoCard key={r.id} repo={r} onRequest={startRequest} />)}
                </div>
              ) : (
                <div className="qd-categories">
                  {REPOSITORY_CATEGORIES.map(cat => (
                    <div key={cat.id} className="qd-cat">
                      <button type="button" className="qd-cat__toggle" onClick={() => toggleCat(cat.id)}>
                        <div>
                          <strong>{cat.name}</strong>
                          <small>{cat.repositories.length} source{cat.repositories.length !== 1 ? 's' : ''}</small>
                        </div>
                        <svg className={`qd-chev ${expandedCats.has(cat.id) ? 'qd-chev--open' : ''}`} width="12" height="12" viewBox="0 0 12 12"><path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>
                      </button>
                      {expandedCats.has(cat.id) && (
                        <div className="qd-cat__content">
                          {cat.repositories.map(r => <RepoCard key={r.id} repo={r} onRequest={startRequest} />)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {view === 'form' && !success && (
            <form onSubmit={handleSubmit} className="qd-form">
              <button type="button" className="qd-back" onClick={() => setView('browse')}>&larr; Back to repositories</button>

              <label className="qd-field">
                <span>Model URL {selectedRepo ? '*' : '(optional)'}</span>
                <input type="url" value={modelUrl} onChange={e => setModelUrl(e.target.value)} placeholder="https://printables.com/model/..." />
              </label>

              <label className="qd-field">
                <span>Name *</span>
                <input type="text" autoComplete="name" value={name} onChange={e => setName(e.target.value)} required />
              </label>

              <label className="qd-field">
                <span>Email *</span>
                <input type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} required />
              </label>

              <label className="qd-field">
                <span>Phone (optional)</span>
                <input type="tel" autoComplete="tel" value={phone} onChange={e => setPhone(e.target.value)} />
              </label>

              <div className="qd-field-row">
                <label className="qd-field">
                  <span>Material</span>
                  <select value={material} onChange={e => setMaterial(e.target.value)}>
                    <option value="">Not sure</option>
                    <option value="PLA">PLA</option>
                    <option value="PETG">PETG</option>
                    <option value="TPU">TPU</option>
                    <option value="ABS">ABS</option>
                    <option value="ASA">ASA</option>
                  </select>
                </label>
                <label className="qd-field">
                  <span>Qty</span>
                  <input type="number" min={1} max={500} value={quantity} onChange={e => setQuantity(Math.max(1, Number(e.target.value) || 1))} />
                </label>
              </div>

              <label className="qd-field">
                <span>Description / notes</span>
                <textarea rows={3} value={details} onChange={e => setDetails(e.target.value)} placeholder="What does the part do? Size, color, finish, anything special." />
              </label>

              {/* File upload */}
              <div className="qd-field">
                <span className="qd-field__label">Attach files (optional)</span>
                <button type="button" className="qd-drop-sm" onClick={() => fileRef.current?.click()}>
                  <strong>Tap to attach</strong>
                  <small>STL, 3MF, STEP, OBJ, photos</small>
                </button>
                <input ref={fileRef} type="file" accept={ACCEPT_ATTR} multiple hidden onChange={e => addFiles(Array.from(e.target.files ?? []))} />
                {fileError && <p className="qd-error">{fileError}</p>}
                {files.length > 0 && (
                  <div className="qd-files">
                    {files.map((f, i) => (
                      <div key={`${f.name}-${f.size}`} className="qd-file">
                        <span>{f.name}</span>
                        <button type="button" onClick={() => setFiles(prev => prev.filter((_, j) => j !== i))}>&times;</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <label className="qd-consent">
                <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} />
                <span>I consent to project messages from 3D3D. <a href="/privacy">Privacy</a> · <a href="/casl">CASL</a></span>
              </label>

              {error && <p className="qd-error">{error}</p>}

              <button type="submit" className="qd-submit" disabled={submitting}>
                {submitting ? 'Sending...' : 'Send Quote Request'}
              </button>
              <p className="qd-hint">We respond within 24 hours. Real person, every time.</p>
            </form>
          )}

          {view === 'form' && success && (
            <div className="qd-success">
              <h3>We have your request.</h3>
              <p>We'll review everything and follow up within the next business day with firm pricing.</p>
              <button type="button" className="qd-submit" onClick={onClose}>Done</button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="qd-footer">
          All sources vetted for legal, safe content. No weapons or illicit materials.
        </div>
      </div>

      <style>{drawerStyles}</style>
    </>
  );
}

const drawerStyles = `
  /* ── Backdrop ── */
  .qd-backdrop {
    position: fixed; inset: 0; z-index: 200;
    background: rgba(0,0,0,0.6);
    backdrop-filter: blur(4px);
    animation: qdFadeIn 0.2s ease;
  }

  @keyframes qdFadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes qdSlideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
  @keyframes qdSlideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }

  /* ── Panel ── */
  .qd-panel {
    position: fixed; top: 0; right: 0; z-index: 201;
    width: 100%; max-width: 480px; height: 100dvh;
    display: flex; flex-direction: column;
    background: #111214;
    border-left: 1px solid rgba(255,255,255,0.08);
    box-shadow: -20px 0 60px rgba(0,0,0,0.4);
    animation: qdSlideIn 0.3s cubic-bezier(0.16,1,0.3,1);
  }

  @media (max-width: 560px) {
    .qd-panel {
      max-width: 100%; border-left: none;
      animation: qdSlideUp 0.3s cubic-bezier(0.16,1,0.3,1);
    }
  }

  /* ── Header ── */
  .qd-header {
    display: flex; align-items: center; justify-content: space-between; gap: 1rem;
    padding: 1rem 1.25rem;
    border-bottom: 1px solid rgba(255,255,255,0.08);
    flex-shrink: 0;
  }
  .qd-header__title { margin: 0; font-family: var(--font-display, 'Outfit'); font-size: 1.1rem; font-weight: 700; color: #F6F7FA; }
  .qd-header__sub { margin: 0; font-size: 0.72rem; color: rgba(246,247,250,0.4); }
  .qd-close { background: none; border: none; color: rgba(246,247,250,0.5); font-size: 1.5rem; cursor: pointer; padding: 0.25rem; line-height: 1; }
  .qd-close:hover { color: #F6F7FA; }

  /* ── Body ── */
  .qd-body { flex: 1; overflow-y: auto; padding: 1rem 1.25rem; }

  /* ── Footer ── */
  .qd-footer {
    flex-shrink: 0; padding: 0.6rem 1.25rem;
    border-top: 1px solid rgba(255,255,255,0.06);
    font-size: 0.6rem; color: rgba(246,247,250,0.25); text-align: center;
  }

  /* ── Search ── */
  .qd-search-wrap { position: relative; margin-bottom: 0.75rem; }
  .qd-search {
    width: 100%; padding: 0.65rem 0.8rem; padding-right: 2rem;
    background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); border-radius: 2px;
    color: #F6F7FA; font-size: 0.85rem; font-family: var(--font-body, 'DM Sans');
  }
  .qd-search:focus { outline: none; border-color: #40C4C4; }
  .qd-search-clear { position: absolute; right: 0.5rem; top: 50%; transform: translateY(-50%); background: none; border: none; color: rgba(246,247,250,0.4); font-size: 1.1rem; cursor: pointer; }

  /* ── Custom CTA ── */
  .qd-custom-cta {
    display: block; width: 100%; padding: 0.75rem; margin-bottom: 0.75rem;
    background: rgba(64,196,196,0.06); border: 1px dashed rgba(64,196,196,0.25); border-radius: 2px;
    text-align: left; cursor: pointer; transition: border-color 0.15s;
  }
  .qd-custom-cta:hover { border-color: #40C4C4; }
  .qd-custom-cta strong { display: block; font-family: var(--font-display, 'Outfit'); font-size: 0.85rem; color: #40C4C4; }
  .qd-custom-cta span { font-size: 0.72rem; color: rgba(246,247,250,0.4); }

  /* ── Categories ── */
  .qd-categories { display: flex; flex-direction: column; gap: 0.5rem; }
  .qd-cat { border: 1px solid rgba(255,255,255,0.06); border-radius: 2px; overflow: hidden; }
  .qd-cat__toggle {
    display: flex; align-items: center; justify-content: space-between; width: 100%;
    padding: 0.65rem 0.75rem; background: rgba(255,255,255,0.02); border: none; cursor: pointer; color: #F6F7FA;
  }
  .qd-cat__toggle:hover { background: rgba(255,255,255,0.04); }
  .qd-cat__toggle strong { font-family: var(--font-display, 'Outfit'); font-size: 0.85rem; }
  .qd-cat__toggle small { display: block; font-size: 0.62rem; color: rgba(246,247,250,0.35); }
  .qd-cat__content { padding: 0.5rem; display: flex; flex-direction: column; gap: 0.4rem; }

  .qd-chev { transition: transform 0.2s; color: rgba(246,247,250,0.35); }
  .qd-chev--open { transform: rotate(180deg); }

  /* ── Repo Card ── */
  .qd-repo { border: 1px solid rgba(255,255,255,0.06); border-radius: 2px; overflow: hidden; }
  .qd-repo__head {
    display: flex; flex-direction: column; gap: 0.35rem; width: 100%;
    padding: 0.65rem; background: transparent; border: none; cursor: pointer; color: #F6F7FA; text-align: left; position: relative;
  }
  .qd-repo__head .qd-chev { position: absolute; right: 0.65rem; top: 0.75rem; }
  .qd-repo__info { display: flex; align-items: center; gap: 0.5rem; padding-right: 1.5rem; }
  .qd-repo__info strong { font-family: var(--font-display, 'Outfit'); font-size: 0.82rem; }
  .qd-repo__count { font-family: var(--font-mono, monospace); font-size: 0.62rem; color: #40C4C4; background: rgba(64,196,196,0.1); padding: 0.15rem 0.4rem; border-radius: 2px; }
  .qd-repo__tags { display: flex; flex-wrap: wrap; gap: 0.25rem; }
  .qd-tag { font-size: 0.58rem; padding: 0.1rem 0.35rem; background: rgba(255,255,255,0.04); color: rgba(246,247,250,0.45); border-radius: 2px; }

  .qd-repo__actions { display: flex; gap: 0.35rem; padding: 0 0.65rem 0.65rem; }
  .qd-repo__btn {
    flex: 1; display: flex; align-items: center; justify-content: center;
    padding: 0.45rem; font-size: 0.68rem; font-weight: 600;
    background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 2px;
    color: rgba(246,247,250,0.7); text-decoration: none; cursor: pointer; transition: all 0.15s;
  }
  .qd-repo__btn:hover { background: rgba(255,255,255,0.08); color: #F6F7FA; }
  .qd-repo__btn--accent { background: rgba(64,196,196,0.08); border-color: rgba(64,196,196,0.2); color: #40C4C4; }
  .qd-repo__btn--accent:hover { background: rgba(64,196,196,0.15); }

  .qd-repo__detail { padding: 0 0.65rem 0.65rem; font-size: 0.78rem; color: rgba(246,247,250,0.5); line-height: 1.5; }
  .qd-repo__detail p { margin: 0 0 0.5rem; }
  .qd-repo__meta { display: grid; gap: 0.35rem; font-size: 0.7rem; }
  .qd-repo__meta strong { color: rgba(246,247,250,0.65); }
  .qd-repo__designers { margin-top: 0.5rem; }
  .qd-repo__designers > strong { display: block; font-size: 0.68rem; color: #40C4C4; margin-bottom: 0.35rem; text-transform: uppercase; letter-spacing: 0.08em; }
  .qd-designer { display: flex; justify-content: space-between; padding: 0.4rem 0.5rem; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 2px; text-decoration: none; color: rgba(246,247,250,0.6); font-size: 0.72rem; margin-bottom: 0.25rem; transition: border-color 0.15s; }
  .qd-designer:hover { border-color: rgba(64,196,196,0.3); color: #F6F7FA; }
  .qd-designer small { color: rgba(246,247,250,0.35); }

  .qd-results__count { font-size: 0.72rem; color: rgba(246,247,250,0.35); margin-bottom: 0.5rem; }

  /* ── Form ── */
  .qd-form { display: flex; flex-direction: column; gap: 0.75rem; }
  .qd-back { background: none; border: none; color: #40C4C4; font-size: 0.75rem; cursor: pointer; text-align: left; padding: 0; margin-bottom: 0.25rem; }
  .qd-back:hover { text-decoration: underline; }

  .qd-field { display: flex; flex-direction: column; gap: 0.25rem; }
  .qd-field > span, .qd-field__label { font-family: var(--font-tech, monospace); font-size: 0.65rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: rgba(246,247,250,0.45); }
  .qd-field input, .qd-field textarea, .qd-field select {
    width: 100%; padding: 0.6rem 0.7rem; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1);
    border-radius: 2px; color: #F6F7FA; font-family: var(--font-body, 'DM Sans'); font-size: 0.85rem;
  }
  .qd-field input:focus, .qd-field textarea:focus, .qd-field select:focus { outline: none; border-color: #40C4C4; }
  .qd-field textarea { resize: vertical; min-height: 4rem; }
  .qd-field select { -webkit-appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23999' d='M6 8L1 3h10z'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 0.7rem center; padding-right: 2rem; }

  .qd-field-row { display: grid; grid-template-columns: 1fr 5rem; gap: 0.5rem; }

  .qd-drop-sm {
    display: flex; flex-direction: column; align-items: center; gap: 0.15rem;
    padding: 0.75rem; border: 1px dashed rgba(64,196,196,0.25); border-radius: 2px;
    background: rgba(64,196,196,0.03); cursor: pointer; text-align: center; width: 100%;
  }
  .qd-drop-sm:hover { border-color: #40C4C4; }
  .qd-drop-sm strong { font-size: 0.78rem; color: #F6F7FA; }
  .qd-drop-sm small { font-size: 0.65rem; color: rgba(246,247,250,0.35); }

  .qd-files { display: flex; flex-direction: column; gap: 0.25rem; margin-top: 0.35rem; }
  .qd-file { display: flex; align-items: center; gap: 0.5rem; padding: 0.35rem 0.5rem; background: rgba(255,255,255,0.04); border-radius: 2px; font-size: 0.75rem; color: rgba(246,247,250,0.7); }
  .qd-file span { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .qd-file button { background: none; border: none; color: rgba(246,247,250,0.35); cursor: pointer; font-size: 1rem; }
  .qd-file button:hover { color: #E84A8A; }

  .qd-consent { display: flex; align-items: flex-start; gap: 0.5rem; cursor: pointer; }
  .qd-consent input[type="checkbox"] { width: 16px; height: 16px; margin-top: 2px; accent-color: #40C4C4; flex-shrink: 0; }
  .qd-consent span { font-size: 0.72rem; color: rgba(246,247,250,0.4); line-height: 1.4; }
  .qd-consent a { color: #40C4C4; }

  .qd-error { font-size: 0.78rem; color: #E84A8A; margin: 0; }
  .qd-hint { font-size: 0.68rem; color: rgba(246,247,250,0.3); text-align: center; margin: 0; }

  .qd-submit {
    width: 100%; padding: 0.75rem; background: #40C4C4; color: #111214; border: 2px solid #40C4C4; border-radius: 2px;
    font-family: var(--font-tech, monospace); font-size: 0.78rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
    cursor: pointer; transition: all 0.2s;
  }
  .qd-submit:hover { background: #53D3D3; }
  .qd-submit:disabled { opacity: 0.6; cursor: wait; }

  .qd-success { text-align: center; padding: 3rem 1rem; }
  .qd-success h3 { font-family: var(--font-display, 'Outfit'); font-size: 1.4rem; color: #F6F7FA; margin: 0 0 0.5rem; }
  .qd-success p { font-size: 0.85rem; color: rgba(246,247,250,0.5); margin: 0 0 1.5rem; line-height: 1.6; }
`;
