import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import ModesAndFlows from '../components/ModesAndFlows';
import AIProviders from '../components/AIProviders';
import HomeDownloads from '../components/HomeDownloads';
import TrustedBy from '../components/TrustedBy';
import WaitlistSection from '../components/WaitlistSection';

const Home: React.FC = () => {
  return (
    <>
      <section id="hero">
        <Hero />
      </section>
      <TrustedBy />
      <section id="features">
        <Features />
      </section>
      <section id="how-it-works">
        <ModesAndFlows />
      </section>
      <section id="ai-providers">
        <AIProviders />
      </section>
      <HomeDownloads />
      <WaitlistSection />
    </>
  );
};

export default Home;
