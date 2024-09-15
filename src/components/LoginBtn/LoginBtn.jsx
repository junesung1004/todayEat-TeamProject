"use client";

import React, { useState } from "react";
import styles from "./LoginBtn.module.scss";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import kakao from "../../../public/images/kakaoBtn.png";
import { useUser } from "@/context/userContext";

export default function LoginBtn() {
  const { isLogin, setIsLogin } = useUser();

  const handleSignIn = () => {
    setIsLogin(true);
    console.log("isLogin : ", isLogin);
    const login = signIn("kakao", { callbackUrl: `/home?login=true` });
    console.log("login : ", login);
  };

  return (
    <div className={styles.container}>
      <button onClick={() => handleSignIn()}>
        <Image priority width={320} height={56} src={kakao} alt="카카오 로그인 버튼 UI" />
      </button>
    </div>
  );
}
