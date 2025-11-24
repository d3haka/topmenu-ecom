"use client";

import { AnimatedPage } from "@/app/animated-page";
import { motion } from "motion/react";
import { ProductCard } from "./product-card";
import { ProductsResData } from "@/api/products";
import { useProducts } from "@/queries/products";

export default function ProductList({
  products,
}: {
  products: ProductsResData;
}) {
  const { data } = useProducts({
    initialData: products,
  });

  return (
    <AnimatedPage>
      <main style={{ padding: 16 }}>
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
      </main>
    </AnimatedPage>
  );
}
