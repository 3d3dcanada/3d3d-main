import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'motion/react';
import { createPortal } from 'react-dom';

/* ─── Types ─────────────────────────────────────────────────────────── */

interface Fact { val: string; key: string }
interface Link { href: string; label: string; primary?: boolean; orange?: boolean; external?: boolean }

interface ModalData {
  headDate: string;
  headTag?: string;
  headLogo?: string;
  headLogoOrange?: boolean;
  photo?: string;
  title: string;
  location: string;
  paragraphs: string[];
  facts: Fact[];
  links: Link[];
  wide?: boolean;
  accent?: 'teal' | 'orange';
}

interface Milestone {
  id: string;
  type: 'done' | 'upcoming' | 'open';
  accent?: 'teal' | 'orange';
  date: string;
  title: string;
  sub: string;
  logo?: string;
  logoOrange?: boolean;
  img?: string;
  cat?: string;
  href?: string;
  modal?: ModalData;
}

/* ─── Data ───────────────────────────────────────────────────────────── */

const MILESTONES: Milestone[] = [
  {
    id: '3d3d',
    type: 'done',
    accent: 'teal',
    date: '03 / 2025',
    title: '3D3D Founded',
    sub: 'RV. Generator. Three printers.',
    logo: '/media/brand/3d3d-logo.svg',
    logoOrange: true,
    modal: {
      headDate: 'Founded 03 / 2025',
      headLogo: '/media/brand/3d3d-logo.svg',
      title: '3D3D',
      location: 'Atlantic Canada · Serving worldwide',
      accent: 'teal',
      paragraphs: [
        'One-person specialty fabrication operation. Started in an RV running three printers off a $30/day generator in 35-degree heat. Ten years as a mechanic — built performance engines, worked drag cars, restored classics. 20,000+ nautical miles offshore. Learned sailing on a duo passage from Halifax to Antigua that hit a cat-one storm: 70-knot sustained winds, 90-knot gusts.',
        '17 engineering-grade compounds in the stack — ASA, PETG-CF, PA11-CF, PP-GF, PPS, PEI 1010 and more. Every part designed for the conditions it has to survive. Not for display cases.',
      ],
      facts: [
        { val: '17', key: 'Materials' },
        { val: '20k+', key: 'Nautical miles' },
        { val: '10yr', key: 'Mechanical' },
        { val: '1', key: 'Founder' },
      ],
      links: [
        { href: '/about',      label: 'About Me →',    primary: true },
        { href: '/materials',  label: 'Material Stack →' },
        { href: '/contact',    label: 'Request Service →' },
        { href: 'https://www.printables.com/@KTK3D_3050116', label: 'Printables →', external: true },
      ],
    },
  },
  {
    id: 'equipment',
    type: 'done',
    accent: 'orange',
    date: '03 / 2026',
    title: 'Flagship Machine Acquired',
    sub: 'Enclosed CoreXY deployed',
    modal: {
      headDate: 'Acquired 03 / 2026',
      title: 'Flagship Machine Acquired',
      location: 'Enclosed CoreXY · High-temp · Open-source firmware',
      accent: 'orange',
      paragraphs: [
        "3D3D's flagship enclosed CoreXY machine is in production. Active chamber heating to 90°C, input shaping for high-speed printing without ringing, and multi-material capability. Built on open-source firmware and fully documented.",
        'The machine will be deployed live aboard CSM the Mariner during the 2026 Newport-Bermuda Race, printing engineering-grade parts 635nm offshore in open-ocean conditions.',
      ],
      facts: [
        { val: '360',  key: 'mm³/s flow' },
        { val: '90°C', key: 'Chamber heat' },
        { val: 'IS',   key: 'Input shaping' },
        { val: 'AMS',  key: 'Tool changing' },
      ],
      links: [
        { href: '/materials', label: 'Material Stack →' },
        { href: '/events',    label: 'Campaign Log →' },
        { href: 'https://ko-fi.com/3d3dca', label: 'Support on Ko-fi →', external: true },
      ],
    },
  },
  {
    id: 'newport',
    type: 'upcoming',
    accent: 'teal',
    date: '06 / 2026',
    title: 'Newport → Bermuda',
    sub: '120th running · 635nm · Live fabrication aboard',
    img: '/media/real/fleet-running.jpg',
    modal: {
      headDate: 'June 2026 · 120th Running',
      headTag: 'LIVE FABRICATION',
      photo: '/media/real/race-morning-crew.jpg',
      title: 'Newport, RI → Bermuda',
      location: '635nm · Open Atlantic · Gulf Stream crossing',
      accent: 'teal',
      wide: true,
      paragraphs: [
        'Aboard CSM the Mariner with an enclosed CoreXY printing live during the crossing. Spinnaker pole end fittings crack during night peels. Electronics brackets shatter when the hull slams a Gulf Stream trough. 200 miles offshore you cannot call a rigger — you fabricate the replacement while the boat holds its heading. Every part documented, tested, and published.',
      ],
      facts: [
        { val: '635',  key: 'Nautical miles' },
        { val: '120',  key: 'Years running' },
        { val: 'Live', key: '3D printing' },
        { val: '0',    key: 'Excuses' },
      ],
      links: [
        { href: '/events',                    label: 'Campaign details →',  primary: true },
        { href: 'https://ko-fi.com/3d3dca',   label: 'Support on Ko-fi →', external: true },
        { href: '/contact?subject=sponsorship', label: 'Become a sponsor →' },
        { href: '/book',                      label: 'Book a call →' },
      ],
    },
  },
  {
    id: 'slot-01',
    type: 'open',
    date: '2026',
    title: 'Campaign Partner',
    sub: 'Slot reserved · Enquire',
    cat: 'CAT-01',
    href: '/contact?subject=sponsorship',
  },
  {
    id: 'slot-02',
    type: 'open',
    date: '2026',
    title: 'Support the Mission',
    sub: 'Ko-fi · Any amount',
    cat: 'CAT-02',
    href: 'https://ko-fi.com/3d3dca',
  },
];

