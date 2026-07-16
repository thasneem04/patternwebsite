import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense, useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import './styles/globals.css';

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home'));
const Companies = lazy(() => import('./pages/Companies'));
const CompanyDetail = lazy(() => import('./pages/CompanyDetail'));
const MCQPractice = lazy(() => import('./pages/MCQPractice'));
const MCQSession = lazy(() => import('./pages/MCQSession'));
const CodingPractice = lazy(() => import('./pages/CodingPractice'));
const Resources = lazy(() => import('./pages/Resources'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

function LoadingScreen() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--gradient-hero)',
      flexDirection: 'column',
      gap: '20px'
    }}>
      <div style={{
        width: '60px', height: '60px',
        background: 'var(--gradient-primary)',
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '28px',
        animation: 'pulse 1.5s ease-in-out infinite'
      }}>
        🚀
      </div>
      <div className="spinner" style={{ borderTopColor: 'white' }} />
      <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>Loading PlacementPrep...</p>
      <style>{`@keyframes pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.1); } }`}</style>
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(t => t === 'dark' ? 'light' : 'dark');
  };

  return (
    <Router>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar theme={theme} onToggleTheme={toggleTheme} />
        <main style={{ flex: 1 }}>
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/companies" element={<Companies />} />
              <Route path="/companies/:slug" element={<CompanyDetail />} />
              <Route path="/mcq" element={<MCQPractice />} />
              <Route path="/mcq/:category" element={<MCQSession />} />
              <Route path="/mcq/:companySlug/:category" element={<MCQSession />} />
              <Route path="/coding" element={<CodingPractice />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <BackToTop />
      </div>
    </Router>
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      className="back-to-top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
    >
      ↑
    </button>
  );
}

export default App;
