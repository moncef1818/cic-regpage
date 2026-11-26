/**
 * helpers.js — General utility functions
 */

/**
 * cn — combine class names (like clsx, without the dependency)
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * formatDate — format a date string to a readable label
 * e.g. '2026-02' → 'FEB 2026'
 */
export function formatDate(dateStr) {
  if (!dateStr) return '';
  const [year, month] = dateStr.split('-');
  const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
  const idx = parseInt(month, 10) - 1;
  return `${months[idx] || ''} ${year}`;
}

/**
 * truncate — truncate a string to a max length with ellipsis
 */
export function truncate(str, maxLen = 120) {
  if (!str || str.length <= maxLen) return str;
  return str.slice(0, maxLen).trimEnd() + '…';
}

/**
 * range — generate an array of numbers from start to end
 */
export function range(start, end) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

/**
 * clamp — clamp a number between min and max
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/**
 * lerp — linear interpolation
 */
export function lerp(a, b, t) {
  return a + (b - a) * t;
}

/**
 * wait — returns a promise that resolves after ms milliseconds
 */
export function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
