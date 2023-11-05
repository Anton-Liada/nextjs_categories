import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

export interface RequestContext {
  params: {
    id: string;
  };
}

export interface Category {
  id: string;
  name: string;
  active: boolean;
}

export interface CategoryProps {
  category: Category;
}

export interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: ReactNode;
}
