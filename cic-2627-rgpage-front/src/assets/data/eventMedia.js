import { cloudinaryUrl } from './cloudinaryUrls';

/**
 * Event photo mappings — hardcoded paths resolved through Cloudinary.
 * Replaces the old import.meta.glob approach that required files on disk.
 */

const EVENT_PHOTOS = {
  'Ciconix': [
    '/events/ciconix/Ciconix.jpg',
    '/events/ciconix/DSC01392.JPG',
    '/events/ciconix/DSC01438.JPG',
    '/events/ciconix/DSC01469.JPG',
    '/events/ciconix/DSC01482.JPG',
    '/events/ciconix/DSC01486.JPG',
    '/events/ciconix/DSC01507.JPG',
    '/events/ciconix/DSC01520.JPG',
    '/events/ciconix/DSC01710.JPG',
    '/events/ciconix/DSC01718.JPG',
    '/events/ciconix/DSC01939.JPG',
    '/events/ciconix/DSC01945.JPG',
    '/events/ciconix/DSC01952.JPG',
    '/events/ciconix/DSC01953 (1).JPG',
    '/events/ciconix/DSC01956.JPG',
    '/events/ciconix/DSC01964.JPG',
    '/events/ciconix/DSC01993 (1).JPG',
    '/events/ciconix/DSC02331.JPG',
    '/events/ciconix/DSC02345.JPG',
    '/events/ciconix/DSC02353 (1).JPG',
    '/events/ciconix/DSC02353.JPG',
  ],
  'CIC Open Day': [
    '/events/open-day/IMG_0553.JPG',
    '/events/open-day/IMG_0610.JPG',
    '/events/open-day/IMG_0802.JPG',
    '/events/open-day/IMG_0811.JPG',
    '/events/open-day/IMG_0816.JPG',
    '/events/open-day/IMG_0828.JPG',
    '/events/open-day/IMG_0840.JPG',
    '/events/open-day/IMG_0954 (1).JPG',
    '/events/open-day/IMG_0971 (1).JPG',
    '/events/open-day/IMG_0996.JPG',
    '/events/open-day/OpenDay.jpg',
  ],
  'Luminaria': [
    '/events/luminaria/DSC03097.JPG',
    '/events/luminaria/DSC03234.JPG',
    '/events/luminaria/DSC03250.JPG',
    '/events/luminaria/DSC03277.JPG',
    '/events/luminaria/DSC03329.JPG',
  ],
  'SecBootCamp': [
    '/events/SecBootCamp/IMG_3273.jpg',
    '/events/SecBootCamp/IMG_3563.jpg',
    '/events/SecBootCamp/IMG_3572.jpg',
    '/events/SecBootCamp/IMG_3604.jpg',
    '/events/SecBootCamp/IMG_3614.jpg',
    '/events/SecBootCamp/IMG_3621.jpg',
  ],
  'Apollo CTF': [
    '/events/apollo-ctf/apollologo-022.png',
  ],
  'AI Cup Datathon': [
    '/events/ai-cup/78b50f74e614b4f845e1e9e56e6d5ce7.png',
  ],
};

export const EVENT_NAMES = [
  'Ciconix',
  'CIC Open Day',
  'Luminaria',
  'SecBootCamp',
  'Apollo CTF',
  'AI Cup Datathon',
];

/**
 * Get gallery photos for an event, resolved to Cloudinary URLs.
 * @param {string} eventName — must match a key in EVENT_PHOTOS
 * @returns {string[]} Array of Cloudinary image URLs
 */
export function getEventPhotos(eventName) {
  const paths = EVENT_PHOTOS[eventName] ?? [];
  return paths.map(cloudinaryUrl);
}
