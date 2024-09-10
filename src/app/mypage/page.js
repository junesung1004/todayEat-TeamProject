import styles from "./page.module.scss";

export default function Page() {
  const mock = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  return (
    <div className={styles.container}>
      <div className={styles.userInfoContainer}>
        <h2>
          <span className={styles.userName}>유저이름</span>님
        </h2>
        <h2>맛있는 식사하셨나요?</h2>
      </div>

      <button className={styles.logOutBtn}>로그아웃</button>

      <article className={styles.likeDisLikeContainer}>
        <div className={styles.likeWrap}>
          좋아요<span className={styles.like}>13</span>
        </div>
        <div className={styles.disLikeWrap}>
          안볼래요<span className={styles.disLike}>5</span>
        </div>
      </article>

      <section className={styles.foodsImgContainer}>
        {mock.map((el, idx) => {
          return (
            <article className={styles.imgWrap} key={idx}>
              <div>이미지</div>
              <p>음식이름</p>
            </article>
          );
        })}
      </section>
    </div>
  );
}
