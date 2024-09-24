"use client";

import { useState } from "react";
import styles from "./DisLikePopUp.module.scss";
import { useUser } from "@/context/userContext";
import { signIn } from "next-auth/react";

export default function DisLikePopUp({ onClose, foodId, foodName, foodImage }) {
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

  const clickUpdateDisLike = async () => {
    // console.log("버튼 클릭");
    console.log("foodId:", foodId);
    console.log("foodName:", foodName);
    console.log("foodImage:", foodImage);
    if (!isLogin) {
      alert("로그인이 필요합니다.");
      signIn("kakao", { callbackUrl: `/home?login=true` });
      return;
    }

    if (!foodImage && !foodName) {
      console.error("필요한 데이터가 부족합니다:", { foodImage, foodName });
    }
    try {
      const response = await fetch("/api/disLikeFood", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: foodId, name: foodName, image: foodImage }),
      });
      const data = await response.json();
      setIsDisLikePopUpVisible(false);
      if (onClose) {
        onClose(); // onClose가 있는지 체크
      }
      if (!response.ok) {
        console.error("서버 오류 : ", data);
      } else {
        console.log("싫어요 추가 완료", data);
      }
    } catch (error) {
      console.error("싫어하는 음식 업데이트 에러", error);
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
          <button onClick={() => clickUpdateDisLike()} className={styles.disLikeBtn}>
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
