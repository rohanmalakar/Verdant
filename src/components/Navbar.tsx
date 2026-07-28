import React, { useState, useEffect } from 'react';
import {
  Sprout,
  Search,
  ShoppingBag,
  Heart,
  User as UserIcon,
  Sun,
  Moon,
  Menu,
  X,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  GitCompare,
  HelpCircle
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Plant } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAIAdvisor: () => void;
  onOpenQuiz?: () => void;
  onOpenCompare: () => void;
  allPlants?: Plant[];
  onSelectPlant?: (plant: Plant) => void;
}

export function Navbar({
  activeTab,
  setActiveTab,
  onOpenAIAdvisor,
  onOpenQuiz,
  onOpenCompare,
  allPlants = [],
  onSelectPlant = () => {}
}: NavbarProps) {
  const { totalItemCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAdmin, loginAsDemoUser, loginAsDemoAdmin, logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState<Plant[]>([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchChange = (q: string) => {
    setSearchQuery(q);
    if (q.trim().length > 1) {
      const filtered = allPlants.filter(
        (p) =>
          p.name.toLowerCase().includes(q.toLowerCase()) ||
          p.category.toLowerCase().includes(q.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(q.toLowerCase()))
      );
      setSearchSuggestions(filtered.slice(0, 5));
      setShowSearchDropdown(true);
    } else {
      setShowSearchDropdown(false);
    }
  };

  const handleSelectSuggestion = (plant: Plant) => {
    onSelectPlant(plant);
    setShowSearchDropdown(false);
    setSearchQuery('');
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop Plants' },
    { id: 'care', label: 'Care Guides' },
    { id: 'about', label: 'Why Verdant' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Announcement Bar */}
      <div className="bg-[#2E7D32] text-white text-xs py-2 px-4 text-center font-medium flex items-center justify-center gap-2">
        <span>🌿 Free Eco-Friendly Shipping on orders over $50! Use code <strong className="underline decoration-amber-300">GREENSPRING</strong> for 15% off.</span>
      </div>

      {/* Main Navigation Bar */}
      <div
        className={`w-full transition-all duration-300 border-b ${
          isScrolled
            ? 'bg-[#FAF7F0]/90 dark:bg-neutral-900/90 backdrop-blur-md shadow-sm border-stone-200 dark:border-neutral-800 py-3'
            : 'bg-[#FAF7F0] dark:bg-neutral-900 border-stone-200/60 dark:border-neutral-800 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Logo */}
          <button
            onClick={() => {
              setActiveTab('home');
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#2E7D32] flex items-center justify-center text-white shadow-md group-hover:bg-[#4CAF50] transition-colors">
              <Sprout className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#2E7D32] dark:text-emerald-400">
                Verdant
              </span>
              <span className="block text-[10px] uppercase tracking-widest text-stone-500 dark:text-neutral-400 font-semibold">
                Botanical Living
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === link.id
                    ? 'text-[#2E7D32] dark:text-emerald-400 bg-[#D9EAD3]/60 dark:bg-emerald-950/60 font-semibold'
                    : 'text-stone-700 dark:text-neutral-300 hover:text-[#2E7D32] dark:hover:text-emerald-400 hover:bg-stone-100 dark:hover:bg-neutral-800'
                }`}
              >
                {link.label}
              </button>
            ))}

            {/* AI Advisor Button */}
            <button
              onClick={onOpenAIAdvisor}
              className="ml-2 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-[#2E7D32] dark:text-emerald-300 text-xs font-semibold hover:bg-emerald-200 dark:hover:bg-emerald-900 border border-emerald-300/60 dark:border-emerald-700/60 transition-all shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>AI Plant Doctor</span>
            </button>
          </nav>

          {/* Search Bar (Desktop) */}
          <div className="hidden lg:block relative max-w-xs w-full">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                onFocus={() => searchQuery.length > 1 && setShowSearchDropdown(true)}
                placeholder="Search plants, care, categories..."
                className="w-full pl-9 pr-4 py-2 text-xs rounded-full bg-stone-100 dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 text-stone-800 dark:text-neutral-200 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
              />
            </div>

            {/* Search Dropdown */}
            {showSearchDropdown && searchSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-neutral-800 rounded-xl shadow-xl border border-stone-200 dark:border-neutral-700 overflow-hidden z-50">
                <div className="p-2 text-[10px] font-semibold text-stone-400 uppercase tracking-wider">
                  Matching Plants ({searchSuggestions.length})
                </div>
                {searchSuggestions.map((plant) => (
                  <button
                    key={plant.id}
                    onClick={() => handleSelectSuggestion(plant)}
                    className="w-full flex items-center gap-3 p-2.5 hover:bg-stone-50 dark:hover:bg-neutral-700/50 text-left transition-colors border-t border-stone-100 dark:border-neutral-700/50"
                  >
                    <img
                      src={plant.image}
                      alt={plant.name}
                      className="w-10 h-10 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-stone-800 dark:text-neutral-100 truncate">
                        {plant.name}
                      </p>
                      <p className="text-[10px] text-stone-500 dark:text-neutral-400">
                        ${plant.price} • {plant.category}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Compare Tool Toggle */}
            <button
              onClick={onOpenCompare}
              title="Compare Plants"
              className="p-2 rounded-full hover:bg-stone-200/60 dark:hover:bg-neutral-800 text-stone-700 dark:text-neutral-300 transition-colors hidden sm:flex"
            >
              <GitCompare className="w-5 h-5" />
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="p-2 rounded-full hover:bg-stone-200/60 dark:hover:bg-neutral-800 text-stone-700 dark:text-neutral-300 transition-colors"
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => setActiveTab('wishlist')}
              className="relative p-2 rounded-full hover:bg-stone-200/60 dark:hover:bg-neutral-800 text-stone-700 dark:text-neutral-300 transition-colors"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-full hover:bg-stone-200/60 dark:hover:bg-neutral-800 text-stone-700 dark:text-neutral-300 transition-colors"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 text-[#2E7D32] dark:text-emerald-400" />
              {totalItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#2E7D32] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalItemCount}
                </span>
              )}
            </button>

            {/* User Account / Admin Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-1.5 rounded-full hover:bg-stone-200/60 dark:hover:bg-neutral-800 transition-colors border border-stone-200 dark:border-neutral-700"
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover"
                  />
                ) : (
                  <UserIcon className="w-5 h-5 text-stone-700 dark:text-neutral-300" />
                )}
              </button>

              {/* User Dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl border border-stone-200 dark:border-neutral-700 p-2 z-50">
                  <div className="p-3 border-b border-stone-100 dark:border-neutral-700">
                    <p className="text-xs font-bold text-stone-800 dark:text-neutral-100">{user?.name}</p>
                    <p className="text-[11px] text-stone-500 dark:text-neutral-400 truncate">{user?.email}</p>
                    <span className={`inline-block mt-1 text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold ${
                      isAdmin ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200' : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200'
                    }`}>
                      {isAdmin ? 'Store Admin' : 'Valued Customer'}
                    </span>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        setActiveTab('profile');
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-stone-700 dark:text-neutral-200 hover:bg-stone-100 dark:hover:bg-neutral-700/60 rounded-lg"
                    >
                      My Profile & Orders
                    </button>

                    {isAdmin && (
                      <button
                        onClick={() => {
                          setActiveTab('admin');
                          setShowUserMenu(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-bold text-[#2E7D32] dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 rounded-lg flex items-center justify-between"
                      >
                        <span>Admin Management Portal</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Switch Demo Roles Helper */}
                  <div className="pt-2 border-t border-stone-100 dark:border-neutral-700">
                    <p className="px-3 text-[10px] font-semibold text-stone-400 uppercase tracking-wider mb-1">
                      Quick Role Switch
                    </p>
                    <div className="flex gap-1 px-1">
                      <button
                        onClick={() => {
                          loginAsDemoUser();
                          setShowUserMenu(false);
                        }}
                        className="flex-1 py-1 text-[10px] font-medium rounded bg-stone-100 dark:bg-neutral-700 hover:bg-stone-200 text-stone-700 dark:text-neutral-200"
                      >
                        User Mode
                      </button>
                      <button
                        onClick={() => {
                          loginAsDemoAdmin();
                          setShowUserMenu(false);
                        }}
                        className="flex-1 py-1 text-[10px] font-medium rounded bg-[#2E7D32] hover:bg-[#4CAF50] text-white"
                      >
                        Admin Mode
                      </button>
                    </div>
                  </div>

                  <div className="pt-2 mt-2 border-t border-stone-100 dark:border-neutral-700">
                    <button
                      onClick={() => {
                        logout();
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg font-medium"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-700 dark:text-neutral-300"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-neutral-900 border-b border-stone-200 dark:border-neutral-800 px-4 pt-3 pb-6 space-y-3">
            <div className="relative mb-3">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search plants..."
                className="w-full pl-9 pr-4 py-2 text-xs rounded-full bg-stone-100 dark:bg-neutral-800 text-stone-800 dark:text-neutral-200"
              />
            </div>

            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    setActiveTab(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium ${
                    activeTab === link.id
                      ? 'bg-[#D9EAD3]/60 text-[#2E7D32] dark:bg-emerald-950 dark:text-emerald-300 font-bold'
                      : 'text-stone-700 dark:text-neutral-300'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="pt-2 flex flex-col gap-2 border-t border-stone-100 dark:border-neutral-800">
              <button
                onClick={() => {
                  onOpenAIAdvisor();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-100 text-[#2E7D32] font-bold text-xs"
              >
                <Sparkles className="w-4 h-4" /> AI Plant Care Assistant
              </button>

              <button
                onClick={() => {
                  onOpenQuiz();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-amber-100 text-amber-900 font-bold text-xs"
              >
                <HelpCircle className="w-4 h-4" /> Take Plant Care Quiz
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
