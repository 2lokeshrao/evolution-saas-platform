'use client';

import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: '₹999',
    description: 'Perfect for getting started',
    features: [
      '100 messages/day',
      '1 WhatsApp account',
      'Basic support',
      'API access',
      'Monthly reports',
    ],
  },
  {
    name: 'Professional',
    price: '₹4,999',
    description: 'Most popular for businesses',
    features: [
      '1,000 messages/day',
      '5 WhatsApp accounts',
      'Priority support',
      'Advanced API',
      'Weekly reports',
      'Shopify integration',
      'WooCommerce integration',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: '₹9,999',
    description: 'For large-scale operations',
    features: [
      'Unlimited messages',
      'Unlimited accounts',
      '24/7 support',
      'Custom API',
      'Real-time analytics',
      'All integrations',
      'Dedicated manager',
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-600">Choose the perfect plan for your business</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-lg p-8 ${
                plan.popular
                  ? 'bg-gradient-to-b from-green-50 to-white border-2 border-green-500 shadow-xl'
                  : 'bg-white border border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="mb-4 inline-block px-3 py-1 bg-green-500 text-white rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-gray-600 mb-4">{plan.description}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-gray-600">/month</span>
              </div>
              <button
                className={`w-full py-3 rounded-lg font-semibold mb-8 transition ${
                  plan.popular
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg'
                    : 'border-2 border-gray-300 text-gray-900 hover:border-gray-400'
                }`}
              >
                Get Started
              </button>
              <div className="space-y-4">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
