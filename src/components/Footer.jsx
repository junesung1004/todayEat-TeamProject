import React from "react";
import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <div className={styles.container}>
      <ul>
        <li>Project manager : 최상욱</li>
        <li>Designer : 연주</li>
        <li>Backend Developer : 성보경</li>
        <li>Backend Developer : 정연</li>
        <li>Frontend : 박준성</li>
      </ul>
    </div>
  );
}
