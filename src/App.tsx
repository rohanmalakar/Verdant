import React, { useState } from 'react';
import { ToastProvider } from './context/ToastContext';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { useAuth } from './context/AuthContext';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { AIPlantAssistantModal } from './components/AIPlantAssistantModal';
import { PlantQuizModal } from './components/PlantQuizModal';
import { PlantCompareModal } from './components/PlantCompareModal';
import { InvoiceModal } from './components/InvoiceModal';
import { LoginPage } from './pages/LoginPage';

import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartCheckoutPage } from './pages/CartCheckoutPage';
import { UserProfilePage } from './pages/UserProfilePage';
import { CareGuidesPage } from './pages/CareGuidesPage';
import { AboutPage } from './pages/AboutPage';

import { SEED_PLANTS } from './data/plants';
import { CATEGORIES } from './data/categories';
import { CARE_GUIDES } from './data/careGuides';
import { Plant, Order, CareGuide } from './types';

export function AppContent() {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<
    'home' | 'shop' | 'care' | 'about' | 'profile' | 'checkout' | 'wishlist'
  >('home');

  const [plantsList, setPlantsList] = useState<Plant[]>(SEED_PLANTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [quickViewPlant, setQuickViewPlant] = useState<Plant | null>(null);
  const [selectedGuide, setSelectedGuide] = useState<CareGuide | null>(null);

  // Modals
  const [isAIAdvisorOpen, setIsAIAdvisorOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [invoiceOrder, setInvoiceOrder] = useState<Order | null>(null);

  React.useEffect(() => {
    if (!isAuthenticated) {
      setActiveTab('home');
      setSelectedPlant(null);
      setIsLoginOpen(false);
    }
  }, [isAuthenticated]);

  // Orders State
  const [ordersList, setOrdersList] = useState<Order[]>([
    {
      id: 'ORD-882194',
      userId: 'user-1',
      customerName: 'Emma Watson',
      customerEmail: 'emma@example.com',
      items: [{ plant: SEED_PLANTS[0], quantity: 1, selectedSize: 'Medium' }],
      subtotal: 48.0,
      discountAmount: 0,
      taxAmount: 3.84,
      shippingCost: 0,
      totalAmount: 51.84,
      shippingAddress: {
        street: '742 Evergreen Terrace',
        city: 'Portland',
        state: 'OR',
        zipCode: '97201',
        phone: '+1 555-0192'
      },
      status: 'Shipped',
      paymentMethod: 'Credit Card',
      trackingNumber: 'VRD-TRACK-99120',
      createdAt: new Date().toISOString()
    }
  ]);

  // Product CRUD
  const handleAddPlant = (newPlant: Plant) => {
    setPlantsList([newPlant, ...plantsList]);
  };

  const handleUpdatePlant = (updatedPlant: Plant) => {
    setPlantsList(plantsList.map((p) => (p.id === updatedPlant.id ? updatedPlant : p)));
  };

  const handleDeletePlant = (plantId: string) => {
    setPlantsList(plantsList.filter((p) => p.id !== plantId));
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrdersList(ordersList.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)));
  };

  const categoryNames = CATEGORIES.map((c) => c.name);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] dark:bg-neutral-900 text-stone-900 dark:text-neutral-100 font-sans selection:bg-[#D9EAD3] selection:text-[#2E7D32]">
      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab as any);
          if (tab !== 'shop') setSelectedPlant(null);
        }}
        onOpenAIAdvisor={() => setIsAIAdvisorOpen(true)}
        onOpenCompare={() => setIsCompareOpen(true)}
        onOpenLogin={() => setIsLoginOpen(true)}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {selectedPlant ? (
          <ProductDetailPage
            plant={selectedPlant}
            allPlants={plantsList}
            onBack={() => setSelectedPlant(null)}
            onOpenQuickView={(p) => setQuickViewPlant(p)}
            onSelectPlant={(p) => setSelectedPlant(p)}
          />
        ) : (
          <>
            {activeTab === 'home' && (
              <HomePage
                plants={plantsList}
                categories={CATEGORIES}
                careGuides={CARE_GUIDES}
                onSelectCategory={(cat) => {
                  setSelectedCategory(cat);
                  setActiveTab('shop');
                }}
                onShopNow={() => setActiveTab('shop')}
                onOpenQuickView={(p) => setQuickViewPlant(p)}
                onSelectPlant={(p) => setSelectedPlant(p)}
                onOpenQuiz={() => setIsQuizOpen(true)}
                onOpenAIAdvisor={() => setIsAIAdvisorOpen(true)}
                onSearchSubmit={(q) => {
                  setSelectedCategory('All');
                  setActiveTab('shop');
                }}
                onSelectGuide={(g) => {
                  setSelectedGuide(g);
                  setActiveTab('care');
                }}
              />
            )}

            {activeTab === 'shop' && (
              <ShopPage
                plants={plantsList}
                categories={categoryNames}
                initialCategory={selectedCategory}
                onOpenQuickView={(p) => setQuickViewPlant(p)}
                onSelectPlant={(p) => setSelectedPlant(p)}
              />
            )}

            {activeTab === 'care' && (
              <CareGuidesPage
                careGuides={CARE_GUIDES}
                selectedGuide={selectedGuide}
                onSelectGuide={setSelectedGuide}
                onOpenAIAdvisor={() => setIsAIAdvisorOpen(true)}
              />
            )}

            {activeTab === 'about' && <AboutPage />}

            {activeTab === 'checkout' && (
              <CartCheckoutPage
                onOrderSuccess={(order) => {
                  setOrdersList([order, ...ordersList]);
                }}
                onBackToShop={() => setActiveTab('shop')}
              />
            )}

            {activeTab === 'wishlist' && (
              <UserProfilePage
                initialTab="wishlist"
                orders={ordersList}
                onOpenInvoice={(order) => setInvoiceOrder(order)}
                onOpenQuickView={(p) => setQuickViewPlant(p)}
                onSelectPlant={(p) => setSelectedPlant(p)}
              />
            )}

            {activeTab === 'profile' && (
              <UserProfilePage
                orders={ordersList}
                onOpenInvoice={(order) => setInvoiceOrder(order)}
                onOpenQuickView={(p) => setQuickViewPlant(p)}
                onSelectPlant={(p) => setSelectedPlant(p)}
              />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => setSelectedCategory(cat)}
        setActiveTab={(tab) => {
          setActiveTab(tab as any);
          setSelectedPlant(null);
        }}
      />

      {/* Slide-over Shopping Cart Drawer */}
      <CartDrawer
        onGoToCheckout={() => {
          setSelectedPlant(null);
          setActiveTab('checkout');
        }}
      />

      {/* Modals */}
      <QuickViewModal
        plant={quickViewPlant}
        onClose={() => setQuickViewPlant(null)}
        onViewFullDetails={(p) => {
          setSelectedPlant(p);
          setQuickViewPlant(null);
        }}
      />

      <AIPlantAssistantModal
        isOpen={isAIAdvisorOpen}
        onClose={() => setIsAIAdvisorOpen(false)}
      />

      <PlantQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        allPlants={plantsList}
        onSelectPlant={(p) => {
          setSelectedPlant(p);
          setIsQuizOpen(false);
        }}
      />

      <PlantCompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        allPlants={plantsList}
      />

      <InvoiceModal
        order={invoiceOrder}
        onClose={() => setInvoiceOrder(null)}
      />

      {isLoginOpen && !isAuthenticated && (
        <div className="fixed inset-0 z-50 bg-black/55 backdrop-blur-sm overflow-y-auto">
          <div className="min-h-full flex items-center justify-center p-4 sm:p-6">
            <div className="relative w-full max-w-6xl">
              <button
                type="button"
                onClick={() => setIsLoginOpen(false)}
                className="absolute -top-4 -right-4 z-10 w-10 h-10 rounded-full bg-white text-stone-800 shadow-lg border border-stone-200 flex items-center justify-center hover:bg-stone-50"
                aria-label="Close login"
              >
                <span className="text-xl leading-none">×</span>
              </button>
              <LoginPage />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function App() {
  return (
    <>
      <AppContent />
    </>
  );
}

function AppProviders() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <App />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default AppProviders;
