import { Category } from "@/types";

export const validateCategory = (category: Category) => {
  category.name = category.name.trim();

  if (!category.name) {
    throw new Error("Name cannot be empty");
  }
};
