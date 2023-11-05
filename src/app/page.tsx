import CategoryList from "@/components/categoryList";
import styles from "./page.module.scss";
import Container from "@/components/container";

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.categorySection}>
        <Container>
          <CategoryList />
        </Container>
      </section>
    </main>
  );
}
