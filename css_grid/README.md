## CSS Grid

- 유저가 사용하는 디바이스의 가로 길이에 따라 검색결과의 row당 column 갯수를 변경하기
  - 992px 이하: 3개
  - 768px 이하: 2개
  - 576px 이하: 1개

```css
@media (max-width: 576px) {
  grid-template-columns: repeat(1, minmax(250px, 1fr));
}
```

- `@media` : CSS @규칙은 스타일 시트의 일부를 하나 이상의 미디어 쿼리 결과에 따라 적용할 때 사용할 수 있다.
- `grid-template-columns` : 컨테이너에 Grid 트랙의 크기들을 지정해주는 속성, 열의 배치
- `repeat` : 반복되는 값을 자동으로 처리할 수 있는 함수이다.
  - repeat(반복횟수, 반복값)
- `minmax` : 최솟값과 최댓값을 지정할 수 있는 함수이다.
  - ex) minmax(100px, auto) : 최소한 100px, 최대는 자동으로(auto) 늘어난다.
