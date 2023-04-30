
import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector('.popup__form');
    this._inputList = this._popupForm.querySelectorAll('.popup__input');
    this._submitButton = this._popupForm.querySelector('.popup__save-button');
    this._submitButtonText = this._submitButton.textContent;
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      if (data[input.name]) {
        input.value = data[input.name];
      }
    });
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      // перед запросом сохраняем изначальный текст кнопки
      const initialText = this._submitButton.textContent;
      // меняем его, чтобы показать пользователю ожидание
      this._submitButton.textContent = 'Сохранение...';
      this._handleFormSubmit(this._getInputValues())
        .then(() => this.close()) // закрывается попап в `then`
        .finally(() => {
          this._submitButton.textContent = initialText;
        }) // в любом случае меняется текст кнопки обратно на начальный в `finally`
    });
  }

}





/*   renderLoading(isLoading) {
    if(isLoading) {
      this._submitButton.textContent = 'Сохранение...';
    } else {
      this._submitButton.textContent =  this._submitButtonText;
    }
  } */

/*
setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      //  this.close();
    })
  }
*/
