import React from 'react';
import { FilterState, PlantSize, SunlightRequirement, WaterRequirement } from '../types';
import {
  RotateCcw,
  ShieldCheck,
  Wind,
  Sun,
  Droplets,
  SlidersHorizontal,
  Star,
  Check
} from 'lucide-react';

interface ShopFiltersProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  categories: string[];
  totalResults: number;
}

export function ShopFilters({ filters, onFilterChange, categories, totalResults }: ShopFiltersProps) {
  const handleCategoryChange = (cat: string) => {
    onFilterChange({ ...filters, category: cat });
  };

  const handlePriceChange = (max: number) => {
    onFilterChange({ ...filters, maxPrice: max });
  };

  const handleTogglePetFriendly = () => {
    onFilterChange({ ...filters, petFriendlyOnly: !filters.petFriendlyOnly });
  };

  const handleToggleAirPurifying = () => {
    onFilterChange({ ...filters, airPurifyingOnly: !filters.airPurifyingOnly });
  };

  const handleReset = () => {
    onFilterChange({
      category: 'All',
      minPrice: 0,
      maxPrice: 200,
      sunlight: 'All',
      waterFrequency: 'All',
      location: 'All',
      size: 'All',
      petFriendlyOnly: false,
      airPurifyingOnly: false,
      minRating: 0,
      searchQuery: '',
      sortBy: 'popular'
    });
  };

  return (
    <aside className="w-full lg:w-64 bg-white dark:bg-neutral-800 rounded-3xl p-6 border border-stone-200/80 dark:border-neutral-700 shadow-sm text-left space-y-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-neutral-700">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-[#2E7D32] dark:text-emerald-400" />
          <h3 className="font-bold text-sm text-stone-900 dark:text-neutral-100">
            Filters ({totalResults})
          </h3>
        </div>

        <button
          onClick={handleReset}
          className="text-xs text-stone-400 hover:text-stone-700 dark:hover:text-neutral-200 flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Categories List */}
      <div>
        <h4 className="text-xs font-bold text-stone-800 dark:text-neutral-200 uppercase tracking-wider mb-3">
          Categories
        </h4>
        <div className="space-y-1">
          {['All', ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${
                filters.category === cat
                  ? 'bg-[#D9EAD3]/80 text-[#2E7D32] dark:bg-emerald-950 dark:text-emerald-300 font-bold'
                  : 'text-stone-600 dark:text-neutral-400 hover:bg-stone-100 dark:hover:bg-neutral-700/50'
              }`}
            >
              <span>{cat}</span>
              {filters.category === cat && <Check className="w-3.5 h-3.5 text-[#2E7D32]" />}
            </button>
          ))}
        </div>
      </div>

      {/* Special Safety & Air Badges Toggle */}
      <div className="space-y-2 pt-2 border-t border-stone-100 dark:border-neutral-700">
        <label className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200/50 dark:border-emerald-800 cursor-pointer">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-semibold text-emerald-900 dark:text-emerald-200">
              Pet-Friendly Only
            </span>
          </div>
          <input
            type="checkbox"
            checked={filters.petFriendlyOnly}
            onChange={handleTogglePetFriendly}
            className="w-4 h-4 accent-[#2E7D32] rounded cursor-pointer"
          />
        </label>

        <label className="flex items-center justify-between p-2.5 rounded-xl bg-cyan-50/60 dark:bg-cyan-950/40 border border-cyan-200/50 dark:border-cyan-800 cursor-pointer">
          <div className="flex items-center gap-2">
            <Wind className="w-4 h-4 text-cyan-600" />
            <span className="text-xs font-semibold text-cyan-900 dark:text-cyan-200">
              Air-Purifying
            </span>
          </div>
          <input
            type="checkbox"
            checked={filters.airPurifyingOnly}
            onChange={handleToggleAirPurifying}
            className="w-4 h-4 accent-[#2E7D32] rounded cursor-pointer"
          />
        </label>
      </div>

      {/* Price Range Slider */}
      <div className="pt-2 border-t border-stone-100 dark:border-neutral-700">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-bold text-stone-800 dark:text-neutral-200 uppercase tracking-wider">
            Max Price
          </h4>
          <span className="text-xs font-bold text-[#2E7D32] dark:text-emerald-400">
            ${filters.maxPrice}
          </span>
        </div>
        <input
          type="range"
          min="15"
          max="200"
          step="5"
          value={filters.maxPrice}
          onChange={(e) => handlePriceChange(Number(e.target.value))}
          className="w-full accent-[#2E7D32] cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-stone-400 mt-1">
          <span>$15</span>
          <span>$200+</span>
        </div>
      </div>

      {/* Sunlight Requirement */}
      <div className="pt-2 border-t border-stone-100 dark:border-neutral-700">
        <h4 className="text-xs font-bold text-stone-800 dark:text-neutral-200 uppercase tracking-wider mb-2">
          Sunlight Need
        </h4>
        <div className="space-y-1">
          {['All', 'Low Light', 'Partial Shade', 'Bright Indirect', 'Direct Sun'].map((sun) => (
            <button
              key={sun}
              onClick={() => onFilterChange({ ...filters, sunlight: sun })}
              className={`w-full text-left px-2.5 py-1 rounded-lg text-xs font-medium ${
                filters.sunlight === sun
                  ? 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200 font-bold'
                  : 'text-stone-600 dark:text-neutral-400 hover:bg-stone-100 dark:hover:bg-neutral-700/40'
              }`}
            >
              {sun}
            </button>
          ))}
        </div>
      </div>

      {/* Plant Size */}
      <div className="pt-2 border-t border-stone-100 dark:border-neutral-700">
        <h4 className="text-xs font-bold text-stone-800 dark:text-neutral-200 uppercase tracking-wider mb-2">
          Plant Size
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {['All', 'Small', 'Medium', 'Large', 'Extra Large'].map((sz) => (
            <button
              key={sz}
              onClick={() => onFilterChange({ ...filters, size: sz })}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${
                filters.size === sz
                  ? 'border-[#2E7D32] bg-[#D9EAD3]/60 text-[#2E7D32] dark:bg-emerald-950 dark:text-emerald-300'
                  : 'border-stone-200 dark:border-neutral-700 text-stone-600 dark:text-neutral-400'
              }`}
            >
              {sz}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
