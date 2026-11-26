import { useState } from 'react';
import { cloudinaryUrl } from '../../assets/data/cloudinaryUrls';

export default function LuminousCardHero() {
  const [active, setActive] = useState(false);

  return (
    <div className={active ? 'luminous-card active' : 'luminous-card'}>
      
      <div className="content">
        <div className="icon">
          <img
            src={cloudinaryUrl('/CIC1.png')}
            alt="Cyber Innovators Club"
            className="cic-logo"
          />
        </div>

      
      <div className="light-layer">
        <div className="slit" />
        <div className="lumen">
          <div className="min" />
          <div className="mid" />
          <div className="hi" />
        </div>
        <div className="darken">
          <div className="sl" />
          <div className="ll" />
          <div className="slt" />
          <div className="srt" />
        </div>
      </div>

        <div className="bottom">
          <h4>Cyber Innovators Club</h4>
          <p>
            Building the next generation <br />
            of cybersecurity innovators.
          </p>

          <div
            className={active ? 'toggle active' : 'toggle'}
            onClick={() => setActive((value) => !value)}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                setActive((value) => !value);
              }
            }}
          >
            <div className="handle" />
            <span>Explore CIC</span>
          </div>
        </div>
      </div>
    </div>
  );
}
