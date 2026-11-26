import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { cloudinaryUrl } from '../../assets/data/cloudinaryUrls';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { to: '/',             icon: '⌂',  label: 'Home'        },
  { to: '/past-events',  icon: '◷',  label: 'Past Events' },
  { to: '/departments',  icon: '⬡',  label: 'Departments' },
  { to: '/gallery',      icon: '⊞',  label: 'Gallery'     },
  { to: '/register',     icon: '✦',  label: 'Register'    },
];

function LiveClock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const fmt = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-GB', { hour12: false }));
    };
    fmt();
    const id = setInterval(fmt, 1000);
    return () => clearInterval(id);
  }, []);

  return <span className={styles.clock}>{time}</span>;
}

export default function Navbar() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Top blur fade mask */}
      <div className={styles.topMask} />

      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        {/* Left: wordmark */}
        <div className={styles.left}>
          <button
            className={styles.wordmark}
            onClick={() => navigate('/')}
            aria-label="Go home"
          >
            <img src={cloudinaryUrl('/CIC1.png')} alt="CIC logo" className={styles.wordmarkLogo} />
            <span className={styles.wordmarkText}>CIC</span>
          </button>
        </div>

        {/* Center: pill nav */}
        <nav className={styles.pillNav} aria-label="Main navigation">
          <div className={styles.pill}>
            {NAV_LINKS.map(({ to, icon, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `${styles.navBtn} ${isActive ? styles.active : ''}`
                }
              >
                <span className={styles.navIcon}>{icon}</span>
                <span className={styles.navLabel}>{label}</span>
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Right: live clock */}
        <div className={styles.right}>
          <LiveClock />
        </div>
      </header>

      {/* Bottom fade — kept as a no-op element for markup compatibility */}
      <div className={styles.bottomMask} />
    </>
  );
}