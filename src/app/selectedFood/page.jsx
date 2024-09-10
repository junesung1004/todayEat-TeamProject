import styles from "./page.module.scss";

export default function Page() {
  const item = [1, 2, 3];
  return (
    <div className={styles.container}>
      <div className={styles.imgWrap}>
        <div>이미지태그</div>
        <h3>이미지 사진 들어올거임</h3>
      </div>

      <div className={styles.foodDescContainer}>
        <div className={styles.foodWrap}>
          <div className={styles.box}>평균가</div>
          <p>9500원</p>
        </div>
        <div className={styles.foodWrap}>
          <div className={styles.box}>칼로리</div>
          <p>680Kcal</p>
        </div>
      </div>

      <article className={styles.kakaomap}>
        <p>카카오 지도 뿌려줄 내용</p>
      </article>

      <article className={styles.shopDistance}>
        <p>
          <strong>1km</strong>내에 <strong>7개</strong>의 매장이 있어요
        </p>
      </article>

      <section className={styles.shopContainer}>
        <article className={styles.shopWrap}>
          {item.map((item, idx) => {
            return (
              <div className={styles.shopDesc} key={idx}>
                <h3>매장이름</h3>
                <div className={styles.text}>
                  <p>매장 평점</p>
                  <p>영업 시간</p>
                  <p>자세히 보기</p>
                </div>
              </div>
            );
          })}
        </article>
      </section>
    </div>
  );
}
