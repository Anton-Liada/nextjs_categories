import { FC } from "react";
import cls from "classnames";
import styles from "./styles.module.scss";
import Close from "../icons/close";
import Button from "../button";
import Delete from "../icons/delete";
import { IModalProps } from "@/types";

const Modal: FC<IModalProps> = ({ handleClose, onDelete }) => {
  return (
    <div className={cls(styles.modal)} onClick={handleClose}>
      <div
        className={styles["modal-main"]}
        onClick={event => event.stopPropagation()}
      >
        <button onClick={handleClose} className={styles.closeBtn}>
          <Close />
        </button>

        <h3 className={styles.title}>Delete the Category?</h3>

        <p className={styles.text}>
          All templates in the category will be moved to the category
          &quot;Other&quot;
        </p>

        <Button bgColor="gradient" onClick={onDelete}>
          <Delete />
          Delete
        </Button>

        <button onClick={handleClose} className={styles.cancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Modal;
