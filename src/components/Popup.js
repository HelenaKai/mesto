/** Создайте класс Popup, который отвечает за открытие и закрытие попапа.
 * Этот класс:
 * Принимает в конструктор единственный параметр — селектор попапа.
 * Содержит публичные методы open и close, которые отвечают за открытие и закрытие попапа.
 * Содержит приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.
 * Содержит публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа. Модальное окно также
 * закрывается при клике на затемнённую область вокруг формы.
 */

/** Данный класс является слоем и не имеет своего представления.
 * Он отвечает исключительно за открытие и закрытие попапа.
 * Весь функционал этого класса передается его наследникам -- PopupWithImage и PopupWithForm.
 */



export default class Popup {
  constructor(popupSelector) {
    this._selector = popupSelector;
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._selector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._selector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._selector.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close')) {
        this.close();
      };
    });
  }
}



