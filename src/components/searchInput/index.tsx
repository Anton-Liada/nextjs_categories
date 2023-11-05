"use client";

import { useState } from "react";
import Search from "@/components/icons/search";
import styles from "./styles.module.scss";

const SearchInput = () => {
  const [name, setName] = useState("");

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
