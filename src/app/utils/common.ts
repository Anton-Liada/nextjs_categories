import { ICategory } from "@/types";
export const BASE_ENDPOINT = `/api/categories`;

export const validateCategory = (category: ICategory) => {
  category.name = category.name.trim();

  if (!category.name) {
    throw new Error("Name cannot be empty");
  }
};
