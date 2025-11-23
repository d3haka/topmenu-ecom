import Image from "next/image";
import s from "./product-card.module.scss";
import { numFa, priceInTomanFa } from "@/utils";
import Link from "next/link";

type ProductCardProps = {
  id: number;
  thumbnail: string;
  title: string;
  description: string;
  price: number;
  discountPercentage?: number;
};

export function ProductCard({
  id,
  thumbnail,
  title,
  description,
  price,
  discountPercentage,
}: ProductCardProps) {
  const discountedPrice = Number(
    ((price * (100 - (discountPercentage ?? 0))) / 100).toFixed(2)
  );

  return (
    <Link
      href={`/products/${id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className={s.container}>
        <div>
          {discountPercentage && (
            <div className={s["discount-badge"]}>
              <div className={s["discount-badge-number"]}>
                %{numFa(discountPercentage.toFixed())}
              </div>
              <div className={s["discount-badge-text"]}>تخفیف</div>
            </div>
          )}
          <Image
            width={110}
            height={110}
            src={thumbnail}
            alt="product-preview"
          />
        </div>
        <div>
          <div
            style={{ marginBottom: "4rem", width: "80%" }}
            className={s.title}
          >
            {title}
          </div>
          <div className={s["card-description"]}>{description}</div>

          <div className={s["price-container"]}>
            {discountPercentage ? (
              <>
                <div className={s["price-discount"]}>
                  {priceInTomanFa(price)}
                  <span> تومان</span>
                </div>
                <div className={s.price}>
                  {priceInTomanFa(discountedPrice)}
                  <span> تومان</span>
                </div>
              </>
            ) : (
              <div className={s.price}>
                {priceInTomanFa(price)}
                <span> تومان</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
