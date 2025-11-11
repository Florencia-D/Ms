import { create } from "zustand";

export const useCart = create((set) => ({
  items: [],
  add: (product, qty=1) =>
    set((s) => {
      const i = s.items.findIndex(x => x.id === product.id);
      if (i >= 0) {
        const items = [...s.items];
        items[i] = { ...items[i], qty: items[i].qty + qty };
        return { items };
      }
      return { items: [...s.items, { ...product, qty }] };
    }),
  remove: (id) => set((s) => ({ items: s.items.filter(x => x.id !== id) })),
  clear: () => set({ items: [] })
}));
