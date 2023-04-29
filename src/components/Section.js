//класс Section - отвечает за отрисовку элементов на странице (отрисовывает разметку, которую возвращает Card)

export default class Section {
  constructor( renderer , selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderItems(items) {
    items.forEach((item) => {
      this._container.append(this._renderer(item));
    });
  }

  addItem(item) {
    this._container.prepend(this._renderer(item));
  }
}



