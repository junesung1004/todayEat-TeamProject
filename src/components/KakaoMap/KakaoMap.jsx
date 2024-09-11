"use client";

import { useEffect, useState } from "react";

export default function KakaoMap({ selectedfood }) {
  // 현재 위치를 업데이트 시켜줄 변수 생성
  const [currentPosition, setCurrentPosition] = useState({
    latitude: null,
    longitude: null,
  });

  const selectedFoodName = selectedfood.title;

  // 키워드 기반으로 검색된 장소들을 담는 배열 state
  const [place, setPlace] = useState([]);

  const distance = localStorage.getItem("distance");
  console.log("distance", distance);

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.type = "text/javascript";
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY}&autoload=false&libraries=services`;
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setCurrentPosition({ latitude, longitude });

            const container = document.getElementById("map");
            const options = {
              center: new window.kakao.maps.LatLng(latitude, longitude),
              level: 5,
            };

            const kakaoMap = new kakao.maps.Map(container, options);
          });
        }
      });
    };
  }, []);

  useEffect(() => {
    const mapContainer = document.getElementById("map");
    if (mapContainer && selectedFoodName && currentPosition.latitude !== null && currentPosition.longitude !== null) {
      const options = {
        center: new window.kakao.maps.LatLng(currentPosition.latitude, currentPosition.longitude),
        level: 5,
      };
      const map = new window.kakao.maps.Map(mapContainer, options);
      keywordPlace(selectedFoodName, map, currentPosition.latitude, currentPosition.longitude);
    }
  }, [selectedFoodName, currentPosition]);

  const keywordPlace = (location, map, latitude, longitude) => {
    const ps = new window.kakao.maps.services.Places();
    const keywordOptions = {
      location: new window.kakao.maps.LatLng(latitude, longitude),
      radius: distance,
    };

    ps.keywordSearch(
      location,
      (data, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          setPlace(data);
          const bounds = new window.kakao.maps.LatLngBounds();

          for (let i = 0; i < data.length; i++) {
            displayMarker(map, data[i]);
            bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
          }

          map.setBounds(bounds);
        }
      },
      keywordOptions
    );
  };

  const displayMarker = (map, place) => {
    const marker = new window.kakao.maps.Marker({
      map: map,
      position: new window.kakao.maps.LatLng(place.y, place.x),
    });

    // 마커에 클릭이벤트를 등록합니다..
    window.kakao.maps.event.addListener(marker, "click", () => {
      const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

      const content = `<div>
        <a href="https://map.kakao.com/link/to/${place.place_name},${place.y},${place.x}" target="_blank">매장안내</a>

        <div>${place.place_name}</div>
        <div>${place.road_address_name || place.address_name}</div>
        <div>${place.phone || ""}</div>
      </div>`;
      //<img src=${place.place_url} width={50} height={50}/> 위에 들어가야함

      infowindow.setContent(content);
      infowindow.open(map, marker);
    });
  };

  return (
    <>
      <div id="map" style={{ width: "314px", height: "149px" }}></div>
    </>
  );
}
