import Reveal from '../effects/Reveal';
import { useCountUp } from '../../hooks/useCountUp';
import { stats } from '../../assets/data/team';

function StatCard({ value, suffix, label, index }) {
  const { ref, value: animated } = useCountUp(value);
  return (
    <div className="stat-card" ref={ref}>
      <div className="stat-card-top">
        <span className="stat-index">{String(index + 1).padStart(2, '0')}</span>
        <span className="stat-indicator" aria-hidden="true" />
      </div>
      <div className="stat-num">{animated}{suffix}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default function StatsCounter() {
  return (
    <section className="stats-section" id="stats">
      <div className="section-shell section-shell--compact">
        <div className="stats-layout">
          <Reveal className="stats-intro">
            <p className="section-eyebrow">By the numbers</p>
            <h2 className="section-title">A season in motion</h2>
            <p className="stats-intro-note">
              Real output from workshops, competitions, and community events across the club.
            </p>
          </Reveal>

          <div className="stats-strip">
            {stats.map((s, idx) => (
              <StatCard key={s.label} {...s} index={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
