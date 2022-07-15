import Component from "../core/Component.js";

export default class ItemFilter extends Component {
  template() {
    return `
      <button class='filterBtn' data-is-filter="0">All</button>
      <button class='filterBtn' data-is-filter="1">Active</button>
      <button class='filterBtn' data-is-filter="2">Completed</button>
      <button class='clearBtn'>clear</button>
    `;
  }
  setEvent() {
    const { filterItem, clearItems } = this.$props;
    this.addEvent("click", ".filterBtn", ({ target }) => {
      filterItem(Number(target.dataset.isFilter));
    });
    this.addEvent("click", ".clearBtn", () => {
      clearItems();
    });
  }
}
