"use client";

import Link from "next/link";
import styles from "./page.module.scss";
import CheckIcon from "@/components/CheckIcon";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  // 각 아이템 박스의 체크 상태를 관리하는 state
  const [checkedItems, setCheckedItems] = useState({
    all: false,
    alone: false,
    kr: false,
    cn: false,
    jp: false,
    us: false,
    asia: false,
    tang: false,
  });

  const [priceCheckedItems, setPriceCheckedItems] = useState({
    priceAll: false,
    eight: false,
    ten: false,
    fifteen: false,
  });

  const [notAllow, setNotAllow] = useState(true);

  // 페이지 이동 버튼 이벤트
  const clickMoveChange = () => {
    if (notAllow) {
      return;
    } else {
      router.push(`/category/1`);
    }
  };

  // 카테고리 버튼 클릭 이벤트
  const clickCheckedEvent = (id) => {
    if (id === "all") {
      // "전체" 아이템이 클릭되었을 때, 모든 항목을 현재 "all"의 상태로 설정
      const checkedChange = !checkedItems.all; //checkedItems의 변수들을 모두 선택해서 반전시켜준다.
      setCheckedItems({
        all: checkedChange,
        alone: checkedChange,
        kr: checkedChange,
        cn: checkedChange,
        jp: checkedChange,
        us: checkedChange,
        asia: checkedChange,
        tang: checkedChange,
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
    if (id === "priceAll") {
      // "전체" 아이템이 클릭되었을 때, 모든 항목을 현재 "all"의 상태로 설정
      const checkedChange = !priceCheckedItems.priceAll; //checkedItems의 변수들을 모두 선택해서 반전시켜준다.
      setPriceCheckedItems({
        priceAll: checkedChange,
        eight: checkedChange,
        ten: checkedChange,
        fifteen: checkedChange,
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
          if (id !== "priceAll" && !updatedItems[id]) {
            allChecked = false;
          }
        }

        return {
          ...updatedItems,
          priceAll: allChecked,
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

    if (isCategoryChecked && isPriceCategoryChecked) {
      setNotAllow(false);
    } else {
      setNotAllow(true);
    }
  }, [checkedItems, priceCheckedItems]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <Link href={"/home"}>뒤로가기</Link>
        </nav>
        <h1>맞춤설정</h1>
      </header>

      <main className={styles.mainContainer}>
        <section>
          <article className={styles.categoryContainer}>
            <h3>카테고리</h3>
            <div className={styles.categoryWrap}>
              {[
                { id: "all", label: "전체" },
                { id: "alone", label: "1인분" },
                { id: "kr", label: "한식" },
                { id: "cn", label: "중식" },
                { id: "jp", label: "일식" },
                { id: "us", label: "양식" },
                { id: "asia", label: "아시안" },
                { id: "tang", label: "찜, 탕, 찌개" },
              ].map((item) => (
                <div
                  key={item.id}
                  className={styles.iconBox}
                  id={item.id}
                  onClick={() => clickCheckedEvent(item.id)}
                  style={{
                    backgroundColor: checkedItems[item.id] ? "rgb(237, 76, 0)" : "rgba(246, 247, 247, 0.7)",
                    color: checkedItems[item.id] ? "white" : "inherit",
                  }}
                >
                  <CheckIcon />
                  <p>{item.label}</p>
                </div>
              ))}
            </div>
          </article>

          <article className={styles.priceCategoryContainer}>
            <h3>카테고리</h3>
            <div className={styles.categoryWrap}>
              {[
                { id: "priceAll", label: "전체" },
                { id: "eight", label: "8000원 이하" },
                { id: "ten", label: "10000원 이하" },
                { id: "fifteen", label: "15000원 이하" },
              ].map((item) => (
                <div
                  key={item.id}
                  className={styles.iconBox}
                  id={item.id}
                  onClick={() => clickCheckedPriceEvent(item.id)}
                  style={{
                    backgroundColor: priceCheckedItems[item.id] ? "rgb(237, 76, 0)" : "rgba(246, 247, 247, 0.7)",
                    color: priceCheckedItems[item.id] ? "white" : "inherit",
                  }}
                >
                  <CheckIcon />
                  <p>{item.label}</p>
                </div>
              ))}
            </div>
          </article>

          <article className={styles.distanceCategoryContainer}>
            <h3>거리순으로 매장추천 받기</h3>
            <div>스틱바 어떻게 구현하징...</div>
          </article>
        </section>
      </main>
      <button className={`${styles.button} ${!notAllow ? styles.active : ""}`} type="button" onClick={() => clickMoveChange()} disabled={notAllow}>
        메뉴 보기
      </button>
    </div>
  );
}
