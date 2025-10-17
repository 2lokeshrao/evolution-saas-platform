'use client';

import { MessageSquare, Zap, BarChart3, Plug } from 'lucide-react';

const features = [
  {
    icon: MessageSquare,
    title: 'Bulk Messaging',
    description: 'Send thousands of WhatsApp messages instantly with our powerful API',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Optimized infrastructure for instant message delivery',
  },
  {
    icon: BarChart3,
    title: 'Analytics',
    description: 'Track delivery rates, open rates, and engagement metrics',
  },
  {
    icon: Plug,
    title: 'Easy Integration',
    description: 'Connect with Shopify, WooCommerce, CRM, and more',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-xl text-gray-600">Everything you need to run successful WhatsApp campaigns</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition">
                <Icon className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
