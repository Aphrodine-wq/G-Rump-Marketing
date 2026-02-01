import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
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

const Home: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <section id="hero">
        <Hero />
      </section>
      
      <TrustedBy />

      <section id="features">
        <Features />
      </section>

      <section id="modes">
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
    </motion.div>
  );
};

export default Home;
