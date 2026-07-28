import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CareGuide } from '../types';
import { BookOpen, Sparkles, ArrowLeft, Sun, Droplets, Thermometer, ShieldCheck } from 'lucide-react';

interface CareGuidesPageProps {
  careGuides: CareGuide[];
  selectedGuide: CareGuide | null;
  onSelectGuide: (guide: CareGuide | null) => void;
  onOpenAIAdvisor: () => void;
}

export function CareGuidesPage({
  careGuides,
  selectedGuide,
  onSelectGuide,
  onOpenAIAdvisor
}: CareGuidesPageProps) {
  if (selectedGuide) {
    return (
      <div className="py-12 bg-[#FAF7F0] dark:bg-neutral-900 min-h-screen text-left">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <button
            onClick={() => onSelectGuide(null)}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#2E7D32] dark:text-emerald-400 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Care Guides</span>
          </button>

          <div className="space-y-4">
            <span className="px-3 py-1 rounded-full bg-[#D9EAD3] text-[#2E7D32] text-xs font-bold">
              {selectedGuide.category} • {selectedGuide.readTime}
            </span>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-neutral-100">
              {selectedGuide.title}
            </h1>
            <p className="text-base text-stone-600 dark:text-neutral-300 italic">
              {selectedGuide.subtitle}
            </p>
          </div>

          <div className="aspect-16/9 rounded-3xl overflow-hidden border border-stone-200 dark:border-neutral-700 shadow-lg">
            <img src={selectedGuide.image} alt={selectedGuide.title} className="w-full h-full object-cover" />
          </div>

          <div className="bg-white dark:bg-neutral-800 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-neutral-700 shadow-xs space-y-6 text-xs sm:text-sm text-stone-700 dark:text-neutral-300 leading-relaxed">
            <p className="whitespace-pre-wrap">{selectedGuide.content}</p>

            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
              <div>
                <p className="font-bold text-emerald-900 dark:text-emerald-200">Have a specific plant issue?</p>
                <p className="text-xs text-emerald-700 dark:text-emerald-300">Ask Sprout AI Botanical Care Doctor for custom diagnosis.</p>
              </div>
              <button
                onClick={onOpenAIAdvisor}
                className="px-4 py-2 rounded-xl bg-[#2E7D32] text-white font-bold text-xs shrink-0"
              >
                Ask AI Doctor
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-[#FAF7F0] dark:bg-neutral-900 min-h-screen text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D9EAD3] text-[#2E7D32] text-xs font-bold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Botanical Encyclopedia</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-neutral-100">
            Plant Care & Repotting Masterclass
          </h1>

          <p className="text-xs sm:text-sm text-stone-600 dark:text-neutral-400">
            Learn proper light exposure, watering cadences, soil aeration, pest treatment, and seasonal feeding from our master horticulturalists.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {careGuides.map((guide) => (
            <div
              key={guide.id}
              onClick={() => onSelectGuide(guide)}
              className="group bg-white dark:bg-neutral-800 rounded-3xl overflow-hidden border border-stone-200 dark:border-neutral-700 shadow-xs hover:shadow-xl cursor-pointer transition-all flex flex-col justify-between"
            >
              <div>
                <div className="aspect-16/9 overflow-hidden">
                  <img src={guide.image} alt={guide.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div className="p-5">
                  <span className="text-[10px] font-bold text-[#2E7D32] uppercase">{guide.category} • {guide.readTime}</span>
                  <h3 className="font-serif font-bold text-base text-stone-900 dark:text-neutral-100 mt-1">{guide.title}</h3>
                  <p className="text-xs text-stone-500 dark:text-neutral-400 mt-2 line-clamp-2">{guide.subtitle}</p>
                </div>
              </div>
              <div className="p-5 pt-0 font-bold text-xs text-[#2E7D32] dark:text-emerald-400">
                Read Full Guide →
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
