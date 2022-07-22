const $main = document.querySelector("main");

const render = () => {
  const { pathname } = window.location;
  switch (pathname) {
    case "/":
      $main.innerHTML = "<h1>Vaillna JavaScript SPA Router 구현하기</h1>";
      break;
    case "/about":
      $main.innerHTML =
        "<div><h1>SPA란?</h1><p>단일 페이지 애플리케이션(Single Page Application, SPA)는 모던 웹의 패러다임이다. SPA는 기본적으로 단일 페이지로 구성되며 기존의 서버 사이드 렌더링과 비교할 때, 배포가 간단하며 네이티브 앱과 유사한 사용자 경험을 제공할 수 있다는 장점이 있다.</p><p>link tag를 사용하는 전통적인 화면 전환 방식은 새로운 페이지 요청 시마다 정적 리소스가 다운로드되고 전체 페이지를 다시 렌더링하는 방식을 사용하므로 새로고침이 발생되어 사용성이 좋지 않다. 그리고 변경이 필요없는 부분까지 포함하여 전체 페이지를 갱신하므로 비효율적이다.</p><a href='https://poiemaweb.com/js-spa' target='_blank'>더 알아보기</a></div>";
      break;
    default:
      $main.innerHTML = "<div>404 error</div>";
      break;
  }
};
const updateLocation = (e) => {
  e.preventDefault();
  const { href } = e.target;
  window.history.pushState(null, null, href);
  render();
};

window.addEventListener("popstate", render);

document
  .querySelectorAll("a")
  .forEach((a) => a.addEventListener("click", updateLocation));

render();
