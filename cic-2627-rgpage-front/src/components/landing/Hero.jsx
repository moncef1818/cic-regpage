import { motion } from 'framer-motion';
import { cloudinaryUrl } from '../../assets/data/cloudinaryUrls';
import MagneticButton from '../effects/MagneticButton';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero({ onApply, onDepartments }) {
  return (
    <section className="hero">
      {/* IMAGE LAYER — independent right-half layer, full bleed */}
      <motion.div
        className="hero-visual"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden="true"
      >
        <img src={cloudinaryUrl('/Hero.png')} alt="" className="hero-bleed-image" />
      </motion.div>

      {/* CONTENT LAYER — sits above the image */}
      <motion.div className="hero-inner" variants={container} initial="hidden" animate="show">
        <div className="hero-copy">
          <motion.div className="hero-status-pill" variants={item}>
            <span className="hero-pill-dot" />
            <span>SEASON 2026 / 2027 APPLICATIONS ACTIVE</span>
          </motion.div>

          <motion.h1 className="hero-headline" variants={item}>
            Building<br />the <em>community.</em>
          </motion.h1>

          <motion.p className="hero-sub" variants={item}>
            A new chapter of learning, technical collaboration, and innovation is about to begin.
            Applications are now open for prospective Cyber Innovators Club candidates.
          </motion.p>

          <motion.div className="about-block" variants={item}>
            <p>
              <strong>CIC - Cyber Innovators Club </strong> is the premier technology and cybersecurity
              student initiative at the <strong>National Higher School of Cybersecurity (NHSCS)</strong>.
              We bring together candidates who build, defend, design, and research , running CTF competitions,
              hands-on workshops, real-world software engineering, and industry partnerships.
            </p>
          </motion.div>

          <motion.div className="cta-row" variants={item}>
            <MagneticButton className="btn-cta" onClick={onApply}>Apply Now →</MagneticButton>
            <button className="btn-cta-ghost" onClick={onDepartments}>Explore Departments</button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}