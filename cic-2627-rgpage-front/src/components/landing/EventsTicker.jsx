import { useRef, useEffect } from 'react';
import { tickerEvents } from '../../assets/data/events';

export default function EventsTicker() {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    let x = 0;
    let raf;
    function tick() {
      x -= 0.5;
      if (Math.abs(x) > track.scrollWidth / 3) x = 0;
      track.style.transform = `translateX(${x}px)`;
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const seq = [...tickerEvents, ...tickerEvents, ...tickerEvents];

  return (
    <div className="ticker-wrap">
      <div className="ticker-track" ref={trackRef}>
        {seq.map((e, i) => (
          <span key={i}>
            {e}
            <span className="ticker-dot" />
          </span>
        ))}
      </div>
    </div>
  );
}
