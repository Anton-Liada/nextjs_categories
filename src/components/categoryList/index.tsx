"use client";

import useCategories from "@/customHooks/useCategories";
import Button from "../button";
import { FC, useMemo, useState } from "react";
import Basket from "../icons/basket";
import Drag from "../icons/drag";
import toast from "react-hot-toast";
import axios from "axios";
import Category from "../category";
import { BASE_ENDPOINT } from "@/app/utils/common";
import CheckCircle from "../icons/checkCircle";
import Container from "../container";
import CustomCheckbox from "../customCheckbox";
import { useForm, SubmitHandler } from "react-hook-form";
import cls from "classnames";
import { ICategory, ICategoryListProps } from "@/types";
import styles from "./styles.module.scss";
import Modal from "../modal";
import { Draggable, DropResult, Droppable } from "@hello-pangea/dnd";
import { DragDropContext } from "@hello-pangea/dnd";

const CategoryList: FC<ICategoryListProps> = ({ name }) => {
  const {
    categories,
    tempCategories,
    loading,
    setUseCategories,
    setUseTempCategories,
  } = useCategories();
  const [isShowInput, setIsShowInput] = useState(false);
  const [isShowActionBtn, setIsShowActionBtn] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<string | null>(null);

  const onDragEnd = (result: DropResult) => {
    setIsShowActionBtn(true);
    if (!result.destination) return;

    const newItems = Array.from(categories);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);

    setUseCategories(newItems);
  };

  const [newCategory, setNewCategory] = useState({
    name: "",
    active: false,
  });

  const filteredCategories = useMemo(() => {
    if (name) {
      return categories.filter(category =>
        category.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    return categories;
  }, [name, categories]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICategory>({
    defaultValues: newCategory,
  });

  const handleOpenModal = (id: string) => {
    setIsOpenModal(true);
    setItemToRemove(id);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const onSubmit: SubmitHandler<ICategory> = data => {
    handleSaveCategories(data);
  };

  if (loading) {
    return <p className={styles.message}>Loading...</p>;
  }

  if (!categories?.length) {
    return <p className={styles.message}>There are no categories yet!</p>;
  }

  function handleShowInput() {
    setIsShowInput(true);
    setIsShowActionBtn(true);
  }

  async function handleSaveCategories(updatedCategory: ICategory) {
    try {
      const { data } = await axios.post(BASE_ENDPOINT, {
        newCategories: categories,
        newCategory: {
          name: updatedCategory.name,
          active: newCategory.active,
        },
      });

      setUseCategories(data.categories);
      setUseTempCategories(data.categories);
      reset({
        name: "",
        active: false,
      });

      setIsShowInput(false);
      setIsShowActionBtn(false);
      toast.success("Categories have been saved successfully!");
    } catch (error) {
      toast.error("Unable to save categories. Please try again.");
    }
  }

  function handleUndoChanges() {
    setNewCategory({
      name: "",
      active: false,
    });

    setUseCategories(tempCategories);
    setIsShowInput(false);
    setIsShowActionBtn(false);
  }

  const handleCheckboxChange = (categoryId: string, isChecked: boolean) => {
    const updatedCategories = categories.map(category =>
      category.id === categoryId ? { ...category, active: isChecked } : category
    );

    setUseCategories(updatedCategories);
    setIsShowActionBtn(true);
  };

  const handleToggle = (isChecked: boolean) => {
    setNewCategory(prevNewCategory => ({
      ...prevNewCategory,
      active: isChecked,
    }));
  };

  const handleDeleteCategory = async () => {
    try {
      const { status } = await axios.delete(`${BASE_ENDPOINT}/${itemToRemove}`);

      if (status === 200) {
        const updatedCategories = categories.filter(
          category => category.id !== itemToRemove
        );

        setUseTempCategories(updatedCategories);
        setUseCategories(updatedCategories);
        handleCloseModal();
        toast.success("Category deleted successfully");
      }
    } catch (error) {
      toast.error("Failed to delete category");
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.listWrapper}>
        <Button onClick={handleShowInput} bgColor="purple">
          + Create a Category
        </Button>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          {isShowInput && (
            <div
              className={cls(styles.inputWrapper, {
                [styles.red]: errors.name,
              })}
            >
              <input
                type="text"
                className={styles.input}
                placeholder="Enter Category Name"
                {...register("name", {
                  required: true,
                })}
              />

              <div className={styles.actionBtn}>
                <div className={styles.iconBtn}>
                  <CustomCheckbox
                    defaultChecked={false}
                    checked={newCategory.active}
                    onChange={handleToggle}
                  />
                </div>

                <div className={styles.iconBtn}>
                  <Basket />
                </div>

                <div className={styles.iconBtn}>
                  <Drag />
                </div>
              </div>
            </div>
          )}

          {isShowActionBtn && (
            <div className={styles.actionWrapper}>
              <Container>
                <div className={styles.action}>
                  <Button bgColor="green" type="submit">
                    <CheckCircle />
                    Save Changes
                  </Button>

                  <Button bgColor="ghost" onClick={handleUndoChanges}>
                    Cancel
                  </Button>
                </div>
              </Container>
            </div>
          )}
        </form>

        {categories && (
          <Droppable droppableId="droppable">
            {droppableProvider => (
              <div
                className={styles.categoriesWrapper}
                {...droppableProvider.droppableProps}
                ref={droppableProvider.innerRef}
              >
                {filteredCategories.map((category, index) => (
                  <Draggable
                    key={category.id}
                    draggableId={`draggable${category.id}`}
                    index={index}
                  >
                    {draggableProvided => (
                      <Category
                        key={category.id}
                        category={category}
                        onCheckboxChange={handleCheckboxChange}
                        handleOpenModal={handleOpenModal}
                        draggableProvided={draggableProvided}
                      />
                    )}
                  </Draggable>
                ))}

                {droppableProvider.placeholder}
              </div>
            )}
          </Droppable>
        )}
      </div>

      {isOpenModal && (
        <Modal handleClose={handleCloseModal} onDelete={handleDeleteCategory} />
      )}
    </DragDropContext>
  );
};

export default CategoryList;
