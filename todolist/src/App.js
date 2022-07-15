import Component from "./core/Component.js";
import ItemInput from "./components/ItemInput.js";
import Items from "./components/Items.js";
import ItemFilter from "./components/ItemFilter.js";

export default class App extends Component {
  setup() {
    this.$state = {
      isFilter: 0,
      items: [
        { seq: 1, content: "공부하기", done: false },
        { seq: 2, content: "밥먹기", done: true },
      ],
    };
  }
  template() {
    return `
      <header data-component="item-input"></header>
      <main data-component="items"></main>
      <footer data-component="item-filter"></footer>
    `;
  }

  //  mounted()에서 자식 컴포넌트를 마운트 해줘야함.
  mounted() {
    const {
      filteredItems,
      addItem,
      deleteItem,
      toggleItem,
      clearItems,
      filterItem,
    } = this;
    const $itemInput = this.$target.querySelector(
      '[data-component="item-input"]'
    );
    const $items = this.$target.querySelector('[data-component="items"]');
    const $itemFilter = this.$target.querySelector(
      '[data-component="item-filter"]'
    );
    //  하나의 객체에서 사용하는 메소드를 넘겨줄 bind를 사용하여 this를 변경하거나,
    //  다음과 같이 새로운 함수를 만들어줘야 한다.
    //  ex) { addItem: contents => addItem(contents) }
    new ItemInput($itemInput, { addItem: addItem.bind(this) });
    new Items($items, {
      filteredItems,
      deleteItem: deleteItem.bind(this),
      toggleItem: toggleItem.bind(this),
    });
    new ItemFilter($itemFilter, {
      clearItems: clearItems.bind(this),
      filterItem: filterItem.bind(this),
    });
  }

  //  todolist 기능 메소드 만들기
  //  아이템 필터 기능
  get filteredItems() {
    const { isFilter, items } = this.$state;
    return items.filter(
      ({ done }) =>
        (isFilter === 1 && !done) || (isFilter === 2 && done) || isFilter === 0
    );
  }

  addItem(content) {
    const { items } = this.$state;
    const seq = Math.max(...items.map((item) => item.seq)) + 1;
    this.setState({
      items: [...items, { seq: seq, content: content, done: false }],
    });
  }

  deleteItem(seq) {
    let items = [...this.$state.items];
    items = items.filter((item) => item.seq !== seq);
    this.setState({ items });
  }

  toggleItem(seq) {
    const items = [...this.$state.items];
    const index = items.findIndex((item) => item.seq === seq);
    items[index].done = !items[index].done;
    this.setState({ items });
  }

  clearItems() {
    this.setState({ items: [] });
  }

  filterItem(isFilter) {
    this.setState({ isFilter });
  }
}
