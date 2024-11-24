<img width="308" alt="image 1" src="https://github.com/user-attachments/assets/04f1d82c-5816-4f59-bf9c-5fadc7dc834b"># 세번째 프로젝트

프로젝트 제목: 투데잇 (today + eat)
기술스택: CSS(SASS & SCSS), GridFS, context, mongodb, next-auth, next.js
작업기간: 2024년 9월 1일 → 2024년 9월 25일
기여도: 100%
깃허브: https://github.com/junesung1004/todayEat-TeamProject
배포 사이트: https://todayeatfoods.netlify.app/

![image.png](![Uploading image.png…]()
)

---

## 프로젝트 소개

---

■ **목적**

카테고리 기반으로 메뉴를 선택하여 사용자들이 선호하거나 비선호하는 음식을 쉽게 파악하고, 간편하게 이용할 수 있는 서비스입니다.

■**목표**

- 메뉴 선택 시 사용이 간편하며, 선택한 음식을 바탕으로 매장까지의 길찾기 기능을 자동으로 제공하여, 어떤 음식을 고를지, 어느 매장을 갈지 고민하는 시간을 줄여주는 유익한 서비스를 제공합니다.
- 다양한 카테고리를 기반으로 개인의 선호 음식 특성을 분석하여, 스와이퍼 형식을 통해 음식을 더욱 편리하게 선택할 수 있도록 합니다.
- 음식을 선택할 때 평균 가격대와 칼로리 정보를 제공하여, 예산을 고려하는 사용자나 다이어트 중인 사람들에게 더욱 만족스러운 경험을 제공합니다.
- 비로그인 상태에서도 서비스 이용이 가능하며, 카카오 소셜 로그인을 통해 선호 및 비선호 음식을 선택하고, 나만의 음식 목록을 한눈에 확인할 수 있는 맞춤형 서비스를 제공합니다.

■**페르소나**

![image.png](<img width="308" alt="image 1" src="https://github.com/user-attachments/assets/7ab0eb8f-feef-410c-9e73-2be66792f0cf">
)

💡**박준성** :  점심시간에 메뉴를 고르라고 했는데, 도대체 뭘 선택해야 하지? 왜 항상 나한테 시키는 거          야… 매장은 또 어떻게 찾지? 으아……….

---

## 기능 목록

- **공통 header, footer 컴포넌트**
    
    ![image.png](<img width="242" alt="image 2" src="https://github.com/user-attachments/assets/823637ac-c445-486f-9f9c-0febb923958e">
)
    
    - 헤더에 메인 로고를 클릭하면 메인 페이지로 이동한다.
    - 헤더에 햄버거 버튼을 클릭하면 음식 카테고리 페이지로 이동한다.
    - 푸터에 집 모양 로고를 클릭하면 메인 페이지로 이동한다.
    - 푸터에 사람 모양 로고를 클릭하면 마이페이지로 이동한다.
- **스플래시 페이지**
    
    ![image.png](<img width="238" alt="image 3" src="https://github.com/user-attachments/assets/f7021148-b21b-4f88-b7ab-4f6ea5ebf493">
)
    
    - 웹 사이트에 접속을 하면 첫 로딩페이지 화면이 나오며 2초 후 home 화면으로 진입한다.
- **시작 페이지**
    
    ![image.png](<img width="691" alt="image 4" src="https://github.com/user-attachments/assets/28f92240-73e2-4fbe-b882-6d9bccc9dd96">
)
    
    - 스플래시 페이지에서 2초 후 진입하는 첫 시작페이지
    - swiper.js를 통해 서비스 이용 방법을 슬라이드 형식으로 알려준다.
    - 시작하는 방법은 비로그인/소셜로그인을 통하여 시작할 수 있다.
