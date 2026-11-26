import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import MagneticButton from '../effects/MagneticButton';
import { useNavigate } from 'react-router-dom';
import { fadeUp, staggerContainer } from '../../utils/animation';

export default function RegistrationCTA() {
  const navigate = useNavigate();

  return (
    <motion.section
      className="reg-cta-band"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={staggerContainer(0.08, 0.05)}
    >
      <div className="reg-cta-inner">
        <motion.div className="reg-cta-copy" variants={fadeUp}>
          <p className="section-eyebrow">Applications open</p>
          <h2 className="reg-cta-title">
            Ready to build something <em>real</em>?
          </h2>
          <p className="reg-cta-desc">
            Join CIC for the 2026/2027 season. Pick your department,
            tell us what drives you, and see what we build together.
          </p>
        </motion.div>

        <motion.div className="reg-cta-actions" variants={fadeUp}>
          <MagneticButton className="btn-cta" onClick={() => navigate('/register')}>
            Apply now
          </MagneticButton>
          <Link to="/departments" className="btn-cta-ghost">
            Explore departments
          </Link>
          <span className="reg-cta-note">Season 2026 / 2027</span>
        </motion.div>
      </div>
    </motion.section>
  );
}
