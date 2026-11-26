import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Reveal from '../effects/Reveal';
import FilmStrip from './FilmStrip';
import WorkshopNetwork from './WorkshopNetwork';
import { sortedEvents, sortedWorkshops } from '../../assets/data/events';

export default function EventsTimeline() {
  const sectionRef = useRef(null);
  const listRef    = useRef(null);
  const events     = sortedEvents();
  const workshops  = sortedWorkshops();

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start center', 'end center'],
  });
  const lineProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 });

  return (
    <>
      {/* ── MAJOR EVENTS TIMELINE ── */}
      <section className="section-shell" id="events" ref={sectionRef}>
        <Reveal>
          <p className="section-eyebrow">Season 2025 / 2026</p>
          <h2 className="section-title" style={{ marginBottom: 56 }}>Past Events</h2>
        </Reveal>

        <div className="event-list" ref={listRef}>
          <div className="event-thread-track" />
          <motion.div className="event-thread-fill" style={{ scaleY: lineProgress }} />

          {events.map((ev, i) => (
            <div key={ev.title + ev.date}>
              <div className="event-row">
                <Reveal as="div" delay={0.08} className="event-row-text event-row-text--full">
                  <span className="event-node" />
                  <div style={{
                    display: 'grid',
                    gap: 14,
                    padding: '22px 24px',
                    background: 'linear-gradient(180deg, rgba(11,16,24,0.9), rgba(11,16,24,0.64))',
                    border: '1px solid rgba(77,201,230,0.1)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.14)',
                    maxWidth: '760px',
                  }}>
                    <div style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '0.72rem',
                      letterSpacing: '0.18em',
                      color: 'var(--cyan)',
                      textTransform: 'uppercase',
                    }}>{ev.dateLabel}</div>
                    <div style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: 'clamp(2rem, 3vw, 3rem)',
                      lineHeight: 1,
                      fontWeight: 700,
                      letterSpacing: '-0.05em',
                      color: 'var(--white)',
                    }}>{ev.title}</div>
                    <div style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: '1.02rem',
                      lineHeight: 1.7,
                      color: 'var(--grey)',
                      maxWidth: '540px',
                    }}>{ev.desc}</div>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '8px 12px',
                      alignItems: 'center',
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '0.58rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--grey-dim)',
                    }}>
                      {ev.venue && (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          {ev.venue}{ev.time ? ` · ${ev.time}` : ''}
                        </span>
                      )}
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* Film strip immediately below each event */}
              {ev.album !== false && ev.photos && ev.photos.length > 0 && (
                <Reveal delay={0.15}>
                  <div style={{ marginTop: 32, marginBottom: 8 }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      marginBottom: 14,
                    }}>
                      <span style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: '0.56rem',
                        letterSpacing: '0.28em',
                        textTransform: 'uppercase',
                        color: 'var(--cyan)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                      }}>
                        <span style={{ width: 18, height: 1, background: 'var(--cyan)', display: 'inline-block' }} />
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                          <circle cx="12" cy="13" r="4" />
                        </svg>
                        Highlights
                      </span>
                      <span style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: '0.5rem',
                        color: 'var(--grey-dim)',
                        letterSpacing: '0.1em',
                      }}>
                        drag · hover to pause · click to expand
                      </span>
                    </div>
                    <div style={{
                      border: '1px solid var(--line)',
                      background: 'rgba(0,0,0,0.3)',
                    }}>
                      <FilmStrip photos={ev.photos} placeholderCount={6} />
                    </div>
                  </div>
                </Reveal>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── INTERACTIVE WORKSHOPS KNOWLEDGE NETWORK ── */}
      <section className="section-shell" id="workshops" style={{ paddingTop: 0 }}>
        <div style={{ height: 1, background: 'var(--line-hi)', marginBottom: 60 }} />
        <WorkshopNetwork workshops={workshops} />
      </section>
    </>
  );
}
