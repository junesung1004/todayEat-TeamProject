import Link from "next/link";
import styles from "./page.module.scss";
import Image from "next/image";
4;

export default function Home() {
  return (
    <div className={styles.container}>
      <section className={styles.title}>
        <h1>오늘 뭐 먹지 ?</h1>
        <p>투데잇이</p>
        <p>골라줄게요</p>
      </section>

      <section className={styles.imageContainer}>
        <div className={styles.imgWrap}>{/* <Image src={}/> */}</div>
        <div className={styles.btnWrap}>
          <Link href={"/category"} className={styles.btn}>
            <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
              />
            </svg>

            <span>맞춤설정</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
