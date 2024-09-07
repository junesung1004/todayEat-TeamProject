import Card from "@/components/Card";
import Link from "next/link";
import styles from "./page.module.scss";
import Image from "next/image";

export default function Page() {
  return (
    <div className={styles.container}>
      <nav>
        <Link href={"/"}>이미지</Link>
        <Link href={"/category"}>조건변경</Link>
      </nav>

      {/* <article className={styles.cardContainer}> */}
      {/* <div className={styles.imgWrap}>
          <Image className={styles.img}></Image>
        </div> */}
      <Card />
      {/* <div className={styles.imgTextDescWrap}>
          <h3>짜장면</h3>
          <span>자장면은 볶은 춘장과 야채, 고기 등의 재료를 다시 식용유에 볶아 면에 비벼</span>
          <button className={styles.btn}>매장보기</button>
        </div> */}
      {/* </article> */}
    </div>
  );
}
