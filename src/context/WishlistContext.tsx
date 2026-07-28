import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { Plant, WishlistItem } from '../types';
import { useToast } from './ToastContext';
import { useAuth } from './AuthContext';

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  toggleWishlist: (plant: Plant) => void;
  isInWishlist: (plantId: string) => boolean;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const { showToast } = useToast();
  const { user } = useAuth();
  const previousUserRef = useRef(user);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(() => {
    if (typeof window === 'undefined') {
      return [];
    }

    const saved = window.localStorage.getItem('verdant_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (wishlistItems.length === 0) {
      window.localStorage.removeItem('verdant_wishlist');
    } else {
      window.localStorage.setItem('verdant_wishlist', JSON.stringify(wishlistItems));
    }
  }, [wishlistItems]);

  useEffect(() => {
    if (previousUserRef.current && !user) {
      setWishlistItems([]);
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem('verdant_wishlist');
      }
    }

    previousUserRef.current = user;
  }, [user]);

  const isInWishlist = (plantId: string) => {
    return wishlistItems.some((item) => item.plant.id === plantId);
  };

  const toggleWishlist = (plant: Plant) => {
    if (isInWishlist(plant.id)) {
      setWishlistItems((prev) => prev.filter((item) => item.plant.id !== plant.id));
      showToast(`Removed ${plant.name} from Wishlist`, 'info');
    } else {
      const newItem: WishlistItem = { plant, addedAt: new Date().toISOString() };
      setWishlistItems((prev) => [...prev, newItem]);
      showToast(`Saved ${plant.name} to Wishlist!`);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        toggleWishlist,
        isInWishlist,
        wishlistCount: wishlistItems.length
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
}
