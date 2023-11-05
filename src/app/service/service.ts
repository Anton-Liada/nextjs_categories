import { NextResponse, NextRequest } from "next/server";
import { Category } from "@/types";
import { validateCategory } from "../utils/common";

export const randomId = () => crypto.randomUUID();
const categories: Category[] = [
  { id: randomId(), name: "blockchain" },
  { id: randomId(), name: "NFT Paris" },
  { id: randomId(), name: "NFT London" },
  { id: randomId(), name: "GM" },
];

export const getCategories = () => {
  return NextResponse.json({ categories });
};

export const saveCategory = async (req: NextRequest) => {
  const { name } = await req.json();
  const existedCategory = categories.find(category => category.name === name);

  if (existedCategory) {
    return new NextResponse(`${name} category already exist!`, {
      status: 409,
    });
  }

  const newCategory = {
    id: randomId(),
    name,
  } as Category;

  validateCategory(newCategory);
  categories.push(newCategory);

  const res = NextResponse.json({
    message: "Category has been created",
    newCategory,
  });

  return res;
};

export const findOneCategory = (id: string) => {
  const foundCategory = categories.find(category => category.id === id);

  if (!foundCategory) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }

  return NextResponse.json({ foundCategory });
};

export const updateCategory = async (req: NextRequest, id: string) => {
  const { name } = await req.json();

  const foundIndex = categories.findIndex(category => category.id === id);

  if (foundIndex === -1) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }

  categories[foundIndex].name = name;

  return NextResponse.json({
    message: "Category has been updated",
    updatedCategory: categories[foundIndex],
  });
};

export const deleteCategory = (id: string) => {
  const foundIndex = categories.findIndex(category => category.id === id);

  if (foundIndex === -1) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }

  categories.splice(foundIndex, 1);

  return NextResponse.json({
    message: "Category has been deleted",
  });
};
