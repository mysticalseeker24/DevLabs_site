import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import EventsPage from './pages/EventsPage';
import AboutPage from './pages/AboutPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import './styles/global.css';

function App() {
  const [loading, setLoading] = useState(true);
  
  // Add a small extra delay to ensure loading screen is visible
  useEffect(() => {
    // Preload any assets here if needed
    // This is just to ensure the loading screen is visible for a reasonable time
    const minLoadTime = setTimeout(() => {
      // Loading screen will dismiss itself after animation completes
    }, 500);
    
    return () => clearTimeout(minLoadTime);
  }, []);
  
  const handleLoadingComplete = () => {
    setLoading(false);
  };
  
  return (
    <Router>
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen key="loading-screen" onComplete={handleLoadingComplete} />
        ) : (
          <>
            <Navbar />
            <div style={{ paddingTop: '70px', minHeight: 'calc(100vh - 70px)' }}>
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<LandingPage key="landing" />} />
                  <Route path="/events" element={<EventsPage key="events" />} />
                  <Route path="/about" element={<AboutPage key="about" />} />
                </Routes>
              </AnimatePresence>
            </div>
            <Footer />
          </>
        )}
      </AnimatePresence>
    </Router>
  );
}

export default App;
