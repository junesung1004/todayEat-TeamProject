"use client";

import styles from "./page.module.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
//npm install framer-motion
//npm install sharp
import logo from "../../public/images/logo.png";
import todayeat from "../../public/images/투데잇.png";

export default function App() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/start");
    }, 2000);
  }, [router]);

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }} // 초기 상태
      animate={{ opacity: 1 }} // 애니메이션 상태
      exit={{ opacity: 0 }} // 페이지 나갈 때 애니메이션
      transition={{ duration: 1.5 }} // 애니메이션 지속 시간
    >
      <div className={styles.logoWrap}>
        <Image src={logo} priority={true} alt="logo" width={83} height={65} />
        <Image src={todayeat} style={{ objectFit: "cover" }} priority={true} alt="logo" width={91} height={40} />
      </div>
    </motion.div>
  );
}
