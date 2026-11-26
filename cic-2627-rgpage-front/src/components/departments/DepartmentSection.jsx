import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import { cloudinaryUrl } from '../../assets/data/cloudinaryUrls';

const EASE = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: EASE },
  },
};

const numberVariant = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.0, ease: EASE },
  },
};

export default function DepartmentSection({ dept, index }) {
  const navigate = useNavigate();
  const layoutIndex = index % 8;

  const handleApply = () => {
    navigate('/register', { state: { selectedDepartment: dept.name } });
  };

  const HeaderBadge = ({ label = `CHAPTER ${dept.num}` }) => (
    <motion.div className="dp-header-tag" variants={fadeUpVariant}>
      <span className="dp-badge-text">{label}</span>
    </motion.div>
  );

  const ActionButton = ({ text }) => (
    <button className="dp-btn" onClick={handleApply}>
      <span>{text}</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </button>
  );

  const renderContentInner = () => {
    switch (layoutIndex) {
      case 0:
        return (
          <div className="dp-layout-0">
            <motion.div className="dp-num-col" variants={fadeUpVariant}>
              <HeaderBadge />
              <div className="dp-huge-number">{dept.num}</div>
            </motion.div>

            <div className="dp-content-col">
              <motion.h2 className="dp-title" variants={fadeUpVariant}>
                {dept.name}
              </motion.h2>
              <motion.p className="dp-desc" variants={fadeUpVariant}>
                {dept.desc}
              </motion.p>

              <motion.div variants={fadeUpVariant} style={{ marginTop: '24px' }}>
                <ActionButton text={`Contribute to ${dept.name}`} />
              </motion.div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="dp-layout-1">
            <div className="dp-content-col">
              <HeaderBadge />
              <motion.h2 className="dp-title" variants={fadeUpVariant}>
                {dept.name}
              </motion.h2>
              <motion.p className="dp-desc" variants={fadeUpVariant}>
                {dept.desc}
              </motion.p>

              <motion.div variants={fadeUpVariant} style={{ marginTop: '24px' }}>
                <ActionButton text={`Explore ${dept.name}`} />
              </motion.div>
            </div>

            <motion.div className="dp-num-col" variants={fadeUpVariant}>
              <div className="dp-huge-number-stroke">{dept.num}</div>
            </motion.div>
          </div>
        );

      case 2:
        return (
          <div className="dp-layout-2">
            <HeaderBadge label={`CHAPTER ${dept.num} — DOMAIN`} />
            <motion.h2 className="dp-title" variants={fadeUpVariant}>
              {dept.name}
            </motion.h2>
            <motion.p className="dp-desc" variants={fadeUpVariant}>
              {dept.desc}
            </motion.p>

            <motion.div variants={fadeUpVariant} style={{ marginTop: '24px', textAlign: 'center' }}>
              <ActionButton text={`Build with ${dept.name}`} />
            </motion.div>
          </div>
        );

      case 3:
        return (
          <div className="dp-layout-4">
            <div className="dp-left-col">
              <HeaderBadge label={`CHAPTER ${dept.num}`} />
              <motion.h2 className="dp-title" variants={fadeUpVariant}>
                {dept.name}
              </motion.h2>
              <motion.p className="dp-desc" variants={fadeUpVariant}>
                {dept.desc}
              </motion.p>
            </div>

            <div className="dp-right-col">
              <motion.div variants={fadeUpVariant} style={{ marginTop: '24px' }}>
                <ActionButton text={`Explore ${dept.name}`} />
              </motion.div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="dp-layout-4">
            <div className="dp-left-col">
              <HeaderBadge />
              <motion.h2 className="dp-title" variants={fadeUpVariant}>
                {dept.name}
              </motion.h2>
              <motion.p className="dp-desc" variants={fadeUpVariant}>
                {dept.desc}
              </motion.p>
            </div>

            <div className="dp-right-col">
              <motion.div variants={fadeUpVariant} style={{ marginTop: '24px' }}>
                <ActionButton text={`Join ${dept.name}`} />
              </motion.div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="dp-layout-5">
            <motion.div className="dp-top-bar" variants={fadeUpVariant}>
              <HeaderBadge label={`CHAPTER ${dept.num} — DIVISION`} />
              <span className="dp-mono-tag">
                {dept.tagline ? dept.tagline.toUpperCase() : 'LEADERSHIP TRACK'}
              </span>
            </motion.div>

            <div className="dp-body-grid">
              <div>
                <motion.h2 className="dp-title" variants={fadeUpVariant}>
                  {dept.name}
                </motion.h2>
                <motion.p className="dp-desc" variants={fadeUpVariant}>
                  {dept.desc}
                </motion.p>
              </div>

              <div>
                <motion.div variants={fadeUpVariant} style={{ marginTop: '24px' }}>
                  <ActionButton text={`Explore ${dept.name}`} />
                </motion.div>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="dp-layout-6">
            <motion.div className="dp-header-row" variants={fadeUpVariant}>
              <div>
                <HeaderBadge label={`CHAPTER ${dept.num} — OPERATIONS`} />
                <h2 className="dp-title" style={{ marginBottom: 0 }}>
                  {dept.name}
                </h2>
              </div>
              <p className="dp-desc" style={{ maxWidth: '480px', margin: 0 }}>
                {dept.desc}
              </p>
            </motion.div>

            <motion.div variants={fadeUpVariant} style={{ marginTop: '32px' }}>
              <ActionButton text={`Apply for ${dept.name}`} />
            </motion.div>
          </div>
        );

      case 7:
      default:
        return (
          <div className="dp-layout-7">
            <motion.div className="dp-content-col" variants={fadeUpVariant}>
              <HeaderBadge label={`CHAPTER ${dept.num} — ALLIANCES`} />
              <h2 className="dp-title">{dept.name}</h2>
              <p className="dp-desc">{dept.desc}</p>
            </motion.div>

            <motion.div className="dp-card-col" variants={fadeUpVariant}>
              <motion.div variants={fadeUpVariant} style={{ marginTop: '24px' }}>
                <ActionButton text={`Connect with ${dept.name}`} />
              </motion.div>
            </motion.div>
          </div>
        );
    }
  };

  return (
    <motion.section
      className={`dp-chapter dp-chapter-${index}`}
      id={`dept-${dept.num}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={containerVariants}
    >
      {/* Background Wallpaper Image Container */}
      <div className="dp-bg-wallpaper">
        <img
          src={dept.wallpaper || cloudinaryUrl(`/departments/${dept.name}.JPG`)}
          alt=""
          aria-hidden="true"
          loading="lazy"
        />
        <div className="dp-wallpaper-overlay" />
      </div>

      {/* Background Watermark Number */}
      <motion.div className="dp-bg-num" variants={numberVariant}>
        {dept.num}
      </motion.div>

      <div className="dp-chapter-inner">
        {renderContentInner()}
      </div>
    </motion.section>
  );
}
