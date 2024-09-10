"use client";

import Card from "@/components/Card/Card";
import Link from "next/link";
import styles from "./page.module.scss";
import Image from "next/image";
import pointer from "../../../../public/images/pointer.png";
import { useState } from "react";
import locationIcon from "../../../../public/images/locationIcon.png";
import heartIcon from "../../../../public/images/heartIcon.png";
import { useRouter } from "next/navigation";

export default function Page() {
  const [display, setDisplay] = useState(true);
  const clickDisPlayEvent = () => {
    setDisplay(false);
  };

  const router = useRouter();

  const clickMovePage = () => {
    router.push("/selectedFood");
  };

  return (
    <>
      <div className={styles.container}>
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
        <Card />
        <Link href={"/selectedFood"}>
          <Image
            onClick={() => {
              clickMovePage();
            }}
            src={locationIcon}
            alt="지도모양 아이콘"
            width={40}
            height={40}
            className={styles.locate}
          />
        </Link>

        <Link href={"/mypage"}>
          <Image src={heartIcon} alt="하트모양 아이콘" width={40} height={40} className={styles.heart} />
        </Link>
      </div>
    </>
  );
}
