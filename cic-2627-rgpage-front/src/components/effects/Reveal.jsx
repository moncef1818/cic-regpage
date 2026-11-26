import { motion, useReducedMotion } from 'framer-motion';
import { EASE, fadeUp, slideLeft, slideRight, scaleIn } from '../../utils/animation';

const VARIANTS = {
  up: fadeUp,
  left: slideLeft,
  right: slideRight,
  scale: scaleIn,
};

export default function Reveal({
  children,
  delay = 0,
  y = 18,
  className = '',
  as = 'div',
  variant = 'up',
  ...rest
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as] || motion.div;
  const preset = VARIANTS[variant] || fadeUp;

  if (reduced) {
    const Tag = as === 'div' ? 'div' : as;
    return <Tag className={className} {...rest}>{children}</Tag>;
  }

  const motionProps = variant === 'up' && y !== 18
    ? {
        initial: { opacity: 0, y },
        whileInView: { opacity: 1, y: 0 },
      }
    : {
        initial: preset.hidden,
        whileInView: preset.show,
      };

  return (
    <MotionTag
      className={className}
      {...motionProps}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
