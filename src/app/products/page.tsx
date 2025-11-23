"use client";

import { getProducts } from "@/api/products";
import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "./_components/product-card";

export default function ProductsPage() {
  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return (
    <main style={{ padding: 16 }}>
      {data?.products.map((product) => (
        <ProductCard
          id={product.id}
          key={product.id}
          title={product.title}
          description={product.description}
          thumbnail={product.thumbnail}
          price={product.price}
          discountPercentage={product?.discountPercentage}
        />
      ))}
    </main>
  );
}
