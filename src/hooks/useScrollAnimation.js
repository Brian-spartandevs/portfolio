import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook that tracks scroll progress of an element through the viewport.
 * Returns a value from 0 (element entering bottom) to 1 (element leaving top).
 * Uses requestAnimationFrame for optimal performance.
 */
export function useScrollAnimation(elementRef) {
  const [progress, setProgress] = useState(0);
  const ticking = useRef(false);

  const update = useCallback(() => {
    if (!elementRef.current) {
      ticking.current = false;
      return;
    }
    const rect = elementRef.current.getBoundingClientRect();
    const vh = window.innerHeight;
    const raw = (vh - rect.top) / (vh + rect.height);
    setProgress(Math.max(0, Math.min(1, raw)));
    ticking.current = false;
  }, [elementRef]);

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [update]);

  return progress;
}
