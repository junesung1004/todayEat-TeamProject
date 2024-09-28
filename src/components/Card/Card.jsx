import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import heart from "@/../../public/images/heart.png";
import blackHeart from "@/../../public/images/blackHeart.png";
import location from "@/../../public/images/location.png";
import frame from "@/../../public/images/Frame.png";
import styles from "./Card.module.scss";
import { useUser } from "@/context/userContext";
import LoginPopUp from "../LoginPopUp/LoginPopUp";
import { useRouter } from "next/navigation";
import DisLikePopUp from "../DisLikePopUp/DisLikePopUp";
import { getSession } from "next-auth/react";

export default function Card({ onSlideChange, selectedFood, setIsPopUpVisible }) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState([]);
  const router = useRouter();
  const { isLogin, userId } = useUser();
  console.log("isLogin : ", isLogin);
  const [likedItems, setLikedItems] = useState({}); // 각 음식의 좋아요 상태 저장.
  const [dislikedItems, setDislikedItems] = useState([]); // 각 음식의 싫어요 상태 저장.
  const [foodItems, setFoodItems] = useState([]);
  //console.log("foodItems : ", foodItems);
  const [isDisLikePopUpVisible, setIsDisLikePopUpVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  const [loadedImages, setLoadedImages] = useState(0); // 로드된 이미지 수 추적
  const totalImages = foodItems.length; // 총 이미지 수

  //페이지 로드 시 사용자별로 싫어요한 음식 가져오기
  useEffect(() => {
    const fetchDisLikedItems = async () => {
      try {
        const response = await fetch("/api/disLikeFood");
        const data = await response.json();

        if (data.success) {
          const disLikedItemsFromDB = data.data.map((item) => item._id);
          setDislikedItems(disLikedItemsFromDB);
        } else {
          console.error("싫어요한 음식 데이터를 가져오지 못했습니다:", data);
        }
      } catch (error) {
        console.error("Error fetching disliked items:", error);
      }
    };
    fetchDisLikedItems();
  }, []);

  //페이지 로드 시 사용자별로 좋아요 상태 불러오기
  useEffect(() => {
    const fetchLikedItems = async () => {
      try {
        const response = await fetch("/api/likeFood");
        const data = await response.json();

        // 데이터가 없는 경우 대비하여 기본값 설정
        if (!data || !data.success || !data.data) {
          console.error("좋아하는 음식 데이터를 가져오지 못했습니다:", data);
          return;
        }

        // likedItems를 업데이트할 때 데이터가 유효한지 확인
        const likedItemsFromDB = data.data.reduce((acc, item) => {
          acc[item._id] = true;
          return acc;
        }, {});

        setLikedItems(likedItemsFromDB);
      } catch (error) {
        console.error("Error fetching liked items:", error);
      }
    };

    fetchLikedItems();
  }, []);

  //카테고리 필터링 코드
  useEffect(() => {
    const query = window.location.search;

    const params = new URLSearchParams(query.split("?")[1]);

    const categories = params.get("categories");

    const price = params.get("price");

    setSelectedCategories(categories ? categories.split(",") : []);
    setSelectedPrice(price ? price.split(",") : []);
  }, []);

  const clickUpdateLike = async (item) => {
    if (!isLogin) {
      setIsPopUpVisible(true); // 로그인이 안 된 경우 로그인 팝업창 열기
      return;
    }

    const itemId = item._id;
    const isLiked = likedItems[itemId];

    // 상태 변경 후 API 요청
    setLikedItems((prevLikedItems) => ({
      ...prevLikedItems,
      [itemId]: !isLiked,
    }));

    try {
      const { _id, name, image } = item;

      // 데이터가 제대로 들어왔는지 확인
      if (!_id && name && image) {
        console.error("필요한 데이터가 부족합니다:", { _id, name, image });
        return;
      }

      // 좋아요 추가/삭제 처리
      if (!isLiked) {
        const response = await fetch("/api/likeFood", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ _id, name, image, userId }),
        });
        const data = await response.json();
        if (!response.ok) {
          console.error("서버 오류:", data);
        } else {
          console.log("좋아요 추가 완료", data);
        }
      } else {
        const response = await fetch("/api/likeFood", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ _id, userId }),
        });
        const data = await response.json();
        if (!response.ok) {
          console.error("서버 오류:", data);
        } else {
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
      setLoading(true); // 데이터 로드 시작 시 로딩 상태 true
      try {
        const response = await fetch("/api/food");
        const data = await response.json();

        if (data.success) {
          const filteredFoodItems = data.data.filter(
            (item) =>
              selectedPrice.some((price) => item.average_price <= price) &&
              selectedCategories.some((category) => item.category.includes(category)) &&
              !dislikedItems.includes(item._id) // 싫어요한 아이템 필터링
          );
          setFoodItems(filteredFoodItems);
        } else {
          console.error("Failed to fetch food items");
        }
      } catch (error) {
        console.error("Error fetching food items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoodItems();
  }, [selectedPrice, selectedCategories, dislikedItems]);

  const clickPopUpHandle = (item) => {
    console.log("클릭");
    setSelected(item);
    setIsDisLikePopUpVisible((prev) => !prev);
  };

  // 모든 이미지 로드가 완료되었는지 확인
  const handleImageLoad = () => {
    setLoadedImages((prev) => prev + 1);
  };

  // 로딩 상태 업데이트
  useEffect(() => {
    if (loadedImages === totalImages && totalImages > 0) {
      setLoading(false);
    }
  }, [loadedImages, totalImages]);

  if (loading) {
    return <div>Loading...</div>; // 로딩 중 메시지 또는 스피너
  }

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
            {<Image src={item.image} onLoad={handleImageLoad} alt={item.name} priority width={304} height={330} />}
            <div className={styles.imageDesc}>
              <div className={styles.box1}>평균가</div>
              <div className={styles.box2}>{item.average_price}원</div>
              <div className={styles.box3}>칼로리</div>
              <div className={styles.box4}>{item.calorie}</div>
            </div>
            <div className={styles.iconWrap2}>
              {likedItems[item._id] ? (
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
                    foodId: item.id,
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
            <Image onClick={() => clickPopUpHandle(item)} className={styles.descBtn} src={frame} alt="더보기 로고" priority width={32} height={32} />
          </SwiperSlide>
        ))}
      </Swiper>
      {isDisLikePopUpVisible && <DisLikePopUp onClose={() => setIsDisLikePopUpVisible(false)} foodId={selected?._id} foodName={selected?.name} foodImage={selected?.image} />}
    </>
  );
}
