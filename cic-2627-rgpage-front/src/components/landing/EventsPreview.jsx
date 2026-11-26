import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Reveal from '../effects/Reveal';
import { sortedEvents } from '../../assets/data/events';
import { fadeUp, staggerContainer } from '../../utils/animation';

function getFeaturedEvents() {
  const all = sortedEvents();
  const withPhotos = all.filter((e) => e.photos && e.photos.length > 0);
  const withoutPhotos = all.filter((e) => !e.photos || e.photos.length === 0);
  return [...withPhotos, ...withoutPhotos].slice(0, 2);
}

export default function EventsPreview() {
  const featured = getFeaturedEvents();

  return (
    <section className="section-shell section-shell--dense" id="events-preview">
      <Reveal className="section-head section-head--inline">
        <div>
          <p className="section-eyebrow">Past events</p>
          <h2 className="section-title">What we've run</h2>
        </div>
        <Link to="/past-events" className="btn-cta-ghost">
          View archive →
        </Link>
      </Reveal>

      <motion.div
        className="events-preview-list"
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-40px' }}
      >
        {featured.map((ev, i) => (
          <motion.article
            key={ev.title}
            className={`event-preview-item ${i % 2 === 1 ? 'event-preview-item--reverse' : ''}`}
            variants={fadeUp}
          >
            <div className="event-preview-body">
              <p className="event-preview-index">
                {String(i + 1).padStart(2, '0')} — {ev.dateLabel}
              </p>
              <div className="event-title">{ev.title}</div>
              <p className="event-desc">{ev.desc}</p>
            </div>

            <div className="event-preview-image-wrap">
              {ev.photos?.[0] ? (
                <img src={ev.photos[0]} alt={ev.title} loading="lazy" />
              ) : (
                <div className="event-preview-placeholder">Photo coming soon</div>
              )}
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
