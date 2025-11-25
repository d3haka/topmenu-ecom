// const thousandSeperator = (1e3).toLocaleString("fa").at(1)!;

// export function numFa(num: unknown) {
//   return Number(num).toLocaleString("fa").replaceAll(thousandSeperator, ",");
// }

export function getPriceInToman(price: number) {
  const DOLLOR_IN_TOMAN = 112_880;

  const getPriceInTomanEn = Math.round(price * DOLLOR_IN_TOMAN);

  return getPriceInTomanEn.toLocaleString("en");
  // return getPriceInTomanEn.toLocaleString("fa").replaceAll(thousandSeperator, ",");
}

export function getDiscountedPrice(price: number, discountPercentage: number) {
  return Number((price * (100 - discountPercentage)) / 100);
}
