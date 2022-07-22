## SPA Router

Vanilla JavaScript로 SPA(Single Page Application)를 구현하면 브라우저의 앞으로가기, 뒤로가기를 사용할 수 없다. 단일 페이지에서 이미 렌더링 되어 있는 구성 요소들만 바꿔주기 때문이다.

### window history API

브라우저는 주소 내역을 목록으로 관리한다. 브라우저는 뒤로가기, 앞으로가기 요청이 올 때마다 가지고 있는 주소 목록을 참고하여 이동한다.
<br>
그래서 window history API의 `pushstate`와 window 객체의 `popstate`를 직접 이용해서 브라우저의 주소를 바꿔 줄 것이다.
<br>

### pushstate

`history.pushState` 를 이용하면 우리가 직접 주소 목록에 새로운 주소를 추가할 수 있다.

### popstate

`window.onpopstate` 는 앞으로가기, 뒤로가기를 했을 때 발생하는 이벤트이다. 그래서 이벤트가 발생할 때마다 주소에 있는 url로 렌더링해준다.

<br>

### 참고

- [history API](https://developer.mozilla.org/ko/docs/Web/API/History_API)
- [history.pushState()](https://developer.mozilla.org/ko/docs/Web/API/History/pushState)
- [popstate](https://developer.mozilla.org/ko/docs/Web/API/Window/popstate_event)
- [SPA Router](https://www.youtube.com/watch?v=ZleShIpv5zQ)
- [Vanilla JS SPA구현하기](https://velog.io/@seeh_h/VanilaJS%EB%A1%9C-SPA-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0)
