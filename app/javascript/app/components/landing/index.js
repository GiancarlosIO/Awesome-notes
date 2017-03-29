import React from 'react';
import Header from '../navigation/header';
import HomeSection from './home-section';
import BenefitsSection from './benefits-section';

export default () => {
  return (
    <div>
      <Header />
      <HomeSection />
      <BenefitsSection />
    </div>
  )
}