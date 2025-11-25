import useCartStore from "@/store/cartStore";
import { getDiscountedPrice } from "@/utils";

export function useCartTotalPriceWithDiscount() {
  const cartProducts = useCartStore((state) => state.cartProducts);

  const pricesWithDiscount: number[] = cartProducts.map(
    (p) => getDiscountedPrice(p.price, p.discountPercentage) * p.quantity
  );

  const totalPrice = pricesWithDiscount.reduce((acc, val) => acc + val, 0);

  const quantities = cartProducts.map((p) => p.quantity);

  const cartItemCount = quantities.reduce((acc, val) => acc + val, 0);

  return { totalPrice, cartItemCount };
}
