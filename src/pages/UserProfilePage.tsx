import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  User as UserIcon,
  ShoppingBag,
  Heart,
  MapPin,
  Printer,
  CheckCircle2,
  Clock,
  Truck,
  Package,
  LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { Order, Plant } from '../types';
import { ProductCard } from '../components/ProductCard';

interface UserProfilePageProps {
  orders: Order[];
  onOpenInvoice: (order: Order) => void;
  onOpenQuickView: (plant: Plant) => void;
  onSelectPlant: (plant: Plant) => void;
  initialTab?: 'orders' | 'wishlist';
}

export function UserProfilePage({
  orders,
  onOpenInvoice,
  onOpenQuickView,
  onSelectPlant,
  initialTab = 'orders'
}: UserProfilePageProps) {
  const { user, logout } = useAuth();
  const { wishlistItems } = useWishlist();

  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'address'>(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const userOrders = orders.filter((o) => o.userId === user?.id || user?.role === 'admin');

  return (
    <div className="py-10 bg-[#FAF7F0] dark:bg-neutral-900 min-h-screen text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header Banner */}
        {/* Tab Selection */}
        <div className="flex border-b border-stone-200 dark:border-neutral-700 mb-8 gap-6">
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === 'orders'
                ? 'border-[#2E7D32] text-[#2E7D32] dark:text-emerald-400'
                : 'border-transparent text-stone-400 hover:text-stone-700'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Order History ({userOrders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`pb-3 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === 'wishlist'
                ? 'border-[#2E7D32] text-[#2E7D32] dark:text-emerald-400'
                : 'border-transparent text-stone-400 hover:text-stone-700'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Saved Wishlist ({wishlistItems.length})</span>
          </button>
        </div>

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {userOrders.length === 0 ? (
              <div className="p-12 text-center bg-white dark:bg-neutral-800 rounded-3xl border border-stone-200 text-stone-400">
                <ShoppingBag className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="font-bold text-sm text-stone-700 dark:text-neutral-200">No orders placed yet</p>
              </div>
            ) : (
              userOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white dark:bg-neutral-800 rounded-3xl p-6 border border-stone-200/80 dark:border-neutral-700 shadow-xs space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-stone-100 dark:border-neutral-700">
                    <div>
                      <span className="text-xs font-bold text-stone-900 dark:text-neutral-100">
                        Order #{order.id}
                      </span>
                      <span className="text-stone-400 text-xs ml-2">
                        • {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                        {order.status}
                      </span>

                      <button
                        onClick={() => onOpenInvoice(order)}
                        className="p-2 rounded-xl bg-stone-100 dark:bg-neutral-700 hover:bg-stone-200 text-stone-700 dark:text-neutral-200 text-xs font-bold flex items-center gap-1.5"
                      >
                        <Printer className="w-4 h-4" />
                        <span>Print Invoice</span>
                      </button>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-3">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <img src={item.plant.image} alt={item.plant.name} className="w-12 h-12 rounded-xl object-cover" />
                          <div>
                            <p className="font-bold text-stone-800 dark:text-neutral-100">{item.plant.name}</p>
                            <p className="text-[10px] text-stone-400">Qty: {item.quantity} • ${item.plant.price} each</p>
                          </div>
                        </div>
                        <span className="font-bold text-stone-900 dark:text-neutral-100">${item.plant.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-stone-100 dark:border-neutral-700 flex justify-between text-xs font-bold">
                    <span className="text-stone-500">Total Amount Paid:</span>
                    <span className="text-[#2E7D32] dark:text-emerald-400 text-sm">${order.totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Wishlist Tab */}
        {activeTab === 'wishlist' && (
          <div>
            {wishlistItems.length === 0 ? (
              <div className="p-12 text-center bg-white dark:bg-neutral-800 rounded-3xl border border-stone-200 text-stone-400">
                <Heart className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="font-bold text-sm text-stone-700 dark:text-neutral-200">Your wishlist is empty</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistItems.map((item) => (
                  <ProductCard
                    key={item.plant.id}
                    plant={item.plant}
                    onQuickView={onOpenQuickView}
                    onSelectProduct={onSelectPlant}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
