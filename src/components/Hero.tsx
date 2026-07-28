import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sprout,
  Search,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Truck,
  HeartHandshake,
  HelpCircle,
  Leaf
} from 'lucide-react';
import { Plant } from '../types';

interface HeroProps {
  onShopNow: () => void;
  onOpenQuiz: () => void;
  onOpenAIAdvisor: () => void;
  onSearchSubmit: (query: string) => void;
}

export function Hero({ onShopNow, onOpenQuiz, onOpenAIAdvisor, onSearchSubmit }: HeroProps) {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearchSubmit(query.trim());
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#FAF7F0] dark:bg-neutral-900 py-12 lg:py-20 border-b border-stone-200/60 dark:border-neutral-800">
      {/* Decorative Floating Leaf Elements */}
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-10 left-8 text-[#4CAF50]/20 pointer-events-none hidden md:block"
      >
        <Leaf className="w-16 h-16" />
      </motion.div>

      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-12 right-12 text-[#2E7D32]/15 pointer-events-none hidden md:block"
      >
        <Leaf className="w-24 h-24" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text & Search */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D9EAD3] dark:bg-emerald-950 text-[#2E7D32] dark:text-emerald-300 text-xs font-semibold border border-[#4CAF50]/30"
            >
              <Sprout className="w-4 h-4 text-[#2E7D32] dark:text-emerald-400" />
              <span>Sustainably Grown • Fresh Nursery Direct</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#2E7D32] dark:text-emerald-400 leading-[1.15]"
            >
              Bring Nature Home, <br />
              <span className="text-stone-800 dark:text-neutral-100 font-sans italic font-normal">
                Nurture Your Space.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-stone-600 dark:text-neutral-300 text-base sm:text-lg max-w-2xl leading-relaxed"
            >
              Discover hand-curated indoor and outdoor plants delivered fresh to your doorstep with guaranteed healthy arrival, pots, and personalized care guidance.
            </motion.p>

            {/* Hero Search Box */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              onSubmit={handleSearch}
              className="flex flex-col sm:flex-row items-center gap-2 p-2 bg-white dark:bg-neutral-800 rounded-2xl shadow-xl border border-stone-200 dark:border-neutral-700 max-w-xl"
            >
              <div className="relative flex-1 w-full flex items-center pl-3">
                <Search className="w-5 h-5 text-stone-400 shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Try 'Monstera', 'Pet Friendly', or 'Low Light'..."
                  className="w-full pl-3 pr-2 py-2 text-sm bg-transparent border-none text-stone-800 dark:text-neutral-100 placeholder-stone-400 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#2E7D32] hover:bg-[#4CAF50] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Find Plants</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.form>

            {/* Quick Filter Tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-2 pt-2"
            >
              <span className="text-xs text-stone-500 font-medium">Popular searches:</span>
              {['Indoor', 'Pet Friendly', 'Air Purifying', 'Succulents'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => onSearchSubmit(tag)}
                  className="px-2.5 py-1 rounded-full text-xs bg-stone-200/70 dark:bg-neutral-800 hover:bg-[#D9EAD3] text-stone-700 dark:text-neutral-300 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </motion.div>

            {/* CTA Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center gap-3 pt-4"
            >
              <button
                onClick={onShopNow}
                className="px-7 py-3.5 rounded-2xl bg-[#2E7D32] hover:bg-[#4CAF50] text-white font-bold text-sm shadow-lg shadow-emerald-900/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
              >
                <span>Shop Full Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenQuiz}
                className="px-5 py-3.5 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 font-bold text-xs border border-amber-300/60 dark:border-amber-700/60 hover:bg-amber-200 transition-all flex items-center gap-2"
              >
                <HelpCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Plant Match Quiz</span>
              </button>

              <button
                onClick={onOpenAIAdvisor}
                className="px-5 py-3.5 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-[#2E7D32] dark:text-emerald-300 font-bold text-xs border border-emerald-300/60 dark:border-emerald-700/60 hover:bg-emerald-200 transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Ask AI Care Doctor</span>
              </button>
            </motion.div>
          </div>

          {/* Right Plant Illustration Showcase */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative mx-auto max-w-md lg:max-w-none"
            >
              {/* Back Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#2E7D32]/20 to-[#4CAF50]/30 rounded-3xl filter blur-3xl -z-10" />

              {/* Main Plant Hero Card */}
              <div className="relative bg-white dark:bg-neutral-800 rounded-3xl p-4 shadow-2xl border border-stone-200 dark:border-neutral-700">
                <img
                  src="https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=1000"
                  alt="Monstera Deliciosa Botanical Hero"
                  className="w-full h-80 sm:h-96 object-cover rounded-2xl"
                />

                {/* Floating Badge 1: Air Purifying */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="absolute top-8 -left-4 sm:-left-6 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-stone-200 dark:border-neutral-700 flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#D9EAD3] dark:bg-emerald-950 flex items-center justify-center text-[#2E7D32]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-stone-800 dark:text-neutral-100">100% Healthy Guarantee</p>
                    <p className="text-[10px] text-stone-500">30-day replacement policy</p>
                  </div>
                </motion.div>

                {/* Floating Badge 2: Fast Delivery */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                  className="absolute bottom-8 -right-4 sm:-right-6 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-stone-200 dark:border-neutral-700 flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 flex items-center justify-center text-amber-800">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-stone-800 dark:text-neutral-100">Eco Express Express</p>
                    <p className="text-[10px] text-stone-500">Delivered in eco boxes</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
          {[
            { icon: Sprout, title: '10,000+ Happy Parents', desc: 'Thriving across homes' },
            { icon: ShieldCheck, title: '30-Day Plant Guarantee', desc: 'Arrives green & healthy' },
            { icon: Truck, title: 'Free Shipping > $50', desc: 'Eco recyclable packaging' },
            { icon: HeartHandshake, title: 'Lifetime Care Support', desc: 'Free AI & expert advice' }
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white/80 dark:bg-neutral-800/80 backdrop-blur-xs border border-stone-200/80 dark:border-neutral-700 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-[#D9EAD3] dark:bg-emerald-950/80 flex items-center justify-center text-[#2E7D32] dark:text-emerald-400 shrink-0">
                <item.icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-stone-800 dark:text-neutral-100">{item.title}</h4>
                <p className="text-[10px] text-stone-500 dark:text-neutral-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
