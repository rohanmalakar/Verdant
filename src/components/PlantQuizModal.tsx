import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, HelpCircle, ArrowRight, ShieldCheck, Check, Sparkles, ShoppingBag } from 'lucide-react';
import { Plant } from '../types';
import { useCart } from '../context/CartContext';

interface PlantQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  allPlants: Plant[];
  onSelectPlant: (plant: Plant) => void;
}

export function PlantQuizModal({ isOpen, onClose, allPlants, onSelectPlant }: PlantQuizModalProps) {
  if (!isOpen) return null;

  const { addToCart } = useCart();
  const [step, setStep] = useState(1);
  const [locationAnswer, setLocationAnswer] = useState<string>('Indoor');
  const [experienceAnswer, setExperienceAnswer] = useState<string>('Easy');
  const [petAnswer, setPetAnswer] = useState<boolean>(false);
  const [matches, setMatches] = useState<Plant[]>([]);

  const handleCompleteQuiz = () => {
    const filtered = allPlants.filter((p) => {
      let matchesLoc = true;
      let matchesPet = true;
      let matchesDiff = true;

      if (petAnswer) matchesPet = p.petFriendly === true;
      if (experienceAnswer === 'Easy') matchesDiff = p.difficulty === 'Easy';

      return matchesPet && matchesDiff;
    });

    setMatches(filtered.slice(0, 3));
    setStep(4); // Results step
  };

  const handleReset = () => {
    setStep(1);
    setLocationAnswer('Indoor');
    setExperienceAnswer('Easy');
    setPetAnswer(false);
    setMatches([]);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl border border-stone-200 dark:border-neutral-700 overflow-hidden z-10 p-6 sm:p-8 text-left"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 dark:bg-neutral-700 text-stone-600 dark:text-neutral-200 hover:bg-stone-200"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-2">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Plant Matchmaker</span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-neutral-100">
              Find Your Ideal Plant Match
            </h2>
            <p className="text-xs text-stone-500 dark:text-neutral-400 mt-1">
              Answer 3 quick questions to uncover plants suited to your light and lifestyle.
            </p>
          </div>

          {/* Step 1: Location */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-stone-800 dark:text-neutral-200">
                1. Where will your new plant reside?
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { title: 'Bedroom / Dim Room', val: 'Low Light' },
                  { title: 'Sunlit Living Room', val: 'Bright Indirect' },
                  { title: 'Patio / Balcony', val: 'Outdoor' },
                  { title: 'Office Desk', val: 'Desk' }
                ].map((opt) => (
                  <button
                    key={opt.title}
                    onClick={() => {
                      setLocationAnswer(opt.val);
                      setStep(2);
                    }}
                    className="p-4 rounded-2xl border border-stone-200 dark:border-neutral-700 hover:border-[#2E7D32] hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-left transition-all"
                  >
                    <p className="text-xs font-bold text-stone-800 dark:text-neutral-100">{opt.title}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Experience */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-stone-800 dark:text-neutral-200">
                2. How often do you remember to water?
              </h3>
              <div className="space-y-2">
                {[
                  { title: 'I constantly forget (Low Maintenance Required)', val: 'Easy' },
                  { title: 'Weekly routine care is fine', val: 'Moderate' },
                  { title: 'I love meticulous daily care & misting', val: 'Expert' }
                ].map((opt) => (
                  <button
                    key={opt.title}
                    onClick={() => {
                      setExperienceAnswer(opt.val);
                      setStep(3);
                    }}
                    className="w-full p-4 rounded-2xl border border-stone-200 dark:border-neutral-700 hover:border-[#2E7D32] hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-left transition-all"
                  >
                    <p className="text-xs font-bold text-stone-800 dark:text-neutral-100">{opt.title}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Pets */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-stone-800 dark:text-neutral-200">
                3. Do you have curious cats or dogs?
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    setPetAnswer(true);
                    handleCompleteQuiz();
                  }}
                  className="p-4 rounded-2xl border border-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 text-left transition-all flex flex-col justify-between"
                >
                  <ShieldCheck className="w-6 h-6 text-emerald-600 mb-2" />
                  <p className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                    Yes (Strictly Pet Safe)
                  </p>
                </button>

                <button
                  onClick={() => {
                    setPetAnswer(false);
                    handleCompleteQuiz();
                  }}
                  className="p-4 rounded-2xl border border-stone-200 dark:border-neutral-700 hover:border-stone-400 text-left transition-all flex flex-col justify-between"
                >
                  <Sparkles className="w-6 h-6 text-stone-400 mb-2" />
                  <p className="text-xs font-bold text-stone-800 dark:text-neutral-100">
                    No Pets / Out of reach
                  </p>
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Results */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-stone-800 dark:text-neutral-200 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>Your Curated Plant Matches ({matches.length})</span>
                </h3>
                <button onClick={handleReset} className="text-xs text-[#2E7D32] hover:underline font-semibold">
                  Retake Quiz
                </button>
              </div>

              <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {matches.map((plant) => (
                  <div
                    key={plant.id}
                    className="p-3 rounded-2xl bg-stone-50 dark:bg-neutral-900 border border-stone-200 dark:border-neutral-700 flex items-center justify-between gap-3"
                  >
                    <img src={plant.image} alt={plant.name} className="w-14 h-14 rounded-xl object-cover" />
                    <div className="flex-1 min-w-0 text-left">
                      <p className="text-xs font-bold text-stone-800 dark:text-neutral-100 truncate">{plant.name}</p>
                      <p className="text-[10px] text-stone-500">${plant.price} • {plant.difficulty} Care</p>
                    </div>

                    <button
                      onClick={() => {
                        addToCart(plant, 1);
                        onClose();
                      }}
                      className="px-3 py-1.5 rounded-xl bg-[#2E7D32] hover:bg-[#4CAF50] text-white text-xs font-bold shadow-xs shrink-0 flex items-center gap-1"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
