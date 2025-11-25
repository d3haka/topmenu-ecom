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
  }, 5e3);

  if (images.length === 1)
    return (
      <motion.div
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        exit={{ scale: 1.2, transition: { duration: 1 } }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
      >
        <Image
          priority
          height={400}
          width={500}
          src={images.at(0)!}
          alt="product-image"
        />
      </motion.div>
    );

  return (
    <div style={{ position: "relative", height: 400 }}>
      <AnimatePresence mode="sync">
        <motion.div
          key={images[imgIndex]}
          initial={{ opacity: 0, scale: 1.2 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.2, transition: { duration: 1 } }}
          style={{ position: "absolute" }}
          transition={{ duration: 5 }}
        >
          <Image
            priority
            height={400}
            width={500}
            src={images[imgIndex]}
            alt="product-image"
          />
        </motion.div>
        {/* {images.map((img) => {
          if (images[imgIndex] !== img) return null;
          return (

          );
        })} */}
      </AnimatePresence>
    </div>
  );
}
