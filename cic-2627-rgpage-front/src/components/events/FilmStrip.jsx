import { useRef, useState, useEffect, useCallback, useMemo, memo } from 'react';
import { motion, useAnimationFrame, useMotionValue, animate } from 'framer-motion';

/* ─────────────────────────────────────────────────────────────
   FilmStrip
   • Auto-scrolls left, frame-rate independent (time-delta based)
   • Pauses on hover / drag
   • Draggable — velocity-smoothed momentum on release
   • Loops infinitely (duplicates the set until ≥3× viewport)
   • Clicking a frame opens a full-screen lightbox
   • Frame list + Frame renders are memoized for large photo sets
   ───────────────────────────────────────────────────────────── */

const SPEED_PX_S = 27;   // px per second — was SPEED=0.45 @ ~60fps, now truly fps-independent
const GAP        = 16;   // px gap between frames
const FRAME_W    = 320;  // px width of each frame (CSS matches)
const VEL_SMOOTH = 0.35; // exponential smoothing factor for drag velocity (0–1, higher = snappier/noisier)

function Lightbox({ src, onClose }) {
  useEffect(() => {
    const esc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [onClose]);

  return (
    <motion.div
      id="film-lightbox"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.92)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'zoom-out',
        backdropFilter: 'blur(8px)',
      }}
    >
      <motion.img
        src={src}
        alt=""
        initial={{ scale: 0.88, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '90vw',
          maxHeight: '88vh',
          objectFit: 'contain',
          border: '1px solid rgba(77,201,230,0.25)',
          boxShadow: '0 40px 120px rgba(0,0,0,0.8)',
          cursor: 'default',
        }}
      />
      <button
        onClick={onClose}
        aria-label="Close lightbox"
        style={{
          position: 'fixed',
          top: 24,
          right: 28,
          background: 'transparent',
          border: '1px solid rgba(255,255,255,0.2)',
          color: '#fff',
          fontFamily: "'Space Mono', monospace",
          fontSize: '0.7rem',
          letterSpacing: '0.18em',
          padding: '10px 18px',
          cursor: 'pointer',
          transition: 'border-color 0.15s',
        }}
      >
        ESC
      </button>
    </motion.div>
  );
}

// Memoized so opening/closing the lightbox (a single state change) doesn't
// force every duplicated frame in the strip to re-render and re-diff its <img>.
const Frame = memo(function Frame({ src, onOpen }) {
  return (
    <div
      className="film-frame"
      onClick={() => src && onOpen(src)}
      role={src ? 'button' : undefined}
      tabIndex={src ? 0 : undefined}
      aria-label={src ? 'View photo' : undefined}
      onKeyDown={(e) => { if (e.key === 'Enter' && src) onOpen(src); }}
      style={{
        width: FRAME_W,
        flexShrink: 0,
        aspectRatio: '4 / 3',
        background: 'var(--surface2)',
        border: '1px solid rgba(77,201,230,0.12)',
        boxShadow: '0 18px 30px rgba(0,0,0,0.18)',
        overflow: 'hidden',
        position: 'relative',
        cursor: src ? 'zoom-in' : 'grab',
        transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s ease',
      }}
    >
      {src ? (
        <img
          src={src}
          alt=""
          draggable={false}
          loading="lazy"
          decoding="async"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', pointerEvents: 'none' }}
        />
      ) : (
        <div className="film-placeholder" />
      )}

      {src && (
        <div className="film-frame-overlay">
          <span>↗</span>
        </div>
      )}
    </div>
  );
});

