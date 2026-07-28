import React, { useState } from 'react';
import { ToastProvider } from './context/ToastContext';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { AIPlantAssistantModal } from './components/AIPlantAssistantModal';
import { PlantQuizModal } from './components/PlantQuizModal';
import { PlantCompareModal } from './components/PlantCompareModal';
import { InvoiceModal } from './components/InvoiceModal';

import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartCheckoutPage } from './pages/CartCheckoutPage';
import { UserProfilePage } from './pages/UserProfilePage';
import { AdminPage } from './pages/AdminPage';
import { CareGuidesPage } from './pages/CareGuidesPage';
import { AboutPage } from './pages/AboutPage';

import { SEED_PLANTS } from './data/plants';
import { CATEGORIES } from './data/categories';
import { CARE_GUIDES } from './data/careGuides';
import { Plant, Order, CareGuide } from './types';

export function AppContent() {
  const [activeTab, setActiveTab] = useState<
    'home' | 'shop' | 'care' | 'about' | 'profile' | 'admin' | 'checkout'
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
  const [invoiceOrder, setInvoiceOrder] = useState<Order | null>(null);

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

            {activeTab === 'profile' && (
              <UserProfilePage
                orders={ordersList}
                onOpenInvoice={(order) => setInvoiceOrder(order)}
                onOpenQuickView={(p) => setQuickViewPlant(p)}
                onSelectPlant={(p) => setSelectedPlant(p)}
                onGoToAdmin={() => setActiveTab('admin')}
              />
            )}

            {activeTab === 'admin' && (
              <AdminPage
                plants={plantsList}
                orders={ordersList}
                onAddPlant={handleAddPlant}
                onUpdatePlant={handleUpdatePlant}
                onDeletePlant={handleDeletePlant}
                onUpdateOrderStatus={handleUpdateOrderStatus}
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
    </div>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <AppContent />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
