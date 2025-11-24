import { getProducts } from "@/api/products";
import ProductList from "./_components/products-list";

export default async function ProductsPage() {
  const productsRes = await getProducts();

  return <ProductList products={productsRes} />;
}
