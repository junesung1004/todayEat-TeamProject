"use client";

import React, { useEffect, useState } from "react";
import styles from "./Footer.module.scss";
import Link from "next/link";
import LoginPopUp from "../LoginPopUp/LoginPopUp";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/userContext";

export default function Footer() {
  const router = useRouter();

  const { isLogin } = useUser();
  console.log("isLogin : ", isLogin);

  const [isPopUpVisible, setIsPopUpVisible] = useState(false);

  const togglePopUp = () => {
    if (isLogin) {
      router.push("mypage");
    } else {
      setIsPopUpVisible((prev) => !prev);
    }
  };
  return (
    <div className={styles.container}>
      {isPopUpVisible && <LoginPopUp />}
      <Link href={"/home"}>
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
    </div>
  );
}
