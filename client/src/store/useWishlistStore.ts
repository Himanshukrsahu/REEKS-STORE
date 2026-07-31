import { create } from 'zustand';

interface WishlistState {
  wishlistIds: string[];
  setWishlist: (ids: string[]) => void;
  toggleWishlistLocal: (productId: string) => void;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>((set) => {
  const getInitialState = () => {
    if (typeof window === 'undefined') return { wishlistIds: [] };
    try {
      const stored = localStorage.getItem('reeksto_wishlist');
      return { wishlistIds: stored ? JSON.parse(stored) : [] };
    } catch {
      return { wishlistIds: [] };
    }
  };

  const { wishlistIds } = getInitialState();

  return {
    wishlistIds,
    setWishlist: (ids) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('reeksto_wishlist', JSON.stringify(ids));
      }
      set({ wishlistIds: ids });
    },
    toggleWishlistLocal: (productId) => {
      set((state) => {
        const isWish = state.wishlistIds.includes(productId);
        const newIds = isWish
          ? state.wishlistIds.filter(id => id !== productId)
          : [...state.wishlistIds, productId];
        if (typeof window !== 'undefined') {
          localStorage.setItem('reeksto_wishlist', JSON.stringify(newIds));
        }
        return { wishlistIds: newIds };
      });
    },
    clearWishlist: () => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('reeksto_wishlist');
      }
      set({ wishlistIds: [] });
    }
  };
});
