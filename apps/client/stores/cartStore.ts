import { create } from "zustand";
import { CartItemsTypes, CartItemTypes } from "@repo/validation";
import { persist } from "zustand/middleware";

type CartStoreState = {
  cart: CartItemsTypes;
};

type Action = {
  handleIncreaseProduct: (product: CartItemTypes) => void;
  handlelDecreaseProduct: (product: CartItemTypes) => void;
  getTotalProductQty: (product: CartItemTypes) => number;
  getTotalQty: () => number;
  clearCart: () => void;
};

const useCartStore = create<CartStoreState & Action>()(
  persist(
    (set, get) => ({
      cart: [],
      handleIncreaseProduct: (product) => {
        set((state) => {
          const existingProduct = state.cart.find(
            (p) =>
              p._id === product?._id &&
              p.selectedSize === product.selectedSize &&
              p.selectedColor === product.selectedColor
          );
          if (existingProduct) {
            const updateCart = state.cart.map((item) =>
              item._id === product._id ? { ...item, qty: item.qty + 1 } : item
            );
            return { cart: updateCart };
          } else {
            return {
              cart: [...state.cart, { ...product, qty: 1 }],
            };
          }
        });
      },
      handlelDecreaseProduct: (product) => {
        set((state) => {
          const existingProduct = state.cart.find(
            (p) =>
              p._id === product?._id &&
              p.selectedSize === product.selectedSize &&
              p.selectedColor === product.selectedColor
          );
          if (existingProduct?.qty === 1) {
            const updateCart = state.cart.filter(
              (item) => item._id !== product._id
            );
            return { cart: updateCart };
          } else {
            const updateCart = state.cart.map((item) =>
              item._id === product._id ? { ...item, qty: item.qty - 1 } : item
            );
            return { cart: updateCart };
          }
        });
      },
      clearCart: () => {
        set(() => ({ cart: [] }));
      },
      getTotalProductQty: (product) => {
        const { cart } = get();

        return cart.find((item) => item._id === product._id)?.qty || 0;
      },
      getTotalQty: () => {
        const { cart } = get();
        return cart.reduce((acc, item) => acc + item.qty, 0);
      },
    }),
    { name: "cart" }
  )
);

export default useCartStore;
