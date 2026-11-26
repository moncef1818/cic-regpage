import { memo } from 'react';
import { motion } from 'framer-motion';
import EventStory from './EventStory';
import EventStats from './EventStats';
import EventGallery from './EventGallery';

const EASE = [0.22, 1, 0.36, 1];

/**
 * EventSection — full-viewport showcase for a single archive event.
 * Two-column hero, HUD stats, segmented story, rolling gallery.
 */
function EventSection({ event, sectionRef }) {
  const heroImage = event.mainImage || event.photos?.[0] || null;

  return (
    <article
      id={`event-${event.slug}`}
      ref={sectionRef}
      className="pe-event-section"
      data-year={event.year}
      data-slug={event.slug}
    >
      <div className="pe-event-showcase">
        <motion.div
          className="pe-event-meta"
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: EASE }}
        >
          <span className="pe-event-year">{event.year}</span>
          <h2 className="pe-event-title">{event.title}</h2>

          <div className="pe-event-meta-grid">
            <div className="pe-event-meta-item">
              <span className="pe-event-meta-label">Category</span>
              <span className="pe-event-meta-value">{event.category}</span>
            </div>
            <div className="pe-event-meta-item">
              <span className="pe-event-meta-label">Date</span>
              <span className="pe-event-meta-value">{event.dateLabel}</span>
            </div>
            <div className="pe-event-meta-item">
              <span className="pe-event-meta-label">Venue</span>
              <span className="pe-event-meta-value">{event.venue}</span>
            </div>
          </div>

          {event.tagline && <p className="pe-event-tagline">{event.tagline}</p>}
        </motion.div>

        <motion.div
          className="pe-event-hero-wrap"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
        >
          <div className="pe-event-hero-glow" aria-hidden="true" />
          <div className="pe-event-hero">
            {heroImage ? (
              <img
                src={heroImage}
                alt={`${event.title} highlight`}
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div className="pe-event-hero-placeholder">
                <span>{event.title}</span>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <div className="pe-event-body">
        <EventStats stats={event.stats} />
        <EventStory story={event.story} />
      </div>

      {event.photos?.length > 0 && !['apollo-ctf', 'ai-cup'].includes(event.slug) && (
        <div className="pe-event-gallery-wrap">
          <div className="pe-gallery-label">
            <span className="pe-gallery-label-line" aria-hidden="true" />
            Gallery
          </div>
          <div className="pe-gallery-bleed">
            <EventGallery photos={event.photos} />
          </div>
        </div>
      )}
    </article>
  );
}

export default memo(EventSection);
