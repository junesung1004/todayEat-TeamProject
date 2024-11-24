"use client";

import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import styles from "./global-layout.module.scss";
import { usePathname } from "next/navigation";

export default function GlobalLayout({ children }) {
  return (
    <div className={styles.container}>
      <div className={styles.main}>{children}</div>
    </div>
  );
}
