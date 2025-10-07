import { create } from 'zustand';
import { PRODUCTS_DATA as initialInventory } from '../constants';
import type { Product } from '../types';

type InventoryStoreState = {
  products: Product[];
  updateStock: (id: string, newStock: Product['stock']) => void;
};

export const useInventoryStore = create<InventoryStoreState>((set) => ({
  products: initialInventory,
  updateStock: (id, newStock) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.id === id ? { ...product, stock: newStock } : product
      ),
    })),
}));
