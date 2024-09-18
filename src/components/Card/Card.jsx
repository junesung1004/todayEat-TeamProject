import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import heart from "@/../../public/images/heart.png";
import blackHeart from "@/../../public/images/blackHeart.png";
import location from "@/../../public/images/location.png";
import frame from "@/../../public/images/frame.png";
import styles from "./Card.module.scss";
import { useUser } from "@/context/userContext";
import LoginPopUp from "../LoginPopUp/LoginPopUp";
import { useRouter } from "next/navigation";

export const mockData = [
  { id: 1, color: "aqua", price: 3500, title: "김치찌개", calories: "650Kcal" },
  { id: 2, color: "pink", price: 4500, title: "순대국", calories: "350Kcal" },
  { id: 3, color: "lightblue", price: 23500, title: "뼈해장국", calories: "450Kcal" },
  { id: 4, color: "yellow", price: 13500, title: "중국집", calories: "150Kcal" },
  { id: 5, color: "tomato", price: 33500, title: "돈까스", calories: "250Kcal" },
];

export default function Card({ onSlideChange, selectedFood, setIsPopUpVisible }) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState([]);

  const { isLogin } = useUser();
  const [likedItems, setLikedItems] = useState({}); // 각 음식의 좋아요 상태 저장
  const [foodItems, setFoodItems] = useState([]);
  // console.log("foodItems : ", foodItems);

  useEffect(() => {
    const query = window.location.pathname;
    console.log("query :", query);
    const params = new URLSearchParams(query.split("/category/")[1]);
    const categories = params.get("categories");
    const price = params.get("price");

    console.log("selectedCategories : ", selectedCategories);
    console.log("selectedPrice : ", selectedPrice);

    setSelectedCategories(categories ? categories.split(",") : []);
    setSelectedPrice(price ? price.split(",") : []);
  }, [window.location]);

  const clickUpdateLike = async (item) => {
    if (!isLogin) {
      setIsPopUpVisible(true); //로그인이 안 된 경우 로그인 팝업창 열기
      return;
    }

    // 좋아요 상태 토글
    const updatedLikedItems = {
      ...likedItems,
      [item.id]: !likedItems[item.id], // 좋아요한 것을 배열로 담은 다음 해당 id를 설정해 특정 아이템만 좋아요 취소
    };
    setLikedItems(updatedLikedItems);

    try {
      const { title, price, calories } = item;

      if (title && price && calories) {
        if (!likedItems[item.id]) {
          const response = await fetch("/api/likeFood", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, price, calories }),
          });
          const data = await response.json();
          console.log("좋아요 추가 완료", data);
        } else {
          const response = await fetch("/api/likeFood", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ title }),
          });
          const data = await response.json();
          console.log("좋아요 삭제 완료", data);
        }
      }
    } catch (error) {
      console.error("좋아하는 음식 업데이트 에러", error);
    }
  };

  //데이터베이스 음식 정보 가져오기
  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await fetch("/api/food"); // API endpoint to fetch food items
        const data = await response.json();

        if (data.success) {
          const filteredFoodItem = data.data.filter((item) => item.average_price <= selectedPrice);
          const filteredFoodItem2 = filteredFoodItem.filter((item) => item.category.includes(selectedCategories));
          console.log("filteredFoodItem2 : ", filteredFoodItem2);

          setFoodItems(filteredFoodItem2);
        } else {
          console.error("Failed to fetch food items");
        }
      } catch (error) {
        console.error("Error fetching food items:", error);
      }
    };

    fetchFoodItems();
  }, [selectedPrice]); // Run once on mount

  return (
    <>
      <Swiper
        className={styles["swiper-container"]}
        loop={true}
        slidesPerView={1}
        centeredSlides={true} // 슬라이드 중앙 정렬
        onSlideChange={(swiper) => {
          const currentIndex = swiper.realIndex;
          onSlideChange(mockData[currentIndex]);
        }}
      >
        {mockData.map((item) => (
          <SwiperSlide
            key={item.id}
            style={{
              backgroundColor: item.color,
              width: "304px",
              height: "330px",
            }}
            className={`${styles["swiper-slide"]} ${styles[`slide${item.id}`]}`}
          >
            <h3>{item.title}</h3>
            <div className={styles.imageDesc}>
              <div className={styles.box1}>평균가</div>
              <div className={styles.box2}>{item.price}원</div>
              <div className={styles.box3}>칼로리</div>
              <div className={styles.box4}>{item.calories}</div>
            </div>
            <div className={styles.iconWrap2}>
              {likedItems[item.id] ? (
                <Image onClick={() => clickUpdateLike(item)} src={blackHeart} alt="하트로고" priority width={24} height={24} className={styles.icon} />
              ) : (
                <Image onClick={() => clickUpdateLike(item)} src={heart} alt="하트로고" priority width={24} height={24} className={styles.icon} />
              )}
              <div className={styles.line}>|</div>
              <Image
                onClick={() => {
                  alert(`${item.title} 위치 확인`);
                }}
                src={location}
                alt="지도모양 아이콘"
                priority
                width={24}
                height={24}
                className={styles.icon}
              />
            </div>
            <Image className={styles.descBtn} src={frame} alt="더보기 로고" priority width={32} height={32} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
