import {
  lazy,
  startTransition,
  Suspense,
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useReducedMotion } from 'motion/react';

import {
  PRIMARY_ORBIT_SECTION_IDS,
  SPLASH_SECTIONS,
  type SplashSection,
} from '../data/splashSections';
import {
  getNearestIndex,
  getOrbitItems,
  getSnapAngle,
  shortestAngleDelta,
} from '../lib/splash-orbit';
import SplashBentoCard from './SplashBentoCard';

const LazySplashScene = lazy(() => import('./SplashScene'));

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);
    const update = () => setMatches(mediaQuery.matches);

    update();
    mediaQuery.addEventListener('change', update);

    return () => mediaQuery.removeEventListener('change', update);
  }, [query]);

  return matches;
}

function supportsWebGL() {
  if (typeof window === 'undefined') return false;

  const canvas = document.createElement('canvas');

  try {
    return Boolean(
      canvas.getContext('webgl2') ||
        canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl'),
    );
  } catch {
    return false;
  }
}

function isActivationKey(key: string) {
  return key === 'Enter' || key === ' ';
}

function FallbackGrid({ sections }: { sections: SplashSection[] }) {
  return (
    <div className="splash-fallback" role="list">
      {sections.map((section) => (
        <a
          key={section.id}
          href={section.href}
          className={`glass-dark splash-fallback__item splash-fallback__item--${section.accent}`}
          data-analytics-event="splash_cta_click"
          data-analytics-source={`fallback-${section.id}`}
          role="listitem"
        >
          <span className="splash-fallback__kicker">{section.kicker}</span>
          <span className="splash-fallback__title">{section.title}</span>
          <span className="splash-fallback__copy">{section.description}</span>
          <span className="splash-fallback__cta">{section.ctaLabel} →</span>
        </a>
      ))}
    </div>
  );
}

