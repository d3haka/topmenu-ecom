"use client";

import { motion, MotionStyle } from "motion/react";
import { usePathname } from "next/navigation";
import { FC, PropsWithChildren } from "react";

type AnimatedPageProps = PropsWithChildren & {
  hasBoxShadow?: boolean;
  style?: MotionStyle;
};

export const AnimatedPage: FC<AnimatedPageProps> = ({
  children,
  hasBoxShadow,
  style,
}) => {
  const path = usePathname();

  let boxShadowStyle: MotionStyle = {};
  if (hasBoxShadow)
    boxShadowStyle = {
      boxShadow:
        "8px 0 8px -4px rgba(0, 0, 0, 0.2), -8px 0 8px -4px rgba(0, 0, 0, 0.2)",
    };

  return (
    <motion.main
      key={path}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ ...boxShadowStyle, height: "100%", ...style }}
    >
      {children}
    </motion.main>
  );
};
