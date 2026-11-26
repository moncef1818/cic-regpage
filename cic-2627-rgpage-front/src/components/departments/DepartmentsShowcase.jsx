import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import DepartmentSection from './DepartmentSection';
import { departments } from '../../assets/data/departments';
import { cloudinaryUrl } from '../../assets/data/cloudinaryUrls';

const EASE = [0.22, 1, 0.36, 1];

export default function DepartmentsShowcase() {
  const heroRef = useRef(null);
  const [activeChapter, setActiveChapter] = useState(0);

  // Parallax scroll animation for the hero section
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);

  // Track active department section using viewport boundingClientRect for precision
  useEffect(() => {
    const handleScroll = () => {
      const chapterEls = departments.map((dept) =>
        document.getElementById(`dept-${dept.num}`)
      );

      const triggerPoint = window.innerHeight * 0.45;

      for (let i = chapterEls.length - 1; i >= 0; i--) {
        const el = chapterEls[i];
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= triggerPoint) {
            setActiveChapter(i);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (num) => {
    const el = document.getElementById(`dept-${num}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="dp-page">
      {/* Side Floating Chapter Indicator (Desktop) */}
      <nav className="dp-nav-indicator" aria-label="Department chapters navigation">
        {departments.map((dept, i) => (
          <button
            key={dept.value}
            className={`dp-nav-item ${activeChapter === i ? 'active' : ''}`}
            onClick={() => scrollToSection(dept.num)}
            aria-label={`Scroll to ${dept.name}`}
          >
            <span className="dp-nav-dot" />
            <span className="dp-nav-label">{dept.num}. {dept.name}</span>
          </button>
        ))}
      </nav>

      {/* Floating Bottom Quick-Nav Bar (Mobile) */}
      <div className="dp-mobile-nav" aria-label="Mobile department switcher">
        {departments.map((dept, i) => (
          <button
            key={dept.value}
            className={`dp-mobile-nav-item ${activeChapter === i ? 'active' : ''}`}
            onClick={() => scrollToSection(dept.num)}
            aria-label={`Scroll to ${dept.name}`}
          >
            <span className="dp-mobile-nav-num">{dept.num}</span>
          </button>
        ))}
      </div>

      {/* Cinematic Full Viewport Hero */}
      <section className="dp-hero" ref={heroRef}>
        <div className="dp-hero-wallpaper">
          <img
            src={cloudinaryUrl('/departments/HeroSection.JPG')}
            alt="CIC Departments Hero Wallpaper"
            className="dp-hero-bg-img"
          />
          <div className="dp-hero-overlay" />
        </div>
        <div className="dp-hero-glow" aria-hidden="true" />
        <motion.div
          className="dp-hero-inner"
          style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
        >
          <motion.div
            className="dp-hero-badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <span className="dp-badge-dot" />
            <span>CIC DEPARTMENTS 2026/2027</span>
          </motion.div>

          <motion.h1
            className="dp-hero-title"
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
          >
            Departments 
          </motion.h1>

          <motion.p
            className="dp-hero-subtitle"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.22 }}
          >
            Discover where your technical passion and leadership fit best within the Cyber Innovators Club ecosystem.
          </motion.p>

          {/* Department Quick-Jump Selector Chips */}
          <motion.div
            className="dp-hero-jump-chips"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
          >
            {departments.map((dept) => (
              <button
                key={dept.num}
                className="dp-jump-chip"
                onClick={() => scrollToSection(dept.num)}
              >
                <span className="dp-jump-num">{dept.num}</span>
                <span className="dp-jump-name">{dept.name}</span>
              </button>
            ))}
          </motion.div>

          <motion.div
            className="dp-hero-stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.42 }}
          >
            <div className="dp-stat-chip">
              <span className="dp-chip-val">08</span>
              <span className="dp-chip-lbl">Departments</span>
            </div>
            <div className="dp-stat-divider" />
            <div className="dp-stat-chip">
              <span className="dp-chip-val">100+</span>
              <span className="dp-chip-lbl">Members</span>
            </div>
            <div className="dp-stat-divider" />
            <div className="dp-stat-chip">
              <span className="dp-chip-val">100%</span>
              <span className="dp-chip-lbl">Student Led</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="dp-hero-scroll-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          style={{ opacity: heroOpacity }}
        >
          <span>Scroll to explore chapters</span>
          <div className="dp-scroll-line" />
        </motion.div>
      </section>

      {/* Vertically Stacked Department Chapters */}
      <div className="dp-chapters">
        {departments.map((dept, i) => (
          <DepartmentSection key={dept.value} dept={dept} index={i} />
        ))}
      </div>
    </div>
  );
}
