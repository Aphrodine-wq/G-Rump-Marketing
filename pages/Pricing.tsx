import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Shield, Crown, Building, Globe } from 'lucide-react';

const PricingPage: React.FC = () => {
  const [annual, setAnnual] = useState(true);

  const plans = [
    {
      name: 'Hobby',
      price: annual ? '0' : '0',
      description: 'Perfect for side projects and learning.',
      features: ['5 Projects', 'Community Support', 'Shared Build Runners', '1GB Storage'],
      icon: Zap,
      color: 'bg-blue-50 text-blue-600',
      button: 'Start Free',
      popular: false
    },
    {
      name: 'Pro',
      price: annual ? '29' : '39',
      description: 'For professional developers and small teams.',
      features: ['Unlimited Projects', 'Priority Support', '12x Faster Builds', '20GB Storage', 'Custom Domains', 'Team Collaboration'],
      popular: true,
      icon: Crown,
      color: 'bg-purple-50 text-purple-600',
      button: 'Get Pro'
    },
    {
      name: 'Business',
      price: annual ? '99' : '119',
      description: 'Scale your team with advanced security and controls.',
      features: ['SSO & SAML', 'Audit Logs', 'VPC Peering', 'Dedicated Build Runners', '99.9% SLA', 'Advanced RBAC'],
      popular: false,
      icon: Building,
      color: 'bg-indigo-50 text-indigo-600',
      button: 'Start Trial'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-purple-50/40">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="pt-24 pb-20 px-6 sm:px-8 lg:px-10 lg:pt-32 lg:pb-28 max-w-[90rem] mx-auto"
      >
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-purple-600 shadow-sm mb-6"
          >
            <span className="pulse-dot" />
            Flexible plans for every team
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[2.5rem] md:text-[3rem] font-bold tracking-tight text-[#1a1a2e] mb-4"
          >
            Simple, Transparent Pricing
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-body-lg text-[#4a4a5a] max-w-2xl mx-auto mb-2"
          >
            Start free. Scale when you&apos;re ready.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-body-sm text-[#6b7280] max-w-xl mx-auto mb-6"
          >
            No hidden fees for compute or bandwidth.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center mt-10 gap-4"
          >
            <span className={`text-sm font-bold transition-colors ${!annual ? 'text-gray-900' : 'text-gray-500'}`}>Monthly</span>
            <button 
              onClick={() => setAnnual(!annual)}
              className="w-14 h-8 bg-purple-600 rounded-full p-1 relative transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 hover:shadow-lg hover:bg-purple-700"
            >
              <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${annual ? 'translate-x-6' : 'translate-x-0'}`}></div>
            </button>
            <span className={`text-sm font-bold transition-colors ${annual ? 'text-gray-900' : 'text-gray-500'}`}>
              Annual <span className="text-green-600 text-xs ml-1 font-normal bg-green-50 px-2 py-0.5 rounded-full border border-green-100">(Save 20%)</span>
            </span>
          </motion.div>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 items-start">
        {plans.map((plan, i) => (
            <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
                viewport={{ once: true }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className={`relative p-8 rounded-3xl border bg-white/80 backdrop-blur-sm transition-all sm:p-10 ${
                  plan.popular 
                    ? 'border-purple-200 shadow-2xl shadow-purple-100/50 scale-105 z-10' 
                    : 'border-purple-100/70 shadow-lg hover:border-purple-200 hover:shadow-xl'
                }`}
            >
                {plan.popular && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 btn-primary px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg"
                    >
                        Most Popular
                    </motion.div>
                )}
                
                <div className={`w-12 h-12 rounded-xl ${plan.color} flex items-center justify-center mb-6`}>
                    <plan.icon size={24} />
                </div>
                
                <h3 className="text-2xl font-bold text-[#1a1a2e]">{plan.name}</h3>
                <p className="text-[#4a4a5a] text-sm mt-2 mb-6 min-h-[40px] leading-relaxed">{plan.description}</p>
                
                <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-4xl font-bold text-[#1a1a2e]">${plan.price}</span>
                    <span className="text-[#6b7280]">/per user/month</span>
                </div>
                
                <button className={`w-full py-3 rounded-xl font-bold mb-4 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 min-h-[44px] active:scale-95 ${plan.popular ? 'btn-primary focus:ring-[#7c3aed]' : 'btn-secondary focus:ring-[#7c3aed]'}`}>
                    {plan.button}
                </button>
                <p className="text-caption text-[#6b7280] mb-8 text-center">All plans include access to docs and community.</p>
                
                <ul className="space-y-3">
                    {plan.features.map(feature => (
                        <li key={feature} className="flex items-center gap-3 text-sm text-[#4a4a5a]">
                            <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                                <Check size={12} className="text-green-600" />
                            </div>
                            {feature}
                        </li>
                    ))}
                </ul>
            </motion.div>
        ))}
      </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-24 bg-gray-900 rounded-3xl p-12 text-center text-white relative overflow-hidden shadow-2xl"
        >
          <div className="relative z-10">
            <div className="w-16 h-16 mx-auto bg-gray-800 rounded-2xl flex items-center justify-center mb-6 border border-gray-700">
              <Shield size={32} className="text-purple-400" />
            </div>
            <h3 className="text-3xl font-bold mb-6">Enterprise Custom Architecture</h3>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8 text-lg leading-relaxed">
              We offer dedicated support for high-compliance industries including Healthcare, Finance, and Defense. Get a custom contract with SLA guarantees.
            </p>
            <a
              href="mailto:enterprise@g-rump.com?subject=Enterprise%20Inquiry"
              className="inline-block bg-white text-gray-900 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-all hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white active:scale-95"
            >
              Contact Solutions Engineering
            </a>
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/30 to-transparent pointer-events-none"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-gray-500 mb-4">Trusted by teams at innovative companies</p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400">
            <span className="flex items-center gap-2">
              <Check size={14} className="text-green-500" />
              No credit card required
            </span>
            <span className="flex items-center gap-2">
              <Check size={14} className="text-green-500" />
              Cancel anytime
            </span>
            <span className="flex items-center gap-2">
              <Check size={14} className="text-green-500" />
              14-day money-back guarantee
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PricingPage;
