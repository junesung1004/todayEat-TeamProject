"use client";

import { useEffect, useState } from "react";
import styles from "./LoginPopUp.module.scss";
import { signIn } from "next-auth/react";
import { useUser } from "@/context/userContext";

export default function LoginPopUp({ onClose }) {
  const [isVisible, setIsVisible] = useState(true);
  const { setIsLogin } = useUser();

  const closeBtn = () => {
    setIsVisible(false);
    if (onClose) {
      onClose(); // onClose가 있는지 체크
    }
  };
  if (!isVisible) {
    return null;
  }

  const handleSignIn = () => {
    setIsLogin(true);
    signIn("kakao", { callbackUrl: `/home?login=true` });
  };

  return (
    <div className={styles.container}>
      <div className={styles.background}></div>
      <section className={styles.popUpContainer}>
        <article className={styles.loginPopUpContainer}>
          <div className={styles.title}>
            <p>
              로그인 후 <span className={styles.point}>나만의 메뉴를 구성</span>해볼까요?
            </p>
          </div>
        </article>

        <div className={styles.btnContainer}>
          <button onClick={() => handleSignIn()} className={styles.loginBtn}>
            로그인
          </button>
          <button
            onClick={() => {
              closeBtn();
            }}
            className={styles.closeBtn}
          >
            닫기
          </button>
        </div>
      </section>
    </div>
  );
}
