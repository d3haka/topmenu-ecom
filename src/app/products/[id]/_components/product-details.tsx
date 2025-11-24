"use client";

import { ProductsResData } from "@/api/products";
import { AnimatedPage } from "@/app/animated-page";
import { useProducts } from "@/queries/products";
import { useParams } from "next/navigation";

export default function ProductDetails({
  products,
}: {
  products: ProductsResData;
}) {
  const { id } = useParams();

  const { data } = useProducts({
    initialData: products,
  });

  const product = data?.products.filter((p) => p.id === Number(id));

  return (
    <AnimatedPage>
      <div>{JSON.stringify(product, null, 2)}</div>
    </AnimatedPage>
  );
}
