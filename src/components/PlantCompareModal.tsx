import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, GitCompare, ShieldCheck, Sun, Droplets, ShoppingBag } from 'lucide-react';
import { Plant } from '../types';
import { useCart } from '../context/CartContext';

interface PlantCompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  allPlants: Plant[];
}

export function PlantCompareModal({ isOpen, onClose, allPlants }: PlantCompareModalProps) {
  if (!isOpen) return null;

  const { addToCart } = useCart();
  const [selectedIds, setSelectedIds] = useState<string[]>([
    allPlants[0]?.id || '',
    allPlants[1]?.id || ''
  ]);

  const selectedPlants = selectedIds
    .map((id) => allPlants.find((p) => p.id === id))
    .filter((p): p is Plant => p !== undefined);

  const handleSelectChange = (index: number, newId: string) => {
    const copy = [...selectedIds];
    copy[index] = newId;
    setSelectedIds(copy);
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
          className="relative w-full max-w-4xl bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl border border-stone-200 dark:border-neutral-700 overflow-hidden z-10 p-6 sm:p-8 text-left max-h-[90vh] flex flex-col"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 dark:bg-neutral-700 text-stone-600 dark:text-neutral-200 hover:bg-stone-200"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D9EAD3] text-[#2E7D32] text-xs font-bold mb-2">
              <GitCompare className="w-3.5 h-3.5" />
              <span>Plant Feature Matrix</span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-neutral-100">
              Side-by-Side Plant Comparison
            </h2>
          </div>

          {/* Selectors Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
            {[0, 1, 2].map((idx) => (
              <div key={idx}>
                <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">
                  Select Plant {idx + 1}
                </label>
                <select
                  value={selectedIds[idx] || ''}
                  onChange={(e) => handleSelectChange(idx, e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-stone-100 dark:bg-neutral-700 border border-stone-200 dark:border-neutral-600 text-stone-800 dark:text-neutral-100 font-medium"
                >
                  <option value="">-- None --</option>
                  {allPlants.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} (${p.price})
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          {/* Comparison Table */}
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-stone-200 dark:border-neutral-700">
                  <th className="p-3 font-bold text-stone-400 w-1/4">Specification</th>
                  {selectedPlants.map((plant) => (
                    <th key={plant.id} className="p-3 font-bold text-stone-900 dark:text-neutral-100 text-center">
                      <img src={plant.image} alt={plant.name} className="w-16 h-16 rounded-xl object-cover mx-auto mb-2" />
                      <p className="font-bold">{plant.name}</p>
                      <p className="text-[#2E7D32] font-semibold">${plant.price}</p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-neutral-700/60">
                <tr>
                  <td className="p-3 font-bold text-stone-500">Category</td>
                  {selectedPlants.map((p) => (
                    <td key={p.id} className="p-3 text-center">{p.category}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-bold text-stone-500">Sunlight</td>
                  {selectedPlants.map((p) => (
                    <td key={p.id} className="p-3 text-center font-medium">{p.sunlight}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-bold text-stone-500">Watering</td>
                  {selectedPlants.map((p) => (
                    <td key={p.id} className="p-3 text-center font-medium">{p.waterFrequency}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-bold text-stone-500">Pet Safety</td>
                  {selectedPlants.map((p) => (
                    <td key={p.id} className="p-3 text-center font-bold">
                      {p.petFriendly ? (
                        <span className="text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">Safe</span>
                      ) : (
                        <span className="text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">Toxic to Pets</span>
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-bold text-stone-500">Care Difficulty</td>
                  {selectedPlants.map((p) => (
                    <td key={p.id} className="p-3 text-center font-semibold">{p.difficulty}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-bold text-stone-500">Air Purifying</td>
                  {selectedPlants.map((p) => (
                    <td key={p.id} className="p-3 text-center">{p.airPurifying ? 'Yes (NASA Rated)' : 'Standard'}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-bold text-stone-500">Action</td>
                  {selectedPlants.map((p) => (
                    <td key={p.id} className="p-3 text-center">
                      <button
                        onClick={() => addToCart(p, 1)}
                        className="px-3 py-1.5 rounded-xl bg-[#2E7D32] hover:bg-[#4CAF50] text-white text-xs font-bold"
                      >
                        Add ${p.price}
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
