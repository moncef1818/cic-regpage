import { cloudinaryUrl } from './cloudinaryUrls';

export const departments = [
  {
    num: '01',
    name: 'Ethical Hacking',
    value: 'Ethical Hacking',
    color: '#e05c6a',
    tagline: 'Offensive Security & Vulnerability Research',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    wallpaper: cloudinaryUrl('/departments/Ethical Hacking.JPG'),
    desc: 'Offensive Security, CTF, Pentesting. Penetration testing, exploit development, CTF competitions, and vulnerability research. Learn to think like an adversary — legally and responsibly — to expose weaknesses before real attackers do.',
    achievements: [
      'Ran "Introduction to Ethical Hacking" workshop (Dec 2025)',
      'Delivered "Intro to Binary Exploitation & Reverse Engineering"',
      'Hosted "Intro to Web Ethical Hacking Security" & "Wireless Hacking"',
      'Organized Apollo CTF competition',
    ],
  },
  {
    num: '02',
    name: 'Cybersecurity',
    value: 'Cybersecurity',
    color: '#4dc9e6',
    tagline: 'Blue Team Defense & Secure Systems',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    wallpaper: cloudinaryUrl('/departments/Cybersecurity.JPG'),
    desc: 'Security Fundamentals, Blue Team, GRC. Defense-first thinking, threat modeling, secure architecture, incident response, and governance. Build resilient systems that withstand adversarial pressure.',
    achievements: [
      'Delivered "Intro to Cryptography & Password Cracking" workshop',
      'Ran the cybersecurity track & defensive labs during CICONIX',
      'Established blue-team threat modeling frameworks',
    ],
  },
  {
    num: '03',
    name: 'Development',
    value: 'Development',
    color: '#3ecf88',
    tagline: 'Software Engineering & Platform Infrastructure',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    wallpaper: cloudinaryUrl('/departments/Development.JPG'),
    desc: 'Web, Mobile, Backend, Software Engineering. The engineering engine that ships code. Building web apps, internal tools, automation scripts, and open-source software that powers the entire club ecosystem.',
    achievements: [
      'Ran "Introduction to Frontend Fundamentals" sessions',
      'Delivered "Your First Step Into Python Backend Dev"',
      'Hosted "Introduction to Game Dev" & "Object-Oriented Programming (OOP)"',
      'Built and maintains the official CIC registration platform',
    ],
  },
  {
    num: '04',
    name: 'Artificial Intelligence',
    value: 'Artificial Intelligence',
    color: '#fbbf24',
    tagline: 'Machine Learning & Frontier Tech',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <line x1="9" y1="1" x2="9" y2="4" />
        <line x1="15" y1="1" x2="15" y2="4" />
        <line x1="9" y1="20" x2="9" y2="23" />
        <line x1="15" y1="20" x2="15" y2="23" />
        <line x1="20" y1="9" x2="23" y2="9" />
        <line x1="20" y1="15" x2="23" y2="15" />
        <line x1="1" y1="9" x2="4" y2="9" />
        <line x1="1" y1="15" x2="4" y2="15" />
      </svg>
    ),
    wallpaper: cloudinaryUrl('/departments/Artificial Intelligence.JPG'),
    desc: 'AI, ML, Data Science. Machine learning, deep learning, NLP, computer vision, and AI safety. Explore how intelligent models are trained, deployed, and defended at the intersection of AI and cybersecurity.',
    achievements: [
      'Delivered "All of AI" introductory session',
      'Ran "Machine Learning" post-CICONIX workshop track',
      'Co-organised the AI Cup Datathon',
    ],
  },
  {
    num: '05',
    name: 'Design & Media',
    value: 'Design & Media',
    color: '#b5a0f5',
    tagline: 'Visual Identity & Multi-Platform Media',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    ),
    wallpaper: cloudinaryUrl('/departments/Design & Media.JPG'),
    desc: 'UI/UX, Graphics, Video Production. Visual identity, interface design, motion graphics, and media production. Crafting aesthetics and clear communication to elevate everything CIC presents to the world.',
    achievements: [
      'Delivered "Introduction to Graphic Design" workshop',
      'Ran specialized UI/UX and graphic design masterclasses',
      'Produced all visual identity assets & trailers for CICONIX',
    ],
  },
  {
    num: '06',
    name: 'HR',
    value: 'HR',
    color: '#fb7185',
    tagline: 'Talent Acquisition & Community Development',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    wallpaper: cloudinaryUrl('/departments/HR.JPG'),
    desc: 'Recruitment, Member Management, Training. Onboarding talent, fostering club culture, tracking member growth, and conducting internal development programs to ensure a thriving community.',
    achievements: [
      'Managed onboarding & orientation for 100+ club members',
      'Hosted "Introduction to Public Speaking" and leadership tracks',
      'Organised internal skill-building & team bonding sessions',
    ],
  },
  {
    num: '07',
    name: 'Logistics',
    value: 'Logistics',
    color: '#f97316',
    tagline: 'Event Operations & Hardware Infrastructure',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
        <polyline points="21 16 12 21 3 16" />
        <polyline points="3 8 12 13 21 8" />
        <polygon points="12 3 21 8 12 13 3 8 12 3" />
      </svg>
    ),
    wallpaper: cloudinaryUrl('/departments/Logistics.JPG'),
    desc: 'Event Setup, Equipment, Operations. Technical setup, hardware management, venue orchestration, and operational execution. Ensuring seamless logistics for every workshop and mega-event.',
    achievements: [
      'Orchestrated technical setup for 22 campus workshops',
      'Managed hardware equipment & networking labs for CICONIX (~55h event)',
      'Handled venue operations across Lecture Halls & open study spaces',
    ],
  },
  {
    num: '08',
    name: 'External Relations (ER)',
    value: 'External Relations (ER)',
    color: '#7dd3fc',
    tagline: 'Corporate Alliances & Strategic Outreach',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    wallpaper: cloudinaryUrl('/departments/External Relations (ER).JPG'),
    desc: 'Partnerships, Sponsorships, Communication. Managing industry alliances, corporate sponsorships, media outreach, and university collaborations to expand CIC\'s footprint.',
    achievements: [
      'Secured corporate sponsorships & partnerships for major competitions',
      'Managed external communications for Open Day & Fusion events',
      'Coordinated charity initiatives including the Luminaria event',
    ],
  },
];
