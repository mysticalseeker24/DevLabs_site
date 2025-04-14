import React from 'react';
import HeroSection from '../components/landing/HeroSection';
import FocusAreas from '../components/landing/FocusAreas';
import JoinCommunity from '../components/landing/JoinCommunity';
import CommunityCTA from '../components/landing/CommunityCTA';

const LandingPage = () => {
  return (
    <div>
      <HeroSection />
      <FocusAreas />
      <JoinCommunity />
      <CommunityCTA />
    </div>
  );
};

export default LandingPage;