- **홈 페이지**
    
    ![image.png](<img width="220" alt="image 5" src="https://github.com/user-attachments/assets/42391d6c-fa24-4332-ad10-951ddf62ea47">
)
    
    - 시작 페이지에서 로그인 & 비로그인으로 시작을 하면 진입하는 홈 화면 페이지
    - 맞춤설정 버튼을 클릭하면 음식 카테고리 설정 페이지로 이동한다
- **카테고리 설정 페이지**
    
    ![image.png](<img width="221" alt="image 6" src="https://github.com/user-attachments/assets/c93cda55-7e92-4a6e-a4c7-661543368c7e">
)
    
    - 홈 페이지 화면에서 맞춤 설정 버튼을 누르면 진입하는 카테고리 설정 화면
    - 카테고리를 크게 음식 , 가격대, 매장거리로 총 3가지로 나누어 개발
    - 총 3개의 카테고리를 선택해야지 적용하기 버튼이 활성
    - 카테고리를 잘못 선택했을 때 초기화 버튼을 누르면 카테고리가 초기화된다
- **음식 선택 페이지**
    
    
    ![image.png](<img width="260" alt="image 7" src="https://github.com/user-attachments/assets/8d2e0f86-ffd8-4380-93e2-3ab14f5b57d9">
)
    
    ![image.png](<img width="200" alt="image 8" src="https://github.com/user-attachments/assets/940d1551-be8c-438a-8416-b803bbeea60e">
)
    
    - 카테고리 설정 페이지에서 적용하기 버튼을 누 후 진입하는 화면
    - 초기에는 코치마크로 서비스를 어떻게 이용하는지 예시로 보여준다.
    - 닫기 버튼을 누르고 본격적으로 서비스를 이용할 수 있고 음식 카드를 스와이퍼 형식으로
    넘기면서 음식을 고를 수 있다.
    - 음식 카드를 넘기다 먹고 싶은 메뉴를 찾았을 때 지도 모양 아이콘을 선택하면 음식 키워드 
    기반으로 매장을 선택할 수 있는 페이지로 넘어간다.
    - 하트 모양 아이콘을 누르면 좋아하는 음식 목록에 업데이트가 되고  아이콘을 누르면
    하트 모양의 색깔이 바뀐다.
    위 좋아요 기능을 사용하려면 로그인을 해야지 서비스 이용이 가능하게 구현함
    - 점 3개 아이콘을 누르면 싫어요를 등록할 수 있는 팝업창이 나오면서 좋아요와 마찬가지로
    로그인이 된 상황에서만 서비스를 이용 가능하게 구현
        
        ![image.png](<img width="227" alt="image 9" src="https://github.com/user-attachments/assets/8fe17f0f-aef3-44b3-8d53-706f67bc30d3">
)
        
- **매장 선택 페이지**
    
    ![image.png](<img width="249" alt="image 10" src="https://github.com/user-attachments/assets/410dd3a1-8b91-466b-96af-4888c88d7eb7">
)
    
    - 음식 선택 페이지에서 음식을 선택 후 진입하는 화면
    - 음식 이름을 활용하여 키워드로 지정 후 카카오 지도 api와 연결하여
    키워드에 맞는 매장 리스트들을 검색 후 거리순으로 나열하여 확인 할 수 있다.
    - 지도 콘테이너에 마커를 하나 클릭하면 윈포윈도우 기능이 활성화 되서
    매장 정보를 확인 할 수 있다
        
        ![image.png](<img width="136" alt="image 11" src="https://github.com/user-attachments/assets/5dc75bdb-2089-4a14-87aa-d601884d6c1f">
)
        
    - 매장안내를 누르면 카카오 길찾기 app이 연동되어 현재 내위치 기준으로 자동으로 길찾기 
    기능이 가능하다.
