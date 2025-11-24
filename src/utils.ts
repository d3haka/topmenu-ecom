// const thousandSeperator = (1e3).toLocaleString("fa").at(1)!;

// export function numFa(num: unknown) {
//   return Number(num).toLocaleString("fa").replaceAll(thousandSeperator, ",");
// }

export function priceInTomanFa(price: number) {
  const DOLLOR_IN_TOMAN = 112_880;

  const priceInTomanEn = Math.round(price * DOLLOR_IN_TOMAN);

  return priceInTomanEn.toLocaleString("en");
  // return priceInTomanEn.toLocaleString("fa").replaceAll(thousandSeperator, ",");
}
