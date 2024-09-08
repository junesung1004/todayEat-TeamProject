import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import styles from "./global-layout.module.scss";

export default function GlobalLayout({ children }) {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.main}>{children}</div>
      <Footer />
    </div>
  );
}
