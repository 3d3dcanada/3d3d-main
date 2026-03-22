import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';

/* ─── Character scramble hook ─────────────────────────────────────────── */

function useScramble(finalText: string, startDelay = 150, duration = 900) {
  const [text, setText] = useState('');
  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@!%';

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let interval: ReturnType<typeof setInterval>;
    let frame = 0;
    const totalFrames = Math.ceil(duration / 22);

    timeout = setTimeout(() => {
      interval = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        setText(
          finalText
            .split('')
            .map((char, i) => {
              if (char === ' ') return ' ';
              if (char === '&') return '&';
              if (i / finalText.length < progress) return char;
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join(''),
        );
        if (frame >= totalFrames) {
          clearInterval(interval);
          setText(finalText);
        }
      }, 22);
    }, startDelay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval!);
    };
  }, [finalText, startDelay, duration]);

  return text;
}

/* ─── Word-split line: each word slides up from below a clipped row ───── */

function WordLine({
  text,
  className,
  baseDelay,
  reduced,
}: {
  text: string;
  className?: string;
  baseDelay: number;
  reduced: boolean;
}) {
  const words = text.split(' ');
  return (
    <span className={`hero-line${className ? ` ${className}` : ''}`} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="hero-word-clip">
          <motion.span
            className="hero-word"
            initial={reduced ? {} : { y: '105%' }}
            animate={{ y: '0%' }}
            transition={{
              duration: 0.75,
              delay: baseDelay + i * 0.07,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ─── Scroll indicator ────────────────────────────────────────────────── */

function ScrollCue({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      className="hero-scroll-cue"
      initial={reduced ? {} : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.8, duration: 0.6 }}
      aria-hidden="true"
    >
      <span className="hero-scroll-label">Scroll</span>
      <motion.span
        className="hero-scroll-line"
        animate={reduced ? {} : { scaleY: [1, 0.3, 1] }}
        transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
      />
    </motion.div>
  );
}

/* ─── Main component ──────────────────────────────────────────────────── */

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() ?? false;

  // Scroll-driven parallax on background
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);

  // Eyebrow scramble
  const eyebrow = useScramble('Offshore Fabrication & Mechanical Specialist', 120, 800);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="home-section home-section--dark home-hero"
      data-section
    >
      {/* ── Background: parallax + Ken Burns ── */}
      <motion.div
        className="hero-bg"
        aria-hidden="true"
        style={reduced ? {} : { y: bgY }}
      >
        <img
          src="/media/real/fleet-start-press.jpg"
          alt=""
          loading="eager"
          decoding="async"
          className="hero-bg-img"
          fetchPriority="high"
        />
      </motion.div>

      {/* ── Grain texture ── */}
      <svg className="hero-grain" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
        <filter id="hgrain">
          <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hgrain)" opacity="0.045" />
      </svg>

      {/* ── Grid overlay ── */}
      <div className="hero-grid" aria-hidden="true" />

      {/* ── Vignette ── */}
      <div className="hero-vignette" aria-hidden="true" />

      {/* ── Content ── */}
      <div className="section-shell hero-shell">

        {/* Copy */}
        <div className="hero-copy">

          {/* Eyebrow scramble */}
          <motion.p
            className="eyebrow hero-eyebrow"
            initial={reduced ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.01, delay: 0.1 }}
          >
            <span className="hero-eyebrow-inner" aria-label="Offshore Fabrication & Mechanical Specialist">
              {eyebrow || '\u00A0'}
            </span>
          </motion.p>

          {/* H1 word-split */}
          <h1 className="hero-title" aria-label="You have a problem. I am your solution.">
            <WordLine text="You have a problem." baseDelay={0.28} reduced={reduced} />
            <WordLine
              text="I am your solution."
              className="hero-line--accent"
              baseDelay={0.54}
              reduced={reduced}
            />
          </h1>

          {/* Subhead blur-fade */}
          <motion.p
            className="hero-subhead"
            initial={reduced ? {} : { opacity: 0, y: 18, filter: 'blur(5px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.75, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
          >
            I am not a 3D printing service. I am an offshore specialist with a twenty-year mechanical
            background, advanced fabrication tools, and the hard-won knowledge of what keeps a vessel
            moving. The printer is just the newest tool in a kit built to fix things that cannot fail
            at sea. Available for on-site work, worldwide. One call.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="hero-actions"
            initial={reduced ? {} : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.a
              href="/contact"
              className="hero-button hero-button--primary"
              data-analytics-event="contact_started"
              data-analytics-source="hero-cta"
              whileHover={reduced ? {} : { y: -3, scale: 1.03 }}
              whileTap={reduced ? {} : { scale: 0.97 }}
              transition={{ duration: 0.18 }}
            >
              One Call. I'll Assess It. →
            </motion.a>
            <motion.a
              href="https://ko-fi.com/3d3dca"
              className="hero-button hero-button--ghost"
              target="_blank"
              rel="noopener noreferrer"
              data-analytics-event="kofi_clicked"
              data-analytics-source="hero-cta"
              whileHover={reduced ? {} : { y: -3, scale: 1.03 }}
              whileTap={reduced ? {} : { scale: 0.97 }}
              transition={{ duration: 0.18 }}
            >
              Support the Campaign →
            </motion.a>
          </motion.div>
        </div>

        {/* Video */}
        <motion.div
          className="hero-media"
          initial={reduced ? {} : { opacity: 0, x: 36 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.0, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="hero-video-frame"
            whileHover={reduced ? {} : { scale: 1.015 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <video
              className="hero-video"
              src="/media/hero-loop.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/media/real/race-morning-crew.jpg"
              aria-label="3D3D deployment video reel"
            />
            {/* Teal glow accent on video border */}
            <motion.div
              className="hero-video-glow"
              animate={reduced ? {} : {
                boxShadow: [
                  '0 0 0 0 rgba(64,196,196,0)',
                  '0 0 40px 8px rgba(64,196,196,0.18)',
                  '0 0 0 0 rgba(64,196,196,0)',
                ],
              }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 2 }}
            />
          </motion.div>

          {/* Stat pills floating below video */}
          <motion.div
            className="hero-stat-rail"
            initial={reduced ? {} : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {[
              { val: '20k+', label: 'Offshore miles' },
              { val: '17', label: 'Materials' },
              { val: '10yr', label: 'Mechanical' },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                className="hero-stat"
                initial={reduced ? {} : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.35 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={reduced ? {} : { y: -2 }}
              >
                <span className="hero-stat__val">{s.val}</span>
                <span className="hero-stat__label">{s.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <ScrollCue reduced={reduced} />
    </section>
  );
}
