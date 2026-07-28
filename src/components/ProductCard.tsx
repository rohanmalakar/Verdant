import React from 'react';
import { motion } from 'motion/react';
import {
  Star,
  Heart,
  ShoppingBag,
  Eye,
  ShieldCheck,
  Wind,
  Sun,
  Droplets
} from 'lucide-react';
import { Plant } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface ProductCardProps {
  key?: React.Key;
  plant: Plant;
  onQuickView: (plant: Plant) => void;
  onSelectProduct?: (plant: Plant) => void;
}

export function ProductCard({ plant, onQuickView, onSelectProduct }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isLiked = isInWishlist(plant.id);

  const discountPercent =
    plant.originalPrice && plant.originalPrice > plant.price
      ? Math.round(((plant.originalPrice - plant.price) / plant.originalPrice) * 100)
      : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-white dark:bg-neutral-800 rounded-3xl p-3 shadow-sm hover:shadow-xl border border-stone-200/80 dark:border-neutral-700/80 transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        {/* Image Container */}
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-stone-100 dark:bg-neutral-900 mb-3">
          <img
            src={plant.image}
            alt={plant.name}
            onClick={() => onSelectProduct?.(plant)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
          />

          {/* Badges Top Left */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
            {plant.isBestSeller && (
              <span className="bg-[#2E7D32] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                Best Seller
              </span>
            )}
            {discountPercent > 0 && (
              <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                -{discountPercent}% OFF
              </span>
            )}
            {plant.petFriendly && (
              <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-emerald-300/60 dark:border-emerald-800 flex items-center gap-1 shadow-xs">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                <span>Pet Safe</span>
              </span>
            )}
          </div>

          {/* Wishlist Heart Top Right */}
          <button
            onClick={() => toggleWishlist(plant)}
            className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md shadow-md transition-all ${
              isLiked
                ? 'bg-rose-500 text-white'
                : 'bg-white/80 dark:bg-neutral-900/80 text-stone-700 dark:text-neutral-200 hover:bg-white'
            }`}
            title={isLiked ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart className="w-4 h-4 fill-current" />
          </button>

          {/* Quick View Hover Action Overlay */}
          <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
            <button
              onClick={() => onQuickView(plant)}
              className="flex-1 py-2 rounded-xl bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md text-stone-900 dark:text-neutral-100 text-xs font-bold shadow-md hover:bg-white flex items-center justify-center gap-1.5 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Quick View</span>
            </button>
          </div>
        </div>

        {/* Product Meta */}
        <div className="text-left px-1">
          <div className="flex items-center justify-between gap-1 text-[11px] text-stone-500 dark:text-neutral-400 mb-1">
            <span className="truncate">{plant.category}</span>
            <div className="flex items-center gap-1 shrink-0 text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{plant.rating}</span>
              <span className="text-stone-400 font-normal">({plant.reviewsCount})</span>
            </div>
          </div>

          <h3
            onClick={() => onSelectProduct?.(plant)}
            className="font-serif text-base font-bold text-stone-900 dark:text-neutral-100 hover:text-[#2E7D32] dark:hover:text-emerald-400 cursor-pointer line-clamp-1 transition-colors"
          >
            {plant.name}
          </h3>

          <p className="text-[11px] italic text-stone-500 dark:text-neutral-400 mb-2 truncate">
            {plant.scientificName}
          </p>

          {/* Attribute Badges Row */}
          <div className="flex items-center gap-2 text-[10px] text-stone-600 dark:text-neutral-300 mb-3">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-stone-100 dark:bg-neutral-700/60">
              <Sun className="w-3 h-3 text-amber-500" />
              {plant.sunlight}
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-stone-100 dark:bg-neutral-700/60">
              <Droplets className="w-3 h-3 text-cyan-500" />
              {plant.waterFrequency}
            </span>
          </div>
        </div>
      </div>

      {/* Price & Add To Cart Button */}
      <div className="pt-2 border-t border-stone-100 dark:border-neutral-700/80 flex items-center justify-between gap-2 px-1">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-bold text-stone-900 dark:text-neutral-100">
              ${plant.price}
            </span>
            {plant.originalPrice && plant.originalPrice > plant.price && (
              <span className="text-xs text-stone-400 line-through">
                ${plant.originalPrice}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={() => addToCart(plant, 1)}
          className="px-3.5 py-2 rounded-xl bg-[#2E7D32] hover:bg-[#4CAF50] text-white text-xs font-bold shadow-md active:scale-95 transition-all flex items-center gap-1.5"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Add</span>
        </button>
      </div>
    </motion.div>
  );
}
