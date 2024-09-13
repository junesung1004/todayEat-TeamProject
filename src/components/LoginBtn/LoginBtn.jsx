"use client";

import React from "react";
import styles from "./LoginBtn.module.scss";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import kakao from "../../../public/images/kakaoBtn.png";

export default function LoginBtn() {
  return (
    <div className={styles.container}>
      <button onClick={() => signIn("kakao")}>
        <Image priority width={320} height={56} src={kakao} alt="카카오 로그인 버튼 UI" />
      </button>
      <button onClick={() => signOut()}>로그아웃</button>
    </div>
  );
}
