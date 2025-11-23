import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import getQueryClient from "./get-query-client";
import { ReactNode } from "react";
import { getProducts } from "@/api/products";

export async function InitialDataProvider({
  children,
}: {
  children: ReactNode;
}) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 1e3 * 60 * 30, // data fresh for 30m
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
  );
}
