import React from 'react';
import { Sprout, ShieldCheck, Truck, HeartHandshake, Award, Users } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="py-12 bg-[#FAF7F0] dark:bg-neutral-900 min-h-screen text-left">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D9EAD3] text-[#2E7D32] text-xs font-bold">
            <Sprout className="w-3.5 h-3.5" />
            <span>Our Botanical Mission</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-neutral-100">
            Reconnecting Modern Work & Living Spaces with Nature
          </h1>
          <p className="text-stone-600 dark:text-neutral-400 text-xs sm:text-sm leading-relaxed">
            Founded in 2021 in Oregon, Verdant was created on a simple premise: everyone deserves access to healthy, sustainably grown plants with transparent care support.
          </p>
        </div>

        <div className="aspect-21/9 rounded-3xl overflow-hidden border border-stone-200 dark:border-neutral-700 shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1470058869958-2a77ade41c02?auto=format&fit=crop&q=80&w=1200"
            alt="Verdant Botanical Greenhouse Nursery"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700">
            <Award className="w-8 h-8 text-[#2E7D32] mb-3" />
            <h3 className="font-serif font-bold text-base text-stone-900 dark:text-neutral-100 mb-2">Sustainable Nurseries</h3>
            <p className="text-xs text-stone-500 leading-relaxed">We partner directly with family-owned greenhouses utilizing organic potting media and zero chemical runoff.</p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700">
            <ShieldCheck className="w-8 h-8 text-[#2E7D32] mb-3" />
            <h3 className="font-serif font-bold text-base text-stone-900 dark:text-neutral-100 mb-2">Health Arrival Guarantee</h3>
            <p className="text-xs text-stone-500 leading-relaxed">Every plant undergoes 3 rigorous quality inspections before being packaged in custom shock-absorbing boxes.</p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700">
            <Users className="w-8 h-8 text-[#2E7D32] mb-3" />
            <h3 className="font-serif font-bold text-base text-stone-900 dark:text-neutral-100 mb-2">Lifetime Plant Doctor</h3>
            <p className="text-xs text-stone-500 leading-relaxed">Our AI Assistant Sprout and human plant parents guide your green journey every step of the way.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
