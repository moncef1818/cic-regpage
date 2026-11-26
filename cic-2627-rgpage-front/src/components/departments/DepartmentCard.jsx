import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function DepartmentCard({ dept, index }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <div
      className="dept-card mask-reveal"
      ref={ref}
      onClick={() => setOpen(!open)}
      style={{ cursor: 'pointer' }}
    >
      <motion.div
        className="mask-wipe"
        initial={{ scaleX: 1 }}
        animate={inView ? { scaleX: 0 } : {}}
        transition={{ duration: 0.7, delay: index * 0.05, ease: [0.65, 0, 0.35, 1] }}
      />
      <div className="dept-card-top">
        <span className="dept-num">{dept.num}</span>
      </div>
      <div className="dept-name">{dept.name}</div>
      <p className="dept-desc">{dept.desc}</p>

      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{ overflow: 'hidden' }}
      >
        <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--line)' }}>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: 10 }}>
            Achievements
          </p>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {dept.achievements.map((a, i) => (
              <li key={i} style={{ fontSize: '0.78rem', color: 'var(--grey)', lineHeight: 1.7, paddingLeft: 14, position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: 'var(--cyan)' }}>—</span>
                {a}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.58rem', letterSpacing: '0.12em', color: 'var(--grey-dim)', marginTop: 14, textTransform: 'uppercase' }}>
        {open ? 'Show less' : 'Achievements →'}
      </p>
    </div>
  );
}