export default function FilmStrip({ photos = [], placeholderCount = 5 }) {
  // If fewer photos than placeholderCount, pad with placeholders
  const baseFrames = photos.length > 0
    ? photos
    : Array.from({ length: placeholderCount }, () => null);

  // Track viewport width reactively so the loop stays seamless across resizes
  const [viewportW, setViewportW] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1280
  );
  useEffect(() => {
    let raf = null;
    const onResize = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        setViewportW(window.innerWidth);
        raf = null;
      });
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Duplicate until we have enough to fill ≥3 viewport widths — memoized so
  // this doesn't rebuild (and remount every <img>) on unrelated re-renders.
  const { frames, loopWidth } = useMemo(() => {
    const minCount = Math.ceil((viewportW * 3) / (FRAME_W + GAP));
    const times    = Math.ceil(minCount / baseFrames.length);
    const list     = Array.from({ length: Math.max(times, 4) }).flatMap(
      (_, loopIdx) => baseFrames.map((src, frameIdx) => ({ src, key: `${loopIdx}-${frameIdx}` }))
    );
    return { frames: list, loopWidth: baseFrames.length * (FRAME_W + GAP) };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewportW, baseFrames.length, photos]);

  const trackRef     = useRef(null);
  const x            = useMotionValue(0);
  const paused       = useRef(false);
  const dragging     = useRef(false);
  const dragStartX   = useRef(0);
  const dragStartVal = useRef(0);
  const lastDragX    = useRef(0);
  const lastDragT    = useRef(0);
  const dragVel      = useRef(0); // smoothed, px/frame-equivalent for the momentum fling
  const [isDragging, setIsDragging] = useState(false);
  const [lightbox, setLightbox] = useState(null);

  // Auto-scroll animation — driven by real elapsed time, so speed is identical
  // on a 60Hz, 120Hz, or throttled/background tab instead of varying with fps.
  useAnimationFrame((_t, delta) => {
    if (paused.current || dragging.current) return;
    const next = x.get() - (SPEED_PX_S * delta) / 1000;
    // Seamless loop: when we've scrolled one full base-set, snap back
    if (Math.abs(next) >= loopWidth) {
      x.set(next + loopWidth);
    } else {
      x.set(next);
    }
  });

  // ── DRAG HANDLING ──
  const onPointerDown = useCallback((e) => {
    dragging.current     = true;
    dragStartX.current   = e.clientX;
    dragStartVal.current = x.get();
    lastDragX.current    = e.clientX;
    lastDragT.current    = performance.now();
    dragVel.current      = 0;
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  }, [x]);

  const onPointerMove = useCallback((e) => {
    if (!dragging.current) return;
    const now       = performance.now();
    const dt        = Math.max(now - lastDragT.current, 1);
    // px/frame-equivalent at 60fps, so it composes cleanly with the spring below
    const instVel   = ((e.clientX - lastDragX.current) / dt) * (1000 / 60);
    dragVel.current = dragVel.current * (1 - VEL_SMOOTH) + instVel * VEL_SMOOTH;
    lastDragX.current = e.clientX;
    lastDragT.current = now;
    x.set(dragStartVal.current + (e.clientX - dragStartX.current));
  }, [x]);

  const onPointerUp = useCallback(() => {
    if (!dragging.current) return;
    dragging.current = false;
    setIsDragging(false);
    const vel = dragVel.current;
    if (Math.abs(vel) > 2) {
      animate(x, x.get() + vel * 18, {
        type: 'spring',
        stiffness: 50,
        damping: 24,
        restDelta: 0.5,
      });
    }
  }, [x]);

  const openLightbox = useCallback((src) => {
    // Don't open lightbox if the tap ended a drag
    if (Math.abs(dragVel.current) > 3) return;
    setLightbox(src);
  }, []);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  return (
    <>
      {/* Strip wrapper */}
      <div
        id="film-strip-wrap"
        style={{
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          padding: '8px 0 16px',
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: 'none',
        }}
        onMouseEnter={() => { paused.current = true; }}
        onMouseLeave={() => { paused.current = false; }}
      >
        {/* Film holes — top */}
        <div className="film-holes" style={{ marginBottom: 8 }}>
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className="film-hole" />
          ))}
        </div>

        {/* Track */}
        <motion.div
          ref={trackRef}
          style={{
            display: 'flex',
            gap: GAP,
            x,
            width: 'max-content',
            willChange: 'transform',
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {frames.map(({ src, key }) => (
            <Frame key={key} src={src} onOpen={openLightbox} />
          ))}
        </motion.div>

        {/* Film holes — bottom */}
        <div className="film-holes" style={{ marginTop: 8 }}>
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className="film-hole" />
          ))}
        </div>

        {/* Fade edges */}
        <div className="film-fade-left"  />
        <div className="film-fade-right" />
      </div>

      {/* Lightbox */}
      {lightbox && (
        <Lightbox src={lightbox} onClose={closeLightbox} />
      )}
    </>
  );
}