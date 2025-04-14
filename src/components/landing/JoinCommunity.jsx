import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import theme from '../../styles/theme';

const JoinCommunity = () => {
  // Set up animations with useInView and useAnimation
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  
  const controls = useAnimation();
  
  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section 
      style={{ 
        padding: '6rem 0',
        background: `linear-gradient(to bottom, ${theme.colors.background}, ${theme.colors.cardBg})`,
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 1, delay: 0.5 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${theme.colors.accent.replace('#', '')}' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          zIndex: 1,
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '0 1.5rem',
          }}
        >
          <motion.h2
            variants={itemVariants}
            style={{ 
              color: theme.colors.text, 
              fontFamily: theme.fonts.secondary,
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              marginBottom: '1.5rem',
              fontWeight: '600',
            }}
          >
            Join the DevLabs Community
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            style={{ 
              color: theme.colors.text, 
              fontFamily: theme.fonts.primary,
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              marginBottom: '2.5rem',
              maxWidth: '600px',
              margin: '0 auto 2.5rem',
              lineHeight: 1.6,
            }}
          >
            Connect with like-minded tech enthusiasts, collaborate on innovative projects, 
            and accelerate your growth with hands-on experience and mentorship.
          </motion.p>
          
          <motion.div variants={itemVariants}>
            <motion.a
              href="https://chat.whatsapp.com/FQz7lIkcfFPEqQxwrZTKiA"
              target="_blank"
              rel="noreferrer noopener"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'inline-block',
                padding: '1rem 2.5rem',
                background: theme.colors.primary,
                color: theme.colors.background,
                borderRadius: '30px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '1.1rem',
                boxShadow: `0 4px 10px rgba(${parseInt(theme.colors.primary.substr(1, 2), 16)}, ${parseInt(theme.colors.primary.substr(3, 2), 16)}, ${parseInt(theme.colors.primary.substr(5, 2), 16)}, 0.3)`,
                border: 'none',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <WhatsAppIcon />
                <span>Join via WhatsApp</span>
              </div>
            </motion.a>
          </motion.div>
          
          <motion.p
            variants={itemVariants}
            style={{ 
              color: 'rgba(241, 245, 249, 0.6)', 
              fontFamily: theme.fonts.primary,
              fontSize: '0.9rem',
              marginTop: '1.5rem',
            }}
          >
            By joining, you'll get access to exclusive resources, events, and networking opportunities.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

// WhatsApp icon component
const WhatsAppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.9 12C3.9 10.29 4.5 8.6 5.64 7.26L3.97 4.54C2.56 6.29 1.75 8.48 1.75 10.75C1.75 13.02 2.56 15.21 3.97 16.96L5.64 14.24C4.5 12.9 3.9 11.21 3.9 12ZM14.24 5.64L16.96 3.97C15.21 2.56 13.02 1.75 10.75 1.75C8.48 1.75 6.29 2.56 4.54 3.97L7.26 5.64C8.6 4.5 10.29 3.9 12 3.9C13.71 3.9 15.4 4.5 16.74 5.64ZM20.1 12C20.1 13.71 19.5 15.4 18.36 16.74L20.03 19.46C21.44 17.71 22.25 15.52 22.25 13.25C22.25 10.98 21.44 8.79 20.03 7.04L18.36 9.76C19.5 11.1 20.1 12.79 20.1 12ZM9.76 18.36L7.04 20.03C8.79 21.44 10.98 22.25 13.25 22.25C15.52 22.25 17.71 21.44 19.46 20.03L16.74 18.36C15.4 19.5 13.71 20.1 12 20.1C10.29 20.1 8.6 19.5 7.26 18.36ZM12 6C8.69 6 6 8.69 6 12C6 15.31 8.69 18 12 18C15.31 18 18 15.31 18 12C18 8.69 15.31 6 12 6Z" fill="currentColor"/>
  </svg>
);

export default JoinCommunity;
