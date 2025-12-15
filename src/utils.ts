export function getPriceInToman(price: number) {
  const DOLLOR_IN_TOMAN = 112_880;

  const getPriceInTomanEn = Math.round(price * DOLLOR_IN_TOMAN);

  return getPriceInTomanEn.toLocaleString("en");
}

export function getDiscountedPrice(price: number, discountPercentage: number) {
  return (price * (100 - discountPercentage)) / 100;
}
