"use client";

import styles from "./Card.module.scss";
import Image from "next/image";

import { Navigation, Pagination, Scrollbar, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/navigation";

import img1 from "../../public/images/1.jpg";
import img2 from "../../public/images/2.jpg";
import img3 from "../../public/images/3.jpg";
import img4 from "../../public/images/4.jpg";
import img5 from "../../public/images/5.jpg";

export default function Card() {
  return (
    <Swiper
      className={styles["swiper-container"]}
      loop={true}
      slidesPerView={1} // 두 개의 슬라이드를 보이도록 설정
      centeredSlides={true} // 슬라이드 중앙 정렬
      navigation
      modules={[Navigation, Pagination, Scrollbar, EffectFade]}
      effect="fade"
      scrollbar={{ draggable: true }}
      pagination={{ clickable: true }}
    >
      <SwiperSlide className={styles["swiper-slide"]}>
        <Image src={img1} alt="이미지 슬라이드 1" priority width={320} height={400} />
      </SwiperSlide>
      <SwiperSlide className={styles["swiper-slide"]}>
        <Image src={img2} alt="이미지 슬라이드 2" priority width={320} height={400} />
      </SwiperSlide>
      <SwiperSlide className={styles["swiper-slide"]}>
        <Image src={img3} alt="이미지 슬라이드 3" priority width={320} height={400} />
      </SwiperSlide>
      <SwiperSlide className={styles["swiper-slide"]}>
        <Image src={img4} alt="이미지 슬라이드 4" priority width={320} height={400} />
      </SwiperSlide>
      <SwiperSlide className={styles["swiper-slide"]}>
        <Image src={img5} alt="이미지 슬라이드 5" priority width={320} height={400} />
      </SwiperSlide>
    </Swiper>
  );
}
