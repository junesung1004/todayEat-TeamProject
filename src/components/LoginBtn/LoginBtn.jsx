"use client";

import React from "react";
import styles from "./LoginBtn.module.scss";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import kakao from "../../../public/images/kakaoBtn.png";

export default function LoginBtn() {
  return (
    <div className={styles.container}>
      {/* Kakao Sign In */}
      <button className={styles.kakao} onClick={() => signIn("kakao")}>
        <Image width={320} height={56} src={kakao} alt="카카오 로그인 버튼 UI" />
      </button>

      {/* Google Sign In
      <button className={styles.google} onClick={() => signIn("google")}>
        <span>👀</span>
        <span>구글 로그인</span>
      </button>

      GitHub Sign In with custom class
      <button className={styles.github} onClick={() => signIn("github")}>
        <span>🔗</span>
        <span>깃허브 로그인</span>
      </button> */}
    </div>
  );
}
