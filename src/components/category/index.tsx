"use client";

import { FC } from "react";
import { CategoryProps } from "@/types";
import styles from "./styles.module.scss";
import Basket from "../icons/basket";
import Drag from "../icons/drag";
import CustomCheckbox from "../customCheckbox";
import cls from "classnames";

const Category: FC<CategoryProps> = ({
  category,
  draggableProvided,
  onCheckboxChange,
  handleOpenModal,
}) => {
  const handleCheckboxChange = (isChecked: boolean) => {
    onCheckboxChange(category.id, isChecked);
  };

  return (
    <div
      className={styles.category}
      {...draggableProvided.draggableProps}
      ref={draggableProvided.innerRef}
    >
      <p
        className={cls(styles.categoryName, {
          [styles.disabled]: !category.active,
        })}
      >
        {category.name}
      </p>

      <div className={styles.actionBtnWrapper}>
        <div className={styles.iconBtn}>
          <CustomCheckbox
            checked={category.active || false}
            onChange={handleCheckboxChange}
          />
        </div>

        {category.name !== "Other" && (
          <>
            <div
              className={styles.iconBtn}
              onClick={() => handleOpenModal(category.id)}
            >
              <Basket />
            </div>

            <div
              className={cls(styles.iconBtn, styles.grab)}
              {...draggableProvided.dragHandleProps}
            >
              <Drag />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Category;
