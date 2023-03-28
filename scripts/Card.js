
export default class Card {
  constructor(name, link, templateSelector, handleImageClick) {
    this._templateSelector = templateSelector;
    this._name = name;
    this._link = link;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    const newElement = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
    return newElement;
  }

  generateCard() {

    this._element = this._getTemplate();

    this._newElementImage = this._element.querySelector('.card__img');
    this._newElementImage.src = this._link;
    this._newElementImage.alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {

    this._newElementImage.addEventListener('click', () => this._handleImageClick(this._name, this._link));

    this._element.querySelector('.card__delete').addEventListener('click', () => this._deleteCard());

    this._element.querySelector('.card__like').addEventListener('click', (evt) => this._toggleLike(evt));

  }

  _toggleLike = (evt) => {
    evt.target.classList.toggle('card__like_active')
  }

  _deleteCard() {
    this._element.remove();
  }

  _handleImageClick() {
    this._openPopupZoomImagen(this._name, this._link);

  }

}


