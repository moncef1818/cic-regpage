import { EVENT_NAMES, getEventPhotos } from './eventMedia';

const SPANS = ['wide', 'normal', 'tall', 'wide', 'normal'];

const EVENT_TAGS = {
  'Fusion': 'SEP 2025',
  'CIC Open Day': 'DEC 2025',
  'Ciconix': 'FEB 2026',
  'Luminaria': 'MAR 2026',
  'Apollo CTF': 'JUL 2026',
  'AI Cup Datathon': '2026',
};

const EVENT_CATEGORIES = {
  'Fusion': 'Social',
  'CIC Open Day': 'Open Day',
  'Ciconix': 'Workshop',
  'Luminaria': 'Social',
  'Apollo CTF': 'CTF',
  'AI Cup Datathon': 'Competition',
};

export const GALLERY_ITEMS = EVENT_NAMES.flatMap((eventName, eventIndex) => {
  const photos = getEventPhotos(eventName);

  return photos.length > 0
    ? photos.map((src, photoIndex) => ({
        id: `${eventName}-${photoIndex + 1}`,
        title: eventName,
        event: eventName,
        category: EVENT_CATEGORIES[eventName] ?? 'Event',
        tag: EVENT_TAGS[eventName] ?? '2026',
        src,
        span: SPANS[(eventIndex + photoIndex) % SPANS.length],
        image: src,
      }))
    : [{
        id: `${eventName}-placeholder`,
        title: eventName,
        event: eventName,
        category: EVENT_CATEGORIES[eventName] ?? 'Event',
        tag: EVENT_TAGS[eventName] ?? '2026',
        src: null,
        span: 'normal',
        image: null,
      }];
});

export const galleryItems = GALLERY_ITEMS.map((item) => ({
  id: item.id,
  title: item.title,
  event: item.event,
  category: item.category,
  year: item.tag,
  image: item.src,
}));

export const ALL_EVENTS = ['All', ...EVENT_NAMES];
