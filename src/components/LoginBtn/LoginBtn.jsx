"use client";

import React, { useState } from "react";
import styles from "./LoginBtn.module.scss";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import kakao from "../../../public/images/kakaoBtn.png";

export default function LoginBtn() {
  const [user, setUser] = useState(true);

  const handleSignIn = () => {
    localStorage.setItem("user", JSON.stringify(user));
    signIn("kakao", { callbackUrl: "/home" }); // 로그인 후 /home으로 리다이렉트
  };

  return (
    <div className={styles.container}>
      <button onClick={() => handleSignIn()}>
        <Image priority width={320} height={56} src={kakao} alt="카카오 로그인 버튼 UI" />
      </button>
    </div>
  );
}
