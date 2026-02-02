import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Analytics } from "@vercel/analytics/react";
import Layout from './layouts/Layout';

// Lazy load all page components for better performance
const Home = lazy(() => import('./pages/Home'));
const FeaturesPage = lazy(() => import('./pages/Features'));
const WorkflowPage = lazy(() => import('./pages/Workflow'));
const PricingPage = lazy(() => import('./pages/Pricing'));
const DocsPage = lazy(() => import('./pages/Docs'));
const DownloadsPage = lazy(() => import('./pages/Downloads'));

// Loading fallback component
const PageLoader: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
      <p className="text-gray-500 text-sm font-medium">Loading...</p>
    </div>
  </div>
);

// Animated Routes Wrapper with proper Suspense
const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <Suspense fallback={<PageLoader />}>
            <Home />
          </Suspense>
        } />
        <Route path="/features" element={
          <Suspense fallback={<PageLoader />}>
            <FeaturesPage />
          </Suspense>
        } />
        <Route path="/workflow" element={
          <Suspense fallback={<PageLoader />}>
            <WorkflowPage />
          </Suspense>
        } />
        <Route path="/pricing" element={
          <Suspense fallback={<PageLoader />}>
            <PricingPage />
          </Suspense>
        } />
        <Route path="/downloads" element={
          <Suspense fallback={<PageLoader />}>
            <DownloadsPage />
          </Suspense>
        } />
        <Route path="/docs/*" element={
          <Suspense fallback={<PageLoader />}>
            <DocsPage />
          </Suspense>
        } />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <AnimatedRoutes />
      </Layout>
      <Analytics />
    </Router>
  );
};

export default App;
