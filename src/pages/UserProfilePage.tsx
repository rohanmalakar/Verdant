import React, { useState } from 'react';
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
  onGoToAdmin?: () => void;
}

export function UserProfilePage({
  orders,
  onOpenInvoice,
  onOpenQuickView,
  onSelectPlant,
  onGoToAdmin
}: UserProfilePageProps) {
  const { user, logout } = useAuth();
  const { wishlist } = useWishlist();

  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'address'>('orders');

  const userOrders = orders.filter((o) => o.userId === user?.id || user?.role === 'admin');

  return (
    <div className="py-10 bg-[#FAF7F0] dark:bg-neutral-900 min-h-screen text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header Banner */}
        <div className="bg-white dark:bg-neutral-800 rounded-3xl p-6 sm:p-8 border border-stone-200/80 dark:border-neutral-700 shadow-xs mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#D9EAD3] dark:bg-emerald-950 flex items-center justify-center text-[#2E7D32] font-bold text-2xl">
              {user?.name.charAt(0) || 'U'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl font-bold text-stone-900 dark:text-neutral-100">
                  {user?.name || 'Plant Enthusiast'}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase">
                  {user?.role || 'Customer'}
                </span>
              </div>
              <p className="text-xs text-stone-500 dark:text-neutral-400 mt-1">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {user?.role === 'admin' && onGoToAdmin && (
              <button
                onClick={onGoToAdmin}
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-xs"
              >
                Admin Management Portal
              </button>
            )}

            <button
              onClick={logout}
              className="px-4 py-2.5 rounded-xl bg-stone-100 dark:bg-neutral-700 hover:bg-rose-100 hover:text-rose-600 text-stone-700 dark:text-neutral-200 font-bold text-xs flex items-center gap-2 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

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
            <span>Saved Wishlist ({wishlist.length})</span>
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
            {wishlist.length === 0 ? (
              <div className="p-12 text-center bg-white dark:bg-neutral-800 rounded-3xl border border-stone-200 text-stone-400">
                <Heart className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="font-bold text-sm text-stone-700 dark:text-neutral-200">Your wishlist is empty</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlist.map((plant) => (
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
        )}
      </div>
    </div>
  );
}
