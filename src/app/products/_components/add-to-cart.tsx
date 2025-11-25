import { Product } from "@/api/types/product";
import useCartStore from "@/store/cartStore";
import { AnimatePresence, motion, MotionStyle } from "motion/react";
import s from "./add-to-cart.module.scss";
import { FC, PropsWithChildren, ReactNode, useState } from "react";

type AddToCartProps = {
  product: Product;
  containerStyles?: MotionStyle;
};

const animationVariants = {
  initial: (isForward: boolean) => {
    return {
      y: isForward ? 10 : -10,
      opacity: 0,
    };
  },
  animate: {
    y: 0,
    opacity: 1,
  },
  exit: (isForward: boolean) => {
    return {
      y: !isForward ? 10 : -10,
      opacity: 0,
    };
  },
};

export function AddToCart({ product, containerStyles }: AddToCartProps) {
  const [isForward, setIsForward] = useState(false);

  const { cartProducts, addProduct, decreaseProduct } = useCartStore();

  const productExistInCart = cartProducts.find((p) => p.id === product.id);

  if (productExistInCart)
    return (
      <motion.div
        className={s.container}
        layoutId={`${product.id}-container`}
        transition={{ duration: 0.1 }}
        key={`${product.id}-container`}
        style={{ ...containerStyles, cursor: "auto" }}
        onClick={(e) => e.preventDefault()}
      >
        <motion.button
          className={`${s.addBtn} ${productExistInCart && s.addBtnActive}`}
          onClick={() => {
            addProduct(product);
            setIsForward(true);
          }}
          initial={{ x: 30 }}
          animate={{ x: 0 }}
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
        <AnimatePresence mode="wait" custom={isForward}>
          <motion.span
            key={productExistInCart.quantity + "counter"}
            className={s.quantity}
            variants={animationVariants}
            initial={{ ...animationVariants.initial(isForward) }}
            animate="animate"
            exit="exit"
            transition={{
              bounce: 0,
              duration: 0.1,
            }}
          >
            {productExistInCart.quantity}
          </motion.span>
        </AnimatePresence>
        <motion.button
          className={s.addBtn}
          onClick={() => {
            decreaseProduct(product.id);
            setIsForward(false);
          }}
          initial={{ x: 30 }}
          animate={{ x: 0 }}
        >
          <svg
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="#fff"
          >
            <path d="M18 13H6c-.55 0-1-.45-1-1s.45-1 1-1h12c.55 0 1 .45 1 1s-.45 1-1 1z"></path>
          </svg>
        </motion.button>
      </motion.div>
    );

  return (
    <motion.div
      className={s.container}
      layoutId={`${product.id}-container`}
      transition={{ duration: 0.1 }}
      key={`${product.id}-container2`}
      style={containerStyles}
    >
      <motion.button
        className={`${s.addBtn} ${productExistInCart && s.addBtnActive}`}
        onClick={(e) => {
          // e.stopPropagation();
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
  );
}
