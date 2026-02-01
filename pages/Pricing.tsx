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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 mb-6">Simple, Transparent Pricing</h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          Start for free, scale as you grow. No hidden fees for compute or bandwidth.
        </p>
        
        <div className="flex items-center justify-center mt-10 gap-4">
            <span className={`text-sm font-bold ${!annual ? 'text-gray-900' : 'text-gray-500'}`}>Monthly</span>
            <button 
                onClick={() => setAnnual(!annual)}
                className="w-14 h-8 bg-purple-600 rounded-full p-1 relative transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
                <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${annual ? 'translate-x-6' : 'translate-x-0'}`}></div>
            </button>
            <span className={`text-sm font-bold ${annual ? 'text-gray-900' : 'text-gray-500'}`}>Annual <span className="text-green-600 text-xs ml-1 font-normal bg-green-50 px-2 py-0.5 rounded-full border border-green-100">(Save 20%)</span></span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {plans.map((plan, i) => (
            <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`relative p-8 rounded-3xl border ${plan.popular ? 'border-purple-500 shadow-2xl shadow-purple-900/10 scale-105 z-10 bg-white' : 'border-gray-200 bg-white hover:border-purple-200 hover:shadow-xl transition-all'}`}
            >
                {plan.popular && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-purple-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg shadow-purple-500/20">
                        Most Popular
                    </div>
                )}
                
                <div className={`w-12 h-12 rounded-xl ${plan.color} flex items-center justify-center mb-6`}>
                    <plan.icon size={24} />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                <p className="text-gray-500 text-sm mt-2 mb-6 min-h-[40px] leading-relaxed">{plan.description}</p>
                
                <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                    <span className="text-gray-500">/per user/month</span>
                </div>
                
                <button className={`w-full py-3 rounded-xl font-bold mb-8 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${plan.popular ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg shadow-purple-200 focus:ring-purple-500 hover:-translate-y-0.5' : 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500'}`}>
                    {plan.button}
                </button>
                
                <ul className="space-y-4">
                    {plan.features.map(feature => (
                        <li key={feature} className="flex items-center gap-3 text-sm text-gray-600">
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

      <div className="mt-24 bg-gray-900 rounded-3xl p-12 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
              <div className="w-16 h-16 mx-auto bg-gray-800 rounded-2xl flex items-center justify-center mb-6 border border-gray-700">
                 <Shield size={32} className="text-purple-400" />
              </div>
              <h3 className="text-3xl font-bold mb-6">Enterprise Custom Architecture</h3>
              <p className="text-gray-400 max-w-2xl mx-auto mb-8 text-lg leading-relaxed">
                  We offer dedicated support for high-compliance industries including Healthcare, Finance, and Defense. Get a custom contract with SLA guarantees.
              </p>
              <button className="bg-white text-gray-900 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-all hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white">
                  Contact Solutions Engineering
              </button>
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/30 to-transparent pointer-events-none"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>
      </div>
    </motion.div>
  );
};

export default PricingPage;
