import { useState, useEffect, useRef } from 'react';

/**
 * useMousePosition — tracks mouse position relative to a ref element
 * If no ref provided, tracks relative to the viewport.
 */
export function useMousePosition(elementRef) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const rafId = useRef(null);
  const pending = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      if (elementRef?.current) {
        const rect = elementRef.current.getBoundingClientRect();
        pending.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };
      } else {
        pending.current = { x: e.clientX, y: e.clientY };
      }

      if (!rafId.current) {
        rafId.current = requestAnimationFrame(() => {
          setPosition({ ...pending.current });
          rafId.current = null;
        });
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [elementRef]);

  return position;
}
