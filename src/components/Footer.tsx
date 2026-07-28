import React from 'react';
import { Sprout, Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onSelectCategory: (category: string) => void;
  setActiveTab: (tab: string) => void;
}

export function Footer({ onSelectCategory, setActiveTab }: FooterProps) {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-8 text-left border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#2E7D32] flex items-center justify-center text-white">
                <Sprout className="w-6 h-6" />
              </div>
              <span className="font-serif text-2xl font-bold text-white">Verdant</span>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Premium sustainable plant e-commerce platform bringing nature direct from nursery greenhouses to your home, apartment, or garden.
            </p>

            <div className="space-y-2 text-xs text-stone-400">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#4CAF50]" />
                <span>100 Greenhouse Way, Botanical District, OR 97201</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#4CAF50]" />
                <span>+1 (800) 555-PLANT</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#4CAF50]" />
                <span>hello@verdantplants.com</span>
              </p>
            </div>
          </div>

          {/* Categories Column */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-4">
              Plant Categories
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              {['Indoor Plants', 'Outdoor Plants', 'Succulents', 'Bonsai', 'Air Purifying Plants', 'Flower Plants'].map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat);
                      setActiveTab('shop');
                    }}
                    className="hover:text-emerald-400 transition-colors"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-4">
              Customer Support
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button onClick={() => setActiveTab('shop')} className="hover:text-emerald-400 transition-colors">
                  Shop Catalog
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('care')} className="hover:text-emerald-400 transition-colors">
                  Plant Care Guides
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('profile')} className="hover:text-emerald-400 transition-colors">
                  Order Tracking
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-emerald-400 transition-colors">
                  Why Choose Verdant
                </button>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-4">
              Social Community
            </h4>
            <p className="text-xs text-stone-400 mb-4">
              Join 50k+ plant parents sharing interior styling on Instagram!
            </p>
            <div className="flex gap-3">
              {[Instagram, Facebook, Twitter].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="p-2.5 rounded-xl bg-stone-800 hover:bg-[#2E7D32] text-stone-300 hover:text-white transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Verdant Botanical Living. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:underline">Privacy Policy</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:underline">Terms of Service</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:underline">Shipping & Return Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
