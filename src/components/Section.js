//класс Section - отвечает за отрисовку элементов на странице (отрисовывает разметку, которую возвращает Card)
//Первый параметр конструктора. Свойство items — это массив данных, которые нужно добавить на страницу при инициализации класса
//Первый параметр конструктора. Свойство renderer — это функция, которая отвечает за создание и отрисовку данных на странице
//Второй параметр конструктора. containerSelector — селектор контейнера, в который нужно добавлять созданные элементы


export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    //this._container = containerSelector;
    this._container = document.querySelector(containerSelector);
  }

  // renderItems - отвечает за отрисовку всех элементов
  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);                         // вызываем renderer, передав item
    });
  }

  // универсальный метод, формирует карточку и добавляет ее на странице (в начале списка);
  addItem(element) {
    this._container.prepend(element);
  }
}
