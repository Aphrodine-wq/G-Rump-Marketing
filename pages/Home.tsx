import React from 'react';
import Hero from '../components/Hero';
import AppPreview from '../components/AppPreview';
import Features from '../components/Features';
import ModesAndFlows from '../components/ModesAndFlows';
import NvidiaSection from '../components/NvidiaSection';
import ClaudeSection from '../components/ClaudeSection';
import KimiSection from '../components/KimiSection';
import MicrosoftSection from '../components/MicrosoftSection';
import SystemArchitecture from '../components/SystemArchitecture';
import PerformanceChart from '../components/PerformanceChart';
import Downloads from '../components/Downloads';
import TrustedBy from '../components/TrustedBy';
import WaitlistSection from '../components/WaitlistSection';

const Home: React.FC = () => {
  return (
    <>
      <section id="hero">
        <Hero />
      </section>
      <AppPreview />
      <TrustedBy />
      <section id="features">
        <Features />
      </section>
      <section id="how-it-works">
        <ModesAndFlows />
      </section>
      <section id="claude">
        <ClaudeSection />
      </section>
      <section id="kimi">
        <KimiSection />
      </section>
      <section id="nvidia">
        <NvidiaSection />
      </section>
      <section id="microsoft">
        <MicrosoftSection />
      </section>
      <section id="architecture">
        <SystemArchitecture />
      </section>
      <section id="performance">
        <PerformanceChart />
      </section>
      <section id="downloads">
        <Downloads />
      </section>
      <WaitlistSection />
    </>
  );
};

export default Home;
