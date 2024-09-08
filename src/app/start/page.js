import Link from "next/link";
import styles from "./page.module.scss";
import Image from "next/image";
import LoginBtn from "@/components/LoginBtn/LoginBtn";

export default function Start() {
  return (
    <div className={styles.container}>
      <section className={styles.title}>
        <h1>오늘 뭐 먹지 ?</h1>
        <p>투데잇이</p>
        <p>골라줄게 !</p>
      </section>

      <section className={styles.imageContainer}>
        <div className={styles.imgWrap}>{/* <Image src={}/> */}</div>
      </section>

      <section className={styles.userLoginContainer}>
        <Link className={styles.noLoginStart} href={"/home"}>
          로그인 없이 할래요
        </Link>
        <LoginBtn />
      </section>
    </div>
  );
}
