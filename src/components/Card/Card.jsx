"use client";

import styles from "./Card.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export const mockData = [
  { id: 1, color: "aqua", price: 3500, title: "김치찌개", calories: "650Kcal" },
  { id: 2, color: "pink", price: 4500, title: "순대국", calories: "350Kcal" },
  { id: 3, color: "lightblue", price: 23500, title: "뼈해장국", calories: "450Kcal" },
  { id: 4, color: "yellow", price: 13500, title: "중국집", calories: "150Kcal" },
  { id: 5, color: "tomato", price: 33500, title: "돈까스", calories: "250Kcal" },
];

export default function Card({ onSlideChange }) {
  return (
    <Swiper
      className={styles["swiper-container"]}
      loop={true}
      slidesPerView={1}
      centeredSlides={true} // 슬라이드 중앙 정렬
      onSlideChange={(swiper) => {
        const currentIndex = swiper.realIndex; // loop가 활성화된 경우에 realIndex를 사용하여 올바른 인덱스를 가져옵니다.
        onSlideChange(mockData[currentIndex]);
      }}
    >
      {mockData.map((item, idx) => (
        <SwiperSlide
          style={{
            backgroundColor: item.color,
            width: "304px",
            height: "330px",
          }}
          key={idx}
          className={`${styles["swiper-slide"]} ${styles[`slide${item.id}`]}`}
        >
          <h3>{item.title}</h3>
          <div className={styles.imageDesc}>
            <div className={styles.box1}>평균가</div>
            <div className={styles.box2}>{item.price}원</div>
            <div className={styles.box3}>칼로리</div>
            <div className={styles.box4}>{item.calories}</div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
