## Dark Mode

### prefers-color-scheme

- `prefers-color-scheme`은 미디어 쿼리를 통해 감지한다.
- OS의 라이트 모드/다크 모드를 인식하고 이에 맞는 CSS를 적용할 수 있다.

```css
@media (prefers-color-scheme: light) {
  .themed {
    background: white;
    color: black;
  }
}
```

<br>

### Atrribute 활용

사용자가 선택한 모드를 지원하는 웹 환경을 구성할 때, 웹은 사용자의 접근이 있는 경우 다음과 같이 모드를 감지할 수 있다.

1. 사용자가 해당 웹에서 선택한 모드가 있는지 감지하고 사용자가 선택한 모드가 있는 경우 해당 모드로 렌더링
2. 사용자가 선택한 모드가 없는 경우 OS의 모드를 감지해 OS모드로 렌더링
3. 사용자가 모드를 변경할 때마다 변경된 모드를 반영하고 렌더링

이와 같이 사용자 선택 권한을 주기 위해서는 토글할 수 있는 요소를 제공해야한다.

```html
<input class="check" type="checkbox" />
<div class="themed">Theme</div>
```

```javascript
const $checkbox = document.querySelector("check");

$checkbox.addEventListener("click", (e) => {
  if (e.target.checked)
    document.documentElement.setAttribute("color-theme", "dark");
  else document.documentElement.setAttribute("color-theme", "ligit");
});
```

이렇게 작성한 코드가 제대로 동작할 수 있도록 CSS에서 :root로 루트 요소를 선택해 모드에 따라 실질적으로 색상 변경이 일어나도록 한다.

```css
:root[color-theme='light'] {
  --background=#fff;
  --boxColor: #000;
}
```

<br>

### localStorage 활용

```javascript
localStorage.setItem("color-theme", "dark");
localStorage.setItem("color-theme", "light");
```

### reference

[다크모드](https://blogpack.tistory.com/1117)
