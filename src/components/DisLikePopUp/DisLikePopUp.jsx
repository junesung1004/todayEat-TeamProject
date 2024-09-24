"use client";

import { useState } from "react";
import styles from "./DisLikePopUp.module.scss";
import { useUser } from "@/context/userContext";
import { signIn } from "next-auth/react";

export default function DisLikePopUp({ onClose }) {
  const [isDisLikePopUpVisible, setIsDisLikePopUpVisible] = useState(true);
  const { isLogin } = useUser();
  console.log("isLogin : ", isLogin);
  const [disLikeItems, setDisLikeItems] = useState([]);

  const closeBtn = () => {
    setIsDisLikePopUpVisible(false);
    if (onClose) {
      onClose(); // onClose가 있는지 체크
    }
  };
  if (!isDisLikePopUpVisible) {
    return null;
  }

  const clickDisLikeHandle = async (item) => {
    console.log("버튼 클릭");
    if (!isLogin) {
      alert("로그인이 필요합니다.");
      signIn("kakao", { callbackUrl: `/home?login=true` });
      return;
    } else {
      alert("업데이트 할 예정입니다^^;;");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.background}></div>
      <section className={styles.popUpContainer}>
        <article className={styles.disLikeContainer}>
          <div className={styles.title}>
            <p>이 메뉴가 마음에 안 드시면 숨길 수 있어요.</p>
          </div>
        </article>

        <div className={styles.btnContainer}>
          <button onClick={() => clickDisLikeHandle()} className={styles.disLikeBtn}>
            안볼래요
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
