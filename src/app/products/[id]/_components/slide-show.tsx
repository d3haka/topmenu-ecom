import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { useInterval } from "usehooks-ts";

type SlideShowProps = {
  images: string[];
};

export function SlideShow({ images }: SlideShowProps) {
  const [imgIndex, setImgIndex] = useState(0);

  useInterval(() => {
    setImgIndex((prev) => {
      if (prev === images.length - 1) return 0;
      return prev + 1;
    });
  }, 6e3);

  if (images.length === 1)
    return (
      <div>
        <Image
          priority
          height={400}
          width={500}
          src={images.at(0)!}
          alt="product-image"
        />
      </div>
    );

  return (
    <AnimatePresence mode="sync">
      <motion.div
        layoutId="x"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Image
          priority
          height={400}
          width={500}
          src={images.at(imgIndex)!}
          alt="product-image"
        />
      </motion.div>
    </AnimatePresence>
  );
}
