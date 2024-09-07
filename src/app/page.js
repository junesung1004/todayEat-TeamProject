"use client";

import styles from "./page.module.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
//npm install framer-motion

export default function App() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/home");
    }, 3000);
  }, [router]);

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }} // 초기 상태.
      animate={{ opacity: 1 }} // 애니메이션 상태
      exit={{ opacity: 0 }} // 페이지 나갈 때 애니메이션
      transition={{ duration: 1.5 }} // 애니메이션 지속 시간
    >
      <Image src="/images/logo.jpg" alt="logo" width={100} height={100} />
    </motion.div>
  );
}
