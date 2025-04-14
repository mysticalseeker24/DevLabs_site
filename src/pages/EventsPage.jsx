import React, { useState, useEffect, useRef, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Environment, OrbitControls } from '@react-three/drei';
// Navbar is already included in App.jsx
import TechGlobe from '../components/3d/TechGlobe';
import ExplodingTechComponents from '../components/3d/ExplodingTechComponents';
import theme from '../styles/theme';

// Native Nexus event photos
const nativeNexusPhotos = [
  '/Native Nexus Photos/DSC_0194_1.jpg',
  '/Native Nexus Photos/DSC_0195.JPG',
  '/Native Nexus Photos/DSC_0212_1.jpg',
  '/Native Nexus Photos/DSC_0420.JPG',
  '/Native Nexus Photos/DSC_0429.JPG',
  '/Native Nexus Photos/DSC_0438.JPG',
  '/Native Nexus Photos/DSC_0440.JPG',
  '/Native Nexus Photos/DSC_0449.JPG',
  '/Native Nexus Photos/DSC_0451.JPG',
  '/Native Nexus Photos/DSC_0458.JPG',
  '/Native Nexus Photos/DSC_0468 (2).JPG',
  '/Native Nexus Photos/DSC_0469 (2).JPG',
  '/Native Nexus Photos/DSC_0478.JPG',
  '/Native Nexus Photos/DSC_0484.JPG',
];

// Native Nexus key features
const keyFeatures = [
  {
    title: '6 Days Immersive Experience',
    description: '100 curated developers participated in this intensive workshop that focused on hands-on coding with zero fluff.',
    icon: '⏱️'
  },
  {
    title: 'React Native & Expo',
    description: 'Built a cross-platform mobile application with beautiful UI, custom cards, animations, and responsive layouts.',
    icon: '📱'
  },
  {
    title: 'Backend Integration',
    description: 'Implemented NodeJS and MongoDB backend-as-a-service for instant scalability and real-time group expense splitting.',
    icon: '⚙️'
  },
  {
    title: 'AI Superpowers',
    description: 'Integrated Google Gemini for NLP-powered text-to-expense parsing and smart chatbots for debt resolution.',
    icon: '🤖'
  },
  {
    title: 'Production-Ready App',
    description: 'Created a complete Splitwise clone with AI capabilities in just 12+ hours of focused development.',
    icon: '🚀'
  }
];

