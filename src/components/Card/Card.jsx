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

export default function Card({ onSlideChange, selectedFood, setIsPopUpVisible }) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState([]);
  //console.log("selectedPrice", selectedPrice);
  const router = useRouter();
  const { isLogin } = useUser();
  const [likedItems, setLikedItems] = useState({}); // 각 음식의 좋아요 상태 저장
  const [foodItems, setFoodItems] = useState([]);
  console.log("foodItems : ", foodItems);

  useEffect(() => {
    const query = window.location.search;

    const params = new URLSearchParams(query.split("?")[1]);

    const categories = params.get("categories");

    const price = params.get("price");

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
          const filteredFoodItem = data.data.filter((item) => selectedPrice.some((price) => item.average_price <= price));
          const filteredFoodItem2 = filteredFoodItem.filter((item) => selectedCategories.some((category) => item.category.includes(category)));
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
        loop={foodItems.length >= 1}
        slidesPerView={1}
        centeredSlides={true} // 슬라이드 중앙 정렬
        onSlideChange={(swiper) => {
          const currentIndex = swiper.realIndex;
        }}
      >
        {foodItems.map((item) => (
          <SwiperSlide
            key={item._id}
            style={{
              backgroundColor: item.color,
              width: "304px",
              height: "330px",
            }}
            className={`${styles["swiper-slide"]} ${styles[`slide${item.id}`]}`}
          >
            <h3>{item.name}</h3>
            {<Image src={item.image} alt={item.name} priority width={304} height={400} />}
            <div className={styles.imageDesc}>
              <div className={styles.box1}>평균가</div>
              <div className={styles.box2}>{item.average_price}원</div>
              <div className={styles.box3}>칼로리</div>
              <div className={styles.box4}>{item.calorie}</div>
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
                  const queryParams = new URLSearchParams({
                    foodname: item.name,
                    foodprice: item.average_price,
                    foodcalorie: item.calorie,
                    foodimage: item.image,
                    // Add any other item details you want to pass
                    foodId: item.id, // Example of passing the food item ID
                  }).toString();
                  router.push(`/selectedFood?${queryParams}`);
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
