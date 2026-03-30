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
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { useReducedMotion } from 'motion/react';

import { ACCENT_HEX, SPLASH_SECTIONS, type SplashSection } from '../data/splashSections';
import {
  getNearestIndex,
  getOrbitItems,
  getSnapAngle,
  shortestAngleDelta,
} from '../lib/splash-orbit';
import SplashBackground from './SplashBackground';
import SplashBentoCard from './SplashBentoCard';
import SplashNavPill from './SplashNavPill';

const LazySplashScene = lazy(() => import('./SplashScene'));
const SPLASH_THEME = 'dark';

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

function applySplashTheme() {
  if (typeof document === 'undefined') return;
  document.body.dataset.splashTheme = SPLASH_THEME;
}

function FallbackGrid({ sections }: { sections: SplashSection[] }) {
  return (
    <div className="splash-fallback">
      <div className="splash-fallback__brand">3D3D</div>
      <div className="splash-fallback__grid" role="list">
        {sections.map((section) => {
          const style = {
            '--accent': ACCENT_HEX[section.accent],
          } as CSSProperties;

          return (
            <a
              key={section.id}
              href={section.href}
              className="splash-fallback__item"
              style={style}
              data-analytics-event="splash_cta_click"
              data-analytics-source={`fallback-${section.id}`}
              role="listitem"
            >
              <span className="splash-fallback__eyebrow">{section.kicker}</span>
              <span className="splash-fallback__title">{section.title}</span>
              <span className="splash-fallback__copy">{section.description}</span>
              <span className="splash-fallback__cta">{section.ctaLabel}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default function SplashOrbit() {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const isMobile = useMediaQuery('(max-width: 767px)');
  const [supportsThree, setSupportsThree] = useState<boolean | null>(null);
  const [saveDataMode, setSaveDataMode] = useState(false);
  const [angle, setAngle] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [entryProgress, setEntryProgress] = useState(shouldReduceMotion ? 1 : 0);
  const [sceneReady, setSceneReady] = useState(false);
  const sceneShellRef = useRef<HTMLDivElement>(null);
  const angleRef = useRef(0);
  const velocityRef = useRef(0);
  const dragStateRef = useRef({
    active: false,
    pointerId: -1,
    lastX: 0,
    lastTime: 0,
  });
  const lastInteractionRef = useRef(0);
  const snapTargetRef = useRef<number | null>(null);
  const activeIndexRef = useRef(0);
  const userHasSelectedRef = useRef(false);

  useEffect(() => {
    applySplashTheme();
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

    return () => {
      document.body.removeAttribute('data-splash-theme');
    };
  }, []);

  const orbitItems = useMemo(() => getOrbitItems(SPLASH_SECTIONS, angle), [angle]);
  const focusIndex = useDeferredValue(hoveredIndex ?? activeIndex);
  const focusedItem = orbitItems[focusIndex] ?? orbitItems[activeIndex] ?? orbitItems[0];
  const hoveredSection = hoveredIndex !== null ? (SPLASH_SECTIONS[hoveredIndex] ?? null) : null;
  const cardAlign = isMobile ? 'bottom' : focusedItem?.x < 0 ? 'right' : 'left';

  const handleSceneReady = useCallback(() => {
    setSceneReady(true);
  }, []);

  const updateAngle = useCallback((nextAngle: number) => {
    angleRef.current = nextAngle;
    setAngle(nextAngle);

    const nextActiveIndex = getNearestIndex(SPLASH_SECTIONS, nextAngle);
    if (nextActiveIndex !== activeIndexRef.current) {
      activeIndexRef.current = nextActiveIndex;
      startTransition(() => {
        setActiveIndex(nextActiveIndex);
      });
    }
  }, []);

  useEffect(() => {
    activeIndexRef.current = 0;
    updateAngle(0);
    setHoveredIndex(null);
    snapTargetRef.current = null;
    velocityRef.current = 0;
    userHasSelectedRef.current = false;
  }, [updateAngle]);

  const queueSnapToIndex = useCallback((targetIndex: number) => {
    const nextAngle = getSnapAngle(angleRef.current, targetIndex, SPLASH_SECTIONS.length);

    userHasSelectedRef.current = true;
    snapTargetRef.current = null;
    lastInteractionRef.current = performance.now();
    velocityRef.current = 0;
    setHoveredIndex(null);
    updateAngle(nextAngle);
  }, [updateAngle]);

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

  useEffect(() => {
    const shell = sceneShellRef.current;
    if (!shell || shouldReduceMotion) return;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      const deltaAngle = (event.deltaY / (shell.clientWidth || 1)) * Math.PI * 0.45;
      userHasSelectedRef.current = false;
      velocityRef.current += deltaAngle * 0.001;
      lastInteractionRef.current = performance.now();
      snapTargetRef.current = null;
    };

    shell.addEventListener('wheel', handleWheel, { passive: false });
    return () => shell.removeEventListener('wheel', handleWheel);
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (shouldReduceMotion || supportsThree === false) return;

    let frame = 0;
    let lastTime = performance.now();
    const frictionPerFrame = 0.9;
    const autoRotateSpeed = -0.00015;

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
            const nearestIndex = getNearestIndex(SPLASH_SECTIONS, nextAngle);
            snapTargetRef.current = getSnapAngle(nextAngle, nearestIndex, SPLASH_SECTIONS.length);
          }
        } else if (idle && !userHasSelectedRef.current) {
          nextAngle += autoRotateSpeed * deltaMs;
        } else {
          const nearestIndex = getNearestIndex(SPLASH_SECTIONS, nextAngle);
          const targetAngle = getSnapAngle(nextAngle, nearestIndex, SPLASH_SECTIONS.length);
          const delta = shortestAngleDelta(nextAngle, targetAngle);
          nextAngle += delta * 0.08 * (deltaMs / 16.67);
        }

        if (nextAngle !== angleRef.current) updateAngle(nextAngle);
      }

      frame = requestAnimationFrame(loop);
    };

    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [shouldReduceMotion, supportsThree, updateAngle]);

  const handlePointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (shouldReduceMotion) return;

      dragStateRef.current = {
        active: true,
        pointerId: event.pointerId,
        lastX: event.clientX,
        lastTime: performance.now(),
      };

      lastInteractionRef.current = performance.now();
      userHasSelectedRef.current = false;
      snapTargetRef.current = null;
      velocityRef.current = 0;
      setHoveredIndex(null);
      event.currentTarget.setPointerCapture(event.pointerId);
      sceneShellRef.current?.classList.add('splash-orbit__scene-shell--dragging');
    },
    [shouldReduceMotion],
  );

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!dragStateRef.current.active || dragStateRef.current.pointerId !== event.pointerId) {
        return;
      }

      const shellWidth = sceneShellRef.current?.clientWidth ?? 1;
      const now = performance.now();
      const deltaX = event.clientX - dragStateRef.current.lastX;
      const deltaTime = Math.max(10, now - dragStateRef.current.lastTime);
      const deltaAngle = (deltaX / shellWidth) * Math.PI * 1.4;

      dragStateRef.current.lastX = event.clientX;
      dragStateRef.current.lastTime = now;
      lastInteractionRef.current = now;
      velocityRef.current = deltaAngle / deltaTime;
      updateAngle(angleRef.current + deltaAngle);
    },
    [updateAngle],
  );

  const finishPointer = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
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
    (event: ReactKeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        queueSnapToIndex((activeIndexRef.current - 1 + SPLASH_SECTIONS.length) % SPLASH_SECTIONS.length);
        return;
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        queueSnapToIndex((activeIndexRef.current + 1) % SPLASH_SECTIONS.length);
        return;
      }

      if (isActivationKey(event.key)) {
        event.preventDefault();
        const target = SPLASH_SECTIONS[focusIndex] ?? SPLASH_SECTIONS[activeIndexRef.current];
        if (target) window.location.assign(target.href);
      }
    },
    [focusIndex, queueSnapToIndex],
  );

  if (shouldReduceMotion || supportsThree === false) {
    return (
      <div className="splash-orbit splash-orbit--fallback">
        <SplashBackground activeIndex={focusIndex} />
        <FallbackGrid sections={SPLASH_SECTIONS} />
        <a
          href="/contact"
          className="splash-contact-cta"
          data-analytics-event="splash_contact_click"
        >
          Contact
        </a>
      </div>
    );
  }

  return (
    <div className="splash-orbit">
      <SplashBackground activeIndex={focusIndex} />

      <div
        ref={sceneShellRef}
        className="splash-orbit__scene-shell"
        tabIndex={0}
        role="region"
        aria-roledescription="3D orbit navigator"
        aria-label={`3D3D orbit navigator. Active section: ${
          focusedItem?.section.title ?? 'The Market'
        }. Use arrow keys to rotate and press Enter to open.`}
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
            isMobile={isMobile}
            reducedMotion={shouldReduceMotion}
            saveDataMode={saveDataMode}
            hoveredSection={hoveredSection}
            onHoverIndexChange={setHoveredIndex}
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
        <SplashBentoCard section={focusedItem.section} align={cardAlign} />
      )}

      <SplashNavPill
        sections={SPLASH_SECTIONS}
        activeIndex={focusIndex}
        onSelect={queueSnapToIndex}
      />

      <a
        href="/contact"
        className="splash-contact-cta"
        data-analytics-event="splash_contact_click"
      >
        Contact
      </a>

      <p className="splash-orbit__sr" aria-live="polite">
        {focusedItem
          ? `${focusedItem.section.title}. ${focusedItem.section.description}`
          : '3D3D homepage orbit selector.'}
      </p>
    </div>
  );
}
