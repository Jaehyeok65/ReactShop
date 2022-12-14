# 쇼핑몰 클론코딩

### 리액트 공부를 효율적으로 하기 위해 쇼핑몰을 정하여 클론코딩 프로젝트를 하면서 리액트 공부를 진행하였습니다.

#### [클론 코딩 대상 쇼핑몰 주소](https://cabeza.co.kr/index.html)

#### [gh-pages 배포 주소](https://jaehyeok65.github.io/ReactShop)

<br />
<br />


### Peroid

##### 2022.08.01 ~ 2022.09.14

<br />
<br />


#### Description


![SHOPLIST](https://user-images.githubusercontent.com/62687875/186170498-d0c4ceff-79ac-4522-9531-5791c96c8968.PNG)

<hr />

1. 쇼핑몰로서 갖춰야할 기본적인 기능들(장바구니, 관심리스트, 상품 목록 페이지네이션, 댓글, 로그인, 권한 부여, 결제 기능)을 구현하였습니다.

2. 리액트 라우터 라이브러리를 사용하여 SPA 모델로 구현하였으며, 리액트 Transition 라이브러리를 사용하여 애니메이션을 적용하였습니다.

3. CSS FLEX, GRID 컨테이너, Media Query 등을 사용하여 반응형 웹을 구현하였습니다.

4. LocalStorage, SessionStorage 등을 사용하여 새로고침시 State가 초기화 되는 것을 방지하도록 구현하였습니다.






<br />
<br />
<br />


## 프로젝트를 진행하며 새롭게 알게된 점


##### Z-index

프로젝트를 진행하며 sticky position을 사용하게되는 경우와, absolute 포지션을 사용하게 되는 경우가 있었는데, 박스 영역이 겹쳐서 원하는 배치가 이루어지지 않는 경우가 많았는데, 구글링을 통해 Z-index를 설정하면 배치의 우선순위를 결정할 수 있다는 사실을 알게 되었고, 원하는 대로 배치가 가능하게 되었습니다.


##### LocalStorage, SessionStorage

React에서 State를 사용할 때 새로고침을 하면 변경되었던 state가 사라지는 문제가 발생하였는데, LocalStorage와 SessionStorage를 사용하여 데이터를 보존할 수 있다는 사실을 알게되었습니다.

#### Media Query

Media Query를 사용하여 뷰포트의 크기에 맞춰 아이템을 배치하는 반응형 웹페이지를 구현할 수 있게 되었으며 useMediaQuery 훅을 사용하여 각 디바이스의 레이아웃에 
맞게 컴포넌트의 요소를 구성할 수 있게 되었습니다.


#### API

Daum PostCode API, 아임포트 결제 API 등 오픈소스 API를 가져와서 상황에 맞게 변형하여 사용할 수 있게 되었습니다.


#### Animation Control


useRef 훅을 사용하여 DOM에 접근할 수 있게 되었고, DOM에 직접 접근하여 애니메이션을 설정함으로써 UX를 향상시킬 수 있게 되었습니다.


#### ReFactoring


함수 모듈화와 단일 책임 원칙 등을 적용하여 성능을 높이는 리팩토링에 대해서 알게 되어 코드를 재사용할 수 있게 되었으며 성능과 코드 가독성을 높일 수 있게 되었습니다. 



#### Lazy Loading


리액트를 사용하다보니 리액트는 초기에 번들링된 자바스크립트 파일을 다 받기 전까지는 브라우저에 화면을 그리지 않아 초기 로딩 시간이 오래 걸린다는 것을 알게 되었고,
그에 대한 해결책으로 Lazy Loading 기법을 알게 되었습니다. 번들링 시간이 오래 걸리는, 나중에 번들링 해도 상관이 없는 컴포넌트에 React.lazy를 적용하여 초기 로딩
시간을 낮춰 성능을 향상시킬 수 있게 되었습니다.

<br />
<br />

#### 기술스택

<img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=white"/> <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/> <img src="https://img.shields.io/badge/JavaScript-RGBA27?style=flat-square&logo=javascript&logoColor=white"/> <img src="https://img.shields.io/badge/HTML5-BBBA27?style=flat-square&logo=html5&logoColor=white"/> <img src="https://img.shields.io/badge/CSS3-TTAA28?style=flat-square&logo=CSS3&logoColor=white"/>












