import { useEffect, useMemo, useRef, useState } from 'react';

import type { TrustStat } from '../data/oraPresentation';

interface Props {
  stats: TrustStat[];
}

export default function OraTrustStats({ stats }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [values, setValues] = useState<number[]>(() => stats.map((stat) => stat.value));

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return undefined;

    if (prefersReducedMotion) {
      setStarted(true);
      return undefined;
    }

    setValues(stats.map(() => 0));

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!started) return undefined;

    if (prefersReducedMotion) {
      setValues(stats.map((stat) => stat.value));
      return undefined;
    }

    let frame = 0;
    const startTime = performance.now();
    const duration = 1600;

    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setValues(
        stats.map((stat) => {
          if (stat.value === 0) return 0;
          return Math.round(stat.value * eased);
        })
      );

      if (progress < 1) {
        frame = window.requestAnimationFrame(animate);
      }
    };

    frame = window.requestAnimationFrame(animate);

    return () => window.cancelAnimationFrame(frame);
  }, [prefersReducedMotion, started, stats]);

  const formatter = new Intl.NumberFormat('en-US');

  return (
    <div ref={rootRef} className="ora-stat-grid">
      {stats.map((stat, index) => (
        <article
          key={stat.label}
          className={`ora-stat-card ora-stat-card--${stat.tone}`}
        >
          <p className="ora-stat-card__value" aria-label={`${stat.value}${stat.suffix ?? ''}`}>
            {stat.prefix}
            {formatter.format(values[index] ?? 0)}
            {stat.suffix}
          </p>
          <p className="ora-stat-card__label">{stat.label}</p>
          <p className="ora-stat-card__note">{stat.note}</p>
        </article>
      ))}
    </div>
  );
}
