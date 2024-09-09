"use client";

import { useState } from "react";
import styles from "./DistanceBar.module.scss";

export default function DistanceBar() {
  const [distance, setDistance] = useState(0);

  const handleMoveDistanceChange = (e) => {
    setDistance(Number(e.target.value));
  };

  return (
    <div className={styles.container}>
      <div className={styles.distanceBar}>
        <p>{distance === 0 ? "0m" : distance === 1 ? "500m" : distance === 2 ? "1km" : distance === 3 ? "1.5km" : "2km"}</p>
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
