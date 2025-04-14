import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import theme from '../../styles/theme';

// SVG Icon components for each focus area
const WebIcon = ({ color }) => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 9H21M9 21V9M5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MobileIcon = ({ color }) => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 18H12.01M8 21H16C17.1046 21 18 20.1046 18 19V5C18 3.89543 17.1046 3 16 3H8C6.89543 3 6 3.89543 6 5V19C6 20.1046 6.89543 21 8 21Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CloudIcon = ({ color }) => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.5 16C3.6 16 2 14.4 2 12.5C2 10.6 3.6 9 5.5 9C5.6 7.1 6.7 5.5 8.4 4.7C10.1 3.9 12.2 4.3 13.4 5.6C14.6 4.5 16.5 4.5 17.6 5.6C18.4 6.4 18.7 7.5 18.5 8.5C19.9 8.8 21 10.1 21 11.5C21 13.2 19.7 14.5 18 14.5H16M12 11V20M12 11L15 14M12 11L9 14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MLIcon = ({ color }) => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 6V4M12 6C10.8954 6 10 6.89543 10 8C10 9.10457 10.8954 10 12 10M12 6C13.1046 6 14 6.89543 14 8C14 9.10457 13.1046 10 12 10M6 18C4.89543 18 4 17.1046 4 16C4 14.8954 4.89543 14 6 14M6 18C7.10457 18 8 17.1046 8 16C8 14.8954 7.10457 14 6 14M6 18V20M6 14V4M12 10V20M18 18C16.8954 18 16 17.1046 16 16C16 14.8954 16.8954 14 18 14M18 18C19.1046 18 20 17.1046 20 16C20 14.8954 19.1046 14 18 14M18 18V20M18 14V4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IoTIcon = ({ color }) => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19.0711 4.92893C15.1658 1.02369 8.83418 1.02369 4.92893 4.92893C1.02369 8.83418 1.02369 15.1658 4.92893 19.0711C8.83418 22.9763 15.1658 22.9763 19.0711 19.0711C22.9763 15.1658 22.9763 8.83418 19.0711 4.92893Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 4V5.5M18 12H19.5M12 18.5V20M4.5 12H6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Detailed domain descriptions for popups
const domainDetails = {
  web: {
    title: 'Web Development',
    content: `Web development encompasses creating interactive, responsive applications accessible through browsers. At DevLabs, we focus on modern frontend frameworks like React, Angular, and Vue.js alongside backend technologies including Node.js, Express, and various databases.

Our curriculum covers:
• Modern JavaScript and TypeScript
• Component-based architecture
• State management patterns
• RESTful and GraphQL APIs
• Authentication and authorization
• Performance optimization
• Deployment workflows with CI/CD`,
    image: '/images/web-development.jpg'
  },
  mobile: {
    title: 'Mobile Development',
    content: `Mobile development is the art of creating applications for portable devices that provide utility and seamless experiences. Our mobile development track focuses on cross-platform solutions with React Native and native development with Swift and Kotlin.

Skills you'll master:
• UI/UX principles for mobile interfaces
• State management in mobile contexts
• Device API integration (camera, location, sensors)
• Push notifications and background processes
• Performance optimization for resource-constrained devices
• App Store submission and distribution`,
    image: '/images/mobile-development.jpg'
  },
  cloud: {
    title: 'Cloud & DevOps',
    content: `Cloud computing and DevOps practices have revolutionized how we build, deploy and scale applications. Our program focuses on AWS, Azure, and GCP along with containerization, infrastructure as code, and CI/CD pipelines.

You'll learn:
• Cloud architecture patterns and best practices
• Container orchestration with Kubernetes
• Infrastructure as Code using Terraform
• CI/CD pipeline creation
• Monitoring and observability
• Security best practices in cloud environments
• Cost optimization strategies`,
    image: '/images/cloud-devops.jpg'
  },
  ml: {
    title: 'Machine Learning',
    content: `Machine Learning enables systems to learn patterns and make decisions without explicit programming. Our ML focus area covers the theoretical foundations and practical implementations using TensorFlow, PyTorch, and scikit-learn.

Topics include:
• Supervised and unsupervised learning algorithms
• Neural networks and deep learning
• Natural language processing
• Computer vision
• Model training, evaluation and deployment
• MLOps and production ML systems
• Ethical AI and bias considerations`,
    image: '/images/machine-learning.jpg'
  },
  iot: {
    title: 'IoT & Electronics',
    content: `The Internet of Things (IoT) connects physical devices to the digital world, creating smart, responsive environments. Our IoT track combines hardware knowledge with software skills using platforms like Arduino and Raspberry Pi.

Your journey will include:
• Sensor integration and data collection
• Microcontroller programming
• Wireless communication protocols (Bluetooth, WiFi, LoRaWAN)
• Edge computing concepts
• Data processing and visualization
• IoT security considerations
• Building complete IoT systems from sensors to dashboards`,
    image: '/images/iot-electronics.jpg'
  }
};

