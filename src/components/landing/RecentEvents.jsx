import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import theme from '../../styles/theme';

const RecentEvents = () => {
  // Sample event data
  const events = [
    {
      id: 1,
      title: 'Web Development Bootcamp',
      date: 'May 15, 2025',
      time: '10:00 AM - 4:00 PM',
      location: 'Tech Hub, Main Campus',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
      tags: ['Workshop', 'Beginner-Friendly'],
    },
    {
      id: 2,
      title: 'AI/ML Research Showcase',
      date: 'May 22, 2025',
      time: '2:00 PM - 6:00 PM',
      location: 'Innovation Center',
      image: 'https://images.unsplash.com/photo-1591696205602-2f950c417cb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
      tags: ['Research', 'Advanced'],
    },
    {
      id: 3,
      title: 'DevOps & Cloud Computing Workshop',
      date: 'June 5, 2025',
      time: '9:00 AM - 5:00 PM',
      location: 'Virtual (Zoom)',
      image: 'https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
      tags: ['Workshop', 'Intermediate'],
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

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <section
      style={{
        padding: '5rem 0',
        backgroundColor: theme.colors.cardBg,
      }}
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '3rem',
          }}
        >
          <div>
            <h2
              style={{
                fontSize: '2.5rem',
                color: theme.colors.text,
                marginBottom: '1rem',
                fontFamily: theme.fonts.secondary,
              }}
            >
              Upcoming Events
            </h2>
            <p
              style={{
                fontSize: '1.1rem',
                color: 'rgba(241, 245, 249, 0.8)',
              }}
            >
              Join us for workshops, hackathons, and tech talks
            </p>
          </div>
          
          <Link to="/events">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '0.8rem 1.5rem',
                backgroundColor: 'transparent',
                border: `1px solid ${theme.colors.accent}`,
                borderRadius: '30px',
                color: theme.colors.accent,
                fontSize: '1rem',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              View All Events
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke={theme.colors.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>
          </Link>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '2rem',
          }}
        >
          {events.map((event) => (
            <motion.div
              key={event.id}
              variants={cardVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              style={{
                backgroundColor: theme.colors.background,
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                border: `1px solid rgba(255, 255, 255, 0.05)`,
              }}
            >
              <div
                style={{
                  height: '180px',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <img
                  src={event.image}
                  alt={event.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>

              <div style={{ padding: '1.5rem' }}>
                <div
                  style={{
                    display: 'flex',
                    gap: '0.5rem',
                    marginBottom: '1rem',
                  }}
                >
                  {event.tags.map((tag, index) => (
                    <span
                      key={index}
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: '500',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '20px',
                        backgroundColor: 'rgba(107, 33, 168, 0.2)',
                        color: theme.colors.accent,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3
                  style={{
                    fontSize: '1.25rem',
                    color: theme.colors.text,
                    marginBottom: '0.75rem',
                    fontWeight: '600',
                  }}
                >
                  {event.title}
                </h3>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    marginBottom: '1.5rem',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.9rem',
                      color: 'rgba(241, 245, 249, 0.8)',
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 2V5M16 2V5M3.5 9.09H20.5M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="rgba(241, 245, 249, 0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {event.date}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.9rem',
                      color: 'rgba(241, 245, 249, 0.8)',
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 8V12L14 14M12 3C7.03 3 3 7.03 3 12C3 16.97 7.03 21 12 21C16.97 21 21 16.97 21 12C21 7.03 16.97 3 12 3Z" stroke="rgba(241, 245, 249, 0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {event.time}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.9rem',
                      color: 'rgba(241, 245, 249, 0.8)',
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 12.75C13.6569 12.75 15 11.4069 15 9.75C15 8.09315 13.6569 6.75 12 6.75C10.3431 6.75 9 8.09315 9 9.75C9 11.4069 10.3431 12.75 12 12.75Z" stroke="rgba(241, 245, 249, 0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M19.5 9.75C19.5 16.5 12 21.75 12 21.75C12 21.75 4.5 16.5 4.5 9.75C4.5 7.76088 5.29018 5.85322 6.6967 4.4467C8.10322 3.04018 10.0109 2.25 12 2.25C13.9891 2.25 15.8968 3.04018 17.3033 4.4467C18.7098 5.85322 19.5 7.76088 19.5 9.75Z" stroke="rgba(241, 245, 249, 0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {event.location}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    backgroundColor: theme.colors.primary,
                    border: 'none',
                    borderRadius: '8px',
                    color: theme.colors.text,
                    fontSize: '1rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                  }}
                >
                  Register Now
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default RecentEvents;
