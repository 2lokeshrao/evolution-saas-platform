'use client';

import { ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-emerald-600">
      <div className="max-w-4xl mx-auto text-center text-white">
        <h2 className="text-4xl font-bold mb-6">Ready to Scale Your WhatsApp Marketing?</h2>
        <p className="text-xl mb-8 opacity-90">
          Join thousands of businesses using Evolution SaaS Platform to send millions of messages every month.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-white text-green-600 rounded-lg font-semibold hover:shadow-lg transition flex items-center justify-center gap-2">
            Start Free Trial <ArrowRight size={20} />
          </button>
          <button className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition">
            Schedule Demo
          </button>
        </div>
      </div>
    </section>
  );
}
