import React, { useState, useMemo } from 'react';
import { Plant, FilterState } from '../types';
import { ShopFilters } from '../components/ShopFilters';
import { ProductCard } from '../components/ProductCard';
import { Search, X, SlidersHorizontal, ArrowUpDown, Sprout } from 'lucide-react';

interface ShopPageProps {
  plants: Plant[];
  categories: string[];
  initialCategory?: string;
  onOpenQuickView: (plant: Plant) => void;
  onSelectPlant: (plant: Plant) => void;
}

export function ShopPage({
  plants,
  categories,
  initialCategory,
  onOpenQuickView,
  onSelectPlant
}: ShopPageProps) {
  const [filters, setFilters] = useState<FilterState>({
    category: initialCategory || 'All',
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

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter and Sort Logic
  const filteredPlants = useMemo(() => {
    return plants.filter((plant) => {
      // Category match
      if (filters.category !== 'All' && plant.category !== filters.category) return false;

      // Price match
      if (plant.price > filters.maxPrice) return false;

      // Sunlight
      if (filters.sunlight !== 'All' && plant.sunlight !== filters.sunlight) return false;

      // Size
      if (filters.size !== 'All' && plant.size !== filters.size) return false;

      // Pet Friendly
      if (filters.petFriendlyOnly && !plant.petFriendly) return false;

      // Air Purifying
      if (filters.airPurifyingOnly && !plant.airPurifying) return false;

      // Search
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const matchesName = plant.name.toLowerCase().includes(q);
        const matchesCat = plant.category.toLowerCase().includes(q);
        const matchesTag = plant.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesName && !matchesCat && !matchesTag) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-low') return a.price - b.price;
      if (filters.sortBy === 'price-high') return b.price - a.price;
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      if (filters.sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return b.reviewsCount - a.reviewsCount; // popular
    });
  }, [plants, filters]);

  const activeFilterCount =
    (filters.category !== 'All' ? 1 : 0) +
    (filters.maxPrice < 200 ? 1 : 0) +
    (filters.sunlight !== 'All' ? 1 : 0) +
    (filters.size !== 'All' ? 1 : 0) +
    (filters.petFriendlyOnly ? 1 : 0) +
    (filters.airPurifyingOnly ? 1 : 0) +
    (filters.searchQuery.trim() ? 1 : 0);

  return (
    <div className="py-10 bg-[#FAF7F0] dark:bg-neutral-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        {/* Top Header & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-neutral-100">
              Shop Botanical Collection
            </h1>
            <p className="text-xs text-stone-500 dark:text-neutral-400 mt-1">
              Showing {filteredPlants.length} of {plants.length} sustainably raised plants
            </p>
          </div>

          {/* Controls Bar */}
          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={filters.searchQuery}
                onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                placeholder="Filter catalog..."
                className="w-full pl-9 pr-8 py-2 text-xs rounded-2xl bg-white dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 text-stone-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
              />
              {filters.searchQuery && (
                <button
                  onClick={() => setFilters({ ...filters, searchQuery: '' })}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as any })}
                className="px-3 py-2 text-xs rounded-2xl bg-white dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 text-stone-800 dark:text-neutral-100 font-semibold cursor-pointer"
              >
                <option value="popular">Sort by: Popularity</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden p-2 rounded-2xl bg-[#2E7D32] text-white flex items-center gap-1.5 text-xs font-bold"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filter ({activeFilterCount})</span>
            </button>
          </div>
        </div>

        {/* Active Filter Badges */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-xs text-stone-400 font-medium">Active filters:</span>
            {filters.category !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#D9EAD3] text-[#2E7D32] text-xs font-bold">
                Category: {filters.category}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setFilters({ ...filters, category: 'All' })} />
              </span>
            )}
            {filters.petFriendlyOnly && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                Pet Safe
                <X className="w-3 h-3 cursor-pointer" onClick={() => setFilters({ ...filters, petFriendlyOnly: false })} />
              </span>
            )}
            {filters.airPurifyingOnly && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold">
                Air Purifying
                <X className="w-3 h-3 cursor-pointer" onClick={() => setFilters({ ...filters, airPurifyingOnly: false })} />
              </span>
            )}
          </div>
        )}

        {/* Main Grid & Sidebar Layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Sidebar Filters */}
          <div className={`w-full lg:w-64 ${mobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
            <ShopFilters
              filters={filters}
              onFilterChange={setFilters}
              categories={categories}
              totalResults={filteredPlants.length}
            />
          </div>

          {/* Product Grid */}
          <div className="flex-1 w-full">
            {filteredPlants.length === 0 ? (
              <div className="text-center py-20 bg-white dark:bg-neutral-800 rounded-3xl p-8 border border-stone-200 dark:border-neutral-700">
                <div className="w-16 h-16 rounded-3xl bg-stone-100 dark:bg-neutral-700 flex items-center justify-center mx-auto text-stone-400 mb-3">
                  <Sprout className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-stone-800 dark:text-neutral-200 text-lg">
                  No plants match your filter criteria
                </h3>
                <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                  Try adjusting your price slider, clearing pet-friendly filters, or searching for a different keyword.
                </p>
                <button
                  onClick={() =>
                    setFilters({
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
                    })
                  }
                  className="mt-4 px-5 py-2.5 rounded-xl bg-[#2E7D32] text-white font-bold text-xs"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPlants.map((plant) => (
                  <ProductCard
                    key={plant.id}
                    plant={plant}
                    onQuickView={onOpenQuickView}
                    onSelectProduct={onSelectPlant}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
