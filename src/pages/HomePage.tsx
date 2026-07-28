import React from 'react';
import { motion } from 'motion/react';
import { Hero } from '../components/Hero';
import { FeaturedCategories } from '../components/FeaturedCategories';
import { ProductCard } from '../components/ProductCard';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { Newsletter } from '../components/Newsletter';
import { Plant, Category, CareGuide } from '../types';
import { Sparkles, ArrowRight, BookOpen, Star, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/testimonials';

interface HomePageProps {
  plants: Plant[];
  categories: Category[];
  careGuides: CareGuide[];
  onSelectCategory: (catName: string) => void;
  onShopNow: () => void;
  onOpenQuickView: (plant: Plant) => void;
  onSelectPlant: (plant: Plant) => void;
  onOpenQuiz: () => void;
  onOpenAIAdvisor: () => void;
  onSearchSubmit: (query: string) => void;
  onSelectGuide: (guide: CareGuide) => void;
}

export function HomePage({
  plants,
  categories,
  careGuides,
  onSelectCategory,
  onShopNow,
  onOpenQuickView,
  onSelectPlant,
  onOpenQuiz,
  onOpenAIAdvisor,
  onSearchSubmit,
  onSelectGuide
}: HomePageProps) {
  const bestSellers = plants.filter((p) => p.isBestSeller || p.rating >= 4.85).slice(0, 4);

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <Hero
        onShopNow={onShopNow}
        onOpenQuiz={onOpenQuiz}
        onOpenAIAdvisor={onOpenAIAdvisor}
        onSearchSubmit={onSearchSubmit}
      />

      {/* Featured Categories */}
      <FeaturedCategories
        categories={categories}
        onSelectCategory={(catName) => {
          onSelectCategory(catName);
          onShopNow();
        }}
      />

      {/* Best Sellers Section */}
      <section className="py-16 bg-[#FAF7F0] dark:bg-neutral-900 border-t border-stone-200/60 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2E7D32] dark:text-emerald-400 uppercase tracking-widest mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Customer Favorites</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-neutral-100">
                Best Selling Plants
              </h2>
            </div>

            <button
              onClick={onShopNow}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#2E7D32] dark:text-emerald-400 hover:underline"
            >
              <span>View All Plants ({plants.length})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((plant) => (
              <ProductCard
                key={plant.id}
                plant={plant}
                onQuickView={onOpenQuickView}
                onSelectProduct={onSelectPlant}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Plant Care Guides Preview Section */}
      <section className="py-16 bg-[#FAF7F0] dark:bg-neutral-900 border-t border-stone-200/60 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2E7D32] dark:text-emerald-400 uppercase tracking-widest mb-2">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Botanical Wisdom</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-neutral-100">
                Plant Care & Repotting Guides
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {careGuides.map((guide) => (
              <motion.div
                key={guide.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onClick={() => onSelectGuide(guide)}
                className="group bg-white dark:bg-neutral-800 rounded-3xl overflow-hidden border border-stone-200/80 dark:border-neutral-700 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-16/9 overflow-hidden">
                    <img
                      src={guide.image}
                      alt={guide.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-white/90 dark:bg-neutral-900/90 text-stone-800 dark:text-neutral-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                      {guide.category}
                    </span>
                  </div>

                  <div className="p-5">
                    <p className="text-[10px] font-semibold text-stone-400 mb-1">{guide.readTime}</p>
                    <h3 className="font-serif font-bold text-base text-stone-900 dark:text-neutral-100 group-hover:text-[#2E7D32] transition-colors line-clamp-2">
                      {guide.title}
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-neutral-400 mt-2 line-clamp-2 leading-relaxed">
                      {guide.subtitle}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center gap-1 text-xs font-bold text-[#2E7D32] dark:text-emerald-400">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonials Carousel/Grid */}
      <section className="py-16 bg-white dark:bg-neutral-900 border-t border-stone-200/60 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Quote className="w-10 h-10 text-[#2E7D32]/30 mx-auto mb-2" />
          <h2 className="font-serif text-3xl font-bold text-stone-900 dark:text-neutral-100 mb-10">
            Loved By 10,000+ Plant Parents
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="p-6 rounded-3xl bg-[#FAF7F0] dark:bg-neutral-800/80 border border-stone-200/80 dark:border-neutral-700/80 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-stone-700 dark:text-neutral-300 italic leading-relaxed mb-4">
                    "{t.comment}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-stone-200/60 dark:border-neutral-700/60">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-stone-900 dark:text-neutral-100">{t.name}</h4>
                    <p className="text-[10px] text-stone-500">{t.role} • {t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />
    </div>
  );
}
