"use client";

import Link from "next/link";
import styles from "./page.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";
import LoginPopUp from "@/components/LoginPopUp/LoginPopUp";
import { useSession } from "next-auth/react";
import { useUser } from "@/context/userContext";
// import { useRouter } from "next/router";
import dosirockback from "@/../../public/images/도시락배경이미지.png";
import dosirock from "@/../../public/images/도시락이미지.png";
import sal from "@/../../public/images/샐러드이미지.png";
import salback from "@/../../public/images/샐러드배경.png";
import cobab from "@/../../public/images/초밥.png";
import cobabback from "@/../../public/images/초밥배경.png";
import cabab from "@/../../public/images/케밥.png";
import cababback from "@/../../public/images/케밥배경.png";
import bbang from "@/../../public/images/크로아상.png";
import bbangback from "@/../../public/images/크로아상배경.png";
import kimch from "@/../../public/images/찌개.png";
import kimchback from "@/../../public/images/찌개배경.png";

export default function Home() {
  // const router = useRouter();
  // console.log("router : ", router);
  // const { login } = router.query;
  const { isLogin, setIsLogin } = useUser();
  console.log("isLogin : ", isLogin);
  console.log(window?.location);
  useEffect(() => {
    if (window.location.search.includes("true")) {
      console.log("User is logged in.");
      setIsLogin(true);
    }
  }, [setIsLogin]);

  const togglePopUp = () => {
    setIsPopUpVisible((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <section className={styles.title}>
        <h1>오늘 뭐먹지?</h1>
        <p>투데잇이 골라줄게요</p>
      </section>

      <section className={styles.imageContainer}>
        <div className={styles.imgWrap}>
          <Image className={styles.dosirock} src={dosirockback} alt="도시락 배경 로고" priority width={93} height={75} />
          <Image className={styles.dosirockback} src={dosirock} alt="도시락 로고" priority width={48} height={58} />
          <Image className={styles.sal} src={sal} alt="샐러드 로고" priority width={48} height={58} />
          <Image className={styles.salback} src={salback} alt="샐러드 배경 로고" priority width={93} height={75} />
          <Image className={styles.cobab} src={cobab} alt="초밥 로고" priority width={36} height={58} />
          <Image className={styles.cobabback} src={cobabback} alt="초밥 배경 로고" priority width={78} height={72} />
          <Image className={styles.cabab} src={cabab} alt="초밥 로고" priority width={40} height={58} />
          <Image className={styles.cababback} src={cababback} alt="초밥 배경 로고" priority width={88} height={72} />
          <Image className={styles.bbang} src={bbang} alt="크로아상 로고" priority width={40} height={58} />
          <Image className={styles.bbangback} src={bbangback} alt="크로아상 배경 로고" priority width={88} height={72} />
          <Image className={styles.kimch} src={kimch} alt="찌개 로고" priority width={40} height={58} />
          <Image className={styles.kimchback} src={kimchback} alt="찌개 배경 로고" priority width={88} height={72} />
        </div>
        <div className={styles.btnWrap}>
          <Link href={"/customization"} className={styles.btn}>
            <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
              />
            </svg>

            <span>맞춤설정</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
