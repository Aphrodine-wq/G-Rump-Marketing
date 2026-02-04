import React from 'react';
import { motion } from 'framer-motion';
import Downloads from '../components/Downloads';

const DownloadsPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-20 bg-app min-h-screen"
    >
      <Downloads />
    </motion.div>
  );
};

export default DownloadsPage;
