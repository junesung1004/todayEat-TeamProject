"use client";

import { useEffect, useState } from "react";
import styles from "./DistanceBar.module.scss";

export default function DistanceBar({ distanceValue, onDistanceChange }) {
  const [distance, setDistance] = useState(0);

  const handleMoveDistanceChange = (e) => {
    const value = Number(e.target.value);
    setDistance(value);
    onDistanceChange(value); // 부모 컴포넌트로 값 전달
  };

  // distanceValue가 변경될 때 distance 상태를 업데이트
  useEffect(() => {
    setDistance(distanceValue);
  }, [distanceValue]);

  return (
    <div className={styles.container}>
      <div className={styles.distanceBar}>
        <p>{distance === 0 ? "0m" : distance === 1 ? "0m ~ 500m" : distance === 2 ? "0m ~ 1km" : distance === 3 ? "0m ~1.5km" : "0m ~ 2km"}</p>
      </div>
      <input onChange={handleMoveDistanceChange} min={0} max={4} value={distance} step={1} className={styles.stickbar} type="range" />

      <div className={styles.labels}>
        <span>0m</span>
        <span>500m</span>
        <span>1km</span>
        <span>1.5km</span>
        <span>2km</span>
      </div>
    </div>
  );
}
