import { FC } from "react";
import { ButtonProps } from "@/types";
import styles from "./styles.module.scss";

const Button: FC<ButtonProps> = ({ children }) => {
  return <button className={styles.button}>{children}</button>;
};

export default Button;
