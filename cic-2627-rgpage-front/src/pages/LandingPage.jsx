import { useNavigate } from 'react-router-dom';
import Hero from '../components/landing/Hero';
import EventsTicker from '../components/landing/EventsTicker';
import StatsCounter from '../components/landing/StatsCounter';
import DepartmentsPreview from '../components/landing/DepartmentsPreview';
import EventsPreview from '../components/landing/EventsPreview';
import GalleryPreview from '../components/landing/GalleryPreview';
import RegistrationCTA from '../components/landing/RegistrationCTA';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <>
      <Hero
        onApply={() => navigate('/register')}
        onDepartments={() => navigate('/departments')}
      />
      <EventsTicker />
      <StatsCounter />
      <hr className="section-break section-break--inset" aria-hidden="true" />
      <DepartmentsPreview />
      <EventsPreview />
      <GalleryPreview />
      <RegistrationCTA />
    </>
  );
}
