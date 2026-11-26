import { getEventPhotos } from './eventMedia';

// ─────────────────────────────────────────
//  CIC 2025/2026 — Real season content
//  All events and workshops from the actual programme.
// ─────────────────────────────────────────

// ── TICKER ──
// Short labels shown in the scrolling ticker strip
export const tickerEvents = [
  'SECBOOTCAMP — MAY 2025',
  'CIC OPEN DAY — DEC 2025',
  '22 WORKSHOPS — DEC 2025 → FEB 2026',
  'CICONIX — FEB 2026',
  'LUMINARIA — MAR 2026',
  'APOLLO CTF — 2026',
  'AI CUP DATATHON — 2026',
];

// ── MAJOR EVENTS ──
// Used in PastEventsPage timeline and EventsPreview on landing
export const events = [
  {
    date: '2026-02-12',
    dateLabel: '12 FEB 2026',
    title: 'CICONIX',
    desc: "CIC's flagship ~55-hour mega-event at the NSCS . A multi-day technology event with project showcases, hands-on workshops, and a Capture The Flag competition. Open to all university students in Computer Science, IT, Electronics, and Networking.",
    venue: 'NSCS',
    time: '~ 55 hours',
    objectives: [
      'Promote active learning through challenge-based activities',
      'Bridge the gap between academic theory and real-world application',
      'Develop core technical competencies in cybersecurity and development',
      'Vulnerability analysis and hands-on CTF competition',
    ],
    photos: getEventPhotos('Ciconix'),
  },
  {
    date: '2025-12-06',
    dateLabel: '06 DEC 2025',
    title: 'CIC Open Day',
    desc: "CIC's open day held across Lecture Hall 2 and the classrooms. Students and interested individuals discovered the club's projects, activities, and vision — with live demos, department stands, and direct engagement with members.",
    venue: 'NSCS',
    time: '2:00 – 6:00 PM',
    photos: getEventPhotos('CIC Open Day'),
  },
  {
    date: '2026-03-01',
    dateLabel: 'MAR 2026',
    title: 'Luminaria',
    venue: 'NSCS',
    desc: 'A charity event that brings people together through fun games and activities to raise funds in support of hospitals and healthcare initiatives.',
    photos: getEventPhotos('Luminaria'),
  },
  {
    date: '2025-05-01',
    dateLabel: 'MAY 2025',
    title: 'SecBootCamp',
    venue: 'Mhalma 6 ',
    desc: 'A hands-on cybersecurity bootcamp focused on practical security fundamentals, tools, and real technical challenges for students building confidence in the field.',
    photos: getEventPhotos('SecBootCamp'),
  },
  {
    date: '2026-07-01',
    dateLabel: '2026',
    title: 'Apollo CTF',
    desc: 'This was an online cybersecurity Capture The Flag competition, designed for remote participation with a full challenge ladder and team-based problem solving.',
    album: false,
    photos: getEventPhotos('Apollo CTF'),
  },
  {
    date: '2026-07-15',
    dateLabel: '2026',
    title: 'AI Cup Datathon',
    desc: 'This was an online data science and machine learning competition where participants tackled real-world datasets remotely from anywhere.',
    album: false,
    photos: getEventPhotos('AI Cup Datathon'),
  },
];

