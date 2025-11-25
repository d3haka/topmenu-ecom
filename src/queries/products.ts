import { getProducts, ProductsResData } from "@/api/products";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useProducts = (
  options?: Omit<UseQueryOptions<ProductsResData>, "queryKey" | "queryFn">,
) =>
  useQuery({
    ...options,
    queryKey: ["products"],
    queryFn: getProducts,
  });
