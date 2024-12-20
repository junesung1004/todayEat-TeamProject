"use client";

import KakaoMap from "@/components/KakaoMap/KakaoMap";
import styles from "./page.module.scss";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import LoginPopUp from "@/components/LoginPopUp/LoginPopUp";
import { useUser } from "@/context/userContext";
import Image from "next/image";
import Footer from "@/components/Footer/Footer";

export default function Page() {
  const [foodData, setFoodData] = useState({ title: "", price: "", calories: "" });
  const [places, setPlaces] = useState([]);
  const [visibleCount, setVisibleCount] = useState(1); // 초기에는 3개만 보여줄 수 있는 state
  const router = useRouter();
  const [foodImage, setFoodImage] = useState();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const foodimage = queryParams.get("foodimage") || "";
    setFoodImage(foodimage);
  }, []);

  const { selectedDistance } = useUser();

  const handlePlacesUpdate = (newPlaces) => {
    setPlaces(newPlaces);
  };

  const handleLoadMore = () => {
    setVisibleCount(visibleCount + 4);
  };

  const togglePopUp = () => {
    setIsPopUpVisible((prev) => !prev);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const title = queryParams.get("foodname") || "";
    const price = queryParams.get("foodprice") || "";
    const calories = queryParams.get("foodcalorie") || "";

    setFoodData({ title, price, calories });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.imgWrap}>
        <Image src={foodImage} alt={foodData.title} priority width={359} height={205} />
      </div>

      <div className={styles.foodDescContainer}>
        <h3>{foodData.title}</h3>

        <div className={styles.foodWrap}>
          <div className={styles.box}>평균가</div>
          <p>{foodData.price}원</p>
          <div className={styles.box}>칼로리</div>
          <p>{foodData.calories}</p>
        </div>
      </div>

      <article className={styles.kakaomap}>
        <KakaoMap selectedfood={foodData} onPlaceUpdate={handlePlacesUpdate} />
      </article>

      <article className={styles.shopDistance}>
        <p>
          <strong>{selectedDistance == 500 ? "500m" : selectedDistance == 1000 ? "1km" : selectedDistance == 1500 ? "1.5km" : "2km"}</strong>내에 <strong>{places.length}</strong>
          개의 매장이 있어요
        </p>
      </article>

      <section className={styles.shopContainer}>
        <article className={styles.shopWrap}>
          {places
            .slice()
            .sort((a, b) => a.distance - b.distance)
            .slice(0, visibleCount)
            .map((item, idx) => {
              return (
                <div className={styles.shopDesc} key={idx}>
                  <h3>{item.place_name}</h3>
                  <div className={styles.text}>
                    <p>{item.distance}m</p>
                    <Link className={styles.link} href={`https://map.kakao.com/link/to/${item.place_name},${item.y},${item.x}`}>
                      매장안내
                    </Link>
                  </div>
                </div>
              );
            })}
        </article>
        {visibleCount < places.length && (
          <button className={styles.moreBtn} onClick={handleLoadMore}>
            더보기
          </button>
        )}
      </section>
      <Footer />
    </div>
  );
}