- **마이 페이지**
    
    ![image.png](<img width="680" alt="image 12" src="https://github.com/user-attachments/assets/38bcd1e5-d595-4eed-b13a-c15574c14685">
)
    
    - 위 마이페이지는 로그인을 해야지만 가능한 서비스입니다.
    - 좋아요 & 안볼래요 탭을 하나씩 활성화 시켜 좋아요 탭이면 좋아요 음식들, 
    안볼래요 탭이 활성화 된 상태라면 비선호 음식 목록을 보여준다.
    - 편집을 누르면 카드 아이템에 x아이콘이 활성화 되고 x버튼을 누른 후 완료 버튼을 누르면
    해당 음식이 사라지고 데이터베이스에 음식이 삭제된다.
        
        ![image.png](<img width="149" alt="image 13" src="https://github.com/user-attachments/assets/669ae02a-c0eb-445b-9358-3a3b5d0c1e9f">
)
        
    - 마이 페이지에서 위 표시 부  이름을 활용한 방식은 context api를 활용하여 전역에서 
    유저 정보를 가지고 활용할 수 있게 구현

## 기술스택

---

### ■  FE

[Next.js](https://www.notion.so/Next-js-10c502656bc38039a183c4e57124cd99?pvs=21)

[styles.module & SCSS](https://www.notion.so/styles-module-SCSS-10c502656bc38066b244d848f14a2f5b?pvs=21)

[swiper.js](https://www.notion.so/swiper-js-10c502656bc380499fd0d96e9f4fa9e8?pvs=21)

[**NextAuth.js**](https://www.notion.so/NextAuth-js-10c502656bc380e49c4fcfd5cb430d0a?pvs=21)

[Context API](https://www.notion.so/Context-API-10c502656bc380db9990c48bc404fea8?pvs=21)

### ■  BE

[Node.js](https://www.notion.so/Node-js-10c502656bc38063ac15c50b778dfac7?pvs=21)

[Next.js 내장된 서버](https://www.notion.so/Next-js-10c502656bc380b89d73cb77f9b00707?pvs=21)

[MongoDB - Atlas](https://www.notion.so/MongoDB-Atlas-10c502656bc38082b130dc66ed60138e?pvs=21)

[MongoDB - Compass](https://www.notion.so/MongoDB-Compass-906f67134e514831a0865a4fd5cf859a?pvs=21)

[**MongoDB - GRIDFS (multer)**](https://www.notion.so/MongoDB-GRIDFS-multer-6db30c71a2f44f65bd7dffdfe32871d6?pvs=21)

[**NextAuth.js - jwt**](https://www.notion.so/NextAuth-js-jwt-863a26828d1e4797bdc429a20aeea950?pvs=21)

■  **INFRA**

[Netlify](https://www.notion.so/Netlify-10c502656bc3800286edfa424034f1fa?pvs=21)

### 구성원 역할

---

| 담당자 | 직군 | 업무 |
| --- | --- | --- |
| 최상욱 | 기획 & 디자인 | 1. IA(정보구조)
2. 플로우차트
3. 와이어프레임
4. UI 디자인 |
| **박준성** | 프론트엔드 & 백엔드 | 1. 프로젝트 구축 후 초기 설정
2.페이지별 화면 마크업
3.카테고리별 기능구현
4.비관계형 MongoDB 생성 및 연동
5.user별 좋아요 & 싫어요 data 관리
5.API개발 |

### 협업 도구

---

- **협업 툴**
    - Notion : 프로젝트 기간, 사용 기술 스택, 참고 문서, 업무 진행 사항, 회의록
        
        ![image.png](<img width="743" alt="image 14" src="https://github.com/user-attachments/assets/898ba721-185b-4f78-bbd5-54d1a8e67097">
)
        
    - Discord : 음성 및 채팅으로 의견 제시 및 문제 해결
        
        ![image.png](<img width="559" alt="image 15" src="https://github.com/user-attachments/assets/2bd6d3d1-6649-481e-9931-4c1a493979e9">
)
        
    - GitHub : Code Repository
    - Pigma : 기획, IA, 와이어프레임, 플로우차트 등 협업 툴 사용
        
        ![image.png](<img width="575" alt="image 16" src="https://github.com/user-attachments/assets/ab60dae5-af08-4374-bbc3-4a96c8f6608a">
)
        

### 컨벤션

---

### 코드

| **코드** | **설명** |
| --- | --- |
| 변수 | 카멜 케이스(camelCase) |
| 함수(컴포넌트) | 파스칼 케이스(PascalCase) |
| 함수(일반함수) | 카멜 케이스(camelCase) |
| 파일 | 카멜 케이스(camelCase) |
| 스타일 | 카멜 케이스(camelCase) |

### 커밋

| **커밋** | **설명** |
| --- | --- |
| feat | 새로운 기능 추가 |
| fix | 오류 수정 |
| style | 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우, css작업 |

### 브랜치 전략

```python
master - develop - feature-f-js
```

![image.png](<img width="514" alt="image 17" src="https://github.com/user-attachments/assets/32793e53-9b28-4b1e-8d4e-5f576276fb4c">
)

### 기여 방법

---

1. Github repository 생성 후 조직도에 팀원을 추가합니다.
2. 새로운 기능 브랜치를 만듭니다. (git checkout -b feature-f-js)
3. 변경한 코드를 커밋합니다. (git commit -m “Add people frontendFeature”)
4. 브랜치를  Push합니다. (git push origin feature-f-js)
5. 새로 생성된 브랜치를 merge하여 관리합니다.

### 프로젝트 개선점 & 리펙토링

---

1. 데이터를 불러오는 동안 빈 화면이 나타나는 문제가 있어, UX 개선을 위해 로딩 페이지를 추가하여 데이터가 로드될 때 사용자에게 로딩 화면을 보여주면 좋을 것 같습니다. 
2. 현재 이미지 파일을 PNG 형식으로 가지고 있는데, WebP와 AVIF 형식으로 변환하여 용량을 최적화하면 데이터 로딩 속도를 더욱 개선할 수 있지 않을까 생각합니다. 
이러한 포맷들은 파일 크기를 줄이면서도 이미지 품질을 유지할 수 있어, 사용자에게 더 빠른 로딩 경험을 제공할 수 있습니다.
3. 현재 코드가 뒤죽박죽 섞여 있어 가독성이 떨어지는데, 이를 개선하기 위해 코드를 구조적으로 정리하면 좋겠습니다. `state`는 `state`끼리, `useEffect`는 `useEffect`끼리, 함수는 함수별로, 이벤트 함수는 이벤트 함수끼리 명확히 구분하여 배치하고, 불필요한 주석도 정리하면 코드의 가독성과 유지보수성이 크게 향상될 것입니다.

### 프로젝트 추가 서비스

---

현재 제공되는 웹(앱) 서비스에 커뮤니티 기능을 추가해, 사용자가 글을 작성하고 댓글을 달 수 있는 소통의 공간을 마련하면 좋을 것 같습니다. 특히, 조회수가 많은 글을 상단에 고정하여 사용자들이 인기 있는 콘텐츠를 쉽게 접근할 수 있도록 하면, 서비스의 사용자 참여도와 만족도를 더욱 높일 수 있을 것으로 기대됩니다. 이러한 기능은 활발한 커뮤니티 형성에 기여할 것입니다.

### 팀 프로젝트를 하면서 느낀점

---

**PO(Product Owner)**의 중요성을 깊이 깨달았습니다. PO의 성향에 따라 프로젝트 미팅의 분위기와 진행 상황이 크게 달라질 수 있다는 것을 직접 경험하게 되었습니다.

**PO의 중요성**은 매우 크다고 생각합니다. PO는 프로젝트의 비전과 목표를 명확히 설정하고, 팀이 올바른 방향으로 나아갈 수 있도록 우선순위를 정하며 조율하는 핵심 역할을 합니다. 이 과정에서 PO의 리더십과 의사소통 능력이 프로젝트 성공에 직결되기 때문에, PO의 역할이 얼마나 중요한지 실감하게 되었습니다.
