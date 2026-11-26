import { useRef } from 'react';

/** Magnetic hover effect button — wraps any className button */
export default function MagneticButton({ children, onClick, className = 'btn-cta', strength = 0.25 }) {
  const wrapRef = useRef(null);
  const btnRef = useRef(null);
  const glowRef = useRef(null);

  function handleMove(e) {
    const wrap = wrapRef.current;
    const btn = btnRef.current;
    const glow = glowRef.current;
    if (!wrap || !btn || !glow) return;

    const wrapRect = wrap.getBoundingClientRect();
    glow.style.left = (e.clientX - wrapRect.left) + 'px';
    glow.style.top = (e.clientY - wrapRect.top) + 'px';

    const btnRect = btn.getBoundingClientRect();
    const dx = (e.clientX - (btnRect.left + btnRect.width / 2)) * strength;
    const dy = (e.clientY - (btnRect.top + btnRect.height / 2)) * strength;
    btn.style.transform = `translate(${dx}px, ${dy}px)`;
  }

  function handleLeave() {
    if (btnRef.current) btnRef.current.style.transform = 'translate(0,0)';
  }

  return (
    <span
      className="magnetic-wrap"
      ref={wrapRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <span className="magnetic-glow" ref={glowRef} />
      <button ref={btnRef} className={className} onClick={onClick} style={{ position: 'relative', transition: 'transform 0.12s ease' }}>
        {children}
      </button>
    </span>
  );
}
