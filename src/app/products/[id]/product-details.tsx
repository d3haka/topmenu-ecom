"use client";

import { getProducts } from "@/api/products";
import { useQuery } from "@tanstack/react-query";

export function ProductDetails({ id }: { id: number }) {
  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (!data) return <p>Loading...</p>;
  const product = data.products.filter((p) => p.id === Number(id));

  return <div>{JSON.stringify(product, null, 2)}</div>;
}
