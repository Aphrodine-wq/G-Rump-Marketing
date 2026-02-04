import React from 'react';
import { Link } from 'react-router-dom';
import { Download } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-white pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-purple-50 rounded-full opacity-50" />
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-blue-50 rounded-full opacity-50" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          <motion.div 
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="type-display lg:type-display-lg font-bold tracking-tight text-gray-900 mb-6">
              Your Vision,
              <span className="text-gradient block">Instantly Executed.</span>
            </h1>
            <p className="type-body-lg md:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0 mb-10">
              Go from a simple prompt to production-ready code, system architecture, and documentation in minutes. The future of creation starts now.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4">
              <Link 
                to="/downloads" 
                className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-base"
              >
                <Download size={20} />
                Download for Windows
              </Link>
              <Link 
                to="/#how-it-works"
                className="btn-secondary w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-base"
              >
                Learn More
              </Link>
            </div>
            <p className="mt-6 text-gray-500 text-body-sm">
              Free during beta · No credit card required
            </p>
          </motion.div>

          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="relative aspect-[4/3] bg-gray-100 rounded-2xl shadow-2xl p-4 border border-gray-200/80">
              <div className="absolute top-2 left-2 flex items-center gap-1.5">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
              <div className="w-full h-full bg-white rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <p className="font-medium text-lg">Your Software Screenshot</p>
                  <p className="text-sm">This is where the magic is shown.</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
