import { useRef, useState, useEffect, useCallback, useMemo, memo } from 'react';
import { motion, useAnimationFrame, useMotionValue, animate, AnimatePresence } from 'framer-motion';

/* ─────────────────────────────────────────────────────────────
   EventGallery — the rolling film strip.

   • Auto-scrolls left, frame-rate independent (time-delta based)
   • Pauses on hover
   • Draggable — velocity-smoothed momentum on release
   • Loops infinitely (duplicates the set until ≥3x viewport)
   • Click a frame → fullscreen lightbox
   • Lazy-loaded images
   ───────────────────────────────────────────────────────────── */

const SPEED_PX_S = 26;
const GAP        = 16;
const FRAME_W    = 300;
const VEL_SMOOTH = 0.35;
const EASE       = [0.22, 1, 0.36, 1];

function Lightbox({ src, onClose }) {
  useEffect(() => {
    const esc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out',
      }}
    >
      <motion.img
        src={src}
        alt=""
        initial={{ scale: 0.88, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.28, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '90vw', maxHeight: '88vh', objectFit: 'contain', border: '1px solid rgba(77,201,230,0.25)', boxShadow: '0 40px 120px rgba(0,0,0,0.8)' }}
      />
      <button
        onClick={onClose}
        aria-label="Close lightbox"
        style={{
          position: 'fixed', top: 24, right: 28,
          background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#fff',
          fontFamily: "'Space Mono', monospace", fontSize: '0.7rem', letterSpacing: '0.18em',
          padding: '10px 18px', cursor: 'pointer',
        }}
      >
        ESC
      </button>
    </motion.div>
  );
}

const Frame = memo(function Frame({ src, onOpen }) {
  return (
    <div
      onClick={() => src && onOpen(src)}
      role={src ? 'button' : undefined}
      tabIndex={src ? 0 : undefined}
      aria-label={src ? 'View photo' : undefined}
      onKeyDown={(e) => { if (e.key === 'Enter' && src) onOpen(src); }}
      style={{
        width: FRAME_W, flexShrink: 0, aspectRatio: '4 / 3',
        background: 'var(--surface2)', border: '1px solid rgba(77,201,230,0.12)',
        boxShadow: '0 18px 30px rgba(0,0,0,0.18)', overflow: 'hidden', position: 'relative',
        cursor: src ? 'zoom-in' : 'grab', transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s ease',
      }}
    >
      {src ? (
        <img
          src={src}
          alt=""
          draggable={false}
          loading="lazy"
          decoding="async"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', pointerEvents: 'none' }}
        />
      ) : (
        <div style={{
          width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Space Mono', monospace", fontSize: '0.55rem', letterSpacing: '0.18em', color: 'var(--grey-dim)',
        }}>
          NO IMAGE
        </div>
      )}
    </div>
  );
});

/**
 * EventGallery
 * Props:
 *   photos: string[]        — image URLs
 *   placeholderCount: number — how many empty frames to show if photos is empty
 */
function EventGallery({ photos = [], placeholderCount = 6 }) {
  const baseFrames = photos.length > 0 ? photos : Array.from({ length: placeholderCount }, () => null);

  const [viewportW, setViewportW] = useState(typeof window !== 'undefined' ? window.innerWidth : 1280);
  useEffect(() => {
    let raf = null;
    const onResize = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => { setViewportW(window.innerWidth); raf = null; });
    };
    window.addEventListener('resize', onResize);
    return () => { window.removeEventListener('resize', onResize); if (raf) cancelAnimationFrame(raf); };
  }, []);

  const { frames, loopWidth } = useMemo(() => {
    const minCount = Math.ceil((viewportW * 3) / (FRAME_W + GAP));
    const times    = Math.ceil(minCount / baseFrames.length);
    const list     = Array.from({ length: Math.max(times, 4) }).flatMap(
      (_, loopIdx) => baseFrames.map((src, frameIdx) => ({ src, key: `${loopIdx}-${frameIdx}` }))
    );
    return { frames: list, loopWidth: baseFrames.length * (FRAME_W + GAP) };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewportW, baseFrames.length, photos]);

  const x            = useMotionValue(0);
  const paused       = useRef(false);
  const dragging     = useRef(false);
  const dragStartX   = useRef(0);
  const dragStartVal = useRef(0);
  const lastDragX    = useRef(0);
  const lastDragT    = useRef(0);
  const dragVel      = useRef(0);
  const [isDragging, setIsDragging] = useState(false);
  const [lightbox, setLightbox] = useState(null);

  useAnimationFrame((_t, delta) => {
    if (paused.current || dragging.current) return;
    const next = x.get() - (SPEED_PX_S * delta) / 1000;
    x.set(Math.abs(next) >= loopWidth ? next + loopWidth : next);
  });

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
    const now     = performance.now();
    const dt      = Math.max(now - lastDragT.current, 1);
    const instVel = ((e.clientX - lastDragX.current) / dt) * (1000 / 60);
    dragVel.current  = dragVel.current * (1 - VEL_SMOOTH) + instVel * VEL_SMOOTH;
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
      animate(x, x.get() + vel * 18, { type: 'spring', stiffness: 50, damping: 24, restDelta: 0.5 });
    }
  }, [x]);

  const openLightbox  = useCallback((src) => { if (Math.abs(dragVel.current) <= 3) setLightbox(src); }, []);
  const closeLightbox = useCallback(() => setLightbox(null), []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <div
        style={{
          position: 'relative', overflow: 'hidden', width: '100%', padding: '4px 0 8px',
          cursor: isDragging ? 'grabbing' : 'grab', userSelect: 'none',
          border: '1px solid var(--line)', background: 'rgba(0,0,0,0.3)',
        }}
        onMouseEnter={() => { paused.current = true; }}
        onMouseLeave={() => { paused.current = false; }}
      >
        <motion.div
          style={{ display: 'flex', gap: GAP, x, width: 'max-content', willChange: 'transform', padding: '10px' }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {frames.map(({ src, key }) => (
            <Frame key={key} src={src} onOpen={openLightbox} />
          ))}
        </motion.div>

        <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 60, background: 'linear-gradient(90deg, var(--bg), transparent)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: 60, background: 'linear-gradient(270deg, var(--bg), transparent)', pointerEvents: 'none' }} />
      </div>

      <AnimatePresence>
        {lightbox && <Lightbox src={lightbox} onClose={closeLightbox} />}
      </AnimatePresence>
    </motion.div>
  );
}

export default memo(EventGallery);
