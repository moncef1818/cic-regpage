import { useState, useEffect } from 'react';

/**
 * useScroll — tracks scroll position and direction
 * Returns { scrollY, scrollDirection: 'up' | 'down', scrolled: boolean }
 */
export function useScroll(threshold = 20) {
  const [state, setState] = useState({
    scrollY: 0,
    scrollDirection: 'down',
    scrolled: false,
  });

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      setState({
        scrollY: y,
        scrollDirection: y > lastY ? 'down' : 'up',
        scrolled: y > threshold,
      });
      lastY = y;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return state;
}
