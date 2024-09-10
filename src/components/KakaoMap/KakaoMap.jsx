"use client";

import { useEffect, useState } from "react";

export default function KakaoMap() {
  //현재 위치를 업데이트 시켜줄 변수 생성
  const [currentPosition, setCurrentPosition] = useState({
    latitude: null,
    longitude: null,
  });

  //처음 화면 로드시 1번만 실행시켜주는 카카오 지도 코드
  useEffect(() => {
    //카카오지도 api 스크립트 생성 코드
    const script = document.createElement("script");
    script.async = true;
    script.type = "text/javascript";

    //&autoload=false <- 이 코드의 역할은
    //이 옵션을 적용함으로써 API가 로드될 때 지도가 자동으로 생성되지 않고,
    //kakao.maps.load() 함수가 호출된 후에 지도를 생성하게 됩니다.
    //이렇게 하면 스크립트가 완전히 로드된 ntPosition] = useState({후 지도를 수동으로 제어할 수 있습니다.
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY}&autoload=false&libraries=LIBRARY&libraries=services&libraries=services,clusterer,drawing`;
    document.head.appendChild(script);

    script.onload = () => {
      //스크립트가 완전히 로드된 후 kakao.maps.load()를 통해 지도를 생성하는 방식은
      //API가 로드되기 전에 지도를 초기화하려고 할 때 발생하는 오류를 방지할 수 있습니다.

      //카카오 맵의 로드 기능이 준비되면 실행될 코드
      kakao.maps.load(() => {
        //사용자의 현재 위치를 가져올 수 있는지 확인한다.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            //사용자의 현재 위치를 가져와 상태를 업데이트 한다.
            const { latitude, longitude } = position.coords;
            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
            setCurrentPosition({
              latitude,
              longitude,
            });
            //지도를 표시할 영역을 작성하는 코드 작성
            const container = document.getElementById("map");

            //지도를 생성할 때 필요한 기본 옵션
            const options = {
              //kakao.maps 를 사용하지 않고 window.kakao.maps를 사용하는 이유는 kakao객체는 전역인데
              //지역스코프안에 정의되어 있어서 전역객체로 사용하기 위해 window를 사용해준다.
              //그리하여 kakao is not defiend 문제를 해결할 수 있었다.
              //즉 함수내에서 정의되어서 지역 스코프로 간주되어 kakao가 정의되지 않는다고 나온다는 것.
              center: new window.kakao.maps.LatLng(latitude, longitude),
              level: 5,
            };

            //지도 생성
            const kakaoMap = new kakao.maps.Map(container, options);

            // 내 위치기준 마커 추가
            // const marker = new window.kakao.maps.Marker({
            //   position: new window.kakao.maps.LatLng(latitude, longitude),
            // });
            // marker.setMap(kakaoMap);

            //
          });
        }
      });
    };
  }, []);

  return (
    <>
      <div id="map" style={{ width: "314px", height: "149px" }}></div>
    </>
  );
}
