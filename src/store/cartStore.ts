import { Product } from "@/api/types/product";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartProduct = Product & { quantity: number };

type CartState = {
  cartProducts: CartProduct[];
  addProduct: (product: Product) => void;
  decreaseProduct: (productId: number) => void;
};

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartProducts: [],

      addProduct: (product) => {
        const currentCartProducts = get().cartProducts;
        const existingItem = currentCartProducts.find(
          (p) => p.id === product.id
        );

        if (existingItem) {
          set({
            cartProducts: currentCartProducts.map((p) =>
              p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
            ),
          });
        } else {
          set({
            cartProducts: [...currentCartProducts, { ...product, quantity: 1 }],
          });
        }
      },

      decreaseProduct: (productId) => {
        const currentCartProducts = get().cartProducts;
        const existingItem = currentCartProducts.find(
          (p) => p.id === productId
        );

        if (existingItem) {
          if (existingItem.quantity === 1) {
            set({
              cartProducts: currentCartProducts.filter(
                (p) => p.id !== productId
              ),
            });
          } else {
            set({
              cartProducts: currentCartProducts.map((p) =>
                p.id === productId ? { ...p, quantity: p.quantity - 1 } : p
              ),
            });
          }
        }
      },
    }),
    {
      name: "shop-cart",
    }
  )
);

export default useCartStore;