const EventsPage = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const galleryRef = useRef(null);
  // Auto-rotate gallery photos
  useEffect(() => {
    const interval = setInterval(() => {
      if (!selectedPhoto) {
        setCurrentPhotoIndex((prev) => (prev + 1) % nativeNexusPhotos.length);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [selectedPhoto]);

  // Show gallery when user scrolls to it
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Just to trigger animation when scrolled into view
          // No need to store visibility state anymore
        }
      },
      { threshold: 0.2 }
    );
    
    const currentRef = galleryRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { 
        duration: 0.6,
        staggerChildren: 0.1 
      } 
    },
    exit: { opacity: 0 }
  };
  
  const itemVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 } 
    },
    exit: { y: -20, opacity: 0 }
  };

  // Reference for mouse position to control 3D elements
  const mousePosition = useRef({ x: 0, y: 0 });
  
  // Track mouse movement for interactive 3D elements
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize mouse position between -1 and 1
      mousePosition.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      };
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Handle photo click to view larger
  const handlePhotoClick = (index) => {
    setSelectedPhoto(index);
  };

  // Close photo viewer
  const closePhotoViewer = () => {
    setSelectedPhoto(null);
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{
        background: theme.colors.background,
        minHeight: '100vh',
        color: theme.colors.text
      }}
    >

      {/* Hero Section */}
      <motion.section
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '6rem 2rem 4rem',
          position: 'relative',
        }}
      >
        <motion.div
          variants={itemVariants}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            maxWidth: '900px',
            margin: '0 auto 4rem',
          }}
        >
          <motion.h1
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              marginBottom: '1.5rem',
              fontFamily: theme.fonts.heading,
              position: 'relative',
              display: 'inline-block',
            }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              style={{
                background: `linear-gradient(120deg, ${theme.colors.primary} 0%, ${theme.colors.accent} 100%)`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                padding: '0 1rem',
              }}
            >
              Native Nexus
            </motion.span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            style={{
              fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
              maxWidth: '800px',
              lineHeight: 1.6,
              marginBottom: '2rem',
              color: theme.colors.secondary,
              opacity: 0.9,
            }}
          >
            An immersive 6-day React Native workshop where 100 developers built a complete AI-powered expense management application from scratch.
          </motion.p>

          <motion.div
            variants={itemVariants}
            style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
              margin: '1rem 0 3rem',
            }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                backgroundColor: theme.colors.primary,
                color: theme.colors.dark,
                padding: '0.75rem 1.5rem',
                borderRadius: '0',
                fontWeight: 600,
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <span>View Gallery</span>
              <span>→</span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Main Event Photo */}
        <motion.div
          variants={itemVariants}
          style={{
            width: '100%',
            height: '70vh',
            maxHeight: '800px',
            position: 'relative',
            overflow: 'hidden',
            marginBottom: '4rem',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={currentPhotoIndex}
              src={nativeNexusPhotos[currentPhotoIndex]}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8 }}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                cursor: 'pointer',
              }}
              onClick={() => handlePhotoClick(currentPhotoIndex)}
            />
          </AnimatePresence>

          <motion.div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '8rem 2rem 2rem',
              background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}
          >
            <div>
              <motion.h3
                style={{
                  color: theme.colors.primary,
                  fontSize: '1.5rem',
                  marginBottom: '0.5rem',
                }}
              >
                6-Day Intensive Workshop
              </motion.h3>
              <motion.p
                style={{
                  color: 'white',
                  fontWeight: 300,
                  maxWidth: '600px',
                }}
              >
                March 2025 • MMMUT, Gorakhpur, Uttar Pradesh, India
              </motion.p>
            </div>

            <motion.div
              style={{
                display: 'flex',
                gap: '0.5rem',
              }}
            >
              {[0, 1, 2, 3, 4].map((index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => setCurrentPhotoIndex(index)}
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor:
                      currentPhotoIndex === index
                        ? theme.colors.primary
                        : 'rgba(255,255,255,0.5)',
                    cursor: 'pointer',
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Key Features */}
        <motion.div
          variants={itemVariants}
          style={{
            marginBottom: '6rem',
          }}
        >
          <motion.h2
            variants={itemVariants}
            style={{
              fontSize: '2.5rem',
              textAlign: 'center',
              marginBottom: '3rem',
              color: theme.colors.secondary,
            }}
          >
            What Made Native Nexus Special
          </motion.h2>

          <motion.div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
            }}
          >
            {keyFeatures.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  y: -10,
                  transition: { type: 'spring', stiffness: 300 },
                }}
                style={{
                  backgroundColor: theme.colors.cardBg,
                  padding: '2rem',
                  borderRadius: '0',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  border: `1px solid ${theme.colors.border}`,
                }}
              >
                <div
                  style={{
                    fontSize: '2.5rem',
                    marginBottom: '1rem',
                  }}
                >
                  {feature.icon}
                </div>
                <h3
                  style={{
                    fontSize: '1.5rem',
                    marginBottom: '1rem',
                    color: theme.colors.primary,
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  style={{
                    lineHeight: 1.6,
                    color: theme.colors.secondary,
                    opacity: 0.8,
                    flex: 1,
                  }}
                >
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* 3D Technology Visualization */}
        <div style={{ 
          height: '50vh', 
          width: '100%', 
          position: 'relative',
          marginTop: '2rem',
          marginBottom: '2rem',
          borderRadius: '8px',
          overflow: 'hidden',
          background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(26,190,115,0.1) 100%)'
        }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ 
              textAlign: 'center', 
              padding: '1rem', 
              color: theme.colors.primary,
              position: 'absolute',
              top: '1rem',
              left: 0,
              right: 0,
              zIndex: 1,
              pointerEvents: 'none'
            }}
          >
            Technology Stack Visualization
          </motion.h2>
          
          <Canvas
            shadows
            dpr={[1, 2]}
            camera={{ position: [0, 0, 10], fov: 50 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
          >
            <color attach="background" args={[theme.colors.background]} />
            <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
            
            {/* Lights */}
            <ambientLight intensity={0.2} />
            <directionalLight position={[5, 5, 5]} intensity={0.5} />
            <pointLight position={[-5, 0, -5]} intensity={0.4} color={theme.colors.primary} distance={20} />
            <pointLight position={[3, -3, 2]} intensity={0.3} color={theme.colors.accent} distance={15} />
            
            {/* Environment */}
            <Environment preset="city" />
            
            <Suspense fallback={null}>
              {/* 3D Tech Globe */}
              <TechGlobe position={[-4, 0, 0]} mousePosition={mousePosition} />
              
              {/* Exploding Tech Components */}
              <ExplodingTechComponents position={[4, 0, 0]} />
            </Suspense>
            
            <OrbitControls 
              enableZoom={false}
              enablePan={false}
              enableRotate={true}
              rotateSpeed={0.2}
              autoRotate={true}
              autoRotateSpeed={0.3}
            />
          </Canvas>
        </div>

        {/* Photo Gallery */}
        <motion.div
          ref={galleryRef}
          variants={itemVariants}
          style={{
            marginBottom: '6rem',
          }}
        >
          <motion.h2
            variants={itemVariants}
            style={{
              fontSize: '2.5rem',
              textAlign: 'center',
              marginBottom: '3rem',
              color: theme.colors.secondary,
            }}
          >
            Gallery
          </motion.h2>

          {/* Carousel Gallery */}
          <motion.div
            variants={itemVariants}
            style={{
              position: 'relative',
              maxWidth: '1000px',
              margin: '0 auto',
              overflow: 'hidden',
              borderRadius: '0',
              height: '600px',
              backgroundColor: theme.colors.cardBg,
            }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentPhotoIndex}
                src={nativeNexusPhotos[currentPhotoIndex]}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  objectPosition: 'center',
                  cursor: 'pointer',
                }}
                onClick={() => handlePhotoClick(currentPhotoIndex)}
              />
            </AnimatePresence>

            <motion.div
              style={{
                position: 'absolute',
                bottom: '20px',
                left: '0',
                right: '0',
                display: 'flex',
                justifyContent: 'center',
                gap: '12px',
                zIndex: 10,
              }}
            >
              {nativeNexusPhotos.slice(0, 8).map((_, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCurrentPhotoIndex(index)}
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: currentPhotoIndex === index
                      ? theme.colors.primary
                      : 'rgba(255, 255, 255, 0.5)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                />
              ))}
            </motion.div>
            
            {/* Navigation Buttons - Responsive */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '20px',
                transform: 'translateY(-50%)',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '@media (max-width: 768px)': {
                  display: 'none',
                },
              }}
              onClick={() => setCurrentPhotoIndex((prev) => (prev > 0 ? prev - 1 : nativeNexusPhotos.length - 1))}
            >
              <span style={{ color: 'white', fontSize: '1.5rem' }}>←</span>
            </div>
            
            <div
              style={{
                position: 'absolute',
                top: '50%',
                right: '20px',
                transform: 'translateY(-50%)',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '@media (max-width: 768px)': {
                  display: 'none',
                },
              }}
              onClick={() => setCurrentPhotoIndex((prev) => (prev < nativeNexusPhotos.length - 1 ? prev + 1 : 0))}
            >
              <span style={{ color: 'white', fontSize: '1.5rem' }}>→</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Join Next Events */}
        <motion.div
          variants={itemVariants}
          style={{
            textAlign: 'center',
            marginBottom: '6rem',
            padding: '4rem 2rem',
            backgroundColor: theme.colors.cardBg,
            borderRadius: '0',
          }}
        >
          <motion.h2
            variants={itemVariants}
            style={{
              fontSize: '2.5rem',
              marginBottom: '1.5rem',
              color: theme.colors.secondary,
            }}
          >
            Don't Miss Our Next Events
          </motion.h2>
          <motion.p
            variants={itemVariants}
            style={{
              fontSize: '1.2rem',
              maxWidth: '700px',
              margin: '0 auto 2rem',
              lineHeight: 1.6,
              color: theme.colors.secondary,
              opacity: 0.8,
            }}
          >
            Join our WhatsApp community to stay updated on upcoming workshops, hackathons, and tech events.
          </motion.p>

          <motion.a
            href="https://chat.whatsapp.com/FQz7lIkcfFPEqQxwrZTKiA"
            target="_blank"
            rel="noopener noreferrer"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              backgroundColor: theme.colors.primary,
              color: theme.colors.dark,
              padding: '1rem 2rem',
              borderRadius: '0',
              fontWeight: 600,
              fontSize: '1.1rem',
              textDecoration: 'none',
            }}
          >
            <span>Join Our Community</span>
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </motion.a>
        </motion.div>
      </motion.section>

      {/* Fullscreen Photo Viewer */}
      <AnimatePresence>
        {selectedPhoto !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              zIndex: 1000,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '2rem',
            }}
            onClick={closePhotoViewer}
          >
            <motion.img
              src={nativeNexusPhotos[selectedPhoto]}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', damping: 25 }}
              style={{
                maxWidth: '90%',
                maxHeight: '80%',
                objectFit: 'contain',
                zIndex: 1001,
              }}
              onClick={(e) => e.stopPropagation()}
            />

            <motion.div
              style={{
                display: 'flex',
                gap: '2rem',
                marginTop: '2rem',
              }}
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPhoto((prev) => (prev > 0 ? prev - 1 : nativeNexusPhotos.length - 1));
                }}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: 'white',
                  fontSize: '2rem',
                  cursor: 'pointer',
                }}
              >
                ←
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPhoto((prev) => (prev < nativeNexusPhotos.length - 1 ? prev + 1 : 0));
                }}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: 'white',
                  fontSize: '2rem',
                  cursor: 'pointer',
                }}
              >
                →
              </motion.button>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={closePhotoViewer}
              style={{
                position: 'absolute',
                top: '2rem',
                right: '2rem',
                backgroundColor: 'transparent',
                border: 'none',
                color: 'white',
                fontSize: '2rem',
                cursor: 'pointer',
              }}
            >
              ✕
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default EventsPage;
