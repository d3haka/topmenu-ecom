"use client";

import { AnimatedPage } from "@/app/_components/animated-page";
import { AnimatePresence, motion } from "motion/react";
import { ProductCard } from "./product-card";
import { ProductsResData } from "@/api/products";
import { useProducts } from "@/queries/products";
import { useCartTotalPriceWithDiscount } from "@/hooks/useCartTotalPriceWithDiscount";
import { getPriceInToman } from "@/utils";
import { Button } from "./button";

export default function ProductList({
  products,
}: {
  products: ProductsResData;
}) {
  const { data } = useProducts({
    initialData: products,
  });

  const { totalPrice, cartItemCount } = useCartTotalPriceWithDiscount();

  return (
    <AnimatedPage style={{ padding: 16 }}>
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
          <Button
            style={{
              position: "fixed",
              bottom: 16,
              left: "50%",
              translate: "-50% 0",
              width: 500,
              justifyContent: "space-between",
              fontWeight: 700,
            }}
          >
            <span>
              <span
                style={{
                  borderRadius: "100%",
                  width: 25,
                  height: 25,
                  backgroundColor: "#000",
                  display: "inline-block",
                  marginLeft: 4,
                }}
              >
                {cartItemCount}
              </span>
              <span style={{ fontSize: 14 }}>تکمیل خرید</span>
            </span>
            <span>{getPriceInToman(totalPrice)} تومان</span>
          </Button>
        )}
      </AnimatePresence>
    </AnimatedPage>
  );
}
