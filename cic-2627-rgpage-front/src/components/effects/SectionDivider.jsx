import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function SectionDivider() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-20% 0px' });

  return (
    <div className="rule-wrap" ref={ref}>
      <div className="rule" />
      <motion.div
        className="rule-pulse"
        initial={{ x: '-10%', opacity: 0 }}
        animate={inView ? { x: '110%', opacity: [0, 1, 1, 0] } : {}}
        transition={{ duration: 1.1, ease: 'easeInOut' }}
      />
    </div>
  );
}
