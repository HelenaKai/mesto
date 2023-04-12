export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._templateSelector = templateSelector;
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    return document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._newElementImage = this._element.querySelector('.card__img');
    this._newElementImage.src = this._link;
    this._newElementImage.alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;
    this._setEventListeners();
    return this._element;       // Вернём элемент наружу
  }

  _setEventListeners() {

    this._newElementImage.addEventListener('click', () => { this._handleCardClick(this._name, this._link) });

    this._element.querySelector('.card__delete').addEventListener('click', () => this._deleteCard());

    this._element.querySelector('.card__like').addEventListener('click', (evt) => this._toggleLike(evt));

  }

  _toggleLike = (evt) => {
    evt.target.classList.toggle('card__like_active');
  }

  _deleteCard() {
    this._element.remove();
  }
}


