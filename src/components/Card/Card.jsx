"use client";

import styles from "./Card.module.scss";

import { Navigation, Pagination, Scrollbar, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/navigation";

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
      // modules={[EffectFade]}
      // effect="fade"
      onSlideChange={(swiper) => {
        const currentIndex = swiper.activeIndex;
        onSlideChange(mockData[currentIndex - 1]);
      }}
    >
      {mockData.map((item, idx) => {
        return (
          <SwiperSlide style={{ backgroundColor: item.color }} key={idx} className={`${styles["swiper-slide"]} ${styles[`slide${item.id}`]}`}>
            <h3>{item.title}</h3>
            <div className={styles.imageDesc}>
              <span className={styles.box1}>평균가</span>
              <span className={styles.box2}>{item.price}</span>
              <span className={styles.box3}>칼로리</span>
              <span className={styles.box4}>{item.calories}</span>
            </div>
          </SwiperSlide>
        );
      })}

      {/* <SwiperSlide className={`${styles["swiper-slide"]} ${styles["slide-1"]}`}>
        <h3>음식 메뉴 이름</h3>
        <div className={styles.imageDesc}>
          <span className={styles.box1}>평균가</span>
          <span className={styles.box2}>9500원</span>
          <span className={styles.box3}>칼로리</span>
          <span className={styles.box4}>680Kcal</span>
        </div>
      </SwiperSlide>
      <SwiperSlide className={`${styles["swiper-slide"]} ${styles["slide-2"]}`}>2</SwiperSlide>
      <SwiperSlide className={`${styles["swiper-slide"]} ${styles["slide-3"]}`}>3</SwiperSlide>
      <SwiperSlide className={`${styles["swiper-slide"]} ${styles["slide-4"]}`}>4</SwiperSlide>
      <SwiperSlide className={`${styles["swiper-slide"]} ${styles["slide-5"]}`}>5</SwiperSlide> */}
    </Swiper>
  );
}
