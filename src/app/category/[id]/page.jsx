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

export default function Page() {
  const [display, setDisplay] = useState(true);
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [user, setUser] = useState();
  console.log("user : ", user);
  const router = useRouter();

  useEffect(() => {
    const isUser = localStorage.getItem("user");
    setUser(isUser);
  }, []);

  const clickDisPlayEvent = () => {
    setDisplay(false);
  };

  const togglePopUp = () => {
    if (user) {
      router.push("/mypage");
    } else {
      setIsPopUpVisible((prev) => !prev);
    }
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
          <Link href={"/"}>이미지</Link>
          <Link href={"/category"}>조건변경</Link>
        </nav>
        <Card onSlideChange={setSelectedFood} />
        <button
          type="button"
          onClick={() => {
            clickMovePage();
          }}
        >
          <Image src={locationIcon} alt="지도모양 아이콘" width={40} height={40} className={styles.locate} />
        </button>

        <Link href={"/mypage"}>
          <Image src={heartIcon} alt="하트모양 아이콘" width={40} height={40} className={styles.heart} />
        </Link>

        <footer className={styles.footerContainer}>
          <Link href={"/"}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.icon}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          </Link>

          <button onClick={togglePopUp}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.icon}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </button>
        </footer>
      </div>
    </>
  );
}
