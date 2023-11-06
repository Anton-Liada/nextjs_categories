import { FC } from "react";
import { ButtonProps } from "@/types";
import styles from "./styles.module.scss";

const Button: FC<ButtonProps> = ({ children, bgColor, ...props }) => {
  return (
    <button {...props} className={`${styles.button} ${styles[bgColor]}`}>
      {children}
    </button>
  );
};

export default Button;
