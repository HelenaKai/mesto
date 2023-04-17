/** Создайте класс PopupWithImage, который наследует от Popup.
 * Этот класс должен перезаписывать родительский метод open.
 * В методе open класса PopupWithImage нужно вставлять в попап картинку с src изображения и подписью к картинке.
*/


import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._imgPopupImage = this._popupElement.querySelector('.popup__img');
    this._imgPopupTitle = this._popupElement.querySelector('.popup__title-img');
  }

  open(name, link) {
    this._imgPopupImage.src = link;
    this._imgPopupImage.alt = name;
    this._imgPopupTitle.textContent = name;
    super.open();
  }
}



