import Link from "next/link";
import Logo from "@/components/icons/logo";
import Container from "../container";
import SearchInput from "../searchInput";
import styles from "./styles.module.scss";

const Header = () => {
  return (
    <header className={`${styles.header} container`}>
      <Container>
        <div className={styles.headerWrapper}>
          <Link href="/" className={styles.logoWrapper}>
            <Logo />

            <h1 className={styles.title}>Memes</h1>
          </Link>

          <SearchInput />
        </div>
      </Container>
    </header>
  );
};

export default Header;
