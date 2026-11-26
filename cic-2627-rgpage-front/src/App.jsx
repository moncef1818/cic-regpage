import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BackgroundCanvas from './components/effects/BackgroundCanvas';
import ScrollProgress from './components/effects/ScrollProgress';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/ScrollToTop';
import { useLenis } from './hooks/useLenis';

import LandingPage     from './pages/LandingPage';
import PastEventsPage  from './pages/PastEventsPage';
import DepartmentsPage from './pages/DepartmentsPage';
import GalleryPage     from './pages/GalleryPage';
import RegistrationPage from './pages/RegistrationPage';

function Layout() {
  useLenis();

  return (
    <>
      <ScrollToTop />
      <ScrollProgress />
      <BackgroundCanvas />
      <Navbar />
      <main className="site-main">
        <Routes>
          <Route path="/"            element={<LandingPage />} />
          <Route path="/past-events" element={<PastEventsPage />} />
          <Route path="/departments" element={<DepartmentsPage />} />
          <Route path="/gallery"     element={<GalleryPage />} />
          <Route path="/register"    element={<RegistrationPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
