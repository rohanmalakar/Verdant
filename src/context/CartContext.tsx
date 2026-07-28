import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Plant, PlantSize } from '../types';
import { useToast } from './ToastContext';

interface AppliedCoupon {
  code: string;
  discountPercent: number;
  discountAmount: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (plant: Plant, quantity?: number, size?: PlantSize) => void;
  removeFromCart: (plantId: string) => void;
  updateQuantity: (plantId: string, quantity: number) => void;
  clearCart: () => void;
  coupon: AppliedCoupon | null;
  applyCoupon: (code: string) => Promise<boolean>;
  removeCoupon: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  shippingCost: number;
  totalAmount: number;
  totalItemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { showToast } = useToast();
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('verdant_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [coupon, setCoupon] = useState<AppliedCoupon | null>(() => {
    const saved = localStorage.getItem('verdant_coupon');
    return saved ? JSON.parse(saved) : null;
  });

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('verdant_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (coupon) {
      localStorage.setItem('verdant_coupon', JSON.stringify(coupon));
    } else {
      localStorage.removeItem('verdant_coupon');
    }
  }, [coupon]);

  const subtotal = cartItems.reduce((acc, item) => acc + item.plant.price * item.quantity, 0);

  const discountAmount = coupon
    ? Number(((subtotal * coupon.discountPercent) / 100).toFixed(2))
    : 0;

  const freeShippingThreshold = 50;
  const shippingCost = subtotal > 0 ? (subtotal >= freeShippingThreshold ? 0 : 7.99) : 0;
  const taxRate = 0.08;
  const taxableSubtotal = Math.max(0, subtotal - discountAmount);
  const taxAmount = Number((taxableSubtotal * taxRate).toFixed(2));
  const totalAmount = Number((taxableSubtotal + shippingCost + taxAmount).toFixed(2));

  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const addToCart = (plant: Plant, quantity = 1, size?: PlantSize) => {
    const chosenSize = size || plant.size;
    setCartItems((prev) => {
      const existingIdx = prev.findIndex((item) => item.plant.id === plant.id);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        return [...prev, { plant, quantity, selectedSize: chosenSize }];
      }
    });
    showToast(`Added ${plant.name} to cart!`);
    setIsCartOpen(true);
  };

  const removeFromCart = (plantId: string) => {
    setCartItems((prev) => {
      const removed = prev.find((i) => i.plant.id === plantId);
      if (removed) {
        showToast(`Removed ${removed.plant.name} from cart`, 'info');
      }
      return prev.filter((item) => item.plant.id !== plantId);
    });
  };

  const updateQuantity = (plantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(plantId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.plant.id === plantId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setCoupon(null);
  };

  const applyCoupon = async (code: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, subtotal })
      });
      const data = await res.json();
      if (data.success) {
        setCoupon({
          code: data.data.code,
          discountPercent: data.data.discountPercent,
          discountAmount: data.data.discountAmount
        });
        showToast(`Coupon ${code.toUpperCase()} applied! (${data.data.discountPercent}% OFF)`);
        return true;
      } else {
        showToast(data.message || 'Invalid coupon code', 'error');
        return false;
      }
    } catch {
      if (code.toUpperCase() === 'VERDANT10' || code.toUpperCase() === 'GREENSPRING') {
        const percent = code.toUpperCase() === 'GREENSPRING' ? 15 : 10;
        setCoupon({
          code: code.toUpperCase(),
          discountPercent: percent,
          discountAmount: (subtotal * percent) / 100
        });
        showToast(`Coupon ${code.toUpperCase()} applied!`);
        return true;
      }
      showToast('Invalid coupon code', 'error');
      return false;
    }
  };

  const removeCoupon = () => {
    setCoupon(null);
    showToast('Coupon removed', 'info');
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        coupon,
        applyCoupon,
        removeCoupon,
        isCartOpen,
        setIsCartOpen,
        subtotal,
        discountAmount,
        taxAmount,
        shippingCost,
        totalAmount,
        totalItemCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
