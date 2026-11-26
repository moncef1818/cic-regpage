import { motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

function Block({ label, delay = 0, children }) {
  if (!children) return null;
  return (
    <motion.div
      initial={{ opacity: 0, x: -28 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.55, ease: EASE, delay }}
      style={{ display: 'grid', gap: 8 }}
    >
      <span style={{
        fontFamily: "'Space Mono', monospace", fontSize: '0.56rem', letterSpacing: '0.24em',
        textTransform: 'uppercase', color: 'var(--cyan)', display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <span style={{ width: 14, height: 1, background: 'var(--cyan)', display: 'inline-block' }} />
        {label}
      </span>
      <div style={{ fontSize: '0.92rem', lineHeight: 1.75, color: 'var(--grey)', maxWidth: 520 }}>
        {children}
      </div>
    </motion.div>
  );
}

/**
 * EventStory — Overview / Challenge / Highlights / Outcome.
 * Each block animates independently as it enters the viewport
 * (small staggered delay per block rather than one group fade).
 *
 * Props:
 *   story: { overview, challenge, highlights: string[], outcome }
 */
export default function EventStory({ story = {} }) {
  const { overview, challenge, highlights = [], outcome } = story;
  if (!overview && !challenge && !highlights.length && !outcome) return null;

  return (
    <div style={{ display: 'grid', gap: 30 }}>
      <Block label="Overview" delay={0}>{overview}</Block>
      <Block label="Challenge" delay={0.05}>{challenge}</Block>
      {highlights.length > 0 && (
        <Block label="Highlights" delay={0.1}>
          <ul style={{ margin: 0, paddingLeft: 18, display: 'grid', gap: 4 }}>
            {highlights.map((h, i) => <li key={i}>{h}</li>)}
          </ul>
        </Block>
      )}
      <Block label="Outcome" delay={0.15}>{outcome}</Block>
    </div>
  );
}
