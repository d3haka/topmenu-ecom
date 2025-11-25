import Image from "next/image";
import s from "./product-card.module.scss";
import Link from "next/link";
import { Product } from "@/api/types/product";
import { motion } from "motion/react";
import { AddToCart } from "./add-to-cart";
import { PriceWithDiscount } from "../[id]/_components/price-with-discount";

export function ProductCard({
  product,
  cardIndex,
}: {
  product: Product;
  cardIndex: number;
}) {
  return (
    <Link
      href={`/products/${product.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className={s.container}>
        <div>
          {product.discountPercentage && (
            <motion.div
              className={s.discountContainer}
              initial={{ y: -30, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
                transition: { delay: 0.1 * (cardIndex + 3), bounce: 0 },
              }}
              exit={{ y: -30, opacity: 0 }}
            >
              <div className={s.discountNumber}>
                %{Math.ceil(product.discountPercentage)}
              </div>
              <div className={s.discountText}>تخفیف</div>
            </motion.div>
          )}
          <Image
            width={110}
            height={110}
            priority
            src={product.thumbnail}
            alt="product-preview"
          />

          <AddToCart
            product={product}
            containerStyles={{
              position: "absolute",
              top: "48%",
              right: "1rem",
            }}
          />
        </div>
        <div>
          <div style={{ marginBottom: "4rem", width: "80%" }} className={s.title}>
            {product.title}
          </div>
          <div className={s.cardDescription}>{product.description}</div>

          <PriceWithDiscount
            cardVariant
            price={product.price}
            discountPercentage={product.discountPercentage}
          />
        </div>
      </div>
    </Link>
  );
}
