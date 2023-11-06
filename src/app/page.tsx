"use client";

import CategoryList from "@/components/categoryList";
import styles from "./page.module.scss";
import Container from "@/components/container";
import Header from "@/components/header";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");

  return (
    <>
      <Header name={name} setName={setName} />
      <main className={styles.main}>
        <section className={styles.categorySection}>
          <Container>
            <CategoryList name={name} />
          </Container>
        </section>
      </main>
    </>
  );
}
