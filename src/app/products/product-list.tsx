"use client";

import { getProducts, ProductsResData } from "@/api/products";
import { Product } from "@/api/types/product";
import { useQuery } from "@tanstack/react-query";

export function ProductList({
  initialProductsData,
}: {
  initialProductsData?: ProductsResData;
}) {
  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    // initialData: initialProductsData,
  });

  if (!data) return <p>Loading...</p>;

  return (
    <ul>
      {data.products.map((product: Product) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
}
