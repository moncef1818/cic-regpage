import { memo } from 'react';
import { motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const card = {
  hidden: { opacity: 0, scale: 0.82 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE } },
};

/* Memoized — a single stat never needs to re-render once mounted. */
const HUDCard = memo(function HUDCard({ value, label }) {
  return (
    <motion.div
      variants={card}
      whileHover={{ borderColor: 'rgba(77,201,230,0.45)', y: -2 }}
      style={{
        position: 'relative',
        padding: '20px 24px',
        minWidth: 120,
        border: '1px solid var(--line-hi)',
        background: 'rgba(11,16,24,0.55)',
        backdropFilter: 'blur(6px)',
        transition: 'border-color 0.2s, transform 0.2s',
      }}
    >
      {/* corner brackets — HUD accent */}
      <span style={{ position: 'absolute', top: 6, left: 6, width: 7, height: 7, borderTop: '1px solid var(--cyan)', borderLeft: '1px solid var(--cyan)', opacity: 0.65 }} />
      <span style={{ position: 'absolute', bottom: 6, right: 6, width: 7, height: 7, borderBottom: '1px solid var(--cyan)', borderRight: '1px solid var(--cyan)', opacity: 0.65 }} />

      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '2rem', fontWeight: 700, color: 'var(--white)', lineHeight: 1 }}>
        {value}
      </div>
      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.56rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--grey-dim)', marginTop: 8 }}>
        {label}
      </div>
    </motion.div>
  );
});

/**
 * EventStats — row of HUD-style stat cards.
 * Scales in as a group when it enters the viewport.
 *
 * Props:
 *   stats: [{ value, label }]
 */
function EventStats({ stats = [] }) {
  if (!stats.length) return null;
  return (
    <motion.div
      className="pe-stats-row"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      variants={container}
      style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}
    >
      {stats.map((s, i) => (
        <HUDCard key={i} value={s.value} label={s.label} />
      ))}
    </motion.div>
  );
}

export default memo(EventStats);
