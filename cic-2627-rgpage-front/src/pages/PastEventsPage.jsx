import { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Timeline from '../components/events/Timeline';
import EventSection from '../components/events/EventSection';
import WorkshopNetwork from '../components/events/WorkshopNetwork';
import { sortedEvents, archiveYears, firstEventSlugForYear } from '../data/events';
import { sortedWorkshops } from '../assets/data/events';

import { cloudinaryUrl } from '../assets/data/cloudinaryUrls';

const EASE = [0.22, 1, 0.36, 1];

function scrollToSlug(slug) {
  const el = document.getElementById(`event-${slug}`);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function PastEventsPage() {
  const events = sortedEvents();
  const workshops = sortedWorkshops();
  const years = archiveYears();
  const sectionRefs = useRef({});
  const [activeSlug, setActiveSlug] = useState(events[0]?.slug ?? null);
  const [activeYear, setActiveYear] = useState(events[0]?.year ?? null);

  const setSectionRef = useCallback((slug) => (node) => {
    if (node) sectionRefs.current[slug] = node;
    else delete sectionRefs.current[slug];
  }, []);

  useEffect(() => {
    const nodes = Object.values(sectionRefs.current).filter(Boolean);
    if (!nodes.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          const slug = visible[0].target.dataset.slug;
          const year = visible[0].target.dataset.year;
          if (slug) setActiveSlug(slug);
          if (year) setActiveYear(year);
        }
      },
      { rootMargin: '-35% 0px -35% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [events.length]);

  const handleYearClick = useCallback((year) => {
    const slug = firstEventSlugForYear(year);
    if (slug) scrollToSlug(slug);
  }, []);

  const handleEventClick = useCallback((slug) => {
    scrollToSlug(slug);
  }, []);

  return (
    <div className="pe-page">
      <Timeline
        years={years}
        events={events}
        activeYear={activeYear}
        activeSlug={activeSlug}
        onYearClick={handleYearClick}
        onEventClick={handleEventClick}
      />

      {/* Hero */}
      <section className="pe-hero">
        <div className="pe-hero-wallpaper" aria-hidden="true">
          <img
            src={cloudinaryUrl('/events/main/HeroSec.JPG')}
            alt=""
            className="pe-hero-bg-img"
            loading="eager"
            decoding="async"
          />
          <div className="pe-hero-overlay" />
        </div>
        <div className="pe-hero-glow" aria-hidden="true" />
        <motion.div
          className="pe-hero-content"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <div className="pe-hero-badge">
            <span className="pe-badge-dot" />
            <span>CIC MISSION & EVENT ARCHIVE</span>
          </div>

          <h1 className="pe-hero-title">
            Every Workshop.
            <br />
            Every Competition.
            <br />
            Every Milestone.
          </h1>

          <p className="pe-hero-subtitle">
            A comprehensive chronological archive of CIC's hackathons, security workshops, hands-on labs, and competitive events.
          </p>

          <div className="pe-hero-stats">
            <div className="pe-stat-chip">
              <span className="pe-chip-num">22+</span>
              <span className="pe-chip-txt">Workshops</span>
            </div>
            <div className="pe-stat-sep" />
            <div className="pe-stat-chip">
              <span className="pe-chip-num">05</span>
              <span className="pe-chip-txt">Mega Events</span>
            </div>
            <div className="pe-stat-sep" />
            <div className="pe-stat-chip">
              <span className="pe-chip-num">04</span>
              <span className="pe-chip-txt">CTFs & Datathons</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="pe-scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          aria-hidden="true"
        >
          <span className="pe-scroll-line" />
          <span className="pe-scroll-text">Scroll to explore timeline</span>
        </motion.div>
      </section>

      {/* Event sections */}
      <div className="pe-archive">
        {events.map((event) => (
          <EventSection
            key={event.slug}
            event={event}
            sectionRef={setSectionRef(event.slug)}
          />
        ))}
      </div>

      {/* Interactive Workshops Knowledge Network directly below past events */}
      <section className="pe-workshops-section" id="workshops">
        <div className="pe-workshops-inner">
          <WorkshopNetwork workshops={workshops} />
        </div>
      </section>
    </div>
  );
}

