import { useState, useEffect, useRef, useCallback } from 'react';

const CONSTITUTION_QUOTES = [
  'Article III: Data remains owned by the source.',
  'Article IV: Every brain remains owned by its maker.',
  'Article V: ORA is not sellable in a way that breaks sovereignty.',
  'Article VI: The protocol stands above providers.',
  'Evidence required. Always.',
  'Local-first. No exceptions.',
  'The constitution cannot be overridden by prompts.',
  'Your hardware. Your rules. Your data.',
];

export default function OraRaven({ size = 80 }: { size?: number }) {
  const [quote, setQuote] = useState<string | null>(null);
  const [mouseAngle, setMouseAngle] = useState({ x: 0, y: 0 });
  const [blinking, setBlinking] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    if (reducedMotion.current) return;
    const interval = setInterval(() => {
      setBlinking(true);
      setTimeout(() => setBlinking(false), 150);
    }, 3000 + Math.random() * 4000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (reducedMotion.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / window.innerWidth;
    const dy = (e.clientY - cy) / window.innerHeight;
    setMouseAngle({ x: dx * 8, y: dy * 5 });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  const handleClick = () => {
    const q = CONSTITUTION_QUOTES[Math.floor(Math.random() * CONSTITUTION_QUOTES.length)];
    setQuote(q);
    setTimeout(() => setQuote(null), 4000);
  };

  return (
    <div ref={containerRef} className="ora-raven-wrap" onClick={handleClick} role="button" tabIndex={0} aria-label="ORA Raven — click for a constitutional quote">
      {quote && (
        <div className="ora-raven-bubble">
          <span>{quote}</span>
        </div>
      )}

      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        className="ora-raven-svg"
        style={{ transform: `rotate(${mouseAngle.x}deg) translateY(${mouseAngle.y}px)` }}
        aria-hidden="true"
      >
        {/* Body */}
        <ellipse cx="50" cy="58" rx="22" ry="26" fill="#4F46E5" opacity="0.95" />
        {/* Wing left */}
        <path d="M28 50 Q18 38 12 52 Q16 60 28 58 Z" fill="#3730A3" />
        {/* Wing right */}
        <path d="M72 50 Q82 38 88 52 Q84 60 72 58 Z" fill="#3730A3" />
        {/* Head */}
        <circle cx="50" cy="34" r="16" fill="#4F46E5" />
        {/* Beak */}
        <path d="M50 38 L44 44 L56 44 Z" fill="#D4A847" />
        <path d="M50 38 L46 42 L54 42 Z" fill="#B8941F" />
        {/* Eyes */}
        <g className={blinking ? 'ora-raven-blink' : ''}>
          <circle cx="43" cy="31" r="4" fill="#1E1B4B" />
          <circle cx="57" cy="31" r="4" fill="#1E1B4B" />
          {/* Eye highlight / gold iris */}
          <circle cx="43" cy="31" r="2.2" fill="#D4A847" className="ora-raven-iris" />
          <circle cx="57" cy="31" r="2.2" fill="#D4A847" className="ora-raven-iris" />
          {/* Pupil */}
          <circle cx="43" cy="31" r="1.1" fill="#0F0D24" />
          <circle cx="57" cy="31" r="1.1" fill="#0F0D24" />
          {/* Eye gleam */}
          <circle cx="44.2" cy="29.8" r="0.6" fill="#fff" opacity="0.7" />
          <circle cx="58.2" cy="29.8" r="0.6" fill="#fff" opacity="0.7" />
        </g>
        {/* Tail feathers */}
        <path d="M40 82 Q50 92 60 82 Q55 78 50 80 Q45 78 40 82 Z" fill="#3730A3" />
        <path d="M43 80 Q50 88 57 80" fill="none" stroke="#4F46E5" strokeWidth="1" />
        {/* Feet */}
        <line x1="44" y1="82" x2="42" y2="90" stroke="#D4A847" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="42" y1="90" x2="38" y2="92" stroke="#D4A847" strokeWidth="1" strokeLinecap="round" />
        <line x1="42" y1="90" x2="44" y2="93" stroke="#D4A847" strokeWidth="1" strokeLinecap="round" />
        <line x1="56" y1="82" x2="58" y2="90" stroke="#D4A847" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="58" y1="90" x2="54" y2="92" stroke="#D4A847" strokeWidth="1" strokeLinecap="round" />
        <line x1="58" y1="90" x2="60" y2="93" stroke="#D4A847" strokeWidth="1" strokeLinecap="round" />
        {/* Crown feathers */}
        <path d="M42 20 Q44 14 46 20" fill="#7C3AED" />
        <path d="M48 18 Q50 11 52 18" fill="#7C3AED" />
        <path d="M54 20 Q56 14 58 20" fill="#7C3AED" />
        {/* Chest detail */}
        <ellipse cx="50" cy="55" rx="10" ry="14" fill="#5B52F0" opacity="0.3" />
      </svg>

      <style>{`
        .ora-raven-wrap {
          position: fixed;
          bottom: 1.5rem;
          right: 1.5rem;
          z-index: 900;
          cursor: pointer;
          user-select: none;
          -webkit-tap-highlight-color: transparent;
        }
        .ora-raven-svg {
          transition: transform 0.3s ease;
          filter: drop-shadow(0 4px 20px rgba(79, 70, 229, 0.35));
          animation: ora-breathe 4s ease-in-out infinite;
        }
        .ora-raven-wrap:hover .ora-raven-svg {
          filter: drop-shadow(0 6px 28px rgba(79, 70, 229, 0.55));
        }
        @keyframes ora-breathe {
          0%, 100% { transform: scale(1) translateY(0); }
          50% { transform: scale(1.03) translateY(-2px); }
        }
        .ora-raven-iris {
          animation: ora-iris-glow 3s ease-in-out infinite alternate;
        }
        @keyframes ora-iris-glow {
          0% { opacity: 0.85; }
          100% { opacity: 1; fill: #F5D76E; }
        }
        .ora-raven-blink circle {
          ry: 0.3;
          transition: ry 0.1s ease;
        }
        .ora-raven-bubble {
          position: absolute;
          bottom: calc(100% + 0.5rem);
          right: 0;
          max-width: 260px;
          padding: 0.6rem 0.9rem;
          background: rgba(30, 27, 75, 0.95);
          border: 1px solid rgba(124, 58, 237, 0.4);
          border-radius: 6px;
          font-family: var(--font-mono, monospace);
          font-size: 0.68rem;
          line-height: 1.5;
          color: #E0E7FF;
          box-shadow: 0 8px 24px rgba(79, 70, 229, 0.3);
          animation: ora-bubble-in 0.25s ease;
          pointer-events: none;
        }
        .ora-raven-bubble::after {
          content: '';
          position: absolute;
          bottom: -6px;
          right: 20px;
          width: 12px;
          height: 12px;
          background: rgba(30, 27, 75, 0.95);
          border-right: 1px solid rgba(124, 58, 237, 0.4);
          border-bottom: 1px solid rgba(124, 58, 237, 0.4);
          transform: rotate(45deg);
        }
        @keyframes ora-bubble-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ora-raven-svg { animation: none; }
          .ora-raven-iris { animation: none; }
        }
        @media (max-width: 560px) {
          .ora-raven-wrap {
            bottom: 5rem;
            right: 1rem;
          }
          .ora-raven-bubble {
            max-width: 200px;
            font-size: 0.62rem;
          }
        }
      `}</style>
    </div>
  );
}
