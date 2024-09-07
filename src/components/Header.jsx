import Link from "next/link";
import React from "react";
import styles from "./Header.module.scss";

export default function Header() {
  return (
    <div className={styles.container}>
      <Link href={"/"}>todayEat💓</Link>
    </div>
  );
}
