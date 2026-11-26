import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Reveal from '../effects/Reveal';
import { galleryItems } from '../../assets/data/gallery';
import { fadeUp, staggerContainer } from '../../utils/animation';

function PreviewTile({ item, variant }) {
  const className = `gallery-preview-tile gallery-preview-tile--${variant}`;

  return (
    <motion.div className={className} variants={fadeUp}>
      {item.image ? (
        <img src={item.image} alt={item.title} loading="lazy" />
      ) : (
        <div className="gallery-preview-placeholder">
          <span className="gallery-preview-placeholder-cat">{item.category}</span>
        </div>
      )}
      <div className="gallery-preview-caption">
        <span>{item.title}</span>
      </div>
    </motion.div>
  );
}

export default function GalleryPreview() {
  const preview = galleryItems.slice(0, 4);
  const variants = ['hero', 'sm', 'sm', 'sm'];

  return (
    <section className="section-shell section-shell--offset-left" id="gallery-preview">
      <Reveal className="section-head section-head--minimal">
        <p className="section-eyebrow">Gallery</p>
        <h2 className="section-title">Moments from CIC</h2>
      </Reveal>

      <motion.div
        className="gallery-preview-collage"
        variants={staggerContainer(0.06)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-40px' }}
      >
        {preview.map((item, i) => (
          <PreviewTile key={item.id} item={item} variant={variants[i]} />
        ))}
      </motion.div>

      <Reveal>
        <Link to="/gallery" className="dept-preview-link">
          See the full gallery
          <span className="dept-preview-link-arrow" aria-hidden="true">→</span>
        </Link>
      </Reveal>
    </section>
  );
}
