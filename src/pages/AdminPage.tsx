import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  DollarSign,
  ShoppingBag,
  Sprout,
  Users,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  Tag,
  Settings,
  TrendingUp,
  BarChart3,
  X,
  Search
} from 'lucide-react';
import { Plant, Order, User } from '../types';
import { useToast } from '../context/ToastContext';

interface AdminPageProps {
  plants: Plant[];
  orders: Order[];
  onAddPlant: (plant: Plant) => void;
  onUpdatePlant: (plant: Plant) => void;
  onDeletePlant: (plantId: string) => void;
  onUpdateOrderStatus: (orderId: string, newStatus: Order['status']) => void;
}

export function AdminPage({
  plants,
  orders,
  onAddPlant,
  onUpdatePlant,
  onDeletePlant,
  onUpdateOrderStatus
}: AdminPageProps) {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders' | 'coupons'>('dashboard');

  // Product Add / Edit Modal State
  const [editingPlant, setEditingPlant] = useState<Partial<Plant> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Calculate Metrics
  const totalRevenue = orders.reduce((acc, o) => acc + o.totalAmount, 0);
  const totalOrders = orders.length;
  const totalPlants = plants.length;

  const handleSavePlant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlant?.name || !editingPlant?.price) return;

    if (editingPlant.id) {
      onUpdatePlant(editingPlant as Plant);
      showToast(`Updated plant: ${editingPlant.name}`);
    } else {
      const newP: Plant = {
        id: `plant-${Date.now()}`,
        name: editingPlant.name,
        scientificName: editingPlant.scientificName || 'Botanical Species',
        category: editingPlant.category || 'Indoor Plants',
        price: Number(editingPlant.price),
        originalPrice: Number(editingPlant.price) * 1.2,
        rating: 5.0,
        reviewsCount: 1,
        image: editingPlant.image || 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=800',
        description: editingPlant.description || 'Lush greenhouse specimen.',
        sunlight: editingPlant.sunlight || 'Bright Indirect',
        waterFrequency: editingPlant.waterFrequency || 'Weekly',
        careInstructions: {
          light: 'Bright indirect sunlight',
          water: 'Water weekly',
          soil: 'Well draining potting soil',
          temperature: '65°F - 80°F',
          humidity: 'Medium humidity',
          toxicity: 'Keep away from pets'
        },
        petFriendly: editingPlant.petFriendly || false,
        airPurifying: editingPlant.airPurifying || true,
        size: 'Medium',
        difficulty: 'Easy',
        stock: Number(editingPlant.stock) || 15,
        location: 'Indoor',
        tags: ['Indoor', 'Greenhouse'],
        isBestSeller: true,
        isNew: true
      };
      onAddPlant(newP);
      showToast(`Added new plant: ${newP.name}`);
    }

    setIsModalOpen(false);
    setEditingPlant(null);
  };

  return (
    <div className="py-10 bg-[#FAF7F0] dark:bg-neutral-900 min-h-screen text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-2">
              <Settings className="w-3.5 h-3.5" />
              <span>Verdant Admin Console</span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-neutral-100">
              E-Commerce Management Dashboard
            </h1>
          </div>

          <button
            onClick={() => {
              setEditingPlant({
                name: '',
                scientificName: '',
                category: 'Indoor Plants',
                price: 29.99,
                stock: 20,
                petFriendly: true,
                airPurifying: true,
                image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=800',
                description: ''
              });
              setIsModalOpen(true);
            }}
            className="px-5 py-3 rounded-2xl bg-[#2E7D32] hover:bg-[#4CAF50] text-white font-bold text-xs shadow-lg flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Plant</span>
          </button>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="p-6 rounded-3xl bg-white dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] text-stone-400 uppercase font-bold">Total Revenue</p>
              <p className="text-xl font-bold text-stone-900 dark:text-neutral-100">${totalRevenue.toFixed(2)}</p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] text-stone-400 uppercase font-bold">Total Orders</p>
              <p className="text-xl font-bold text-stone-900 dark:text-neutral-100">{totalOrders}</p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#D9EAD3] text-[#2E7D32] flex items-center justify-center font-bold">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] text-stone-400 uppercase font-bold">Active Inventory</p>
              <p className="text-xl font-bold text-stone-900 dark:text-neutral-100">{totalPlants} Species</p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-100 text-cyan-800 flex items-center justify-center font-bold">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] text-stone-400 uppercase font-bold">Registered Users</p>
              <p className="text-xl font-bold text-stone-900 dark:text-neutral-100">1,248</p>
            </div>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-stone-200 dark:border-neutral-700 mb-8 gap-6">
          {['dashboard', 'products', 'orders'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`pb-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-[#2E7D32] text-[#2E7D32] dark:text-emerald-400'
                  : 'border-transparent text-stone-400 hover:text-stone-700'
              }`}
            >
              {tab} Management
            </button>
          ))}
        </div>

        {/* Tab Content: Products */}
        {activeTab === 'products' && (
          <div className="bg-white dark:bg-neutral-800 rounded-3xl p-6 border border-stone-200 dark:border-neutral-700 overflow-x-auto shadow-xs">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-stone-200 dark:border-neutral-700 text-stone-400 font-bold uppercase text-[10px]">
                  <th className="py-3">Plant</th>
                  <th className="py-3">Category</th>
                  <th className="py-3">Price</th>
                  <th className="py-3">Stock</th>
                  <th className="py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-neutral-700">
                {plants.map((plant) => (
                  <tr key={plant.id}>
                    <td className="py-3 flex items-center gap-3">
                      <img src={plant.image} alt={plant.name} className="w-10 h-10 rounded-xl object-cover" />
                      <div>
                        <p className="font-bold text-stone-900 dark:text-neutral-100">{plant.name}</p>
                        <p className="text-[10px] text-stone-400 italic">{plant.scientificName}</p>
                      </div>
                    </td>
                    <td className="py-3 font-semibold text-stone-600 dark:text-neutral-300">{plant.category}</td>
                    <td className="py-3 font-bold text-[#2E7D32] dark:text-emerald-400">${plant.price}</td>
                    <td className="py-3 font-medium">{plant.stock} units</td>
                    <td className="py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingPlant(plant);
                            setIsModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg bg-stone-100 text-stone-700 hover:bg-stone-200"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeletePlant(plant.id)}
                          className="p-1.5 rounded-lg bg-rose-100 text-rose-600 hover:bg-rose-200"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab Content: Orders */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {orders.map((o) => (
              <div key={o.id} className="p-4 rounded-2xl bg-white dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="font-bold text-xs text-stone-900 dark:text-neutral-100">Order #{o.id} • {o.customerName}</p>
                  <p className="text-[10px] text-stone-400">{o.customerEmail} • {o.items.length} items • ${o.totalAmount.toFixed(2)}</p>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={o.status}
                    onChange={(e) => onUpdateOrderStatus(o.id, e.target.value as any)}
                    className="px-3 py-1.5 text-xs rounded-xl bg-stone-100 dark:bg-neutral-700 border border-stone-200 dark:border-neutral-600 font-bold"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Packed">Packed</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add/Edit Product Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white dark:bg-neutral-800 rounded-3xl p-6 max-w-md w-full text-left space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-sm text-stone-900 dark:text-neutral-100">
                  {editingPlant?.id ? 'Edit Plant Entry' : 'Add New Greenhouse Specimen'}
                </h3>
                <button onClick={() => setIsModalOpen(false)}><X className="w-5 h-5 text-stone-400" /></button>
              </div>

              <form onSubmit={handleSavePlant} className="space-y-3 text-xs">
                <div>
                  <label className="block text-stone-500 mb-1">Plant Name</label>
                  <input
                    type="text"
                    required
                    value={editingPlant?.name || ''}
                    onChange={(e) => setEditingPlant({ ...editingPlant, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-neutral-900 border border-stone-200"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-stone-500 mb-1">Price ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={editingPlant?.price || ''}
                      onChange={(e) => setEditingPlant({ ...editingPlant, price: Number(e.target.value) })}
                      className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-neutral-900 border border-stone-200"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-500 mb-1">Stock Quantity</label>
                    <input
                      type="number"
                      required
                      value={editingPlant?.stock || ''}
                      onChange={(e) => setEditingPlant({ ...editingPlant, stock: Number(e.target.value) })}
                      className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-neutral-900 border border-stone-200"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#2E7D32] text-white font-bold text-xs"
                >
                  Save Plant
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
