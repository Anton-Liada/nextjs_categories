import { NextResponse, NextRequest } from "next/server";
import { ICategory } from "@/types";
import { validateCategory } from "../utils/common";
import { v4 as uuidv4 } from "uuid";

export const randomId = () => uuidv4();
const categories: ICategory[] = [
  { id: randomId(), name: "blockchain", active: true },
  { id: randomId(), name: "NFT Paris", active: true },
  { id: randomId(), name: "NFT London", active: false },
  { id: randomId(), name: "GM", active: false },
  { id: randomId(), name: "Other", active: false },
];

export const getCategories = () => {
  return NextResponse.json({ categories });
};

export const saveCategory = (category: ICategory) => {
  const newCategory = {
    ...category,
    id: randomId(),
  } as ICategory;

  validateCategory(newCategory);
  categories.unshift(newCategory);

  return newCategory;
};

export function deleteCategory(id: string) {
  const indexToDelete = categories.findIndex(category => category.id === id);

  if (indexToDelete === -1) {
    return NextResponse.json({ error: "Category not found" });
  }

  categories.splice(indexToDelete, 1);

  return NextResponse.json({
    message: "Category was deleted",
  });
}

export const saveCategories = async (req: NextRequest) => {
  const { newCategories, newCategory } = await req.json();
  let updatedCategories;

  if (newCategory.name) {
    const category = saveCategory(newCategory);

    updatedCategories = [...newCategories, category];
  } else {
    updatedCategories = [...newCategories];
  }

  categories.length = 0;
  categories.push(...updatedCategories);

  const res = NextResponse.json({
    message: "Categories have been saved",
    categories: categories,
  });

  return res;
};
