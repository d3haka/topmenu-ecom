"use client";

import { ProductsResData } from "@/api/products";
import { AnimatedPage } from "@/app/_components/animated-page";
import { useProducts } from "@/queries/products";
import { useParams, useRouter } from "next/navigation";
import s from "./product-details.module.scss";
import { AddToCart } from "../../_components/add-to-cart";
import { useCartTotalPriceWithDiscount } from "@/hooks/useCartTotalPriceWithDiscount";
import { Button } from "../../_components/button";
import { motion } from "motion/react";
import { SlideShow } from "./slide-show";
import { PriceWithDiscount } from "./price-with-discount";

export default function ProductDetails({
  productsResData,
}: {
  productsResData: ProductsResData;
}) {
  const { id } = useParams();
  const router = useRouter();

  const { data } = useProducts({
    initialData: productsResData,
  });

  const { cartItemCount } = useCartTotalPriceWithDiscount();

  const product = data?.products.find(p => p.id === Number(id));

  if (!product) return;

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <div className={s.backBtn} onClick={() => router.back()}>
        <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" fill="#fff">
          <path d="M16.88 2.88c-.49-.49-1.28-.49-1.77 0L6.7 11.29c-.39.39-.39 1.02 0 1.41l8.41 8.41c.49.49 1.28.49 1.77 0s.49-1.28 0-1.77L9.54 12l7.35-7.35c.48-.49.48-1.28-.01-1.77z"></path>
        </svg>
      </div>

      <SlideShow images={product.images} />

      {product.discountPercentage && (
        <motion.div
          className={s.discountContainer}
          initial={{ x: -30, opacity: 0 }}
          animate={{
            x: 0,
            opacity: 1,
            transition: { delay: 0.1, bounce: 0 },
          }}
          exit={{ x: -30, opacity: 0 }}
        >
          <div className={s.discountNumber}>{Math.ceil(product.discountPercentage)}%</div>
          <div className={s.discountText}>تخفیف</div>
        </motion.div>
      )}

      <div className={s.container}>
        <div className={s.title}>{product.title}</div>
        <div className={s.priceAndAddToCartContainer}>
          {product && <AddToCart product={product} />}

          <PriceWithDiscount
            price={product.price}
            discountPercentage={product.discountPercentage}
          />
        </div>

        <div style={{ direction: "ltr" }}>{product.description}</div>

        <div className={s.btnContainer}>
          {cartItemCount > 0 ? (
            <>
              <Button className={s.completeBuyBtn}>
                <span className={s.itemCount}>{cartItemCount}</span>
                <span style={{ fontSize: 12 }}>تکمیل خرید</span>
              </Button>

              <Button onClick={() => router.back()} className={s.menuBtnOUtline}>
                مشاهده‌ی منو
              </Button>
            </>
          ) : (
            <Button onClick={() => router.back()} className={s.menuBtn}>
              مشاهده‌ی منو
            </Button>
          )}
        </div>
        <div style={{ height: 70, width: 0 }}></div>
      </div>
    </div>
  );
}
