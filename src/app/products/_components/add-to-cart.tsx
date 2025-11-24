import { Product } from "@/api/types/product";
import useCartStore from "@/store/cartStore";
import { AnimatePresence, motion } from "motion/react";
import s from "./add-to-cart.module.scss";

type AddToCartProps = {
  product: Product;
};

export function AddToCart({ product }: AddToCartProps) {
  const { cartProducts, addProduct, decreaseProduct } = useCartStore();

  const productExistInCart = cartProducts.find((p) => p.id === product.id);

  return (
    <>
      {productExistInCart ? (
        <motion.div
          className={s.container}
          layoutId={`${product.id}-container`}
          transition={{ duration: 0.1 }}
          key={`${product.id}-container`}
        >
          <button
            className={`${s.addBtn} ${productExistInCart && s.addBtnActive}`}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              addProduct(product);
            }}
          >
            <svg
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="#fff"
            >
              <path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z"></path>
            </svg>
          </button>
          <AnimatePresence mode="wait">
            <motion.span
              key={productExistInCart.quantity + "counter"}
              className={s.quantity}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.1 }}
            >
              {productExistInCart.quantity}
            </motion.span>
          </AnimatePresence>
          <button
            className={s.addBtn}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              decreaseProduct(product.id);
            }}
          >
            <svg
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="#fff"
            >
              <path d="M18 13H6c-.55 0-1-.45-1-1s.45-1 1-1h12c.55 0 1 .45 1 1s-.45 1-1 1z"></path>
            </svg>
          </button>
        </motion.div>
      ) : (
        <motion.div
          className={s.container}
          layoutId={`${product.id}-container`}
          transition={{ duration: 0.1 }}
          key={`${product.id}-container2`}
        >
          <motion.button
            // className={`${s.addBtn} ${productExistInCart && s.addBtnActive}`}
            className={s.addBtn}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              addProduct(product);
            }}
            initial={{ x: -30 }}
            animate={{ x: 0, transition: { delay: 0.05 } }}
            exit={{ x: 30 }}
          >
            <svg
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="#fff"
            >
              <path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z"></path>
            </svg>
          </motion.button>
        </motion.div>
      )}
    </>
  );
}
