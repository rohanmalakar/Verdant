import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ShoppingBag,
  Trash2,
  Tag,
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles
} from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartDrawerProps {
  onGoToCheckout: () => void;
}

export function CartDrawer({ onGoToCheckout }: CartDrawerProps) {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountAmount,
    taxAmount,
    shippingCost,
    totalAmount,
    coupon,
    applyCoupon,
    removeCoupon
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [applying, setApplying] = useState(false);

  if (!isCartOpen) return null;

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    setApplying(true);
    await applyCoupon(couponInput.trim());
    setCouponInput('');
    setApplying(false);
  };

  const freeShippingTarget = 50;
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingTarget) * 100);
  const amountNeededForFreeShipping = Math.max(0, freeShippingTarget - subtotal).toFixed(2);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        />

        {/* Drawer Content */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: '0%' }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed inset-y-0 right-0 w-full max-w-md bg-white dark:bg-neutral-800 shadow-2xl border-l border-stone-200 dark:border-neutral-700 flex flex-col z-10 text-left"
        >
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-stone-100 dark:border-neutral-700 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#2E7D32] dark:text-emerald-400" />
              <h2 className="font-serif font-bold text-lg text-stone-900 dark:text-neutral-100">
                Your Shopping Cart ({cartItems.reduce((a, i) => a + i.quantity, 0)})
              </h2>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full hover:bg-stone-100 dark:hover:bg-neutral-700 text-stone-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="bg-[#D9EAD3]/50 dark:bg-emerald-950/40 p-3 px-6 border-b border-emerald-200/50 dark:border-emerald-900">
            {subtotal >= freeShippingTarget ? (
              <p className="text-xs font-bold text-[#2E7D32] dark:text-emerald-300 flex items-center gap-1.5">
                <Truck className="w-4 h-4" />
                <span>🎉 Congratulations! You unlocked Free Shipping!</span>
              </p>
            ) : (
              <div>
                <p className="text-xs font-medium text-stone-700 dark:text-neutral-300 mb-1.5">
                  Add <strong className="text-[#2E7D32] dark:text-emerald-400">${amountNeededForFreeShipping}</strong> more for Free Shipping
                </p>
                <div className="w-full h-1.5 bg-stone-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#2E7D32] transition-all duration-300"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-3xl bg-stone-100 dark:bg-neutral-700 flex items-center justify-center mx-auto text-stone-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-stone-800 dark:text-neutral-200 text-base">
                  Your cart is empty
                </h3>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Bring nature into your home with our lush indoor plants and succulent collections.
                </p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.plant.id}
                  className="p-3 rounded-2xl bg-stone-50 dark:bg-neutral-900/60 border border-stone-200/80 dark:border-neutral-700/80 flex gap-3"
                >
                  <img
                    src={item.plant.image}
                    alt={item.plant.name}
                    className="w-20 h-20 rounded-xl object-cover"
                  />

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-stone-900 dark:text-neutral-100 truncate">
                          {item.plant.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.plant.id)}
                          className="text-stone-400 hover:text-rose-500 transition-colors p-0.5"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[10px] text-stone-500 dark:text-neutral-400">
                        Size: {item.selectedSize || item.plant.size}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-stone-200 dark:border-neutral-700 rounded-lg overflow-hidden bg-white dark:bg-neutral-800">
                        <button
                          onClick={() => updateQuantity(item.plant.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-stone-600 hover:bg-stone-100"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-0.5 text-xs font-bold text-stone-800 dark:text-neutral-100">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.plant.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-stone-600 hover:bg-stone-100"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-sm font-bold text-[#2E7D32] dark:text-emerald-400">
                        ${item.plant.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Order Summary */}
          {cartItems.length > 0 && (
            <div className="p-4 sm:p-6 bg-stone-50 dark:bg-neutral-900 border-t border-stone-200 dark:border-neutral-700 space-y-4">
              {/* Coupon Form */}
              {coupon ? (
                <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 flex items-center justify-between text-xs font-semibold text-emerald-900 dark:text-emerald-200">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-[#2E7D32]" />
                    <span>Coupon <strong>{coupon.code}</strong> (-{coupon.discountPercent}%)</span>
                  </div>
                  <button onClick={removeCoupon} className="text-stone-500 hover:text-rose-600">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Coupon code (e.g. GREENSPRING)"
                    className="flex-1 px-3 py-2 text-xs rounded-xl bg-white dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 text-stone-800 dark:text-neutral-100 uppercase"
                  />
                  <button
                    type="submit"
                    disabled={applying || !couponInput.trim()}
                    className="px-4 py-2 rounded-xl bg-stone-800 dark:bg-neutral-700 text-white text-xs font-bold hover:bg-stone-900 transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}

              {/* Price Calculation Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600 dark:text-neutral-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-800 dark:text-neutral-200">${subtotal.toFixed(2)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                    <span>Discount</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost}`}</span>
                </div>

                <div className="flex justify-between">
                  <span>Estimated Tax (8%)</span>
                  <span>${taxAmount.toFixed(2)}</span>
                </div>

                <div className="pt-2 border-t border-stone-200 dark:border-neutral-700 flex justify-between text-base font-bold text-stone-900 dark:text-neutral-100">
                  <span>Total Amount</span>
                  <span className="text-[#2E7D32] dark:text-emerald-400">${totalAmount.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  onGoToCheckout();
                }}
                className="w-full py-4 rounded-2xl bg-[#2E7D32] hover:bg-[#4CAF50] text-white font-bold text-sm shadow-xl flex items-center justify-center gap-2 active:scale-98 transition-all"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
