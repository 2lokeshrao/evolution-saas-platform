'use client';

import Link from 'next/link';
import { ArrowRight, Zap } from 'lucide-react';

export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto text-center">
        <div className="inline-block mb-6 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
          🚀 WhatsApp Integration Made Easy
        </div>

        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          WhatsApp Marketing at Scale
        </h1>

        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Send unlimited WhatsApp messages, manage multiple accounts, and integrate with your favorite tools. All in one powerful platform.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg transition flex items-center justify-center gap-2">
            Start Free Trial <ArrowRight size={20} />
          </button>
          <button className="px-8 py-4 border-2 border-gray-300 text-gray-900 rounded-lg font-semibold hover:border-gray-400 transition">
            Watch Demo
          </button>
        </div>

        <div className="grid grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-green-600">10M+</div>
            <p className="text-gray-600">Messages Sent</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600">5K+</div>
            <p className="text-gray-600">Active Users</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600">99.9%</div>
            <p className="text-gray-600">Uptime</p>
          </div>
        </div>
      </div>
    </section>
  );
}
