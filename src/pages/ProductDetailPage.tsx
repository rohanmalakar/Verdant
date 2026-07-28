import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Star,
  ShieldCheck,
  Sun,
  Droplets,
  Thermometer,
  Wind,
  ShoppingBag,
  Heart,
  ArrowLeft,
  Check,
  Send,
  MessageSquare
} from 'lucide-react';
import { Plant, PlantSize, Review } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { ProductCard } from '../components/ProductCard';

interface ProductDetailPageProps {
  plant: Plant;
  allPlants: Plant[];
  onBack: () => void;
  onOpenQuickView: (plant: Plant) => void;
  onSelectPlant: (plant: Plant) => void;
}

export function ProductDetailPage({
  plant,
  allPlants,
  onBack,
  onOpenQuickView,
  onSelectPlant
}: ProductDetailPageProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  const [activeImage, setActiveImage] = useState<string>(plant.image);
  const [selectedSize, setSelectedSize] = useState<PlantSize>(plant.size);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'care' | 'reviews' | 'description'>('care');

  // Review Form State
  const [newRating, setNewRating] = useState<number>(5);
  const [newComment, setNewComment] = useState<string>('');
  const [reviewsList, setReviewsList] = useState<Review[]>([
    {
      id: 'r-1',
      plantId: plant.id,
      userName: 'Clara Oswald',
      rating: 5,
      date: '3 days ago',
      comment: 'Arrived in perfect condition with 2 new unfurling leaves! The soil was still moist and fresh.',
      verifiedPurchase: true
    },
    {
      id: 'r-2',
      plantId: plant.id,
      userName: 'David Miller',
      rating: 5,
      date: '2 weeks ago',
      comment: 'Super easy to care for. Matches my mid-century planter perfectly!',
      verifiedPurchase: true
    }
  ]);

  const images = [plant.image, ...(plant.additionalImages || [])];
  const isLiked = isInWishlist(plant.id);

  const relatedPlants = allPlants
    .filter((p) => p.id !== plant.id && (p.category === plant.category || p.location === plant.location))
    .slice(0, 3);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const review: Review = {
      id: `rev-${Date.now()}`,
      plantId: plant.id,
      userName: 'You (Verified Buyer)',
      rating: newRating,
      date: 'Just now',
      comment: newComment.trim(),
      verifiedPurchase: true
    };

    setReviewsList([review, ...reviewsList]);
    setNewComment('');
    showToast('Thank you for sharing your plant review!');
  };

  return (
    <div className="py-10 bg-[#FAF7F0] dark:bg-neutral-900 min-h-screen text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#2E7D32] dark:text-emerald-400 hover:underline mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalog</span>
        </button>

        {/* Top Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          {/* Gallery Column */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-white dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 shadow-md">
              <img
                src={activeImage}
                alt={plant.name}
                className="w-full h-full object-cover"
              />
              {plant.petFriendly && (
                <span className="absolute top-4 left-4 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" />
                  Pet Safe
                </span>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${
                      activeImage === img ? 'border-[#2E7D32] scale-105' : 'border-transparent opacity-70'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Plant Specification & Purchasing Column */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#2E7D32] dark:text-emerald-400 uppercase tracking-widest mb-1">
                <span>{plant.category}</span>
                <span>•</span>
                <span>{plant.difficulty} Care Level</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-neutral-100 mb-1">
                {plant.name}
              </h1>

              <p className="text-sm italic text-stone-500 dark:text-neutral-400 mb-4">
                {plant.scientificName}
              </p>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-amber-500 text-sm font-bold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{plant.rating}</span>
                  <span className="text-stone-400 font-normal">({plant.reviewsCount} reviews)</span>
                </div>
                <span className="text-stone-300">•</span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  In Stock ({plant.stock} units left)
                </span>
              </div>
            </div>

            {/* Price & Discount */}
            <div className="flex items-baseline gap-3 pt-4 border-t border-stone-200 dark:border-neutral-800">
              <span className="text-3xl font-bold text-[#2E7D32] dark:text-emerald-400">
                ${plant.price}
              </span>
              {plant.originalPrice && (
                <span className="text-base text-stone-400 line-through">
                  ${plant.originalPrice}
                </span>
              )}
            </div>

            <p className="text-xs text-stone-600 dark:text-neutral-300 leading-relaxed">
              {plant.description}
            </p>

            {/* Size Selector */}
            <div>
              <label className="block text-xs font-bold text-stone-800 dark:text-neutral-200 uppercase tracking-wider mb-2">
                Pot / Plant Size
              </label>
              <div className="flex gap-2">
                {(['Small', 'Medium', 'Large', 'Extra Large'] as PlantSize[]).map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                      selectedSize === sz
                        ? 'border-[#2E7D32] bg-[#D9EAD3]/80 text-[#2E7D32] dark:bg-emerald-950 dark:text-emerald-300'
                        : 'border-stone-200 dark:border-neutral-700 text-stone-600 dark:text-neutral-400'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <label className="text-xs font-bold text-stone-800 dark:text-neutral-200 uppercase tracking-wider">
                Quantity
              </label>
              <div className="flex items-center border border-stone-200 dark:border-neutral-700 rounded-xl overflow-hidden bg-white dark:bg-neutral-800">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3.5 py-2 text-stone-600 hover:bg-stone-100"
                >
                  -
                </button>
                <span className="px-4 py-2 text-xs font-bold text-stone-800 dark:text-neutral-100">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3.5 py-2 text-stone-600 hover:bg-stone-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => addToCart(plant, quantity, selectedSize)}
                className="flex-1 py-4 rounded-2xl bg-[#2E7D32] hover:bg-[#4CAF50] text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add ${plant.price * quantity} to Cart</span>
              </button>

              <button
                onClick={() => toggleWishlist(plant)}
                className={`p-4 rounded-2xl border transition-all ${
                  isLiked
                    ? 'bg-rose-500 border-rose-500 text-white'
                    : 'border-stone-200 dark:border-neutral-700 text-stone-700 dark:text-neutral-300'
                }`}
              >
                <Heart className="w-5 h-5 fill-current" />
              </button>
            </div>
          </div>
        </div>

        {/* Tabbed Care Instructions & Customer Reviews */}
        <div className="bg-white dark:bg-neutral-800 rounded-3xl p-6 sm:p-8 border border-stone-200/80 dark:border-neutral-700 shadow-sm mb-16">
          {/* Tabs Navigation */}
          <div className="flex border-b border-stone-200 dark:border-neutral-700 mb-6 gap-6">
            <button
              onClick={() => setActiveTab('care')}
              className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
                activeTab === 'care'
                  ? 'border-[#2E7D32] text-[#2E7D32] dark:text-emerald-400'
                  : 'border-transparent text-stone-400 hover:text-stone-700'
              }`}
            >
              Botanical Care Routine
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
                activeTab === 'reviews'
                  ? 'border-[#2E7D32] text-[#2E7D32] dark:text-emerald-400'
                  : 'border-transparent text-stone-400 hover:text-stone-700'
              }`}
            >
              Customer Reviews ({reviewsList.length})
            </button>
          </div>

          {/* Care Tab */}
          {activeTab === 'care' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-4 rounded-2xl bg-[#FAF7F0] dark:bg-neutral-900 border border-stone-200/60 dark:border-neutral-700">
                <Sun className="w-5 h-5 text-amber-500 mb-2" />
                <h4 className="font-bold text-xs text-stone-900 dark:text-neutral-100 mb-1">Sunlight Need</h4>
                <p className="text-xs text-stone-600 dark:text-neutral-300">{plant.careInstructions.light}</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF7F0] dark:bg-neutral-900 border border-stone-200/60 dark:border-neutral-700">
                <Droplets className="w-5 h-5 text-cyan-500 mb-2" />
                <h4 className="font-bold text-xs text-stone-900 dark:text-neutral-100 mb-1">Watering Schedule</h4>
                <p className="text-xs text-stone-600 dark:text-neutral-300">{plant.careInstructions.water}</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF7F0] dark:bg-neutral-900 border border-stone-200/60 dark:border-neutral-700">
                <Thermometer className="w-5 h-5 text-rose-500 mb-2" />
                <h4 className="font-bold text-xs text-stone-900 dark:text-neutral-100 mb-1">Ideal Temperature</h4>
                <p className="text-xs text-stone-600 dark:text-neutral-300">{plant.careInstructions.temperature}</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF7F0] dark:bg-neutral-900 border border-stone-200/60 dark:border-neutral-700">
                <Wind className="w-5 h-5 text-emerald-500 mb-2" />
                <h4 className="font-bold text-xs text-stone-900 dark:text-neutral-100 mb-1">Soil Mix</h4>
                <p className="text-xs text-stone-600 dark:text-neutral-300">{plant.careInstructions.soil}</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF7F0] dark:bg-neutral-900 border border-stone-200/60 dark:border-neutral-700">
                <ShieldCheck className="w-5 h-5 text-[#2E7D32] mb-2" />
                <h4 className="font-bold text-xs text-stone-900 dark:text-neutral-100 mb-1">Pet & Child Safety</h4>
                <p className="text-xs text-stone-600 dark:text-neutral-300">{plant.careInstructions.toxicity}</p>
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className="space-y-8">
              {/* Submit Review Form */}
              <form onSubmit={handleAddReview} className="p-4 rounded-2xl bg-stone-50 dark:bg-neutral-900 space-y-3">
                <h4 className="font-bold text-xs text-stone-900 dark:text-neutral-100">Leave a Review</h4>
                <div className="flex gap-1 text-amber-400">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      onClick={() => setNewRating(s)}
                      className={`w-5 h-5 cursor-pointer ${s <= newRating ? 'fill-amber-400' : 'text-stone-300'}`}
                    />
                  ))}
                </div>
                <textarea
                  required
                  rows={2}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share how your plant is thriving in your space..."
                  className="w-full p-3 text-xs rounded-xl bg-white dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700"
                />
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#2E7D32] text-white text-xs font-bold"
                >
                  Submit Review
                </button>
              </form>

              {/* Reviews List */}
              <div className="space-y-4">
                {reviewsList.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-2xl bg-stone-50 dark:bg-neutral-900 border border-stone-200/60">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-bold text-xs text-stone-900 dark:text-neutral-100">{rev.userName}</p>
                      <span className="text-[10px] text-stone-400">{rev.date}</span>
                    </div>
                    <div className="flex items-center gap-1 text-amber-400 mb-2">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs text-stone-600 dark:text-neutral-300">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Related Products Grid */}
        {relatedPlants.length > 0 && (
          <div>
            <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-neutral-100 mb-6">
              Similar Plants You Might Love
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPlants.map((p) => (
                <ProductCard
                  key={p.id}
                  plant={p}
                  onQuickView={onOpenQuickView}
                  onSelectProduct={onSelectPlant}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
