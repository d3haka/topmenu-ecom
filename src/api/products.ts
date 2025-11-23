import { Product } from "./types/product";

export type ProductsResData = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export async function getProducts() {
  const res = await fetch("https://dummyjson.com/products");
  if (!res.ok) throw new Error("Failed to fetch products");
  const data: ProductsResData = await res.json();
  return data;
}
