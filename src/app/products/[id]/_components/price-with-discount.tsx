import { getDiscountedPrice, getPriceInToman } from "@/utils";
import { FC } from "react";
import s from "./price-with-discount.module.scss";
import { motion } from "motion/react";

export const PriceWithDiscount: FC<{
  price: number;
  discountPercentage?: number;
  cardVariant?: boolean;
}> = ({ price, discountPercentage, cardVariant }) => {
  let fontSize = 20,
    width = "85%";

  if (cardVariant) {
    fontSize = 16;
    width = "28%";
  }

  return (
    <div style={{ fontWeight: 700, fontSize, position: "relative" }}>
      {discountPercentage ? (
        <>
          <motion.div
            className={s.priceLineThrough}
            style={{ fontSize: "0.8em" }}
            initial={{ y: 26, x: 17, scale: 1.2 }}
            animate={{
              y: 0,
              x: 0,
              scale: 1,
              transition: { delay: 1 },
            }}
          >
            <motion.hr
              style={{ position: "absolute", top: 10, width, left: 0 }}
              initial={{ x: -200 }}
              animate={{
                x: 0,
                transition: { duration: 0.2, delay: 0.1 },
              }}
            />
            {getPriceInToman(price)}
            <span> تومان</span>
          </motion.div>
          <motion.div
            className={s.price}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 1 } }}
          >
            {getPriceInToman(getDiscountedPrice(price, discountPercentage))}
            <span> تومان</span>
          </motion.div>

          {!cardVariant && (
            <span className={s.priceDiscount}>
              {Math.ceil(discountPercentage)}%
            </span>
          )}
        </>
      ) : (
        <div className={s.price}>
          {getPriceInToman(price)}
          <span> تومان</span>
        </div>
      )}
    </div>
  );
};