export default function SplashOrbit() {
  const shouldReduceMotion = useReducedMotion();
  const isCoarsePointer = useMediaQuery('(pointer: coarse)');
  const isCompactWidth = useMediaQuery('(max-width: 540px)');
  const isUltraSmall = useMediaQuery('(max-width: 359px)');
  const [supportsThree, setSupportsThree] = useState<boolean | null>(null);
  const [saveDataMode, setSaveDataMode] = useState(false);
  const [angle, setAngle] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [entryProgress, setEntryProgress] = useState(shouldReduceMotion ? 1 : 0);
  const [sceneReady, setSceneReady] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const sceneShellRef = useRef<HTMLDivElement>(null);
  const angleRef = useRef(0);
  const velocityRef = useRef(0);
  const dragStateRef = useRef({ active: false, pointerId: -1, lastX: 0, lastTime: 0 });
  const lastInteractionRef = useRef(0);
  const snapTargetRef = useRef<number | null>(null);
  const activeIndexRef = useRef(0);
  const parallaxRafRef = useRef(0);

  useEffect(() => {
    setSupportsThree(supportsWebGL());

    if (typeof navigator !== 'undefined') {
      const connection = (navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }).connection;

      setSaveDataMode(
        Boolean(connection?.saveData) ||
          connection?.effectiveType === 'slow-2g' ||
          connection?.effectiveType === '2g',
      );
    }
  }, []);

  const useAdaptiveOrbit = (isCoarsePointer && isCompactWidth) || saveDataMode;
  const orbitSections = useMemo(
    () =>
      useAdaptiveOrbit
        ? SPLASH_SECTIONS.filter((section) =>
            PRIMARY_ORBIT_SECTION_IDS.includes(
              section.id as (typeof PRIMARY_ORBIT_SECTION_IDS)[number],
            ),
          )
        : SPLASH_SECTIONS,
    [useAdaptiveOrbit],
  );
  const overflowSections = useMemo(
    () =>
      useAdaptiveOrbit
        ? SPLASH_SECTIONS.filter(
            (section) =>
              !PRIMARY_ORBIT_SECTION_IDS.includes(
                section.id as (typeof PRIMARY_ORBIT_SECTION_IDS)[number],
              ),
          )
        : [],
    [useAdaptiveOrbit],
  );
  const compactOrbit = useAdaptiveOrbit;

  const orbitItems = useMemo(
    () => getOrbitItems(orbitSections, angle, compactOrbit),
    [angle, compactOrbit, orbitSections],
  );
  const handleSceneReady = useCallback(() => {
    setSceneReady(true);
  }, []);
  const handleHoverIndexChange = useCallback((index: number | null) => {
    setHoveredIndex(index);
  }, []);
  const focusIndex = useDeferredValue(hoveredIndex ?? activeIndex);
  const focusedItem = orbitItems[focusIndex] ?? orbitItems[activeIndex] ?? orbitItems[0];
  const cardAlign = isCoarsePointer ? 'bottom' : focusedItem?.x < 0 ? 'right' : 'left';

  const updateAngle = useCallback(
    (nextAngle: number) => {
      angleRef.current = nextAngle;
      setAngle(nextAngle);

      const nextActiveIndex = getNearestIndex(orbitSections, nextAngle);
      if (nextActiveIndex !== activeIndexRef.current) {
        activeIndexRef.current = nextActiveIndex;
        startTransition(() => {
          setActiveIndex(nextActiveIndex);
        });
      }
    },
    [orbitSections],
  );

  useEffect(() => {
    activeIndexRef.current = 0;
    updateAngle(0);
    setHoveredIndex(null);
    snapTargetRef.current = null;
    velocityRef.current = 0;
  }, [orbitSections, updateAngle]);

  const queueSnapToIndex = useCallback(
    (targetIndex: number) => {
      if (!orbitSections.length) return;

      snapTargetRef.current = getSnapAngle(angleRef.current, targetIndex, orbitSections.length);
      lastInteractionRef.current = performance.now();
      velocityRef.current *= 0.4;
      setHoveredIndex(null);
    },
    [orbitSections.length],
  );

  useEffect(() => {
    lastInteractionRef.current = performance.now();
  }, []);

  useEffect(() => {
    if (shouldReduceMotion) {
      setEntryProgress(1);
      return;
    }

    let frame = 0;
    const start = performance.now();
    const duration = 1200;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      setEntryProgress(progress);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [shouldReduceMotion]);

  // Mouse parallax — sets CSS custom properties on root for stripe parallax
  useEffect(() => {
    const root = rootRef.current;
    if (!root || shouldReduceMotion) return;

    const onMove = (e: MouseEvent) => {
      if (parallaxRafRef.current) return;
      parallaxRafRef.current = requestAnimationFrame(() => {
        parallaxRafRef.current = 0;
        const mx = ((e.clientX / window.innerWidth) - 0.5) * 2;
        const my = ((e.clientY / window.innerHeight) - 0.5) * 2;
        root.style.setProperty('--mx', mx.toFixed(3));
        root.style.setProperty('--my', my.toFixed(3));
      });
    };

    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(parallaxRafRef.current);
    };
  }, [shouldReduceMotion]);

  // Scroll wheel — rotates orbit via velocity impulse
  useEffect(() => {
    const el = sceneShellRef.current;
    if (!el || shouldReduceMotion) return;

    const handler = (e: WheelEvent) => {
      e.preventDefault();
      const deltaAngle = (e.deltaY / (el.clientWidth || 1)) * Math.PI * 0.5;
      velocityRef.current += deltaAngle * 0.001;
      lastInteractionRef.current = performance.now();
      snapTargetRef.current = null;
    };

    el.addEventListener('wheel', handler, { passive: false });
    return () => el.removeEventListener('wheel', handler);
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (shouldReduceMotion || !orbitSections.length) return;

    let frame = 0;
    let lastTime = performance.now();
    const frictionPerFrame = 0.9;
    const autoRotateSpeed = -0.00016;

    const loop = (now: number) => {
      const deltaMs = Math.max(8, Math.min(32, now - lastTime));
      const friction = Math.pow(frictionPerFrame, deltaMs / 16.67);

      lastTime = now;

      if (!dragStateRef.current.active) {
        const idle = now - lastInteractionRef.current > 5000;
        let nextAngle = angleRef.current;

        if (snapTargetRef.current !== null) {
          const delta = shortestAngleDelta(nextAngle, snapTargetRef.current);
          nextAngle += delta * 0.14 * (deltaMs / 16.67);
          velocityRef.current *= friction;

          if (Math.abs(delta) < 0.0015) {
            nextAngle = snapTargetRef.current;
            snapTargetRef.current = null;
            velocityRef.current = 0;
          }
        } else if (Math.abs(velocityRef.current) > 0.00002) {
          nextAngle += velocityRef.current * deltaMs;
          velocityRef.current *= friction;

          if (Math.abs(velocityRef.current) < 0.00003) {
            const nearestIndex = getNearestIndex(orbitSections, nextAngle);
            snapTargetRef.current = getSnapAngle(nextAngle, nearestIndex, orbitSections.length);
          }
        } else if (idle) {
          nextAngle += autoRotateSpeed * deltaMs;
        } else {
          const nearestIndex = getNearestIndex(orbitSections, nextAngle);
          const targetAngle = getSnapAngle(nextAngle, nearestIndex, orbitSections.length);
          const delta = shortestAngleDelta(nextAngle, targetAngle);
          nextAngle += delta * 0.08 * (deltaMs / 16.67);
        }

        if (nextAngle !== angleRef.current) updateAngle(nextAngle);
      }

      frame = requestAnimationFrame(loop);
    };

    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [orbitSections, shouldReduceMotion, updateAngle]);

  const handlePointerDown = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;

    dragStateRef.current = {
      active: true,
      pointerId: event.pointerId,
      lastX: event.clientX,
      lastTime: performance.now(),
    };

    lastInteractionRef.current = performance.now();
    snapTargetRef.current = null;
    velocityRef.current = 0;
    setHoveredIndex(null);
    event.currentTarget.setPointerCapture(event.pointerId);
    sceneShellRef.current?.classList.add('splash-orbit__scene-shell--dragging');
  }, [shouldReduceMotion]);

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!dragStateRef.current.active || dragStateRef.current.pointerId !== event.pointerId) return;

      const shellWidth = sceneShellRef.current?.clientWidth ?? 1;
      const now = performance.now();
      const deltaX = event.clientX - dragStateRef.current.lastX;
      const deltaTime = Math.max(10, now - dragStateRef.current.lastTime);
      const deltaAngle = (deltaX / shellWidth) * Math.PI * 1.45;

      dragStateRef.current.lastX = event.clientX;
      dragStateRef.current.lastTime = now;
      lastInteractionRef.current = now;
      velocityRef.current = deltaAngle / deltaTime;
      updateAngle(angleRef.current + deltaAngle);
    },
    [updateAngle],
  );

  const finishPointer = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragStateRef.current.active || dragStateRef.current.pointerId !== event.pointerId) return;

    dragStateRef.current.active = false;
    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      // Pointer capture may already be released.
    }
    lastInteractionRef.current = performance.now();
    sceneShellRef.current?.classList.remove('splash-orbit__scene-shell--dragging');
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (!orbitSections.length) return;

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        queueSnapToIndex((activeIndexRef.current - 1 + orbitSections.length) % orbitSections.length);
        return;
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        queueSnapToIndex((activeIndexRef.current + 1) % orbitSections.length);
        return;
      }

      if (isActivationKey(event.key)) {
        event.preventDefault();
        const target = orbitSections[focusIndex] ?? orbitSections[activeIndexRef.current];
        if (target) window.location.assign(target.href);
      }
    },
    [focusIndex, orbitSections, queueSnapToIndex],
  );

  if (shouldReduceMotion || isUltraSmall || supportsThree === false) {
    return (
      <div className="splash-orbit splash-orbit--fallback">
        <div className="splash-orbit__stripes" aria-hidden="true">
          <span className="splash-orbit__stripe splash-orbit__stripe--teal" />
          <span className="splash-orbit__stripe splash-orbit__stripe--magenta" />
          <span className="splash-orbit__stripe splash-orbit__stripe--orange" />
        </div>

        <div className="splash-orbit__grain" aria-hidden="true" />

        <div className="splash-orbit__poster">
          <p className="splash-orbit__eyebrow">Founder-operated cooperative fabrication</p>
          <h1 className="splash-orbit__brand">3D3D</h1>
          <p className="splash-orbit__instruction">
            Choose the part of the platform you need and head straight in.
          </p>
        </div>

        <FallbackGrid sections={SPLASH_SECTIONS} />
      </div>
    );
  }

  return (
    <div ref={rootRef} className="splash-orbit">
      <div className="splash-orbit__stripes" aria-hidden="true">
        <span className="splash-orbit__stripe splash-orbit__stripe--teal" />
        <span className="splash-orbit__stripe splash-orbit__stripe--magenta" />
        <span className="splash-orbit__stripe splash-orbit__stripe--orange" />
      </div>

      <div className="splash-orbit__grain" aria-hidden="true" />
      <div className="splash-orbit__vignette" aria-hidden="true" />

      <div className="splash-orbit__poster">
        <p className="splash-orbit__eyebrow">Founder-operated cooperative fabrication</p>
        <h1 className="splash-orbit__brand">3D3D</h1>
        <p className="splash-orbit__instruction">
          Spin the orbit and enter the part of the platform that fits the job in front of you.
        </p>
      </div>

      <div className="splash-orbit__status" aria-hidden="true">
        <span className="splash-orbit__status-label">Orbit</span>
        <span className="splash-orbit__status-value">
          {(focusIndex + 1).toString().padStart(2, '0')} / {orbitSections.length.toString().padStart(2, '0')}
        </span>
      </div>

      <div
        ref={sceneShellRef}
        className="splash-orbit__scene-shell"
        tabIndex={0}
        role="group"
        aria-roledescription="3D section picker"
        aria-describedby="splash-orbit-help"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishPointer}
        onPointerCancel={finishPointer}
        onPointerLeave={finishPointer}
        onKeyDown={handleKeyDown}
      >
        <Suspense
          fallback={
            <div className="splash-orbit__loader" aria-hidden="true">
              <span className="splash-orbit__loader-pulse" />
            </div>
          }
        >
          <LazySplashScene
            items={orbitItems}
            activeIndex={activeIndex}
            focusIndex={focusIndex}
            entryProgress={entryProgress}
            reducedMotion={Boolean(shouldReduceMotion)}
            saveData={saveDataMode}
            onHoverIndexChange={handleHoverIndexChange}
            onReady={handleSceneReady}
          />
        </Suspense>

        {!sceneReady && (
          <div className="splash-orbit__loader splash-orbit__loader--overlay" aria-hidden="true">
            <span className="splash-orbit__loader-pulse" />
          </div>
        )}
      </div>

      {focusedItem && (
        <SplashBentoCard
          section={focusedItem.section}
          align={cardAlign}
          compact={compactOrbit}
        />
      )}

      <div className="splash-orbit__selector" aria-label="Jump to a section">
        {orbitSections.map((section, index) => {
          const selected = index === focusIndex;

          return (
            <button
              key={section.id}
              type="button"
              className={`splash-orbit__selector-button${
                selected ? ' splash-orbit__selector-button--active' : ''
              }`}
              onClick={() => queueSnapToIndex(index)}
              aria-pressed={selected}
            >
              {section.title}
            </button>
          );
        })}
      </div>

      {overflowSections.length > 0 && (
        <div className="splash-orbit__overflow-links" aria-label="More sections">
          {overflowSections.map((section) => (
            <a key={section.id} href={section.href} className="splash-orbit__overflow-link">
              {section.title}
            </a>
          ))}
        </div>
      )}

      <p className="splash-orbit__hint" id="splash-orbit-help">
        Drag or swipe to rotate. Use the arrow keys to move. Press Enter to open the active section.
      </p>
    </div>
  );
}
