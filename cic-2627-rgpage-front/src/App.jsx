import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import BackgroundCanvas from './components/effects/BackgroundCanvas';
import ScrollProgress from './components/effects/ScrollProgress';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/ScrollToTop';
import { useLenis } from './hooks/useLenis';

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
          <Route path="/"         element={<RegistrationPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="*"         element={<Navigate to="/" replace />} />
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
