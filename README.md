# 투데잇 (Today + Eat)

## 요약

> 매번 무엇을 먹을지 고민하는 사람들을 위해, 카카오 지도를 활용하여 현재 위치를 기준으로 거리, 음식 카테고리, 키워드를 활용한 음식 추천 서비스를 제공하는 웹 애플리케이션입니다. 이 서비스는 사용자가 쉽게 접근할 수 있도록 설계되었으며, 추천된 음식점에 대해 카카오 길찾기 앱과의 연동 기능을 통해 길찾기까지 지원합니다.

### 제작 이유

직장인들, 커플, 부부, 가족 등이 외식을 할 때마다 무엇을 먹을지에 대한 고민은 흔히 발생합니다. 이러한 고민을 해결해주기 위한 음식 추천 플랫폼을 만들자는 아이디어를 팀 동료와 상의한 결과, 최종적으로 이 방향으로 결정하게 되었습니다.

## 기능 소개

- 비로그인 / 로그인으로 서비스를 이용할 수 있게 구현
- 음식 종류 카테고리, 가격대, 거리순으로 조절하여 더욱 디테일하게 음식점 검색이 가능
- 좋아하는 음식 혹은 싫어하는 음식을 지정하여 추 후에 한눈에 알기 쉽게 마이페이지에서 확인 가능
- 자기 위치를 기반으로 카카오 지도 api를 활용해 주변 음식점을 확인할 수 있도록 구현현
- 좋아하는 음식을 선택 후 원하는 음식점을 선택을 하면 카카오 길찾기 앱이 연동되도록 기능 구현현

## 기술 스택 (Skill)

**Language**

<div>
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <br />
</div>
<br />

**Client**

<div>
  <img src="https://img.shields.io/badge/next-000000?style=for-the-badge&logo=next.js&logoColor=white">
  <br />
  <img src="https://img.shields.io/badge/context-764ABC?style=for-the-badge&logo=context&logoColor=white">
  <img src="https://img.shields.io/badge/react router-CA4245?style=for-the-badge&logo=react-router&logoColor=white">
</div>
<br />

**Server**

<div>
  <img src="https://img.shields.io/badge/node-339933?style=for-the-badge&logo=node.js&logoColor=white">
  <br />
</div>
<br />

**Database**

<div>
  <img src="https://img.shields.io/badge/mongodb-47A248?style=for-the-badge&logo=mongodb&logoColor=white">
  <br />
</div>
<br />

**UI**

<div>
  <img src="https://img.shields.io/badge/sass-CC6699?style=for-the-badge&logo=sass&logoColor=white">
  <br />
  <img src="https://img.shields.io/badge/styled components-DB7093?style=flat-square&logo=styled-components&logoColor=white">
</div>
<br />

**Etc**

<div>
  <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
  <img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=black">
  <img src="https://img.shields.io/badge/netlify-512d21?style=for-the-badge&logo=netlify&logoColor=black">
</div>

## 문제해결

**문제.1**

카카오 지도 api 의 내용이 담긴 정보를 kakao 라는 변수에 할당하여 카카오 지도 api 공식문서를 토대로 코드를 작성하였으나 kakao is not defiend 라는 에러 발생

**해결 방법**:

- `defer` 카카오 지도 api 스크립트를 async로 비동기로 처리했으나 완료가 되지 못한 상황에서 실행이 되어 마찬가지로 kakao is not defiend 라는 에러 발생 그리하여 defer라는 속성으로 같은 비동기 속성이지만 완전히 완료되면 실행하라는 차이점을 깨닫고 onload라는 메서드를 사용하여 카카오 지도 api가 담긴 kakao 객체를 사용할 수 있게 되었습니다.

**문제.2**

음식 이미지를 데이터베이스에 저장이 되어야 하는데 mongoDB 자체에는 Storage라는 기능이 따로 없어 이미지 파일을 저장할 곳을 찾지 못하는 문제가 발생

**해결 방법**

- `GridFS` GridFS는 MongoDB에서 큰 파일(16MB 이상)을 여러 조각으로 나누어 저장하고, 이를 효율적으로 관리하고 복원할 수 있는 파일 저장할 수 있는 기능이 있어서 이 방법을 택했고, 저장한 경로의 주소를 추출하는 방식으로 이를 해결할 수 있었습니다.

## 느낀 점

- Next.js 프레임워크의 SSR(Server-Side Rendering)을 활용함으로써 초기 로딩 속도가 향상되고, 검색엔진 최적화(SEO)에도 각각 페이지 별 동적으로 SEO의 이점을 가질 수 있는 점을 배웠습니다.
- 프로젝트에서 필요한 부분에는 CSR을 적용하고, 다른 부분에는 SSR을 적용하는 전략을 사용하여, 페이지 로딩 시간과 SEO를 최적화했습니다. 이 방식은 성능과 사용자 경험을 동시에 고려할 수 있게 해주었습니다.
- 카카오 지도 API를 사용할 때 비동기 처리에 대해 깊이 이해할 수 있었습니다. defer와 onload 메서드를 통해 스크립트 로딩 순서와 실행 시점을 조절하는 방법을 익히며, 비동기 처리가 실제 개발에서 어떻게 중요한지 체감할 수 있었습니다.
- <img> 태그를 활용하여 이미지를 설정했었는데, 데이터베이스로부터 불러오고 이러한 과정에서 어떻게하면 조금 더 빨리 불러올 수 없을까? 하는 도중 NEXT/IMAGE 컴포넌트를 사용하면 자동으로 최적화 해주고 각 상황에 맞게 이미지 사이즈를 조절해주어 이러한 과정을 통해 이미지 불러오는 로딩속도를 1~2초 단축할 수 있었습니다.

## 어려웠던 점

- 처음 Next.js 강의를 page Router 기반으로 학습을 했었는데 규모가 커질수록 폴더구조가 지저분해지는 단점을 깨달아서 app Router 기반으로 설정 후 초기 환경설정을 갖추는점에서 어려움을 겪었습니다.
- 한 프로젝트에서 client 폴더, server(api) 폴더관리를 어떻게 적용하면 좋을지에 대해서도 고민하고 적용하는점에서 많은 어려움을 겪었습니다.

## 프로젝트 이미지

| ![스플래쉬 화면](https://github.com/junesung1004/todayEat-TeamProject/blob/develop/public/view/splash.png)      | ![첫 화면](https://github.com/junesung1004/todayEat-TeamProject/blob/develop/public/view/main.png)            |
| --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| ![카테고리 화면](https://github.com/junesung1004/todayEat-TeamProject/blob/develop/public/view/filter.png)      | ![코치마크 화면](https://github.com/junesung1004/todayEat-TeamProject/blob/develop/public/view/cochimark.png) |
| ----------------------------------------------------------------------------------------------------------      | --------------------------------------------------------------------------------------------------            |
| ![음식 선택택 화면](https://github.com/junesung1004/todayEat-TeamProject/blob/develop/public/view/menuitem.png) | ![음식점 선택택 화면](https://github.com/junesung1004/todayEat-TeamProject/blob/develop/public/view/shop.png) |
| ----------------------------------------------------------------------------------------------------------      | --------------------------------------------------------------------------------------------------            |
| ![음식 선택택 화면](https://github.com/junesung1004/todayEat-TeamProject/blob/develop/public/view/mypage.png)   |
