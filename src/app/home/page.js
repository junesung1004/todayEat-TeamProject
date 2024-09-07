import Link from "next/link";
import styles from "./page.module.scss";
import Image from "next/image";

export default function Home() {
  return (
    <div className={styles.container}>
      <section className={styles.title}>
        <h1>오늘 뭐 먹지 ?</h1>
        <p>투데잇이</p>
        <p>골라줄게 !</p>
      </section>

      <section className={styles.imageContainer}>
        <div className={styles.imgWrap}>{/* <Image src={}/> */}</div>
        <div className={styles.btn}>
          <Link href={"/category"}>맞춤설정</Link>
        </div>
      </section>
    </div>
  );
}
