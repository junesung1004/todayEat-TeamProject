"use client";

import React from "react";
import styles from "./LoginBtn.module.scss";
import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginBtn({ login }) {
  return (
    <div className={styles.Container}>
      {!login ? (
        <button
          onClick={() => {
            signIn();
          }}
        >
          로그인
        </button>
      ) : (
        <>
          <button
            onClick={() => {
              signOut();
            }}
          >
            로그아웃
          </button>
        </>
      )}
    </div>
  );
}
