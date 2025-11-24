"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { FC, PropsWithChildren } from "react";

export const AnimatedPage: FC<PropsWithChildren> = ({ children }) => {
  const path = usePathname();
  console.log(path);

  return (
    <motion.div
      key={path}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};
