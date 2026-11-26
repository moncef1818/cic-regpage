/* ─────────────────────────────────────────────────────────────
   Mission Archive — event data

   Each event:
   {
     slug, year, status, category, title, dateLabel, venue, tagline,
     story: { overview, challenge, highlights: [], outcome },
     stats: [{ value, label }],
     photos: [ '/images/events/<slug>/01.jpg', ... ],
   }

   Photo paths point at public/images/events/<slug>/ — drop real
   files in those folders (see the README.txt placeholders) and
   update the arrays below. Empty/missing arrays render placeholder
   tiles instead of breaking the layout.
   ───────────────────────────────────────────────────────────── */

function buildPhotoPaths(slug, count) {
  return Array.from({ length: count }, (_, i) => `/images/events/${slug}/${String(i + 1).padStart(2, '0')}.jpg`);
}

export const EVENTS = [
  {
    slug: 'open-day',
    year: '2024',
    status: 'COMPLETED',
    category: 'Awareness',
    title: 'Open Day',
    dateLabel: 'September 3',
    venue: 'NSCS Main Hall',
    tagline: 'Where the club introduced itself to the campus for the first time.',
    story: {
      overview: 'CIC\u2019s very first public event — a single afternoon to explain what the club does and recruit its founding cohort.',
      challenge: 'Convince students with no security background that cybersecurity was worth their time in one afternoon.',
      highlights: ['300+ visitors', '40 sign-ups', '5 live demos'],
      outcome: 'The turnout became the seed of every workshop and team that followed.',
    },
    stats: [
      { value: '300+', label: 'Visitors' },
      { value: '40', label: 'Sign-ups' },
      { value: '5', label: 'Demos' },
    ],
    photos: buildPhotoPaths('open-day', 6),
  },
  {
    slug: 'secbootcamp',
    year: '2025',
    status: 'COMPLETED',
    category: 'Bootcamp',
    title: 'SecBootCamp',
    dateLabel: 'March 21',
    venue: 'NSCS Lab 2',
    tagline: 'A five-day intensive on the fundamentals every CIC member needed.',
    story: {
      overview: 'Five consecutive evenings covering networking, Linux, web security, and CTF basics from zero.',
      challenge: 'Teach absolute beginners enough to hold their own in a live CTF by day five.',
      highlights: ['60 participants', '5 modules', '92% completion rate'],
      outcome: 'Most of that cohort went on to place in CICONIX later that year.',
    },
    stats: [
      { value: '60', label: 'Participants' },
      { value: '5', label: 'Modules' },
      { value: '92%', label: 'Completion' },
    ],
    photos: buildPhotoPaths('secbootcamp', 8),
  },
  {
    slug: 'fusion',
    year: '2025',
    status: 'COMPLETED',
    category: 'Hackathon',
    title: 'Fusion',
    dateLabel: 'July 12',
    venue: 'NSCS Auditorium',
    tagline: 'A 24-hour cross-discipline hackathon pairing security with design and dev.',
    story: {
      overview: 'Teams of three — one hacker, one developer, one designer — building a working security tool in 24 hours.',
      challenge: 'Get three different disciplines to ship one coherent product overnight.',
      highlights: ['24 hours straight', '19 teams', '12 shipped demos'],
      outcome: 'Two of the projects are still maintained by their teams a year later.',
    },
    stats: [
      { value: '24', label: 'Hours' },
      { value: '19', label: 'Teams' },
      { value: '12', label: 'Shipped' },
    ],
    photos: buildPhotoPaths('fusion', 10),
  },
  {
    slug: 'ciconix',
    year: '2026',
    status: 'COMPLETED',
    category: 'Workshop',
    title: 'CICONIX',
    dateLabel: 'November 14',
    venue: 'NSCS',
    tagline: 'CIC\u2019s flagship annual event — escape-room-style cybersecurity challenges for the whole campus.',
    story: {
      overview: 'The club\u2019s largest event to date: a full day of escape-room cybersecurity challenges built entirely by members.',
      challenge: 'Design puzzle rooms that taught real security concepts without ever feeling like a lecture.',
      highlights: ['120 participants', '6 workshops', '18 organizers'],
      outcome: 'CICONIX became CIC\u2019s largest annual event and is now the club\u2019s signature.',
    },
    stats: [
      { value: '120', label: 'Participants' },
      { value: '6', label: 'Workshops' },
      { value: '18', label: 'Organizers' },
    ],
    photos: buildPhotoPaths('ciconix', 12),
  },
];

/** Events in chronological order (oldest first) — the order the archive walks through. */
export function sortedEvents() {
  return [...EVENTS].sort((a, b) => Number(a.year) - Number(b.year));
}

/** Distinct years present in the archive, ascending — feeds the Timeline nav. */
export function archiveYears() {
  return [...new Set(sortedEvents().map((e) => e.year))];
}
