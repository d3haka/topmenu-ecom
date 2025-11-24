import Image from "next/image";
import s from "./product-card.module.scss";
import { numFa, priceInTomanFa } from "@/utils";
import Link from "next/link";
import useCartStore from "@/store/cartStore";
import { Product } from "@/api/types/product";
import { AnimatePresence, motion } from "motion/react";

export function ProductCard({
  product,
  cardIndex,
}: {
  product: Product;
  cardIndex: number;
}) {
  const { cartProducts, addProduct, decreaseProduct } = useCartStore();

  const discountedPrice = Number(
    ((product.price * (100 - (product.discountPercentage ?? 0))) / 100).toFixed(
      2
    )
  );

  const productExistInCart = cartProducts.find((p) => p.id === product.id);

  return (
    <Link
      href={`/products/${product.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className={s.container}>
        <div>
          {product.discountPercentage && (
            <motion.div
              className={s["discount-badge"]}
              initial={{ y: -30, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
                transition: { delay: 0.1 * (cardIndex + 3), bounce: 0 },
              }}
              exit={{ y: -30, opacity: 0 }}
            >
              <div className={s["discount-badge-number"]}>
                %{Math.ceil(product.discountPercentage)}
              </div>
              <div className={s["discount-badge-text"]}>تخفیف</div>
            </motion.div>
          )}
          <Image
            width={110}
            height={110}
            src={product.thumbnail}
            alt="product-preview"
          />
          {productExistInCart ? (
            <motion.div
              className={s["add-to-cart"]}
              layoutId={`${product.id}-container`}
              animate={{ opacity: 1, transition: { delay: 1 } }}
              transition={{ duration: 0.1 }}
              key={`${product.id}-container`}
            >
              <button
                className={`${s["add-to-cart-plus-inactive"]} ${
                  productExistInCart && s["add-to-cart-plus-active"]
                }`}
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
                  className={s["add-to-cart-quantity"]}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  transition={{ duration: 0.1 }}
                >
                  {productExistInCart.quantity}
                </motion.span>
              </AnimatePresence>
              <button
                className={s["add-to-cart-plus-inactive"]}
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
              className={s["add-to-cart"]}
              layoutId={`${product.id}-container`}
              // style={{ width: 30 }}
              // initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 1 } }}
              // exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              key={`${product.id}-container2`}
            >
              <motion.button
                className={`${s["add-to-cart-plus-inactive"]} ${
                  productExistInCart && s["add-to-cart-plus-active"]
                }`}
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
        </div>
        <div>
          <div
            style={{ marginBottom: "4rem", width: "80%" }}
            className={s.title}
          >
            {product.title}
          </div>
          <div className={s["card-description"]}>{product.description}</div>

          <div className={s["price-container"]}>
            {product.discountPercentage ? (
              <>
                <div className={s["price-discount"]}>
                  {priceInTomanFa(product.price)}
                  <span> تومان</span>
                </div>
                <div className={s.price}>
                  {priceInTomanFa(discountedPrice)}
                  <span> تومان</span>
                </div>
              </>
            ) : (
              <div className={s.price}>
                ]{priceInTomanFa(product.price)}
                <span> تومان</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
