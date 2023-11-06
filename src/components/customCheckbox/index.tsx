import { FC, useEffect, useState } from "react";
import cls from "classnames";
import styles from "./styles.module.scss";
import { CustomCheckboxProps } from "@/types";

const CustomCheckbox: FC<CustomCheckboxProps> = ({
  checked,
  defaultChecked,
  onChange,
}) => {
  const [_, setIsChecked] = useState(defaultChecked);

  useEffect(() => {
    setIsChecked(defaultChecked);
  }, [defaultChecked]);

  const handleCheckboxChange = () => {
    const newChecked = !checked;
    setIsChecked(newChecked);
    onChange(newChecked);
  };

  return (
    <label className={styles.switch}>
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={checked}
        onChange={handleCheckboxChange}
      />

      <span
        className={cls(styles["toggle-thumb"], {
          [styles.start]: checked,
          [styles.end]: !checked,
        })}
      >
        {checked ? "On" : "Off"}
      </span>
    </label>
  );
};

export default CustomCheckbox;
