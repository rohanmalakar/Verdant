import React from 'react';
import { motion } from 'motion/react';
import { Sprout, ShieldCheck, Truck, HeartHandshake, Sparkles, RefreshCw } from 'lucide-react';

export function WhyChooseUs() {
  const features = [
    {
      icon: Sprout,
      title: '100% Organic & Healthy',
      desc: 'Nurtured in sustainable greenhouse nurseries without harsh synthetic chemicals or toxic pesticides.'
    },
    {
      icon: ShieldCheck,
      title: '30-Day Guarantee',
      desc: 'If your plant arrives damaged or dies within 30 days, we replace it instantly at zero cost to you.'
    },
    {
      icon: Truck,
      title: 'Eco-Friendly Delivery',
      desc: 'Shipped in biodegradable, recyclable custom cardboard boxes engineered to safeguard every leaf.'
    },
    {
      icon: HeartHandshake,
      title: 'Lifetime Expert Advice',
      desc: 'Access our Gemini AI Plant Care Doctor and human horticultural specialists anytime for care assistance.'
    }
  ];

  return (
    <section className="py-16 bg-[#FAF7F0] dark:bg-neutral-900 border-t border-stone-200/60 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D9EAD3] text-[#2E7D32] text-xs font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Verdant Standard</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-neutral-100 max-w-xl mx-auto mb-12">
          Why Thousands Trust Us With Their Green Spaces
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {features.map((feat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 rounded-3xl bg-white dark:bg-neutral-800 border border-stone-200/80 dark:border-neutral-700/80 shadow-sm hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#D9EAD3] dark:bg-emerald-950 flex items-center justify-center text-[#2E7D32] dark:text-emerald-400 mb-4">
                <feat.icon className="w-6 h-6" />
              </div>

              <h3 className="font-serif font-bold text-base text-stone-900 dark:text-neutral-100 mb-2">
                {feat.title}
              </h3>

              <p className="text-xs text-stone-600 dark:text-neutral-400 leading-relaxed">
                {feat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
