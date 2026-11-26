import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function RegistrationClosed() {
  const navigate = useNavigate();

  return (
    <section className="reg-container" id="register-closed">
      <div className="reg-background-glow" aria-hidden="true" />
      <div className="reg-grid-overlay" aria-hidden="true" />

      <div className="reg-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center', padding: '40px 20px' }}>
        <header className="reg-header" style={{ marginBottom: '2rem' }}>
          <div className="reg-badge" style={{ margin: '0 auto 1rem' }}>
            <span className="reg-badge-dot" style={{ backgroundColor: 'var(--red)' }} />
            <span>PORTAL TEMPORARILY CLOSED</span>
          </div>
          <h1 className="reg-main-title">Registrations Closed</h1>
        </header>

        <motion.div
          className="reg-success-card"
          style={{ 
            borderColor: 'rgba(220, 39, 67, 0.4)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(220, 39, 67, 0.15)',
            background: 'rgba(11, 16, 24, 0.85)',
            maxWidth: '560px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px'
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="reg-success-icon-wrap" style={{ borderColor: 'var(--red)', color: 'var(--red)', background: 'rgba(224, 92, 106, 0.12)' }}>
            <div className="reg-success-pulse" style={{ borderColor: 'rgba(224, 92, 106, 0.4)' }} />
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>

          <p className="reg-success-desc" style={{ fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--white)', margin: '0 auto 12px' }}>
            Registrations are closed , keep updated about the next steps in our instagram page
          </p>

          <div className="reg-community-links" style={{ width: '100%', borderTop: '1px solid var(--line)', paddingTop: '24px', marginBottom: '8px' }}>
            <span className="reg-community-label">Official Channel</span>
            <div className="reg-community-btns" style={{ justifyContent: 'center' }}>
              <a 
                href="https://www.instagram.com/cyber_innovators_club" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="reg-social-btn"
                style={{
                  background: 'rgba(225, 48, 108, 0.15)',
                  border: '1px solid rgba(225, 48, 108, 0.4)',
                  color: '#e1306c',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#e1306c';
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(225, 48, 108, 0.35)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(225, 48, 108, 0.15)';
                  e.currentTarget.style.color = '#e1306c';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                <span>Instagram Page</span>
              </a>
            </div>
          </div>

          <button className="reg-home-btn" onClick={() => navigate('/')}>
            <span>Return to Homepage</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
