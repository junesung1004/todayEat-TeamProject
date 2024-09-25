"use client";

import styles from "./StartCardSlide.module.scss";
import Image from "next/image";

import { Navigation, Pagination, Scrollbar, EffectFade, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/navigation";

import bg1 from "@/../../public/images/mainslide1.png";
import bg2 from "@/../../public/images/mainslide2.png";
import bg3 from "@/../../public/images/mainslide3.png";
import bg4 from "@/../../public/preview/1.gif";

export default function StartCardSlide() {
  return (
    <Swiper
      className={styles["swiper-container"]}
      loop={true}
      autoplay={true}
      speed={1000}
      pagination={{ clickable: true }}
      modules={[Pagination, Autoplay]}
      slidesPerView={1} // 두 개의 슬라이드를 보이도록 설정
      centeredSlides={true} // 슬라이드 중앙 정렬
    >
      <SwiperSlide className={`${styles["swiper-slide"]} ${styles["slide-1"]}`}>
        <Image src={bg1} alt="이미지 슬라이드 1" priority width={280} height={400} />
      </SwiperSlide>
      <SwiperSlide className={`${styles["swiper-slide"]} ${styles["slide-3"]}`}>
        <Image src={bg4} alt="이미지 슬라이드 3" priority width={280} height={400} />
      </SwiperSlide>
      <SwiperSlide className={`${styles["swiper-slide"]} ${styles["slide-2"]}`}>
        <Image src={bg2} alt="이미지 슬라이드 2" priority width={280} height={400} />
      </SwiperSlide>
      <SwiperSlide className={`${styles["swiper-slide"]} ${styles["slide-3"]}`}>
        <Image src={bg3} alt="이미지 슬라이드 3" priority width={280} height={400} />
      </SwiperSlide>
    </Swiper>
  );
}
