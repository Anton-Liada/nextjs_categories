import { FC } from "react";
import { CategoryProps } from "@/types";
import styles from "./styles.module.scss";

const Category: FC<CategoryProps> = ({ category }) => {
  return (
    <div className={styles.category}>
      <p className={styles.categoryName}>{category.name}</p>

      <div className={styles.actionBtnWrapper}>
        <div>sw</div>

        <div>ba</div>

        <div>dnd</div>
      </div>
    </div>
  );
};

export default Category;
