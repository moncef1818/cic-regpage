import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Reveal from '../effects/Reveal';
import { departments } from '../../assets/data/departments';
import { fadeUp, staggerContainer } from '../../utils/animation';

export default function DepartmentsPreview() {
  const preview = departments.slice(0, 3);

  return (
    <section className="section-shell section-shell--spacious" id="departments-preview">
      <Reveal className="section-head section-head--split">
        <div>
          <p className="section-eyebrow">Departments</p>
          <h2 className="section-title">Where will you contribute?</h2>
        </div>
        <p className="section-head-desc">
          Eight specialized tracks , from offensive security to product design.
          Each department runs its own workshops, projects, and mentorship.
        </p>
      </Reveal>

      <motion.div
        className="dept-preview-grid"
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
      >
        {preview.map((dept) => (
          <motion.article
            key={dept.value}
            className="dept-preview-card"
            variants={fadeUp}
          >
            <span className="dept-num">{dept.num}</span>
            <div className="dept-name">{dept.name}</div>
            <p className="dept-desc">{dept.desc}</p>
          </motion.article>
        ))}
      </motion.div>

      <Reveal>
        <Link to="/departments" className="dept-preview-link">
          See all {departments.length} departments
          <span className="dept-preview-link-arrow" aria-hidden="true">→</span>
        </Link>
      </Reveal>
    </section>
  );
}
