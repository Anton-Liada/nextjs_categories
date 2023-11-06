import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

export interface RequestContext {
  params: {
    id: string;
  };
}

export interface ICategory {
  id: string;
  name: string;
  active: boolean;
}

export interface CategoryProps {
  category: ICategory;
  handleOpenModal: (id: string) => void;
  onCheckboxChange: (categoryId: string, isChecked: boolean) => void;
  draggableProvided: any;
}

export interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: ReactNode;
  bgColor: "purple" | "green" | "ghost" | "gradient";
}

export interface ICategoryListProps {
  name: string;
}
