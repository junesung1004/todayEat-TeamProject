import Link from "next/link";
import styles from "./page.module.scss";
import Image from "next/image";
import LoginBtn from "@/components/LoginBtn/LoginBtn";
import StartCardSlide from "@/components/startCardSlide/StartCardSlide";

export default function Start() {
  return (
    <div className={styles.container}>
      <StartCardSlide />
      <section className={styles.userLoginContainer}>
        <Link className={styles.noLoginStart} href={"/home"}>
          로그인 없이 할래요
        </Link>
        <LoginBtn />
      </section>
    </div>
  );
}
