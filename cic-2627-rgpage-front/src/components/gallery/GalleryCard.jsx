import { motion } from 'framer-motion';
import styles from '../../pages/GalleryPage.module.css';

/* Placeholder icon glyphs cycling per card */
const GLYPHS = ['⬡', '◈', '⊞', '✦', '⬢', '◉', '⬟', '◇'];

export function PlaceholderTile({ id, event }) {
  const glyph = GLYPHS[(id - 1) % GLYPHS.length];
  return (
    <div className={styles.placeholder}>
      <span className={styles.placeholderGlyph}>{glyph}</span>
      <span className={styles.placeholderEvent}>{event}</span>
      <span className={styles.placeholderLabel}>Photo coming soon</span>
    </div>
  );
}

export default function GalleryCard({ item, onOpen }) {
  return (
    <motion.div
      layout
      className={`${styles.item} ${styles[item.span]}`}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{
        layout: { type: 'spring', stiffness: 350, damping: 30 },
        opacity: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
        scale: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
      }}
      onClick={() => onOpen(item)}
    >
      <div className={styles.itemInner}>
        {item.src ? (
          <img src={item.src} alt={item.event} className={styles.photo} loading="lazy" />
        ) : (
          <PlaceholderTile id={item.id} event={item.event} />
        )}
        <div className={styles.overlay}>
          <span className={styles.overlayTag}>{item.tag}</span>
          <span className={styles.overlayEvent}>{item.event}</span>
          <span className={styles.overlayZoom}>↗</span>
        </div>
      </div>
    </motion.div>
  );
}
