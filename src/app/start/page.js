import Link from "next/link";
import styles from "./page.module.scss";
import Image from "next/image";
import LoginBtn from "@/components/LoginBtn/LoginBtn";
import StartCardSlide from "@/components/startCardSlide/StartCardSlide";
import logo from "@/../../public/images/logo.png";
import today from "@/../../public/images/투데잇2.png";

export default function Start() {
  return (
    <div className={styles.container}>
      <div className={styles.logoWrap}>
        <Image src={logo} alt="로고이미지" width={90} height={90} priority />
        <Image src={today} alt="로고이미지" width={70} height={60} priority />
      </div>
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
