/**
 * Scroll-Driven Animation Fallback
 *
 * If the browser does not support CSS animation-timeline: view(),
 * this script applies an IntersectionObserver to all .scroll-in*
 * elements and toggles .scroll-revealed when they enter the viewport.
 */

const SCROLL_CLASSES = [
  'scroll-in',
  'scroll-in-left',
  'scroll-in-right',
  'scroll-in-scale',
  'scroll-in-fade',
  'scroll-in-rotate',
  'scroll-in-pop',
  'scroll-in-float',
];

const SELECTOR = SCROLL_CLASSES.map((c) => `.${c}`).join(', ');

function initFallback() {
  // Native support detected, nothing to do
  if (CSS.supports('animation-timeline', 'view()')) return;

  document.documentElement.classList.add('scroll-fallback');

  const elements = document.querySelectorAll<HTMLElement>(SELECTOR);
  if (elements.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('scroll-revealed');
          observer.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -60px 0px', threshold: 0.1 }
  );

  for (const el of elements) {
    observer.observe(el);
  }
}

// Run on DOMContentLoaded or immediately if already loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFallback);
} else {
  initFallback();
}
