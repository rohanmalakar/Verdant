import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Category } from '../types';

interface FeaturedCategoriesProps {
  categories: Category[];
  onSelectCategory: (categoryName: string) => void;
}

export function FeaturedCategories({ categories, onSelectCategory }: FeaturedCategoriesProps) {
  return (
    <section className="py-16 bg-[#FAF7F0] dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2E7D32] dark:text-emerald-400 uppercase tracking-widest mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Collections</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-neutral-100">
              Explore Plant Categories
            </h2>
          </div>
          <p className="text-stone-600 dark:text-neutral-400 text-sm max-w-md">
            From low-light apartment solutions to air-purifying oxygen boosters and architectural trees.
          </p>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              onClick={() => onSelectCategory(cat.name)}
              className="group relative bg-white dark:bg-neutral-800 rounded-3xl p-3 shadow-md hover:shadow-xl border border-stone-200/80 dark:border-neutral-700 cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
            >
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden mb-3">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                <span className="absolute top-2 right-2 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] font-bold text-stone-800 dark:text-neutral-200">
                  {cat.itemCount}+ varieties
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-stone-900 dark:text-neutral-100 group-hover:text-[#2E7D32] dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-stone-500 dark:text-neutral-400 mt-1 line-clamp-2 leading-snug">
                  {cat.description}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-stone-100 dark:border-neutral-700/60 flex items-center justify-between text-xs font-semibold text-[#2E7D32] dark:text-emerald-400">
                <span>Browse</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
