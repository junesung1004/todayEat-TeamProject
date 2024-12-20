"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import { getSession, signOut } from "next-auth/react";
import LoginPopUp from "@/components/LoginPopUp/LoginPopUp";
import Link from "next/link";
import { useUser } from "@/context/userContext";
import logo from "@/../../public/images/logo.png";
import exit from "@/../../public/images/exit.png";
import pen from "@/../../public/images/pen.png";
import Image from "next/image";
import Footer from "@/components/Footer/Footer";
import food1 from "@/../../public/new/만두.jpg";

export default function Page() {
  const router = useRouter();

  const [isLikeChecked, setIsLikeChecked] = useState(true);
  const [isDisLikeChecked, setIsDisLikeChecked] = useState(false);
  const [user, setUser] = useState(null);
  const { isLogin, setIsLogin } = useUser();

  const [likedFoods, setLikedFoods] = useState([]);

  const [disLikedFoods, setDisLikedFoods] = useState([]);
  console.log("likedFoods", likedFoods);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setUser(session?.user || null);
    };
    fetchSession();
  }, []);

  //좋아하는 음식 데이터베이스로부터 가져오는 코드
  useEffect(() => {
    const getFetchData = async () => {
      if (!user) return; // 사용자 세션이 없으면 반환

      try {
        const response = await fetch("/api/likeFood"); // 좋아요 음식 API 호출
        if (!response.ok) {
          throw new Error("서버 오류");
        }
        const data = await response.json();
        setLikedFoods(data.data); // 받은 데이터로 상태 업데이트
      } catch (error) {
        console.error("좋아요 음식 목록 가져오기 에러 :", error);
      }
    };
    getFetchData();
  }, [user]); // user가 변경될 때마다 데이터 가져오기

  //싫어하는 음식 데이터베이스로부터 가져오는 코드
  useEffect(() => {
    const getFetchData = async () => {
      if (!user) return; // 사용자 세션이 없으면 반환

      try {
        const response = await fetch("/api/disLikeFood"); // 좋아요 음식 API 호출
        if (!response.ok) {
          throw new Error("서버 오류");
        }
        const data = await response.json();
        setDisLikedFoods(data.data); // 받은 데이터로 상태 업데이트
      } catch (error) {
        console.error("좋아요 음식 목록 가져오기 에러 :", error);
      }
    };
    getFetchData();
  }, [user]); // user가 변경될 때마다 데이터 가져오기

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
      <div className={styles.userInfoWrap}>
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
            좋아요<span className={styles.like}>{likedFoods.length}</span>
          </div>
          <div onClick={() => clickDisLikeBtn()} className={`${styles.disLikeWrap} ${isDisLikeChecked ? styles.disLikeChecked : ""}`}>
            안볼래요<span className={styles.disLike}>{disLikedFoods.length}</span>
          </div>
        </article>
      </div>

      <section className={styles.foodsImgContainer}>
        {isLikeChecked &&
          likedFoods.map((food, idx) => {
            return (
              <article className={styles.imgWrap} key={idx}>
                <Image className={styles.img} src={food.image} alt="좋아요 음식" priority />
                <p>{food.name}</p>
              </article>
            );
          })}

        {isDisLikeChecked &&
          disLikedFoods.map((food, idx) => {
            return (
              <article className={styles.imgWrap} key={idx}>
                <Image className={styles.img} src={food.image} alt="싫어요 음식" priority />
                <p>{food.name}</p>
              </article>
            );
          })}
      </section>
      <div className={styles.editBtnWrap}>
        <Image src={pen} alt="수정로고" priority width={20} height={20} />
        <button className={styles.editBtn}>편집</button>
      </div>
      <Footer />
    </div>
  );
}
