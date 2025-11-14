// src/store/cart.store.js
import { create } from "zustand";

export const useCart = create((set) => ({
  items: [],

  // Agregar productos (suma cantidades si ya existe)
  add: (product) =>
    set((state) => {
      const qty = product.quantity || 1;
      const existing = state.items.find((item) => item.id === product.id);

      if (existing) {
        return {
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: (item.quantity || 1) + qty }
              : item
          ),
        };
      }

      return {
        items: [...state.items, { ...product, quantity: qty }],
      };
    }),

  // Aumentar cantidad desde el carrito
  increment: (id) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      ),
    })),

  // Disminuir cantidad (si llega a 0, se elimina)
  decrement: (id) =>
    set((state) => {
      const updated = state.items
        .map((item) =>
          item.id === id
            ? { ...item, quantity: (item.quantity || 1) - 1 }
            : item
        )
        .filter((item) => (item.quantity || 0) > 0);

      return { items: updated };
    }),

  remove: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  clear: () => set({ items: [] }),
}));
