"use client";

import { FC } from "react";
import Search from "@/components/icons/search";
import styles from "./styles.module.scss";

interface ISearchInput {
  name: string;
  setName: (value: string) => void;
}

const SearchInput: FC<ISearchInput> = ({ name, setName }) => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <div className={styles.inputWrapper}>
      <input
        className={styles.input}
        type="text"
        placeholder="Search"
        value={name}
        onChange={handleSearch}
      />

      <div className={styles.searchWrapper}>
        <Search />
      </div>
    </div>
  );
};

export default SearchInput;
