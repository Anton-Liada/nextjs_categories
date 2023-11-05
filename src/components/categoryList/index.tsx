"use client";

import useCategories from "@/customHooks/useCategories";
import Category from "../category";
import Button from "../button";
import styles from "./styles.module.scss";

const CategoryList = () => {
  const { categories, loading, error } = useCategories();

  if (loading) {
    return <p className={styles.message}>Loading...</p>;
  }

  if (error) {
    return <p className={styles.message}>{error}</p>;
  }

  if (!categories.length) {
    return <p className={styles.message}>There are no categories yet!</p>;
  }

  return (
    <div className={styles.listWrapper}>
      <Button>+ Create a Category</Button>

      {categories &&
        categories.map(category => (
          <Category key={category.id} category={category} />
        ))}
    </div>
  );
};

export default CategoryList;
