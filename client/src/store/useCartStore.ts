import { create } from 'zustand';

export interface CartItem {
  productId: string;
  sku: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  stock: number;
}

interface CouponDetails {
  code: string;
  discountPercentage: number;
  discountAmount: number;
}

interface CartState {
  items: CartItem[];
  savedItems: CartItem[]; // Save For Later
  appliedCoupon: CouponDetails | null;
  shippingCharges: number;
  tax: number;
  
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  applyCoupon: (coupon: CouponDetails | null) => void;
  saveForLater: (productId: string) => void;
  moveToCart: (productId: string) => void;
  removeSavedItem: (productId: string) => void;
  
  getTotals: () => {
    subtotal: number;
    discount: number;
    shipping: number;
    tax: number;
    total: number;
  };
}

export const useCartStore = create<CartState>((set, get) => {
  const getInitialState = () => {
    if (typeof window === 'undefined') return { items: [], savedItems: [], appliedCoupon: null };
    try {
      const storedCart = localStorage.getItem('reeksto_cart');
      const storedSaved = localStorage.getItem('reeksto_saved');
      return {
        items: storedCart ? JSON.parse(storedCart) : [],
        savedItems: storedSaved ? JSON.parse(storedSaved) : [],
        appliedCoupon: null
      };
    } catch {
      return { items: [], savedItems: [], appliedCoupon: null };
    }
  };

  const { items, savedItems } = getInitialState();

  const persistCart = (newItems: CartItem[], newSaved?: CartItem[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('reeksto_cart', JSON.stringify(newItems));
      if (newSaved) {
        localStorage.setItem('reeksto_saved', JSON.stringify(newSaved));
      }
    }
  };

  return {
    items,
    savedItems,
    appliedCoupon: null,
    shippingCharges: 150,
    tax: 0,

    addItem: (item, quantity = 1) => {
      set((state) => {
        const existing = state.items.find(i => i.productId === item.productId);
        let newItems;
        if (existing) {
          const newQty = Math.min(existing.quantity + quantity, item.stock);
          newItems = state.items.map(i => 
            i.productId === item.productId ? { ...i, quantity: newQty } : i
          );
        } else {
          newItems = [...state.items, { ...item, quantity: Math.min(quantity, item.stock) }];
        }
        persistCart(newItems);
        return { items: newItems };
      });
    },

    removeItem: (productId) => {
      set((state) => {
        const newItems = state.items.filter(i => i.productId !== productId);
        persistCart(newItems);
        return { items: newItems };
      });
    },

    updateQuantity: (productId, quantity) => {
      set((state) => {
        const newItems = state.items.map(i => {
          if (i.productId === productId) {
            return { ...i, quantity: Math.max(1, Math.min(quantity, i.stock)) };
          }
          return i;
        });
        persistCart(newItems);
        return { items: newItems };
      });
    },

    clearCart: () => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('reeksto_cart');
      }
      set({ items: [], appliedCoupon: null });
    },

    applyCoupon: (coupon) => {
      set({ appliedCoupon: coupon });
    },

    saveForLater: (productId) => {
      set((state) => {
        const itemToSave = state.items.find(i => i.productId === productId);
        if (!itemToSave) return state;

        const newItems = state.items.filter(i => i.productId !== productId);
        const newSaved = [...state.savedItems.filter(i => i.productId !== productId), itemToSave];
        
        persistCart(newItems, newSaved);
        return { items: newItems, savedItems: newSaved };
      });
    },

    moveToCart: (productId) => {
      set((state) => {
        const itemToMove = state.savedItems.find(i => i.productId === productId);
        if (!itemToMove) return state;

        const newSaved = state.savedItems.filter(i => i.productId !== productId);
        const newItems = [...state.items.filter(i => i.productId !== productId), itemToMove];
        
        persistCart(newItems, newSaved);
        return { items: newItems, savedItems: newSaved };
      });
    },

    removeSavedItem: (productId) => {
      set((state) => {
        const newSaved = state.savedItems.filter(i => i.productId !== productId);
        if (typeof window !== 'undefined') {
          localStorage.setItem('reeksto_saved', JSON.stringify(newSaved));
        }
        return { savedItems: newSaved };
      });
    },

    getTotals: () => {
      const state = get();
      const subtotal = state.items.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
      
      let discount = 0;
      if (state.appliedCoupon) {
        discount = Math.round((subtotal * state.appliedCoupon.discountPercentage) / 100);
      }

      // Free shipping above ₹1500
      const shipping = subtotal > 1500 || subtotal === 0 ? 0 : state.shippingCharges;
      const tax = Math.round((subtotal - discount) * 0.18); // 5% flat tax
      const total = Math.max(0, subtotal - discount + shipping + tax);

      return {
        subtotal,
        discount,
        shipping,
        tax,
        total
      };
    }
  };
});
