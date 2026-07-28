import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  Truck,
  CreditCard,
  CheckCircle2,
  Lock,
  ArrowRight,
  Printer,
  Sprout,
  ArrowLeft
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ShippingAddress, Order } from '../types';

interface CartCheckoutPageProps {
  onOrderSuccess: (order: Order) => void;
  onBackToShop: () => void;
}

export function CartCheckoutPage({ onOrderSuccess, onBackToShop }: CartCheckoutPageProps) {
  const { cartItems, subtotal, discountAmount, taxAmount, shippingCost, totalAmount, clearCart, coupon } = useCart();
  const { user } = useAuth();

  const [step, setStep] = useState<'address' | 'shipping' | 'payment' | 'confirmation'>('address');
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  // Address Form State
  const [address, setAddress] = useState<ShippingAddress>({
    street: '742 Evergreen Terrace',
    city: 'Portland',
    state: 'OR',
    zipCode: '97201',
    phone: '+1 (555) 019-2834'
  });

  const [shippingMethod, setShippingMethod] = useState<'Standard' | 'Express' | 'Overnight'>('Standard');
  const [paymentMethod, setPaymentMethod] = useState<'Credit Card' | 'PayPal' | 'Cash on Delivery'>('Credit Card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    const newOrder: Order = {
      id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      userId: user?.id || 'guest',
      customerName: user?.name || 'Valued Customer',
      customerEmail: user?.email || 'customer@example.com',
      items: [...cartItems],
      subtotal,
      discountAmount,
      taxAmount,
      shippingCost,
      totalAmount,
      shippingAddress: address,
      status: 'Confirmed',
      paymentMethod,
      trackingNumber: `VRD-TRACK-${Math.floor(10000 + Math.random() * 90000)}`,
      createdAt: new Date().toISOString()
    };

    setPlacedOrder(newOrder);
    setStep('confirmation');
    clearCart();
    onOrderSuccess(newOrder);
  };

  if (step === 'confirmation' && placedOrder) {
    return (
      <div className="py-16 bg-[#FAF7F0] dark:bg-neutral-900 min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl w-full bg-white dark:bg-neutral-800 rounded-3xl p-8 border border-stone-200 dark:border-neutral-700 shadow-2xl text-center space-y-6"
        >
          <div className="w-16 h-16 rounded-full bg-[#D9EAD3] dark:bg-emerald-950 flex items-center justify-center text-[#2E7D32] mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-neutral-100">
              Order Confirmed!
            </h1>
            <p className="text-xs text-stone-500 dark:text-neutral-400 mt-1">
              Thank you for nurturing nature. Order ID: <strong className="text-[#2E7D32]">{placedOrder.id}</strong>
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-neutral-900 text-left text-xs space-y-2">
            <p className="flex justify-between">
              <span className="text-stone-500">Tracking Number:</span>
              <strong className="text-stone-900 dark:text-neutral-100">{placedOrder.trackingNumber}</strong>
            </p>
            <p className="flex justify-between">
              <span className="text-stone-500">Total Paid:</span>
              <strong className="text-[#2E7D32] font-bold">${placedOrder.totalAmount.toFixed(2)}</strong>
            </p>
            <p className="flex justify-between">
              <span className="text-stone-500">Delivery Address:</span>
              <span className="text-stone-800 dark:text-neutral-200 truncate">{address.street}, {address.city}</span>
            </p>
          </div>

          <button
            onClick={onBackToShop}
            className="w-full py-3.5 rounded-2xl bg-[#2E7D32] hover:bg-[#4CAF50] text-white font-bold text-xs shadow-lg transition-all"
          >
            Continue Shopping
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-10 bg-[#FAF7F0] dark:bg-neutral-900 min-h-screen text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={onBackToShop}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#2E7D32] dark:text-emerald-400 hover:underline mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Cart / Store</span>
        </button>

        <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-neutral-100 mb-8">
          Secure Plant Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Checkout Steps Form */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Address */}
            <div className="bg-white dark:bg-neutral-800 rounded-3xl p-6 border border-stone-200 dark:border-neutral-700 shadow-xs">
              <h3 className="font-bold text-sm text-stone-900 dark:text-neutral-100 mb-4 flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#2E7D32]" />
                <span>1. Delivery Address</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-stone-500 mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    className="w-full p-3 rounded-xl bg-stone-50 dark:bg-neutral-900 border border-stone-200 dark:border-neutral-700"
                  />
                </div>

                <div>
                  <label className="block text-stone-500 mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    className="w-full p-3 rounded-xl bg-stone-50 dark:bg-neutral-900 border border-stone-200 dark:border-neutral-700"
                  />
                </div>

                <div>
                  <label className="block text-stone-500 mb-1">State</label>
                  <input
                    type="text"
                    required
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    className="w-full p-3 rounded-xl bg-stone-50 dark:bg-neutral-900 border border-stone-200 dark:border-neutral-700"
                  />
                </div>

                <div>
                  <label className="block text-stone-500 mb-1">ZIP Code</label>
                  <input
                    type="text"
                    required
                    value={address.zipCode}
                    onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
                    className="w-full p-3 rounded-xl bg-stone-50 dark:bg-neutral-900 border border-stone-200 dark:border-neutral-700"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Payment */}
            <div className="bg-white dark:bg-neutral-800 rounded-3xl p-6 border border-stone-200 dark:border-neutral-700 shadow-xs">
              <h3 className="font-bold text-sm text-stone-900 dark:text-neutral-100 mb-4 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#2E7D32]" />
                <span>2. Payment Option</span>
              </h3>

              <div className="space-y-3">
                {['Credit Card', 'PayPal', 'Cash on Delivery'].map((m) => (
                  <label
                    key={m}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer text-xs font-semibold ${
                      paymentMethod === m
                        ? 'border-[#2E7D32] bg-[#D9EAD3]/40 text-[#2E7D32]'
                        : 'border-stone-200 dark:border-neutral-700 text-stone-700'
                    }`}
                  >
                    <span>{m}</span>
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === m}
                      onChange={() => setPaymentMethod(m as any)}
                      className="accent-[#2E7D32]"
                    />
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full py-4 rounded-2xl bg-[#2E7D32] hover:bg-[#4CAF50] text-white font-bold text-sm shadow-xl flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>Pay & Confirm Order (${totalAmount.toFixed(2)})</span>
            </button>
          </div>

          {/* Right Summary Box */}
          <div className="lg:col-span-5 bg-white dark:bg-neutral-800 rounded-3xl p-6 border border-stone-200 dark:border-neutral-700 shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-stone-900 dark:text-neutral-100 pb-3 border-b border-stone-100 dark:border-neutral-700">
              Order Summary ({cartItems.length} items)
            </h3>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div key={item.plant.id} className="flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img src={item.plant.image} alt={item.plant.name} className="w-10 h-10 rounded-xl object-cover" />
                    <div className="truncate">
                      <p className="font-bold text-stone-800 dark:text-neutral-100 truncate">{item.plant.name}</p>
                      <p className="text-[10px] text-stone-400">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-bold text-stone-900 dark:text-neutral-100">${item.plant.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-stone-200 dark:border-neutral-700 space-y-2 text-xs">
              <div className="flex justify-between text-stone-500">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Discount</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-500">
                <span>Shipping</span>
                <span>${shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-stone-500">
                <span>Tax (8%)</span>
                <span>${taxAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-stone-200 font-bold text-base text-[#2E7D32]">
                <span>Total Amount</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
