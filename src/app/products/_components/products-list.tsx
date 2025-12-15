"use client";

import { AnimatedPage } from "@/app/_components/animated-page";
import { AnimatePresence, motion } from "motion/react";
import { ProductCard } from "./product-card";
import { ProductsResData } from "@/api/products";
import { useProducts } from "@/queries/products";
import { useCartTotalPriceWithDiscount } from "@/hooks/useCartTotalPriceWithDiscount";
import { getPriceInToman } from "@/utils";
import { Button } from "./button";
import s from "./product-list.module.scss";

export default function ProductList({ products }: { products: ProductsResData }) {
  const { data } = useProducts({
    initialData: products,
  });

  const { totalPrice, cartItemCount } = useCartTotalPriceWithDiscount();

  return (
    <div style={{ padding: 16 }}>
      {data?.products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ y: 30, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            transition: { delay: 0.1 * index, bounce: 0 },
          }}
          exit={{ y: 30, opacity: 0, transition: { delay: 1 } }}
        >
          <ProductCard product={product} cardIndex={index} />
        </motion.div>
      ))}

      <AnimatePresence mode="wait">
        {cartItemCount > 0 && (
          <Button className={s.button}>
            <span>
              <span className={s.itemCount}>{cartItemCount}</span>
              <span style={{ fontSize: 14 }}>تکمیل خرید</span>
            </span>
            <span>{getPriceInToman(totalPrice)} تومان</span>
          </Button>
        )}
      </AnimatePresence>
    </div>
  );
}
