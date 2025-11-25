import ProductDetails from "./_components/product-details";
import { getProducts } from "@/api/products";

export default async function ProductPage() {
  const productsRes = await getProducts();

  return <ProductDetails productsResData={productsRes} />;
}
