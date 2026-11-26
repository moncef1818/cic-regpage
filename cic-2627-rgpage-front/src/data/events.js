import { getEventPhotos } from '../assets/data/eventMedia';
import { cloudinaryUrl } from '../assets/data/cloudinaryUrls';

/**
 * Mission Archive  curated event data for the Past Events page.
 * Each event is a self-contained story with metadata, stats, and gallery.
 */
export const EVENTS = [
  {
    slug: 'secbootcamp',
    year: '2025',
    status: 'COMPLETED',
    category: 'Bootcamp',
    title: 'SecBootCamp',
    dateLabel: 'May 2025',
    venue: 'Mhalma 6 ',
    tagline: 'A hands-on cybersecurity bootcamp focused on practical security fundamentals.',
    mainImage: cloudinaryUrl('/events/main/secbootcamp.jpg'),
    story: {
      overview:
        'Sessions covering networking, Linux, web security, and CTF basics , built for students starting from zero.',
      challenge:
        'Give absolute beginners enough practical skill to hold their own in a live CTF by the final day.',
      highlights: ['40+ participants', 'Labs', 'Live CTF finale'],
      outcome:
        'Most of that cohort went on to be the leaders of the Ethical Hacking and cyber security departments .',
    },
    stats: [
      { value: '50+', label: 'Participants' },
      { value: '5', label: 'Workshops' },
      { value: '92%', label: 'Completion' },
    ],
    photos: getEventPhotos('SecBootCamp'),
  },
  {
    slug: 'open-day',
    year: '2025',
    status: 'COMPLETED',
    category: 'Open Day',
    title: 'CIC Open Day',
    dateLabel: 'December 6',
    venue: 'NSCS',
    tagline: 'Where the club opened its doors to the entire campus.',
    mainImage: cloudinaryUrl('/events/main/open-day.jpg'),
    story: {
      overview:
        'A full afternoon across Lecture Hall 2 and the classrooms , live demos, department stands, and direct engagement with members.',
      challenge:
        'Convince students with no security background that cybersecurity was worth their time in one afternoon.',
      highlights: ['150+ visitors', 'Live department demos', 'Year plan announced'],
      outcome:
        'The turnout became the seed of every workshop and team that followed through the 2025/2026 season.',
    },
    stats: [
      { value: '150+', label: 'Visitors' },
      { value: '8', label: 'Departments' },
      { value: '4', label: 'Hours' },
    ],
    photos: getEventPhotos('CIC Open Day'),
  },
  {
    slug: 'ciconix',
    year: '2026',
    status: 'COMPLETED',
    category: 'Mega Event',
    title: 'CICONIX',
    dateLabel: 'February 12',
    venue: 'NSCS',
    tagline: "CIC's flagship ~55-hour mega-event , workshops, showcases, and a full CTF ladder.",
    mainImage: cloudinaryUrl('/events/main/ciconix.jpg'),
    story: {
      overview:
        'The club\'s largest event to date: a multi-day technology event spanning lecture halls, classrooms, and open study space with project showcases and hands-on workshops.',
      challenge:
        'Design challenge-based activities that taught real security concepts without ever feeling like a lecture.',
      highlights: ['60+ participants', '6 workshops', '~ 55 hours'],
      outcome:
        'CICONIX became CIC\'s signature annual event , bridging academic theory and real-world application for the whole campus.',
    },
    stats: [
      { value: '50+', label: 'Participants' },
      { value: '6', label: 'Workshops' },
    ],
    photos: getEventPhotos('Ciconix'),
  },
  {
    slug: 'luminaria',
    year: '2026',
    status: 'COMPLETED',
    category: 'Charity',
    title: 'Luminaria',
    dateLabel: 'March 2026',
    venue: 'NSCS',
    tagline: 'A charity event bringing people together through games and activities for healthcare.',
    mainImage: cloudinaryUrl('/events/main/luminaria.jpg'),
    story: {
      overview:
        'An evening of fun games and activities designed to raise funds in support of hospitals and healthcare initiatives.',
      challenge:
        'Build community engagement around a cause while keeping the energy high and accessible for all students.',
      highlights: ['Charity fundraising', 'Campus-wide participation', 'Live activities'],
      outcome:
        'Demonstrated that CIC\'s impact extends beyond tech , connecting the club to the wider community.',
    },
    stats: [
      { value: '100+', label: 'Attendees' },
      { value: '1', label: 'Cause' },
      { value: '100%', label: 'Community' },
    ],
    photos: getEventPhotos('Luminaria'),
  },
  {
    slug: 'apollo-ctf',
    year: '2026',
    status: 'COMPLETED',
    category: 'CTF',
    title: 'Apollo CTF',
    dateLabel: 'July 2026',
    venue: 'Online',
    tagline: 'A remote Capture The Flag competition with a full challenge ladder.',
    mainImage: cloudinaryUrl('/events/main/apollo-ctf.png'),
    story: {
      overview:
        'An online cybersecurity CTF designed for remote participation , teams tackled a progressive challenge ladder from recon to exploitation.',
      challenge:
        'Deliver a competitive, fair remote CTF experience accessible to participants anywhere.',
      highlights: ['Remote participation', 'Full challenge ladder', 'Team-based solving'],
      outcome:
        'Expanded CIC\'s reach beyond campus, proving the club could run production-grade security competitions online.',
    },
    stats: [
      { value: '30+', label: 'Participants' },
      { value: '20+', label: 'Challenges' },
      { value: '48h', label: 'Duration' },
    ],
    photos: getEventPhotos('Apollo CTF'),
  },
  {
    slug: 'ai-cup',
    year: '2026',
    status: 'COMPLETED',
    category: 'Datathon',
    title: 'AI Cup Datathon',
    dateLabel: 'July 2026',
    venue: 'Online',
    tagline: 'A data science and machine learning competition on real-world datasets.',
    mainImage: cloudinaryUrl('/events/main/ai-cup.png'),
    story: {
      overview:
        'An online datathon where participants tackled real-world datasets remotely , from exploration to model deployment.',
      challenge:
        'Make advanced data science accessible and competitive for students at every skill level.',
      highlights: ['Real-world datasets', 'Remote access', 'ML pipeline focus'],
      outcome:
        'Established CIC\'s AI department as a force in competitive data science on campus.',
    },
    stats: [
      { value: '20+', label: 'Teams' },
      { value: '4', label: 'Tracks' },
      { value: '48h', label: 'Duration' },
    ],
    photos: getEventPhotos('AI Cup Datathon'),
  },
];

/** Events in chronological order (oldest first). */
export function sortedEvents() {
  return [...EVENTS].sort((a, b) => {
    const yearDiff = Number(a.year) - Number(b.year);
    if (yearDiff !== 0) return yearDiff;
    return EVENTS.indexOf(a) - EVENTS.indexOf(b);
  });
}

/** Distinct years present in the archive, ascending. */
export function archiveYears() {
  return [...new Set(sortedEvents().map((e) => e.year))];
}

/** First event slug for a given year. */
export function firstEventSlugForYear(year) {
  const match = sortedEvents().find((e) => e.year === year);
  return match?.slug ?? null;
}
