/** Создайте класс PopupWithForm, который наследует от Popup. Этот класс:
 * Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
 * Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
 * Перезаписывает родительский метод setEventListeners. Метод setEventListeners класса PopupWithForm должен
 * не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
 * Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
 * Для каждого попапа создавайте свой экземпляр класса PopupWithForm.
 */

import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector('.popup__form');
    this._inputList = this._popupForm.querySelectorAll('.popup__input');
  }

  // _getInputValues - приватный метод: собрать данные всех полей формы
  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  // перезаписать родительский метод setEventListeners
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }

  /*   setInputValues(data) {
      this._inputList.forEach((input) => {
        // вставляем в `value` инпута данные из объекта по атрибуту `name` этого инпута
        input.value = data[input.name];
      });
    }
   */

  //  перезаписать родительский метод close
  close() {
    super.close();
    this._popupForm.reset();
  }
}


