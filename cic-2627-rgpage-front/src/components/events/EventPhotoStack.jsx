import { motion } from 'framer-motion';

const OFFSETS = [
  { x: 14, y: 20, r: 1, hoverX: 10, hoverY: 14 },
  { x: 60, y: 34, r: -3, hoverX: 74, hoverY: 26 },
  { x: 30, y: 6, r: 3, hoverX: 40, hoverY: -6 },
];

export default function EventPhotoStack({ photos = [], index = 0 }) {
  const count = Math.max(1, Math.min(photos.length || 1, 3));
  const tiles = Array.from({ length: count });

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: index * 0.05 } },
  };

  return (
    <motion.div
      className="event-photo-stack"
      variants={container}
      initial="hidden"
      whileInView="show"
      whileHover="hover"
      viewport={{ once: true, margin: '-80px' }}
    >
      {tiles.map((_, i) => {
        const o = OFFSETS[i % OFFSETS.length];
        const isTop = i === count - 1;
        return (
          <motion.div
            key={i}
            className={`event-photo-tile ${isTop ? 'top' : ''}`}
            style={{ left: o.x, top: o.y }}
            variants={{
              hidden: { opacity: 0, scale: 0.85, rotate: 0 },
              show: { opacity: 1, scale: 1, rotate: o.r, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
              hover: { x: o.hoverX - o.x, y: o.hoverY - o.y, rotate: o.r * 1.3, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            {photos[i] ? (
              <img src={photos[i]} alt="" />
            ) : (
              <span className="event-photo-placeholder">PHOTO {String(i + 1).padStart(2, '0')}</span>
            )}
          </motion.div>
        );
      })}
    </motion.div>
  );
}
