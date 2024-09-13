"use client";

import KakaoMap from "@/components/KakaoMap/KakaoMap";
import styles from "./page.module.scss";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const item = [1, 2, 3];

  const [foodData, setFoodData] = useState({ title: "", price: "", calories: "" });
  console.log("foodData : ", foodData);

  const router = useRouter();

  const distance = localStorage.getItem("distance");

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const title = queryParams.get("title") || "";
    const price = queryParams.get("price") || "";
    const calories = queryParams.get("calories") || "";

    setFoodData({ title, price, calories });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.imgWrap}>
        <div>이미지태그</div>
        <h3>{foodData.title}</h3>
      </div>

      <div className={styles.foodDescContainer}>
        <div className={styles.foodWrap}>
          <div className={styles.box}>평균가</div>
          <p>{foodData.price}원</p>
        </div>
        <div className={styles.foodWrap}>
          <div className={styles.box}>칼로리</div>
          <p>{foodData.calories}</p>
        </div>
      </div>

      <article className={styles.kakaomap}>
        <KakaoMap selectedfood={foodData} />
      </article>

      <article className={styles.shopDistance}>
        <p>
          <strong>{distance}m</strong>내에 <strong>7개</strong>의 매장이 있어요
        </p>
      </article>

      <section className={styles.shopContainer}>
        <article className={styles.shopWrap}>
          {item.map((item, idx) => {
            return (
              <div className={styles.shopDesc} key={idx}>
                <h3>매장이름</h3>
                <div className={styles.text}>
                  <p>매장 평점</p>
                  <p>영업 시간</p>
                  <p>자세히 보기</p>
                </div>
              </div>
            );
          })}
        </article>
      </section>
    </div>
  );
}
