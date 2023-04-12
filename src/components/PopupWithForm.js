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
    this._popupForm = this._selector.querySelector('.popup__form');
    this._inputList = Array.from(this._popupForm.querySelectorAll('.popup__input'));
    this._submitButtonElement = this._popupForm.querySelector('.popup__save-button');
  }

  // _getInputValues - приватный метод: собрать данные всех полей формы
  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  // перезаписать родительский метод setEventListeners
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      // вставляем в `value` инпута данные из объекта по атрибуту `name` этого инпута
      input.value = data[input.name];
    });
  }

  //  перезаписать родительский метод close
  close() {
    super.close();
    this._popupForm.reset();
  }


}


