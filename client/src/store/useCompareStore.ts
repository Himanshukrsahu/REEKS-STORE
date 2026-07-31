import { create } from 'zustand';

export interface CompareProduct {
  _id: string;
  sku: string;
  name: string;
  price: number;
  finalPrice: number;
  rating: number;
  category: string;
  images: string[];
  skinType: string[];
  ingredients: string[];
  benefits: string[];
  stock: number;
}

interface CompareState {
  items: CompareProduct[];
  addItem: (product: CompareProduct) => void;
  removeItem: (productId: string) => void;
  clearCompare: () => void;
}

export const useCompareStore = create<CompareState>((set) => ({
  items: [],
  addItem: (product) => set((state) => {
    if (state.items.find(i => i._id === product._id)) return state; // already exists
    if (state.items.length >= 3) {
      // Limit to 3 items, replace the last one or do nothing
      return { items: [...state.items.slice(1), product] };
    }
    return { items: [...state.items, product] };
  }),
  removeItem: (productId) => set((state) => ({
    items: state.items.filter(i => i._id !== productId)
  })),
  clearCompare: () => set({ items: [] })
}));
