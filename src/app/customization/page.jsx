"use client";

import Link from "next/link";
import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DistanceBar from "@/components/DistanceBar/DistanceBar";
import { useUser } from "@/context/userContext";

export default function Page() {
  const { isLogin, setIsLogin } = useUser();
  console.log("isLogin : ", isLogin);
  const router = useRouter();
  // 각 아이템 박스의 체크 상태를 관리하는 state
  const [checkedItems, setCheckedItems] = useState({
    all: false,
    kr: false,
    streetfood: false,
    cn: false,
    jp: false,
    us: false,
    tang: false,
    diet: false,
    asia: false,
    bbq: false,
    night: false,
  });

  const [priceCheckedItems, setPriceCheckedItems] = useState({
    1000000: false,
    8000: false,
    10000: false,
    15000: false,
  });

  const [distance, setDistance] = useState(0);
  const [notAllow, setNotAllow] = useState(true);

  // 페이지 이동 버튼 이벤트
  const clickMoveChange = () => {
    if (notAllow) {
      return;
    } else {
      //선택된 첫번째 카테고리 필터
      const selectedCategories = Object.keys(checkedItems)
        .filter((key) => checkedItems[key] && key !== "all")
        .join(",");

      //선택된 두번째 가격 카테고리 필터
      const selectedPriceCatogories = Object.keys(priceCheckedItems)
        .filter((key) => priceCheckedItems[key] && key !== "priceAll")
        .join(",");

      // 위 2개의 카테고리를 선택한 쿼리 문자열 생성 코드.
      const queryString = new URLSearchParams({
        categories: selectedCategories,
        price: selectedPriceCatogories,
      }).toString();
      router.push(`/category?${queryString}`);
    }
  };

  //초기화 버튼 이벤트
  const clickResetBtn = () => {
    setCheckedItems(false);
    setPriceCheckedItems(false);
    setDistance(0);
  };

  // 카테고리 버튼 클릭 이벤트
  const clickCheckedEvent = (id) => {
    if (id === "all") {
      // "전체" 아이템이 클릭되었을 때, 모든 항목을 현재 "all"의 상태로 설정
      const checkedChange = !checkedItems.all; //checkedItems의 변수들을 모두 선택해서 반전시켜준다.
      setCheckedItems({
        all: checkedChange,
        kr: checkedChange,
        streetfood: checkedChange,
        cn: checkedChange,
        jp: checkedChange,
        us: checkedChange,
        tang: checkedChange,
        diet: checkedChange,
        asia: checkedChange,
        bbq: checkedChange,
        night: checkedChange,
      });
    } else {
      // 개별 아이템이 클릭되었을 때 상태 업데이트
      setCheckedItems((prev) => {
        //id의 값들을 새로운 객체배열로 나열한다.
        const updatedItems = { ...prev };

        //해당 id를 클릭하면 상태를 반전시킨다.
        //예를들어 true일경우 false로 반전.
        updatedItems[id] = !updatedItems[id];

        // 만약 하나라도 체크되지 않은 항목이 있으면 "전체"의 체크 상태를 해제
        //모든 항목이 체크되어있는지 확인
        let allChecked = true;
        for (let id in updatedItems) {
          if (id !== "all" && !updatedItems[id]) {
            allChecked = false;
          }
        }

        return {
          ...updatedItems,
          all: allChecked,
        };
      });
    }
  };

  // 가격 카테고리 버튼 클릭 이벤트
  const clickCheckedPriceEvent = (id) => {
    if (id === "1000000") {
      // "전체" 아이템이 클릭되었을 때, 모든 항목을 현재 "all"의 상태로 설정
      const checkedChange = !priceCheckedItems[1000000]; //checkedItems의 변수들을 모두 선택해서 반전시켜준다.
      setPriceCheckedItems({
        1000000: checkedChange,
        8000: checkedChange,
        10000: checkedChange,
        15000: checkedChange,
      });
    } else {
      // 개별 아이템이 클릭되었을 때 상태 업데이트
      setPriceCheckedItems((prev) => {
        //id의 값들을 새로운 객체배열로 나열한다.
        const updatedItems = { ...prev };

        //해당 id를 클릭하면 상태를 반전시킨다.
        //예를들어 true일경우 false로 반전.
        updatedItems[id] = !updatedItems[id];

        // 만약 하나라도 체크되지 않은 항목이 있으면 "전체"의 체크 상태를 해제
        //모든 항목이 체크되어있는지 확인
        let allChecked = true;
        for (let id in updatedItems) {
          if (id !== "1000000" && !updatedItems[id]) {
            allChecked = false;
          }
        }

        return {
          ...updatedItems,
          1000000: allChecked,
        };
      });
    }
  };

  //카테고리가 둘개중 하나씩 각각 선택되어야지 활성화 버튼
  useEffect(() => {
    let isCategoryChecked = false;
    let isPriceCategoryChecked = false;

    //for문을 돌다가 하나라도 id가 체크되어있으면 그냥 빠져나와
    for (let id in checkedItems) {
      if (checkedItems[id]) {
        isCategoryChecked = true;
        break;
      }
    }

    for (let id in priceCheckedItems) {
      if (priceCheckedItems[id]) {
        isPriceCategoryChecked = true;
        break;
      }
    }

    if (isCategoryChecked && isPriceCategoryChecked && distance >= 1) {
      setNotAllow(false);
    } else {
      setNotAllow(true);
    }
  }, [checkedItems, priceCheckedItems, distance]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <Link href={"/home"}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.icon}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </Link>
          <h1>맞춤설정</h1>
        </nav>
      </header>

      <main className={styles.mainContainer}>
        <section>
          <article className={styles.categoryContainer}>
            <h3>오늘은 뭐 먹을까요?</h3>
            <div className={styles.categoryWrap}>
              {[
                { id: "all", label: "전체" },
                { id: "kr", label: "한식" },
                { id: "streetfood", label: "분식" },
                { id: "cn", label: "중식" },
                { id: "jp", label: "일식" },
                { id: "us", label: "양식" },
                { id: "tang", label: "찜, 탕, 찌개" },
                { id: "diet", label: "다이어트식" },
                { id: "asia", label: "아시안" },
                { id: "bbq", label: "고기, 구이" },
                { id: "night", label: "야식" },
              ].map((item) => (
                <div
                  key={item.id}
                  className={styles.itemBox}
                  id={item.id}
                  onClick={() => clickCheckedEvent(item.id)}
                  style={{
                    backgroundColor: checkedItems[item.id] ? "#EB4726" : "white",
                    color: checkedItems[item.id] ? "white" : "inherit",
                  }}
                >
                  <p>{item.label}</p>
                </div>
              ))}
            </div>
          </article>

          <article className={styles.priceCategoryContainer}>
            <h3>가격대</h3>
            <div className={styles.categoryWrap}>
              {[
                { id: "1000000", label: "전체" },
                { id: "8000", label: "부담없이 먹기" },
                { id: "10000", label: "딱 좋은 한끼" },
                { id: "15000", label: "특별한 날" },
              ].map((item) => (
                <div
                  key={item.id}
                  className={styles.itemBox}
                  id={item.id}
                  onClick={() => clickCheckedPriceEvent(item.id)}
                  style={{
                    backgroundColor: priceCheckedItems[item.id] ? "#EB4726" : "white",
                    color: priceCheckedItems[item.id] ? "white" : "inherit",
                  }}
                >
                  <p>{item.label}</p>
                </div>
              ))}
            </div>
          </article>

          <article className={styles.distanceCategoryContainer}>
            <h3>매장 거리 지정</h3>
            <DistanceBar distanceValue={distance} onDistanceChange={(value) => setDistance(value)} />
          </article>
        </section>
      </main>

      <div className={styles.btnWrap}>
        <button className={`${styles.button}`} type="button" onClick={() => clickResetBtn()}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.icon}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>

          <p>초기화</p>
        </button>
        <button className={`${styles.button} ${!notAllow ? styles.active : ""}`} type="button" onClick={() => clickMoveChange()} disabled={notAllow}>
          적용하기
        </button>
      </div>
    </div>
  );
}
