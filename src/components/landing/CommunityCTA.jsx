import React from 'react';
import { motion } from 'framer-motion';
import theme from '../../styles/theme';

const CommunityCTA = () => {
  return (
    <section
      style={{
        padding: '6rem 0',
        backgroundColor: theme.colors.primary,
        background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative elements */}
      <motion.div
        animate={{
          y: [0, 15, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '250px',
          height: '250px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.colors.accent}33 0%, transparent 70%)`,
          filter: 'blur(40px)',
          zIndex: 1,
        }}
      />
      <motion.div
        animate={{
          y: [0, -20, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          repeat: Infinity,
          duration: 7,
          ease: 'easeInOut',
          delay: 1,
        }}
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '15%',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.colors.secondary}44 0%, transparent 70%)`,
          filter: 'blur(30px)',
          zIndex: 1,
        }}
      />

      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          maxWidth: '800px',
          margin: '0 auto',
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            fontSize: '2.5rem',
            color: theme.colors.text,
            marginBottom: '1.5rem',
            fontFamily: theme.fonts.secondary,
          }}
        >
          Join Our Thriving Tech Community
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontSize: '1.2rem',
            color: 'rgba(241, 245, 249, 0.9)',
            marginBottom: '2.5rem',
            lineHeight: 1.6,
          }}
        >
          Be part of a community that's shaping the future of technology. Connect with like-minded developers, attend exclusive events, and gain hands-on experience through collaborative projects.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '1rem 2.5rem',
              backgroundColor: theme.colors.accent,
              color: theme.colors.background,
              border: 'none',
              borderRadius: '30px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
            }}
          >
            Sign Up Now
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '1rem 2.5rem',
              backgroundColor: 'transparent',
              color: theme.colors.text,
              border: `2px solid ${theme.colors.text}`,
              borderRadius: '30px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            Learn More
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          style={{
            marginTop: '4rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '2.5rem',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: theme.colors.text,
                marginBottom: '0.5rem',
              }}
            >
              500+
            </div>
            <div style={{ color: 'rgba(241, 245, 249, 0.7)' }}>Community Members</div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: theme.colors.text,
                marginBottom: '0.5rem',
              }}
            >
              50+
            </div>
            <div style={{ color: 'rgba(241, 245, 249, 0.7)' }}>Events Per Year</div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: theme.colors.text,
                marginBottom: '0.5rem',
              }}
            >
              20+
            </div>
            <div style={{ color: 'rgba(241, 245, 249, 0.7)' }}>Active Projects</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunityCTA;
