import React from 'react';
import { Link } from 'react-router-dom';
import theme from '../styles/theme';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: theme.colors.background,
      padding: '4rem 0 2rem',
      borderTop: `1px solid rgba(255, 255, 255, 0.05)`
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {/* Brand section */}
          <div>
            <h3 style={{
              fontSize: '1.5rem',
              color: theme.colors.text,
              marginBottom: '1rem',
              fontFamily: theme.fonts.secondary
            }}>
              DevLabs
            </h3>
            <p style={{
              color: 'rgba(241, 245, 249, 0.7)',
              marginBottom: '1.5rem',
              lineHeight: '1.6'
            }}>
              Empowering Developers to shape the future through collaborative learning, innovation, and hands-on experience.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {/* Social media icons */}
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={{
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: theme.colors.cardBg,
                borderRadius: '50%',
                color: theme.colors.text,
                transition: 'all 0.3s ease',
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017C2 16.45 4.865 20.27 8.84 21.6C9.335 21.696 9.525 21.392 9.525 21.132C9.525 20.9 9.515 20.15 9.51 19.318C6.73 19.908 6.14 17.932 6.14 17.932C5.68 16.844 5.03 16.542 5.03 16.542C4.12 15.88 5.1 15.892 5.1 15.892C6.1 15.962 6.64 16.962 6.64 16.962C7.55 18.43 9.01 18.008 9.54 17.752C9.63 17.132 9.89 16.712 10.17 16.45C7.96 16.186 5.62 15.332 5.62 11.52C5.62 10.414 6.02 9.482 6.65 8.746C6.55 8.496 6.2 7.462 6.75 6.104C6.75 6.104 7.6 5.84 9.5 7.122C10.29 6.896 11.15 6.782 12 6.8C12.85 6.782 13.71 6.896 14.5 7.122C16.4 5.84 17.25 6.104 17.25 6.104C17.8 7.462 17.45 8.496 17.35 8.746C17.98 9.482 18.38 10.414 18.38 11.52C18.38 15.342 16.04 16.18 13.82 16.44C14.17 16.76 14.5 17.42 14.5 18.42C14.5 19.82 14.49 20.8 14.49 21.12C14.49 21.376 14.67 21.686 15.19 21.586C19.16 20.26 22 16.446 22 12.016C22 6.484 17.522 2 12 2Z" fill="currentColor"/>
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: theme.colors.cardBg,
                borderRadius: '50%',
                color: theme.colors.text,
                transition: 'all 0.3s ease'
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 3.01s-2.018 1.192-3.14 1.53a4.48 4.48 0 00-7.86 3v1a10.66 10.66 0 01-9-4.53s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5 0-.278-.028-.556-.08-.83C21.94 5.674 23 3.01 23 3.01z" fill="currentColor"/>
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: theme.colors.cardBg,
                borderRadius: '50%',
                color: theme.colors.text,
                transition: 'all 0.3s ease'
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" fill="currentColor"/>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: theme.colors.cardBg,
                borderRadius: '50%',
                color: theme.colors.text,
                transition: 'all 0.3s ease'
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="currentColor"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{
              fontSize: '1.1rem',
              color: theme.colors.text,
              marginBottom: '1.2rem',
              fontFamily: theme.fonts.secondary
            }}>
              Quick Links
            </h4>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <Link to="/" style={{ color: 'rgba(241, 245, 249, 0.7)', transition: 'color 0.3s ease' }}>Home</Link>
              <Link to="/events" style={{ color: 'rgba(241, 245, 249, 0.7)', transition: 'color 0.3s ease' }}>Events</Link>
              <Link to="/about" style={{ color: 'rgba(241, 245, 249, 0.7)', transition: 'color 0.3s ease' }}>About</Link>
              <a href="#" style={{ color: 'rgba(241, 245, 249, 0.7)', transition: 'color 0.3s ease' }}>Resources</a>
              <a href="#" style={{ color: 'rgba(241, 245, 249, 0.7)', transition: 'color 0.3s ease' }}>Blog</a>
            </nav>
          </div>

          {/* Focus Areas */}
          <div>
            <h4 style={{
              fontSize: '1.1rem',
              color: theme.colors.text,
              marginBottom: '1.2rem',
              fontFamily: theme.fonts.secondary
            }}>
              Focus Areas
            </h4>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <a href="#" style={{ color: 'rgba(241, 245, 249, 0.7)', transition: 'color 0.3s ease' }}>Web Development</a>
              <a href="#" style={{ color: 'rgba(241, 245, 249, 0.7)', transition: 'color 0.3s ease' }}>Mobile Development</a>
              <a href="#" style={{ color: 'rgba(241, 245, 249, 0.7)', transition: 'color 0.3s ease' }}>Cloud & DevOps</a>
              <a href="#" style={{ color: 'rgba(241, 245, 249, 0.7)', transition: 'color 0.3s ease' }}>Machine Learning</a>
              <a href="#" style={{ color: 'rgba(241, 245, 249, 0.7)', transition: 'color 0.3s ease' }}>IoT & Electronics</a>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{
              fontSize: '1.1rem',
              color: theme.colors.text,
              marginBottom: '1.2rem',
              fontFamily: theme.fonts.secondary
            }}>
              Contact Us
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginTop: '0.2rem' }}>
                  <path d="M21.75 6.75V17.25C21.75 18.4926 20.7426 19.5 19.5 19.5H4.5C3.25736 19.5 2.25 18.4926 2.25 17.25V6.75M21.75 6.75C21.75 5.50736 20.7426 4.5 19.5 4.5H4.5C3.25736 4.5 2.25 5.50736 2.25 6.75M21.75 6.75V6.99219C21.75 7.74933 21.3447 8.44559 20.6792 8.82546L13.1792 13.1955C12.4561 13.6026 11.5439 13.6026 10.8208 13.1955L3.32078 8.82546C2.65535 8.44559 2.25 7.74933 2.25 6.99219V6.75" stroke="rgba(241, 245, 249, 0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <a href="mailto:contact@devlabs.edu" style={{ color: 'rgba(241, 245, 249, 0.7)' }}>contact@devlabs.edu</a>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginTop: '0.2rem' }}>
                  <path d="M10.5 1.5H8.25C7.00736 1.5 6 2.50736 6 3.75V20.25C6 21.4926 7.00736 22.5 8.25 22.5H15.75C16.9926 22.5 18 21.4926 18 20.25V3.75C18 2.50736 16.9926 1.5 15.75 1.5H13.5M10.5 1.5V3H13.5V1.5M10.5 1.5H13.5M10.5 20.25H13.5" stroke="rgba(241, 245, 249, 0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <a href="tel:+91234567890" style={{ color: 'rgba(241, 245, 249, 0.7)' }}>+91 (234) 567-890</a>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginTop: '0.2rem' }}>
                  <path d="M12 12.75C13.6569 12.75 15 11.4069 15 9.75C15 8.09315 13.6569 6.75 12 6.75C10.3431 6.75 9 8.09315 9 9.75C9 11.4069 10.3431 12.75 12 12.75Z" stroke="rgba(241, 245, 249, 0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M19.5 9.75C19.5 16.5 12 21.75 12 21.75C12 21.75 4.5 16.5 4.5 9.75C4.5 7.76088 5.29018 5.85322 6.6967 4.4467C8.10322 3.04018 10.0109 2.25 12 2.25C13.9891 2.25 15.8968 3.04018 17.3033 4.4467C18.7098 5.85322 19.5 7.76088 19.5 9.75Z" stroke="rgba(241, 245, 249, 0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span style={{ color: 'rgba(241, 245, 249, 0.7)' }}>Innovation Center, Main Campus</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <p style={{ color: 'rgba(241, 245, 249, 0.5)' }}>
            &copy; {new Date().getFullYear()} DevLabs. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#" style={{ color: 'rgba(241, 245, 249, 0.5)', fontSize: '0.9rem' }}>Privacy Policy</a>
            <a href="#" style={{ color: 'rgba(241, 245, 249, 0.5)', fontSize: '0.9rem' }}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
