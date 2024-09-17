"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import { getSession, signOut } from "next-auth/react";
import LoginPopUp from "@/components/LoginPopUp/LoginPopUp";
import Link from "next/link";
import Footer from "@/components/Footer/Footer";
import { useUser } from "@/context/userContext";
import logo from "@/../../public/images/logo.png";
import exit from "@/../../public/images/exit.png";
import pen from "@/../../public/images/pen.png";
import Image from "next/image";

export default function Page() {
  const mock1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  const mock2 = [1, 2, 3, 4, 5];
  const router = useRouter();

  const [isLikeChecked, setIsLikeChecked] = useState(true);
  const [isDisLikeChecked, setIsDisLikeChecked] = useState(false);
  const [user, setUser] = useState(null);
  const { isLogin, setIsLogin } = useUser();

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setUser(session?.user || null);
    };
    fetchSession();
  }, []);

  //console.log(user?.name);

  const clickHomeMove = async () => {
    try {
      setIsLogin(false);
      await signOut({ redirect: false });
      router.push("/start");
    } catch (error) {
      console.error("로그아웃 에러 발생 :", error);
      throw new Error("로그아웃 과정에서 오류가 발생했습니다.");
    }
  };

  const clickLikeBtn = () => {
    setIsLikeChecked((prev) => !prev);
    if (isDisLikeChecked) {
      setIsDisLikeChecked(false);
    }
  };

  const clickDisLikeBtn = () => {
    setIsDisLikeChecked((prev) => !prev);
    if (isLikeChecked) {
      setIsLikeChecked(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.userInfoContainer}>
        <Image src={logo} alt="로고이미지" priority width={43} height={34} />
        <h2>
          <span className={styles.userName}>{user?.name}</span>님
        </h2>
        <h2>맛있는 식사하셨나요?</h2>
      </div>

      <div className={styles.btnContainer}>
        <div className={styles.logOutBtnWrap}>
          <Image src={exit} alt="로그아웃 로고" width={16} height={16} priority />
          <button onClick={() => clickHomeMove()} className={styles.logOutBtn}>
            로그아웃
          </button>
        </div>
      </div>

      <article className={styles.likeDisLikeContainer}>
        <div onClick={() => clickLikeBtn()} className={`${styles.likeWrap} ${isLikeChecked ? styles.likeChecked : ""}`}>
          좋아요<span className={styles.like}>13</span>
        </div>
        <div onClick={() => clickDisLikeBtn()} className={`${styles.disLikeWrap} ${isDisLikeChecked ? styles.disLikeChecked : ""}`}>
          안볼래요<span className={styles.disLike}>5</span>
        </div>
      </article>

      <section className={styles.foodsImgContainer}>
        {isLikeChecked &&
          mock1.map((el, idx) => {
            return (
              <article className={styles.imgWrap} key={idx}>
                <div>이미지</div>
                <p>음식이름</p>
              </article>
            );
          })}

        {isDisLikeChecked &&
          mock2.map((el, idx) => {
            return (
              <article className={styles.imgWrap} key={idx}>
                <div>이미지</div>
                <p>음식이름</p>
              </article>
            );
          })}
      </section>
      <div className={styles.editBtnWrap}>
        <Image src={pen} alt="수정로고" priority width={20} height={20} />
        <button className={styles.editBtn}>편집</button>
      </div>
    </div>
  );
}
