export const SCHOOLS = [
  { label: 'NHSCS — National School Of Cybersecurity', value: 'National School Of Cybersecurity' },
  { label: 'ENSIA — National School Of Artificial Intelligence', value: 'National School Of Artificial Intelligence' },
  { label: 'NHSM — National School Of Mathematics', value: 'National School Of Mathematics' },
  { label: 'NHSAT — National School Of Autonomous Systems Technology', value: 'National School Of Autonomous Systems Technology' },
  { label: 'NHNN — National School Of Nanoscience And Nanoechnology', value: 'National School Of Nanoscience And Nanoechnology' },
  { label: 'ESI — National School Of Computer Science', value: 'National School Of Computer Science' },
  { label: 'Other', value: 'Other' },
];

export const YEARS = [
  { label: '1st Year', value: '1' },
  { label: '2nd Year', value: '2' },
  { label: '3rd Year', value: '3' },
  { label: '4th Year', value: '4' },
  { label: '5th Year', value: '5' },
];

export const DEPT_VALUES = [
  'Ethical Hacking',
  'Cybersecurity',
  'Development',
  'Electronics and Robotics',
  'Artificial Intelligence',
  'Design',
  'Media',
  'HR',
  'Logistics',
  'External Relations (ER)',
];

export const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api/candidates/create/';
