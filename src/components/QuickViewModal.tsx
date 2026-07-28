import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Star,
  ShieldCheck,
  Sun,
  Droplets,
  Thermometer,
  Sparkles,
  ShoppingBag,
  Heart,
  Check,
  Info
} from 'lucide-react';
import { Plant, PlantSize } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface QuickViewModalProps {
  plant: Plant | null;
  onClose: () => void;
  onViewFullDetails: (plant: Plant) => void;
}

export function QuickViewModal({ plant, onClose, onViewFullDetails }: QuickViewModalProps) {
  if (!plant) return null;

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [selectedImage, setSelectedImage] = useState<string>(plant.image);
  const [selectedSize, setSelectedSize] = useState<PlantSize>(plant.size);
  const [quantity, setQuantity] = useState<number>(1);

  const images = [plant.image, ...(plant.additionalImages || [])];
  const isLiked = isInWishlist(plant.id);

  const handleAddToCart = () => {
    addToCart(plant, quantity, selectedSize);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl border border-stone-200 dark:border-neutral-700 overflow-hidden z-10 max-h-[90vh] flex flex-col md:flex-row"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-stone-100 dark:bg-neutral-700 text-stone-600 dark:text-neutral-200 hover:bg-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Column: Image Gallery */}
          <div className="md:w-1/2 p-6 bg-stone-50 dark:bg-neutral-900/50 flex flex-col justify-between">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white dark:bg-neutral-800 mb-4 border border-stone-200/80 dark:border-neutral-700">
              <img
                src={selectedImage}
                alt={plant.name}
                className="w-full h-full object-cover"
              />
              {plant.petFriendly && (
                <span className="absolute top-3 left-3 bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Pet Friendly
                </span>
              )}
            </div>

            {/* Thumbnail Row */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === img
                        ? 'border-[#2E7D32] scale-105'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Plant Specifications & Add to Cart */}
          <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between text-left overflow-y-auto">
            <div>
              <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-neutral-400 font-medium mb-1">
                <span>{plant.category}</span>
                <span>•</span>
                <span className="text-[#2E7D32] dark:text-emerald-400 font-bold">{plant.difficulty} Care</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-neutral-100 mb-1">
                {plant.name}
              </h2>
              <p className="text-xs italic text-stone-500 dark:text-neutral-400 mb-4">
                {plant.scientificName}
              </p>

              {/* Price & Rating */}
              <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-neutral-700 mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-[#2E7D32] dark:text-emerald-400">
                    ${plant.price}
                  </span>
                  {plant.originalPrice && (
                    <span className="text-sm text-stone-400 line-through">
                      ${plant.originalPrice}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-full text-xs font-bold text-amber-700 dark:text-amber-300">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{plant.rating}</span>
                  <span className="text-stone-400 font-normal">({plant.reviewsCount})</span>
                </div>
              </div>

              {/* Quick Description */}
              <p className="text-xs text-stone-600 dark:text-neutral-300 leading-relaxed mb-4">
                {plant.description}
              </p>

              {/* Specifications Pills Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs mb-6">
                <div className="p-2.5 rounded-xl bg-stone-100 dark:bg-neutral-700/50 flex items-center gap-2">
                  <Sun className="w-4 h-4 text-amber-500 shrink-0" />
                  <div>
                    <p className="text-[10px] text-stone-400">Sunlight</p>
                    <p className="font-semibold text-stone-800 dark:text-neutral-200">{plant.sunlight}</p>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-stone-100 dark:bg-neutral-700/50 flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-cyan-500 shrink-0" />
                  <div>
                    <p className="text-[10px] text-stone-400">Watering</p>
                    <p className="font-semibold text-stone-800 dark:text-neutral-200">{plant.waterFrequency}</p>
                  </div>
                </div>
              </div>

              {/* Pot Size Selection */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-stone-800 dark:text-neutral-200 mb-2">
                  Select Plant Size
                </label>
                <div className="flex gap-2">
                  {(['Small', 'Medium', 'Large', 'Extra Large'] as PlantSize[]).map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                        selectedSize === sz
                          ? 'border-[#2E7D32] bg-[#D9EAD3]/60 text-[#2E7D32] dark:bg-emerald-950 dark:text-emerald-300'
                          : 'border-stone-200 dark:border-neutral-700 text-stone-600 dark:text-neutral-400 hover:border-stone-400'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 mb-6">
                <label className="text-xs font-bold text-stone-800 dark:text-neutral-200">
                  Quantity
                </label>
                <div className="flex items-center border border-stone-200 dark:border-neutral-700 rounded-xl overflow-hidden bg-stone-50 dark:bg-neutral-900">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-1.5 text-stone-600 hover:bg-stone-200 dark:hover:bg-neutral-700"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-xs font-bold text-stone-800 dark:text-neutral-100">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-1.5 text-stone-600 hover:bg-stone-200 dark:hover:bg-neutral-700"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-4 border-t border-stone-100 dark:border-neutral-700">
              <div className="flex gap-2">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 rounded-2xl bg-[#2E7D32] hover:bg-[#4CAF50] text-white font-bold text-xs shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add ${plant.price * quantity} to Cart</span>
                </button>

                <button
                  onClick={() => toggleWishlist(plant)}
                  className={`p-3.5 rounded-2xl border transition-all ${
                    isLiked
                      ? 'bg-rose-500 border-rose-500 text-white'
                      : 'border-stone-200 dark:border-neutral-700 text-stone-700 dark:text-neutral-300 hover:border-stone-400'
                  }`}
                >
                  <Heart className="w-4 h-4 fill-current" />
                </button>
              </div>

              <button
                onClick={() => {
                  onViewFullDetails(plant);
                  onClose();
                }}
                className="w-full py-2.5 text-xs font-semibold text-[#2E7D32] dark:text-emerald-400 hover:underline flex items-center justify-center gap-1"
              >
                <Info className="w-3.5 h-3.5" />
                <span>View Full Botanical Specifications & Reviews</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
