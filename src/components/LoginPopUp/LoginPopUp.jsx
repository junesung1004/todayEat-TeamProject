import { useState } from "react";
import styles from "./LoginPopUp.module.scss";
import { signIn } from "next-auth/react";

export default function LoginPopUp() {
  const [isVisible, setIsVisible] = useState(true);
  const [user, setUser] = useState(true);
  const closeBtn = () => {
    setIsVisible(false);
  };
  if (!isVisible) {
    return null;
  }

  const handleSignIn = () => {
    localStorage.setItem("user", JSON.stringify(user));
    signIn("kakao", { callbackUrl: "/home" });
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
