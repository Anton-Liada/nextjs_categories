import { DraggableProvided } from "@hello-pangea/dnd";
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
  draggableProvided: DraggableProvided;
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

export interface IHeaderProps {
  name: string;
  setName: (value: string) => void;
}

export interface ISearchInput {
  name: string;
  setName: (value: string) => void;
}

export interface CustomCheckboxProps {
  checked: boolean;
  onChange: (isChecked: boolean) => void;
  defaultChecked?: boolean;
}

export interface IModalProps {
  handleClose: () => void;
  onDelete: () => void;
}