const FocusAreas = () => {
  // Add hover state for each card
  const [hoveredIndex, setHoveredIndex] = useState(null);
  // State for flashcard popup
  const [selectedDomain, setSelectedDomain] = useState(null);
  // Reference to track mouse position for popup dismissal
  const popupRef = useRef(null);

  // Set up animations with useInView and useAnimation
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const controls = useAnimation();
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  // Focus area data updated with thibaut.cool style fields
  const focusAreas = [
    {
      id: 'web',
      title: 'Web Development',
      description: 'Building modern, responsive web applications with React, Angular, Vue, and Node.js. Learn the fundamentals of frontend and backend development.',
      icon: (color) => <WebIcon color={color} />,
      technologies: 'React • Angular • Vue • Node.js',
      year: '2024',
      color: theme.colors.primary,
    },
    {
      id: 'mobile',
      title: 'Mobile Development',
      description: 'Creating cross-platform mobile applications that deliver seamless experiences across all devices with industry-standard frameworks.',
      icon: (color) => <MobileIcon color={color} />,
      technologies: 'React Native • Flutter • Swift • Kotlin',
      year: '2024',
      color: theme.colors.primary,
    },
    {
      id: 'cloud',
      title: 'Cloud & DevOps',
      description: 'Architecting scalable cloud solutions with automated deployment pipelines and infrastructure as code across multiple platforms.',
      icon: (color) => <CloudIcon color={color} />,
      technologies: 'AWS • Azure • GCP • Docker • Terraform',
      year: '2024',
      color: theme.colors.primary,
    },
    {
      id: 'ml',
      title: 'Machine Learning',
      description: 'Implementing AI solutions to solve complex problems through data-driven approaches and cutting-edge deep learning techniques.',
      icon: (color) => <MLIcon color={color} />,
      technologies: 'TensorFlow • PyTorch • Scikit-learn',
      year: '2024',
      color: theme.colors.primary,
    },
    {
      id: 'iot',
      title: 'IoT & Electronics',
      description: 'Building connected devices and systems that bridge the physical and digital worlds through specialized hardware and software integration.',
      icon: (color) => <IoTIcon color={color} />,
      technologies: 'Arduino • Raspberry Pi • Sensor Networks',
      year: '2024',
      color: theme.colors.primary,
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  // Handle flashcard popup display on domain click
  const handleDomainClick = (domainId, event) => {
    // Prevent event bubbling
    event.stopPropagation();
    setSelectedDomain(domainId);
  };

  // Handle document-wide click to close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setSelectedDomain(null);
      }
    };

    // Handle mouse movement to close popup when mouse moves away
    const handleMouseMove = (event) => {
      if (popupRef.current) {
        const rect = popupRef.current.getBoundingClientRect();
        const isInPopup = 
          event.clientX >= rect.left &&
          event.clientX <= rect.right &&
          event.clientY >= rect.top &&
          event.clientY <= rect.bottom;
        
        if (!isInPopup && selectedDomain) {
          setSelectedDomain(null);
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [selectedDomain]);

  return (
    <section
      style={{
        padding: '6rem 0',
        backgroundColor: theme.colors.background,
      }}
    >
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '0 2rem',
      }}>
        <motion.h2
          ref={ref}
          initial={{ opacity: 0 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, transition: { duration: 0.6 } }
          }}
          style={{
            color: theme.colors.secondary,
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            marginBottom: '4rem',
            fontFamily: theme.fonts.secondary,
            fontWeight: '700',
            textAlign: 'center',
            position: 'relative',
            display: 'inline-block',
            margin: '0 auto',
          }}
        >
          <span style={{
            position: 'relative',
            zIndex: 1,
          }}>
            Focus Areas
          </span>
          <motion.span 
            initial={{width: 0}}
            animate={{width: '100%'}}
            transition={{delay: 0.2, duration: 0.8}}
            style={{
              position: 'absolute',
              height: '8px',
              background: theme.colors.primary,
              bottom: '10px',
              left: 0,
              zIndex: 0,
            }}
          />
        </motion.h2>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: '2.5rem',
            position: 'relative',
            maxWidth: '1200px',
            margin: '3rem auto',
            justifyContent: 'center',
          }}
        >
          {focusAreas.map((area, index) => (
            <motion.div
              key={area.id}
              variants={itemVariants}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              onClick={(event) => handleDomainClick(area.id, event)}
              style={{
                backgroundColor: theme.colors.cardBg,
                borderRadius: '15px',
                overflow: 'hidden',
                position: 'relative',
                width: 'calc(33.33% - 1.67rem)',
                minWidth: '300px',
                height: '300px',
                cursor: 'pointer',
                boxShadow: `0 5px 15px rgba(0,0,0,0.1)`,
                transition: 'all 0.3s ease',
                transform: hoveredIndex === index ? 'translateY(-10px)' : 'none',
              }}
            >
              {/* Overlay gradient effect */}
              <motion.div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `linear-gradient(to bottom right, ${area.color}15, ${area.color}05)`,
                  opacity: hoveredIndex === index ? 1 : 0.7,
                  zIndex: 1,
                  transition: 'opacity 0.3s ease',
                }}
              />

              <motion.div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  zIndex: 2,
                }}
              >
                {/* Icon at the top */}
                <motion.div
                  style={{
                    color: theme.colors.primary,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: `${theme.colors.primary}15`,
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    marginBottom: '1rem',
                  }}
                >
                  {area.icon(theme.colors.primary)}
                </motion.div>

                {/* Content in the middle */}
                <div>
                  <motion.h3
                    style={{
                      fontSize: '1.6rem',
                      color: theme.colors.secondary,
                      margin: '0 0 0.75rem 0',
                      fontFamily: theme.fonts.secondary,
                      fontWeight: '600',
                    }}
                  >
                    {area.title}
                  </motion.h3>
                  <motion.p
                    style={{
                      color: theme.colors.text,
                      lineHeight: 1.6,
                      marginBottom: '1.5rem',
                      fontSize: '0.95rem',
                    }}
                  >
                    {area.description}
                  </motion.p>
                </div>

                {/* Bottom details */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <motion.div
                    style={{
                      fontSize: '0.85rem',
                      color: theme.colors.primary,
                      display: 'flex',
                      alignItems: 'center',
                      fontWeight: '500',
                    }}
                  >
                    {area.technologies}
                  </motion.div>
                  <motion.div
                    style={{
                      fontSize: '0.85rem',
                      color: `${theme.colors.secondary}80`,
                    }}
                  >
                    {area.year}
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Flashcard-style Popup */}
        <AnimatePresence>
          {selectedDomain && (
            <motion.div
              ref={popupRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 100,
                backgroundColor: theme.colors.cardBg,
                borderRadius: '20px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                width: '90%',
                maxWidth: '800px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                maxHeight: '90vh',
              }}
            >
              {/* Close button */}
              <motion.div
                onClick={() => setSelectedDomain(null)}
                whileHover={{ scale: 1.1 }}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: `${theme.colors.background}80`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 2,
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke={theme.colors.secondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>
              
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  maxHeight: '90vh',
                  overflow: 'auto',
                }}
              >
                {/* Domain content */}
                <div
                  style={{
                    padding: '2.5rem',
                  }}
                >
                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    style={{
                      fontSize: '2.2rem',
                      marginBottom: '2rem',
                      color: theme.colors.secondary,
                      fontFamily: theme.fonts.secondary,
                      fontWeight: '700',
                    }}
                  >
                    {domainDetails[selectedDomain].title}
                  </motion.h2>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1.5rem',
                    }}
                  >
                    <div
                      style={{
                        whiteSpace: 'pre-line',
                        lineHeight: 1.8,
                        color: theme.colors.text,
                        fontSize: '1rem',
                      }}
                    >
                      {domainDetails[selectedDomain].content}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Background overlay when popup is open */}
        <AnimatePresence>
          {selectedDomain && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(5px)',
                zIndex: 99,
              }}
              onClick={() => setSelectedDomain(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default FocusAreas;
