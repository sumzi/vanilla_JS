## Infinite Scrolling & Filter

[jsonplaceholer]('https://jsonplaceholder.typicode.com/')의 게시물을 무한 스크롤을 추가하여 가져오고 필터링합니다.

- UI 및 사용자 지정 CSS 로더 애니메이션 생성
- API에서 초기 게시물 가져오기 및 표시
- 아래로 스크롤하여 로더를 표시하고 다음 게시물을 가져옴
- 가져온 게시물에 대한 필터링 추가

<br>

## ♾️무한 스크롤 구현 방법

### 1. Scroll Event

- `clientHeight` : 웹 브라우저 창(내용이 보여지는 영역)의 높이
- `scrollTop` : 현재 스크롤된 부분의 맨 위의 높이(=현재 스크롤의 위치)
- `scrollHeight` : 문서의 총 높이 (=스크롤 대상의 총 높이)

스크롤이 끝까지 된 경우, `clientHeight`와 `scrollTop`의 합은 `scrollHeight`와 같거나 더 크게 된다. 이러한 특성을 이용하여 스크롤이 끝까지 되었으면 추가 데이터를 로딩합니다.

```javascript
// ===== Infinite scroll event =====
window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (clientheight + scrollTop >= scrollHeight) {
    addData();
  }
});
```

<br>

### 2. Intersection Observer

`Intersection Observer`(교차 관찰자 API)는 타겟 엘리먼트와 타겟의 부모 혹은 상위 엘리먼트의 뷰포트가 교차되는 부분을 비동기적으로 관찰하는 API이다.

> 뷰포트(Viewport)는 현재 화면에 보여지고 있는 다각형(보통 직사각형)의 영역이다. 웹 브라우저에서는 현재 창에서 문서를 볼 수 있는 부분을 말한다. 뷰포트 바깥의 콘텐츠는 스크롤 하기전에는 보이지 않는다.

즉, Intersection Observer란 화면(뷰포트) 상에 내가 지정한 타겟 엘리먼트가 보이고 있는를 관찰하는 API이다.

#### **사용 예시**

- 페이지 스크롤 시 이미지를 Lazy-loading(지연 로딩) 할 때
- Infinite Scrolling(무한 스크롤)을 통해 스크롤하며 새로운 콘텐츠를 불러올 때
- 광고의 수익을 계산하기 위해 광고의 가시성을 참고할 때
- 사용자가 결과를 볼 것인지에 따라 애니메이션 동작 여부를 결정할 때

#### 기존 Scroll Event 의 문제

보통 `addEventListener()`의 `scroll` 이벤트가 먼저 떠오른다. document에 스크롤 이벤트를 등록하고, 특정 지점을 관찰하여 엘리먼트가 위치에 도달했을 때 실행할 콜백함수를 등록한다.

하지만 `scroll` 이벤트는 단시간에 수백번, 수천번 호출될 수 있고 동기적으로 실행되기 때문에 메인 스레드 영향을 준다. 또한 한 페이지 내에 여러 `scroll` 이벤트(무한 스크롤, 광고 배너, 애니메이션)가 등록되어 있을 경우, 각 엘리먼트마다 이벤트가 등록되어 있기 때문에 사용자가 스크롤할 때마 이를 감지하는 이벤트가 끊임없이 호출된다.(Debouncing과 Throttling을 통해 이러한 문제를 개선시킬 수도 있다.) 그리고 특정 지점을 관찰하기 위해서는 `getBoundingClintRect()`함수를 사용해야하는데, 이 함수는 리플로우(reflow) 현상이 발생한다는 단점이 있다.

> reflow : 리플로우는 브라우저가 웹 페이지의 일부 또는 전체를 다시 그려야하는 경우 발생

#### **사용 방법**

`callback`

- `callback` : 타겟 엘리먼트가 교차되었을 때 실행할 함수
  - `entries` : **IntersectionObserverEntry** 객체의 리스트, 배열 형식으로 반환하기 때문에 forEach를 사용해서 처리하거나, 담일 타겟의 경우 배열인 점을 고려해서 코드를 작성해야함.
  - `observer` : 콜백함수가 호출되는 IntersectionObserver

`options`

- `root`
  - default : null, 브라우저의 viewport
  - 교차영역의 기준이 될 root 엘리먼트, observe의 대상으로 등록할 엘리먼트는 반드시 root의 하위 엘리먼트여야함.

```javascript
const options = { threshold: 0, rootMargin: "10px 0px" };
const callback = (entries, observer) => {
  entries.forEach((entry) => {
    // isIntersecting : 노출 여부
    // target : Target Element
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      console.log("화면에서 노출됨");
    } else {
      console.log("화면에서 제외됨");
    }
  });
};

const observer = new IntersectionObserver(callback, options);

observer.observe{
  document.getElementById('id');
}
```

1. `Intersection Observer`객체를 생성하면서, `callback function`과 `option`을 전달한다.
2. `Intersection Observer`에서 observe로 구독할 `Target Element`를 추가한다.
3. `Target Element`가 options.threshold로 정의한 **Percent(%)**만큼 화면에 노출 혹은 제외되면, entries 배열에 추가하고, `callback function`을 호출한다.
4. `callback function`에서 전달받은 entries 배열을 확인하면서, **isIntersecting**으로 노출 여부를 확인한다.
5. 만약 더 이상 `Target Element`를 구독할 필요가 없다면, IntersectionObserver에서 **unobserve**로 제거 할 수 있다.

#### **+ Image Lazy Load**

Intersection Observer를 이용하면 쉽게 Image Lay Load를 구현할 수 있다.  
이미지 리스트를 만들고, 이를 작은 이미지로 채운다.  
그리고, 실제 노출되고 싶은 이미지를 Data로 채워 넣는다.

```html
<img class="lazy" src="impty.png" data-src="image1.png" />
```

lazy className으로 등록된 Element를 IntersectionObserver 구독에 추가한다.

```javascript
const options = { threshold: 0 };
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      entry.target.src = entry.target.dataset.src;
    }
  });
}, options);

observer.observe(Array.from(document.getElementsByClassName("lazy")));
```

노출이 될 때마다, entry의 target을 가져와서 src에 dataset.src를 적용하고, 구독에서 제외한다.  
이를 응용하면, 특정 Element가 노출 될 때마다, Animation효과도 부여하거나, 사용자가 문서를 어디까지 읽었는지도 구현해 볼 수 있다.

### reference

- [Scroll Event]("http://yoonbumtae.com/?p=3599")

- [[MDN] Intersection Observer API]('https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API')

- [Intersection Observer로 무한 스크롤 구현하기]("https://velog.io/@yejinh/Intersection-Observer%EB%A1%9C-%EB%AC%B4%ED%95%9C-%EC%8A%A4%ED%81%AC%EB%A1%A4-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0")

- [Intersection Observer 간단 정리하기]('https://pks2974.medium.com/intersection-observer-%EA%B0%84%EB%8B%A8-%EC%A0%95%EB%A6%AC%ED%95%98%EA%B8%B0-fc24789799a3)
