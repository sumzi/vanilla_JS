import Component from "../core/Component.js";

export default class ItemInput extends Component {
  template() {
    return `
      <input type="text" class="add" placeholder="할 일을 입력하세요."/>
      <button class="addBtn">등록</button>
    `;
  }
  setEvent() {
    const { addItem } = this.$props;
    this.addEvent("keyup", ".add", ({ key, target }) => {
      if (key !== "Enter") return;
      if (target.value !== "") addItem(target.value);
    });

    this.addEvent("click", ".addBtn", () => {
      const target = document.querySelector(".add");
      if (target.value !== "") addItem(target.value);
    });
  }
}