// ── WORKSHOPS ──
// Full programme — all 22 workshops from the 2025/2026 season
export const workshops = [
  // ── December 2025 block ──
    {
    date: '2025-12-13',
    dateLabel: '13 DEC 2025',
    type: 'Technical Workshop',
    title: 'Intro to Dev',
    speaker: 'Yakoubi Moncef',
    time: '8:00 – 10:00 PM',
    venue: 'NSCS',
    audience: 'NHSCS students',
    department: 'Development',
  },
  {
    date: '2025-12-14',
    dateLabel: '14 DEC 2025',
    type: 'Technical Workshop',
    title: 'Introduction to Graphic Design',
    speaker: 'Labdi Cerine',
    time: '6:00 – 8:00 PM',
    venue: 'NSCS',
    audience: 'NHSCS students',
    department: 'Design and Media',
  },
  {
    date: '2025-12-15',
    dateLabel: '15 DEC 2025',
    type: 'Technical Workshop',
    title: 'Introduction to Ethical Hacking',
    speaker: 'Gahlouz Tinhinene & Harnane Sami Youcef',
    time: '7:45 – 9:45 PM',
    venue: 'Lecture Hall 2',
    venue: 'NSCS',
    department: 'Ethical Hacking',
  },
  {
    date: '2025-12-16',
    dateLabel: '16 DEC 2025',
    type: 'Technical Workshop',
    title: 'Introduction to Public Speaking',
    speaker: 'Labdi Cerine & Zeraoula Cerine',
    time: '6:30 – 8:00 PM',
    venue: 'NSCS',
    audience: 'NHSCS students',
    department: 'Aura',
  },
  {
    date: '2025-12-16',
    dateLabel: '16 DEC 2025',
    type: 'Technical Workshop',
    title: 'Introduction to Binary Exploitation & Reverse Engineering',
    speaker: 'Abderrahim Cherfaoui & Zengla Mohammed Abd-elilah',
    time: '8:00 – 10:00 PM',
    venue: 'NSCS',
    audience: 'NHSCS students',
    department: 'Cybersecurity',
  },
  {
    date: '2025-12-20',
    dateLabel: '20 DEC 2025',
    type: 'Technical Workshop',
    title: 'Introduction to Frontend Fundamentals 1',
    speaker: 'Belayadi Ritedj',
    time: '8:00 – 10:00 PM',
    venue: 'NSCS',
    audience: 'NHSCS students',
    department: 'Development',
  },

  // ── January 2026 block ──
  {
    date: '2026-01-25',
    dateLabel: '25 JAN 2026',
    type: 'Technical Workshop',
    title: 'Introduction to Frontend Fundamentals 2',
    speaker: 'Belayadi Ritedj',
    time: '7:30 – 9:30 PM',
    venue: 'NSCS',
    audience: 'NHSCS students',
    department: 'Development',
  },
  {
    date: '2026-01-26',
    dateLabel: '26 JAN 2026',
    type: 'Technical Workshop',
    title: 'Your First Step Into Python Backend Dev',
    speaker: 'Yakoubi Moncef',
    time: '8:00 – 10:00 PM',
    venue: 'NSCS',
    audience: 'NHSCS students',
    department: 'Development',
  },
  {
    date: '2026-01-27',
    dateLabel: '27 JAN 2026',
    type: 'Technical Workshop',
    title: 'Introduction to Game Dev 1',
    speaker: 'Bouagual Nour El Islam',
    time: '6:00 – 8:00 PM',
    venue: 'NSCS',
    audience: 'NHSCS students',
    department: 'Development',
  },
  {
    date: '2026-01-27',
    dateLabel: '27 JAN 2026',
    type: 'Technical Workshop',
    title: 'Graphic design using photoshop 1',
    speaker: 'Labdi Cerine',
    time: '8:00 – 10:00 PM',
    venue: 'NSCS',
    audience: 'NHSCS students',
    department: 'Design and Media',
  },

  // ── February 2026 block ──
  {
    date: '2026-02-01',
    dateLabel: '01 FEB 2026',
    type: 'Technical Workshop',
    title: 'Introduction to Game Dev 2',
    speaker: 'Bouagual Nour El Islam',
    time: '6:00 – 8:00 PM',
    venue: 'NSCS',
    audience: 'NHSCS students',
    department: 'Development',
  },
  {
    date: '2026-02-01',
    dateLabel: '01 FEB 2026',
    type: 'Technical Workshop',
    title: 'Graphic design using photoshop 2',
    speaker: 'Labdi Cerine',
    time: '8:00 – 10:00 PM',
    venue: 'NSCS',
    audience: 'NHSCS students',
    department: 'Design and Media',
  },
  {
    date: '2026-02-02',
    dateLabel: '02 FEB 2026',
    type: 'Technical Workshop',
    title: 'Intro to Web Ethical Hacking Security',
    speaker: 'Medjitna Belkacem',
    time: '8:00 – 10:00 PM',
    venue: 'NSCS',
    audience: 'NHSCS students',
    department: 'Ethical Hacking',
  },
  {
    date: '2026-02-03',
    dateLabel: '03 FEB 2026',
    type: 'Technical Workshop',
    title: 'Intro to Cryptography & Password Cracking',
    speaker: 'Berrahia Hamssa Oumaima & Ouchen Yasmine',
    time: '8:00 – 10:00 PM',
    venue: 'NSCS',
    audience: 'NHSCS students',
    department: 'Ethical Hacking',
  },
  {
    date: '2026-02-03',
    dateLabel: '03 FEB 2026',
    type: 'Technical Workshop',
    title: 'Career Paths in Computer Science',
    speaker: 'Mr. Berghout',
    time: '2:00 – 4:00 PM',
    venue: 'NSCS',
    audience: 'NHSCS students',
    department: 'Organization',
  },
  {
    date: '2026-02-08',
    dateLabel: '08 FEB 2026',
    type: 'Technical Workshop',
    title: 'All of AI',
    speaker: 'Manaa Mohaned',
    time: '6:00 – 8:00 PM',
    venue: 'NSCS',
    audience: 'NHSCS students',
    department: 'Artificial Intelligence',
  },
  {
    date: '2026-02-08',
    dateLabel: '08 FEB 2026',
    type: 'Technical Workshop',
    title: 'Digital Forensics & Ethical Hacking',
    speaker: 'Harnane Samy Youcef',
    time: '8:00 – 10:00 PM',
    venue: 'NSCS',
    audience: 'NHSCS students',
    department: 'Ethical Hacking',
  },
  {
    date: '2026-02-09',
    dateLabel: '09 FEB 2026',
    type: 'Technical Workshop',
    title: 'Wireless Hacking',
    speaker: 'Gahlouz Tinhinane',
    time: '8:00 – 10:00 PM',
    venue: 'Lecture Hall 2',
    audience: 'NSCS',
    department: 'Ethical Hacking',
  },
  {
    date: '2026-02-10',
    dateLabel: '10 FEB 2026',
    type: 'Technical Workshop',
    title: 'Intro to Project Management',
    speaker: 'Aissaoui Amine',
    time: '8:00 – 10:00 PM',
    venue: 'NSCS',
    audience: 'NHSCS students',
    department: 'Organization',
  },

  // ── Post-CICONIX ──
  {
    date: '2026-05-01',
    dateLabel: '2026',
    type: 'Technical Workshop',
    title: 'Machine Learning',
    speaker: 'Manaa Mohaned',
    time: 'TBA',
    venue: 'NSCS',
    audience: 'NHSCS students',
    department: 'Artificial Intelligence',
  },
  {
  date: '2026-02-12',
  dateLabel: '12 FEB 2026',
  type: 'Technical Workshop',
  title: 'Introduction to Web Pentest',
  speaker: 'Beraoud Abdelkhalek',
  time: '90 min',
  venue: 'NSCS',
  audience: 'NSCS students',
  department: 'Cybersecurity',
},
{
  date: '2026-02-12',
  dateLabel: '12 FEB 2026',
  type: 'Technical Workshop',
  title: 'Mobile App Security',
  speaker: 'Beraoud Abdelkhalek',
  time: '90 min',
  venue: 'NSCS',
  audience: 'NSCS students',
  department: 'Cybersecurity',
},
{
  date: '2026-02-13',
  dateLabel: '13 FEB 2026',
  type: 'Technical Workshop',
  title: 'Git',
  speaker: 'Laib Tarek',
  time: '90 min',
  venue: 'NSCS',
  audience: 'NSCS students',
  department: 'Development',
},
{
  date: '2026-02-13',
  dateLabel: '13 FEB 2026',
  type: 'Technical Workshop',
  title: 'Visual Vulnerabilities',
  speaker: 'Labdi Cerine',
  time: '40 min',
  venue: 'NSCS',
  audience: 'NSCS students',
  department: 'Cybersecurity',
},
{
  date: '2026-02-13',
  dateLabel: '13 FEB 2026',
  type: 'Technical Workshop',
  title: 'Dead internet theory',
  speaker: 'Gehlouz Tenhinan',
  time: '90 min',
  venue: 'NSCS',
  audience: 'NSCS students',
  department: 'Cybersecurity',
},
    {
    date: '2026-04-20',
    dateLabel: '20 APR 2026',
    type: 'Technical Workshop',
    title: 'Build Your First Django APP',
    speaker: 'Yakoubi Moncef',
    time: '8:00 – 10:00 PM',
    venue: 'NSCS',
    audience: 'NHSCS students',
    department: 'Development',
  },
];

// ── SORTED HELPERS ──
export function sortedEvents() {
  return [...events].sort((a, b) => {
    if (a.album === false && b.album !== false) return 1;
    if (a.album !== false && b.album === false) return -1;
    return new Date(b.date) - new Date(a.date);
  });
}

export function sortedWorkshops() {
  return [...workshops].sort((a, b) => new Date(a.date) - new Date(b.date));
}

// ── WORKSHOPS GROUPED BY DEPARTMENT ──
export function workshopsByDepartment() {
  return workshops.reduce((acc, w) => {
    const dept = w.department || 'Other';
    if (!acc[dept]) acc[dept] = [];
    acc[dept].push(w);
    return acc;
  }, {});
}
