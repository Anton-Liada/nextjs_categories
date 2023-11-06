import Link from "next/link";
import Logo from "@/components/icons/logo";
import Container from "../container";
import SearchInput from "../searchInput";
import styles from "./styles.module.scss";
import { FC } from "react";
import { IHeaderProps } from "@/types";

const Header: FC<IHeaderProps> = ({ name, setName }) => {
  return (
    <header className={`${styles.header} container`}>
      <Container>
        <div className={styles.headerWrapper}>
          <Link href="/" className={styles.logoWrapper}>
            <Logo />

            <h1 className={styles.title}>Memes</h1>
          </Link>

          <SearchInput name={name} setName={setName} />
        </div>
      </Container>
    </header>
  );
};

export default Header;
