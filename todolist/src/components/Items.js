import Component from "../core/Component.js";

export default class Items extends Component {
  template() {
    const { filteredItems } = this.$props;
    return `
      <ul>
        ${filteredItems
          .map(
            ({ seq, content, done }) => `
          <li data-seq="${seq}">
            <input type='checkbox' class="toggleBox" ${done ? "checked" : ""}/>
            
            <label style="text-decoration:${
              done ? "line-through" : ""
            }">${content}</label>
            <button class="deleteBtn">삭제</button>
          </li>
        `
          )
          .join("")}
      </ul>
    `;
  }

  setEvent() {
    const { toggleItem, deleteItem } = this.$props;
    this.addEvent("click", ".toggleBox", ({ target }) => {
      toggleItem(Number(target.closest("[data-seq]").dataset.seq));
    });

    this.addEvent("click", ".deleteBtn", ({ target }) => {
      deleteItem(Number(target.closest("[data-seq]").dataset.seq));
    });
  }
}
