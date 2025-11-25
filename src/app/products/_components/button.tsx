import { FC } from "react";
import s from "./button.module.scss";
import { HTMLMotionProps, motion } from "motion/react";

// type ButtonProps = ComponentProps<"button">;
type ButtonProps = Omit<HTMLMotionProps<"button">, "ref">;

export const Button: FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <motion.button
      className={`${s.container} ${className}`}
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      exit={{ y: 100 }}
      transition={{ delay: 0.1, bounce: 0 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};
