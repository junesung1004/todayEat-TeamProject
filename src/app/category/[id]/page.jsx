"use client";

import Card from "@/components/Card/Card";
import Link from "next/link";
import styles from "./page.module.scss";
import Image from "next/image";
import pointer from "../../../../public/images/pointer.png";
import { useEffect, useState } from "react";
import locationIcon from "../../../../public/images/locationIcon.png";
import heartIcon from "../../../../public/images/heartIcon.png";
import { useRouter } from "next/navigation";
import { mockData } from "@/components/Card/Card";
import LoginPopUp from "@/components/LoginPopUp/LoginPopUp";
import logo from "@/../../public/images/logo2.png";
import todayeat from "@/../../public/images/투데잇2.png";
import heart from "@/../../public/images/heart.png";
import blackHeart from "@/../../public/images/blackHeart.png";
import location from "@/../../public/images/location.png";

export default function Page() {
  const [display, setDisplay] = useState(true);
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [user, setUser] = useState();
  console.log("user : ", user);
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const isUser = localStorage.getItem("user");
    setUser(isUser);
  }, []);

  const clickDisPlayEvent = () => {
    setDisplay(false);
  };

  console.log("mockData : ", mockData);

  const [selectedFood, setSelectedFood] = useState(mockData);

  const clickMovePage = () => {
    if (selectedFood) {
      const { title, price, calories } = selectedFood;
      router.push(`/selectedFood?title=${encodeURIComponent(title)}&price=${encodeURIComponent(price)}&calories=${encodeURIComponent(calories)}`);
    } else {
      console.log("선택된 음식이 없습니다.");
    }
  };

  const clickUpdateLike = async () => {
    if (!user) {
      setIsPopUpVisible((prev) => !prev);
      return;
    }
    // 상태가 변경된 후에 로직 실행
    const updatedIsChecked = !isChecked;
    setIsChecked(updatedIsChecked);

    try {
      const { title, price, calories } = selectedFood;

      if (title && price && calories) {
        if (updatedIsChecked) {
          const response = await fetch("/api/likeFood", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, price, calories }),
          });
          const data = await response.json();
          console.log("추가 완료", data);
        } else {
          const response = await fetch("/api/likeFood", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ title }),
          });
          const data = await response.json();
          console.log("삭제 완료", data);
        }
      }
    } catch (error) {
      console.error("error: ", error);
      throw new Error("좋아하는 음식 업데이트 에러");
    }
  };

  return (
    <>
      <div className={styles.container}>
        {isPopUpVisible && <LoginPopUp />}
        {display && (
          <div className={styles.background}>
            <div className={styles.text}>
              <p>좌우로 넘기면서</p>
              <p>메뉴를 확인 할 수 있어요</p>
            </div>
            <div className={styles.text1}>
              <p>인근 매장을</p>
              <p>확인 할 수 있어요</p>
            </div>
            <div className={styles.text2}>
              <p>좋아요를 통해</p>
              <p>나만의 메뉴리스트를</p>
              <p>만들어보세요</p>
            </div>
            <div
              onClick={() => {
                clickDisPlayEvent();
              }}
              className={styles.iconWrap}
            >
              <p>{`Click Me`}</p>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.icon}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </div>

            <Image className={styles.pointer} src={pointer} alt="예시 이미지" />
          </div>
        )}
        <nav>
          <div>
            <Link href={"/home"}>
              <div className={styles.logoWrap}>
                <Image src={logo} priority width={41} height={41} alt="투데잇 로고" />
                <Image src={todayeat} priority width={59} height={26} alt="투데잇 텍스트" />
              </div>
            </Link>
          </div>

          <Link href={"/category"} className={styles.filterLogo}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
              />
            </svg>
          </Link>
        </nav>
        <Card onSlideChange={setSelectedFood} />

        <div className={styles.iconWrap2}>
          {isChecked ? (
            <Image onClick={() => clickUpdateLike()} src={blackHeart} alt="하트로고" priority width={24} height={24} className={styles.icon} />
          ) : (
            <Image onClick={() => clickUpdateLike()} src={heart} alt="하트로고" priority width={24} height={24} className={styles.icon} />
          )}
          <div className={styles.line}>|</div>
          <Image
            onClick={() => {
              clickMovePage();
            }}
            src={location}
            alt="지도모양 아이콘"
            priority
            width={24}
            height={24}
            className={styles.icon}
          />
        </div>
      </div>
    </>
  );
}
