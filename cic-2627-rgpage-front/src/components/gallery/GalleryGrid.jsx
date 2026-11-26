import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal from '../effects/Reveal';
import GalleryCard, { PlaceholderTile } from './GalleryCard';
import { GALLERY_ITEMS, ALL_EVENTS } from '../../assets/data/gallery';
import styles from '../../pages/GalleryPage.module.css';

function Lightbox({ item, onClose }) {
  if (!item) return null;
  return (
    <AnimatePresence>
      <motion.div
        className={styles.lightboxBackdrop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className={styles.lightboxBox}
          initial={{ opacity: 0, scale: 0.9, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 24 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {item.src ? (
            <img src={item.src} alt={item.event} className={styles.lightboxImg} />
          ) : (
            <div className={styles.lightboxPlaceholder}>
              <PlaceholderTile id={item.id} event={item.event} />
            </div>
          )}
          <div className={styles.lightboxMeta}>
            <div>
              <p className={styles.lightboxTag}>{item.tag}</p>
              <p className={styles.lightboxEvent}>{item.event}</p>
            </div>
            <button className={styles.lightboxClose} onClick={onClose} aria-label="Close">✕</button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function GalleryGrid() {
  const [filter, setFilter] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  const filtered = filter === 'All' ? GALLERY_ITEMS : GALLERY_ITEMS.filter(i => i.event === filter);

  return (
    <section className={styles.page}>
      <Reveal>
        <p className="section-eyebrow">Gallery</p>
        <h2 className="section-title" style={{ marginBottom: 12 }}>Moments from CIC</h2>
        <p className={styles.subtitle}>
          A visual archive of every event, workshop, and CTF competition.
        </p>
      </Reveal>

      {/* Filter tabs */}
      <div className={styles.filters}>
        {ALL_EVENTS.map((ev) => (
          <button
            key={ev}
            className={`${styles.filterBtn} ${filter === ev ? styles.filterActive : ''}`}
            onClick={() => setFilter(ev)}
          >
            {ev}
          </button>
        ))}
      </div>

      {/* Masonry-style grid with smooth layout animations */}
      <motion.div className={styles.grid} layout>
        <AnimatePresence mode="popLayout">
          {filtered.map((item) => (
            <GalleryCard key={item.id} item={item} onOpen={setLightbox} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Count */}
      <div className={styles.count}>
        <span className={styles.countNum}>{filtered.length}</span>
        <span className={styles.countLabel}>
          {filter === 'All' ? 'total photos' : `photos from ${filter}`}
        </span>
      </div>

      {/* Lightbox */}
      {lightbox && <Lightbox item={lightbox} onClose={() => setLightbox(null)} />}
    </section>
  );
}