/* ─── Accent colours ─────────────────────────────────────────────────── */
const TEAL   = '#40C4C4';
const ORANGE = '#FA6831';
const accentHex = (c?: 'teal' | 'orange') => c === 'orange' ? ORANGE : TEAL;

/* ─── Cell component ─────────────────────────────────────────────────── */

function Cell({
  milestone,
  index,
  onClick,
  isVisible,
  shouldReduceMotion,
  onHoverStart,
  onHoverEnd,
}: {
  milestone: Milestone;
  index: number;
  onClick: () => void;
  isVisible: boolean;
  shouldReduceMotion: boolean;
  onHoverStart?: (m: Milestone, rect: DOMRect) => void;
  onHoverEnd?: () => void;
}) {
  const cellRef = useRef<HTMLDivElement>(null);
  const accent = accentHex(milestone.accent);
  const isOpen = milestone.type === 'open';
  const isUpcoming = milestone.type === 'upcoming';
  const isFeatured = isUpcoming;
  const isEquipment = milestone.id === 'equipment';

  const initial = shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30, rotateY: -8, scale: 0.88 };
  const animate = isVisible
    ? { opacity: 1, y: 0, rotateY: 0, scale: 1 }
    : shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30, rotateY: -8, scale: 0.88 };

  const hoverBg = isOpen
    ? 'rgba(255,255,255,0.025)'
    : 'rgba(255,255,255,0.05)';

  // Enhanced 3D hover — deeper pop-out, spring physics
  const hoverAnim = shouldReduceMotion ? {} : isEquipment ? {
    backgroundColor: hoverBg,
    translateZ: 60,
    rotateY: -4,
    rotateX: 2,
    scale: 1.08,
    boxShadow: '0 20px 40px rgba(250,104,49,0.25)',
  } : isOpen ? {} : {
    backgroundColor: hoverBg,
    translateZ: 40,
    rotateY: -4,
    rotateX: 2,
    scale: 1.06,
    boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
  };

  const hoverTransition = { type: 'spring' as const, stiffness: 300, damping: 20 };

  const handleMouseEnter = () => {
    if (shouldReduceMotion || !milestone.modal || !onHoverStart) return;
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return;
    const rect = cellRef.current?.getBoundingClientRect();
    if (rect) onHoverStart(milestone, rect);
  };

  const Tag = milestone.modal ? 'button' : 'a' as any;
  const tagProps = milestone.modal
    ? { type: 'button' as const, onClick }
    : { href: milestone.href ?? '#', target: milestone.href?.startsWith('http') ? '_blank' : undefined, rel: 'noopener noreferrer' };

  return (
    <motion.div
      ref={cellRef}
      initial={initial}
      animate={animate}
      transition={{ duration: 0.45, delay: index * 0.09, ease: [0.16, 1, 0.3, 1] }}
      style={{ flex: isFeatured ? '2 0 300px' : isOpen ? '1 0 190px' : '1 0 210px', perspective: '1400px' }}
      className={`cstrip-cell-wrap${isOpen ? ' cstrip-cell-wrap--open' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onHoverEnd}
    >
      <motion.div
        className={`cstrip-motion-cell${isOpen ? ' open' : ''}${isFeatured ? ' featured' : ''}${milestone.type === 'done' ? ' done' : ''}`}
        whileHover={hoverAnim}
        whileTap={shouldReduceMotion ? {} : { scale: 0.95, translateZ: -4 }}
        animate={isFeatured && !shouldReduceMotion ? { y: [0, -5, 0], rotateY: [0, 1, 0] } : {}}
        transition={isFeatured ? { y: { repeat: Infinity, duration: 3.5, ease: 'easeInOut' }, rotateY: { repeat: Infinity, duration: 3.5, ease: 'easeInOut' }, ...hoverTransition } : hoverTransition}
        style={{ height: '100%', transformStyle: 'preserve-3d' as const }}
      >
        <Tag {...tagProps} className="cstrip-cell-link" aria-label={milestone.title}>

          {/* Accent bar */}
          <div
            className="cstrip-accent"
            style={
              isOpen
                ? { height: 0, borderTop: `1px dashed rgba(64,196,196,0.2)`, marginTop: '3px' }
                : { height: '4px', background: accent }
            }
          />

          <div className="cstrip-inner">
            <div className="cstrip-left">

              {/* Badge */}
              {milestone.type === 'done' && (
                <span className="cstrip-badge cstrip-badge--done" style={{ color: accent, background: `${accent}18` }}>
                  ✓ Done
                </span>
              )}
              {isUpcoming && (
                <motion.span
                  className="cstrip-badge cstrip-badge--upcoming"
                  style={{ color: accent, borderColor: `${accent}40` }}
                  animate={shouldReduceMotion ? {} : { opacity: [0.6, 1, 0.6], scale: [0.95, 1.05, 0.95] }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                >
                  ▶ Upcoming
                </motion.span>
              )}
              {isOpen && (
                <span className="cstrip-badge cstrip-badge--open">
                  [{milestone.cat} · OPEN]
                </span>
              )}

              {/* Date */}
              <time className="cstrip-date">{milestone.date}</time>

              {/* Title */}
              <strong className={`cstrip-title${isOpen ? ' cstrip-title--ghost' : ''}`}>
                {milestone.title}
              </strong>

              {/* Sub */}
              <span className={`cstrip-sub${isOpen ? ' cstrip-sub--ghost' : ''}`}>
                {milestone.sub}
              </span>
            </div>

            {/* Right */}
            <div className="cstrip-right">
              {isOpen ? (
                <>
                  <span className="cstrip-dashes">——</span>
                  <motion.span
                    className="cstrip-expand cstrip-expand--ghost"
                    whileHover={shouldReduceMotion ? {} : { x: 2, y: -2 }}
                  >
                    {milestone.href?.startsWith('http') ? 'Ko-fi →' : 'Apply →'}
                  </motion.span>
                </>
              ) : (
                <>
                  {milestone.img ? (
                    <motion.img
                      src={milestone.img}
                      alt="Fleet at sea"
                      className="cstrip-img"
                      loading="lazy"
                      whileHover={shouldReduceMotion ? {} : { scale: 1.04, borderColor: `${accent}80` }}
                      transition={{ duration: 0.25 }}
                    />
                  ) : milestone.logo ? (
                    <img
                      src={milestone.logo}
                      alt={milestone.title}
                      className={`cstrip-logo${milestone.logoOrange ? ' cstrip-logo--color' : ''}`}
                      loading="lazy"
                    />
                  ) : null}
                  <motion.span
                    className="cstrip-expand"
                    style={{ color: `${accent}70` }}
                    whileHover={shouldReduceMotion ? {} : { x: 2, y: -2, color: accent }}
                  >
                    ↗
                  </motion.span>
                </>
              )}
            </div>
          </div>

          {/* Scan-line overlay on featured upcoming cell */}
          {isFeatured && !shouldReduceMotion && (
            <motion.div
              className="cstrip-scan"
              animate={{ x: ['-100%', '250%'] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 2 }}
            />
          )}
        </Tag>
      </motion.div>
    </motion.div>
  );
}

/* ─── Modal component ────────────────────────────────────────────────── */

function Modal({
  data,
  onClose,
  shouldReduceMotion,
}: {
  data: ModalData;
  onClose: () => void;
  shouldReduceMotion: boolean;
}) {
  const accent = accentHex(data.accent);

  // Close on Escape
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.classList.add('drawer-open');
    return () => document.body.classList.remove('drawer-open');
  }, []);

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const panelVariants = shouldReduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden:   { opacity: 0, scale: 0.93, y: 24 },
        visible:  { opacity: 1, scale: 1,    y: 0 },
        exit:     { opacity: 0, scale: 0.95, y: 12 },
      };

  return createPortal(
    <motion.div
      className="tm-overlay"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ duration: 0.25 }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        className={`tm-panel${data.wide ? ' tm-panel--wide' : ''}`}
        variants={panelVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <motion.button
          className="tm-close"
          onClick={onClose}
          whileHover={shouldReduceMotion ? {} : { backgroundColor: accent, color: '#111214' }}
          transition={{ duration: 0.15 }}
          aria-label="Close"
        >
          ×
        </motion.button>

        {/* Head band */}
        <div className="tm-head" style={{ borderBottomColor: accent }}>
          <span className="tm-head-date">{data.headDate}</span>
          {data.headTag && <span className="tm-head-tag" style={{ color: accent, borderColor: `${accent}60` }}>{data.headTag}</span>}
          {data.headLogo && (
            <img
              src={data.headLogo}
              alt=""
              className={`tm-head-logo${data.headLogoOrange ? ' tm-head-logo--color' : ''}`}
            />
          )}
        </div>

        {/* Photo strip */}
        {data.photo && (
          <div className="tm-photo">
            <img src={data.photo} alt="Race fleet" loading="lazy" />
          </div>
        )}

        {/* Body */}
        <div className="tm-body">
          <motion.h3
            className="tm-title"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.35 }}
          >
            {data.title}
          </motion.h3>
          <p className="tm-location">{data.location}</p>

          {data.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              className="tm-text"
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 + i * 0.06, duration: 0.32 }}
            >
              {p}
            </motion.p>
          ))}

          {/* Facts */}
          <motion.div
            className="tm-facts"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.35 }}
          >
            {data.facts.map((f, i) => (
              <div key={i} className="tm-fact">
                <motion.span
                  className="tm-fact-val"
                  style={{ color: accent }}
                  initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.28 + i * 0.05, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  {f.val}
                </motion.span>
                <span className="tm-fact-key">{f.key}</span>
              </div>
            ))}
          </motion.div>

          {/* Links */}
          <motion.div
            className="tm-links"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.32 }}
          >
            {data.links.map((l, i) => (
              <motion.a
                key={i}
                href={l.href}
                target={l.external ? '_blank' : undefined}
                rel={l.external ? 'noopener noreferrer' : undefined}
                className={`tm-cta${l.primary ? ' tm-cta--primary' : ''}${l.orange ? ' tm-cta--orange' : ''}`}
                whileHover={shouldReduceMotion ? {} : { y: -2, scale: 1.02 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                transition={{ duration: 0.15 }}
              >
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

/* ─── Progress track ─────────────────────────────────────────────────── */

function ProgressTrack({ visible, shouldReduceMotion }: { visible: boolean; shouldReduceMotion: boolean }) {
  return (
    <div className="cstrip-track">
      <motion.div
        className="cstrip-track-fill"
        initial={{ width: 0 }}
        animate={visible ? { width: '66%' } : { width: 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      >
        {!shouldReduceMotion && (
          <motion.div
            className="cstrip-shimmer"
            animate={{ x: ['-100%', '400%'] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 2 }}
          />
        )}
      </motion.div>
    </div>
  );
}

/* ─── Hover preview (desktop only, half-screen) ─────────────────────── */

function HoverPreview({
  milestone,
  cellRect,
  stripRect,
  shouldReduceMotion,
}: {
  milestone: Milestone;
  cellRect: DOMRect;
  stripRect: DOMRect;
  shouldReduceMotion: boolean;
}) {
  if (!milestone.modal) return null;
  const data = milestone.modal;
  const accent = accentHex(milestone.accent);

  // Position above the cell, centered on it
  const left = cellRect.left - stripRect.left + cellRect.width / 2;

  return (
    <motion.div
      className="cstrip-preview"
      initial={{ opacity: 0, scale: 0.96, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 8 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      style={{ left, transform: 'translateX(-50%)' }}
    >
      {/* Photo */}
      {(data.photo || milestone.img) && (
        <div className="cstrip-preview__photo">
          <img src={data.photo || milestone.img} alt="" loading="lazy" />
        </div>
      )}
      {/* Logo fallback */}
      {!data.photo && !milestone.img && milestone.logo && (
        <div className="cstrip-preview__logo-area" style={{ borderBottomColor: `${accent}30` }}>
          <img src={milestone.logo} alt="" className={milestone.logoOrange ? 'cstrip-preview__logo--color' : ''} />
        </div>
      )}
      <div className="cstrip-preview__body">
        <span className="cstrip-preview__date" style={{ color: accent }}>{data.headDate}</span>
        <h4 className="cstrip-preview__title">{data.title}</h4>
        <p className="cstrip-preview__location">{data.location}</p>
        {data.paragraphs[0] && (
          <p className="cstrip-preview__text">{data.paragraphs[0].slice(0, 200)}{data.paragraphs[0].length > 200 ? '...' : ''}</p>
        )}
        <span className="cstrip-preview__cta" style={{ color: accent }}>Click to read more &rarr;</span>
      </div>
    </motion.div>
  );
}

/* ─── Main strip component ───────────────────────────────────────────── */

export default function CampaignStrip() {
  const [activeModal, setActiveModal] = useState<ModalData | null>(null);
  const [hoveredMilestone, setHoveredMilestone] = useState<Milestone | null>(null);
  const [hoverCellRect, setHoverCellRect] = useState<DOMRect | null>(null);
  const [stripVisible, setStripVisible] = useState(false);
  const stripRef = useRef<HTMLElement>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const shouldReduceMotion = useReducedMotion() ?? false;

  // Observe strip entering view
  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStripVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const openModal = useCallback((m: Milestone) => {
    if (m.modal) {
      setHoveredMilestone(null); // dismiss preview when opening modal
      setActiveModal(m.modal);
    }
  }, []);

  const closeModal = useCallback(() => setActiveModal(null), []);

  // Hover preview handlers (desktop only)
  const handleHoverStart = useCallback((m: Milestone, rect: DOMRect) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setHoveredMilestone(m);
    setHoverCellRect(rect);
  }, []);

  const handleHoverEnd = useCallback(() => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredMilestone(null);
      setHoverCellRect(null);
    }, 100);
  }, []);

  return (
    <>
      <section
        ref={stripRef}
        className="cstrip-root"
        aria-label="Campaign timeline"
      >
        {/* Header */}
        <div className="cstrip-header">
          <span className="cstrip-label">Campaign Timeline</span>
          <span className="cstrip-status">
            <motion.span
              className="cstrip-pulse"
              animate={shouldReduceMotion ? {} : {
                boxShadow: [
                  '0 0 0 0 rgba(64,196,196,0.7)',
                  '0 0 0 8px rgba(64,196,196,0)',
                  '0 0 0 0 rgba(64,196,196,0)',
                ],
              }}
              transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
            />
            Live — Newport-Bermuda 2026
          </span>
        </div>

        {/* Rail */}
        <div className="cstrip-rail" role="list">
          {MILESTONES.map((m, i) => (
            <div key={m.id} role="listitem" style={{ display: 'contents' }}>
              <Cell
                milestone={m}
                index={i}
                onClick={() => openModal(m)}
                isVisible={stripVisible}
                shouldReduceMotion={shouldReduceMotion}
                onHoverStart={handleHoverStart}
                onHoverEnd={handleHoverEnd}
              />
            </div>
          ))}
        </div>

        {/* Progress track */}
        <ProgressTrack visible={stripVisible} shouldReduceMotion={shouldReduceMotion} />

        {/* Hover preview (desktop only) */}
        <AnimatePresence>
          {hoveredMilestone && hoverCellRect && stripRef.current && !activeModal && (
            <HoverPreview
              key={hoveredMilestone.id}
              milestone={hoveredMilestone}
              cellRect={hoverCellRect}
              stripRect={stripRef.current.getBoundingClientRect()}
              shouldReduceMotion={shouldReduceMotion}
            />
          )}
        </AnimatePresence>
      </section>

      {/* Modal portal */}
      <AnimatePresence>
        {activeModal && (
          <Modal
            key="campaign-modal"
            data={activeModal}
            onClose={closeModal}
            shouldReduceMotion={shouldReduceMotion}
          />
        )}
      </AnimatePresence>
    </>
  );
}
