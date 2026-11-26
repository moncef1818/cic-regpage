import { memo } from 'react';

/**
 * Timeline — fixed vertical year navigation for desktop.
 * Highlights the active year and event as the user scrolls.
 */
function Timeline({ years, events, activeYear, activeSlug, onYearClick, onEventClick }) {
  return (
    <nav className="pe-timeline" aria-label="Event timeline">
      <div className="pe-timeline-inner">
        {years.map((year, yi) => {
          const yearEvents = events.filter((e) => e.year === year);
          const isYearActive = activeYear === year;

          return (
            <div key={year} className={`pe-timeline-group ${isYearActive ? 'is-active' : ''}`}>
              <button
                type="button"
                className={`pe-timeline-year ${isYearActive ? 'is-active' : ''}`}
                onClick={() => onYearClick(year)}
                aria-current={isYearActive ? 'true' : undefined}
              >
                {year}
              </button>

              {yi < years.length - 1 && <div className="pe-timeline-connector" aria-hidden="true" />}

              <ul className="pe-timeline-events">
                {yearEvents.map((ev) => (
                  <li key={ev.slug}>
                    <button
                      type="button"
                      className={`pe-timeline-event ${activeSlug === ev.slug ? 'is-active' : ''}`}
                      onClick={() => onEventClick(ev.slug)}
                      aria-current={activeSlug === ev.slug ? 'true' : undefined}
                    >
                      {ev.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </nav>
  );
}

export default memo(Timeline);
