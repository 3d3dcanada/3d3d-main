import {
  useCallback,
  useDeferredValue,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { useReducedMotion } from 'motion/react';

import { SPLASH_SECTIONS } from '../data/splashSections';
import SplashBackground from './SplashBackground';
import SplashBentoCard from './SplashBentoCard';
import SplashNavPill from './SplashNavPill';

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

function isActivationKey(key: string) {
  return key === 'Enter' || key === ' ';
}

function applySplashTheme() {
  if (typeof document === 'undefined') return;
  document.body.dataset.splashTheme = SPLASH_THEME;
}

export default function SplashOrbit() {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const isMobile = useMediaQuery('(max-width: 767px)');
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const sceneShellRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const dragStartXPef = useRef(0);
  const xDragRef = useRef(0);
  const activeIndexRef = useRef(activeIndex);
  const lastInteractionRef = useRef(0);

  useEffect(() => {
    applySplashTheme();
    return () => {
      document.body.removeAttribute('data-splash-theme');
    };
  }, []);

  const setIndex = useCallback((index: number) => {
    const total = SPLASH_SECTIONS.length;
    let safeIndex = index % total;
    if (safeIndex < 0) safeIndex += total;
    
    activeIndexRef.current = safeIndex;
    setActiveIndex(safeIndex);
    lastInteractionRef.current = performance.now();
  }, []);

  // Auto-scroll logic if idle for 6 seconds
  useEffect(() => {
    if (shouldReduceMotion) return;
    const interval = setInterval(() => {
      if (performance.now() - lastInteractionRef.current > 6000) {
        setIndex(activeIndexRef.current + 1);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [shouldReduceMotion, setIndex]);

  const focusIndex = useDeferredValue(hoveredIndex ?? activeIndex);
  const focusedItem = SPLASH_SECTIONS[focusIndex] ?? SPLASH_SECTIONS[0];
  const cardAlign = isMobile ? 'bottom' : 'left'; // Always left on desktop since no 3D orbit

  // --- Pointer Handlers (Linear Swipe) ---
  const handlePointerDown = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    
    event.currentTarget.setPointerCapture(event.pointerId);
    isDraggingRef.current = true;
    dragStartXPef.current = event.clientX;
    xDragRef.current = 0;
    lastInteractionRef.current = performance.now();
    
    sceneShellRef.current?.classList.add('splash-orbit__scene-shell--dragging');
  }, [shouldReduceMotion]);

  const handlePointerMove = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    xDragRef.current = event.clientX - dragStartXPef.current;
    lastInteractionRef.current = performance.now();
  }, []);

  const finishPointer = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {}

    sceneShellRef.current?.classList.remove('splash-orbit__scene-shell--dragging');
    lastInteractionRef.current = performance.now();

    const threshold = 50; // pixels
    if (xDragRef.current < -threshold) {
      setIndex(activeIndexRef.current + 1);
    } else if (xDragRef.current > threshold) {
      setIndex(activeIndexRef.current - 1);
    }
    xDragRef.current = 0;
  }, [setIndex]);

  // --- Keyboard & Wheel Handlers ---
  const handleKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        setIndex(activeIndexRef.current - 1);
        return;
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        setIndex(activeIndexRef.current + 1);
        return;
      }
      if (isActivationKey(event.key) && focusedItem) {
        event.preventDefault();
        window.location.assign(focusedItem.href);
      }
    },
    [focusedItem, setIndex],
  );

  return (
    <div className="splash-orbit">
      <SplashBackground activeIndex={focusIndex} />

      <div
        ref={sceneShellRef}
        className="splash-orbit__scene-shell"
        tabIndex={0}
        role="region"
        aria-roledescription="Interactive gallery navigator"
        aria-label={`3D3D Gallery navigator. Active section: ${
          focusedItem?.title ?? 'The Market'
        }. Use arrow keys to navigate and press Enter to open.`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishPointer}
        onPointerCancel={finishPointer}
        onPointerLeave={finishPointer}
        onKeyDown={handleKeyDown}
      >
        {/* Swipe interaction shell */}
      </div>

      {focusedItem && (
        <SplashBentoCard section={focusedItem} align={cardAlign} />
      )}

      <SplashNavPill
        sections={SPLASH_SECTIONS}
        activeIndex={focusIndex}
        onSelect={setIndex}
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
          ? `${focusedItem.title}. ${focusedItem.description}`
          : '3D3D homepage gallery selector.'}
      </p>
    </div>
  );
}
