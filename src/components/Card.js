export default class Card {
  constructor(data, templateSelector, handleCardClick, handleTrashClick, handleLikeClick, userId) {
    this._data = data;
    this._id = data._id;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._ownerId = data.owner._id;

    this._templateSelector = templateSelector;

    this._handleCardClick = handleCardClick;
    this._handleTrashClick = handleTrashClick;
    this._handleLikeClick = handleLikeClick;

    this._userId = userId;
  }

  _getElement() {
    this._element = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
  }

  updateData(newData) {
    this._likes = newData.likes;
  }

  updateLikesView() {
    this._likesCounter.textContent = this._likes.length;
    if (this.isLiked()) {
      this._like.classList.add('card__like_active');
    } else {
      this._like.classList.remove('card__like_active');
    }
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._image.addEventListener('click', () => this._handleCardClick(this._data));
    this._like.addEventListener('click', () => this._handleLikeClick());
    this._trash.addEventListener('click', () => this._handleTrashClick());
  }

  isLiked() {
    return this._likes.some((item) => item._id === this._userId);
  }

  generate() {
    this._getElement();
    this._element.querySelector('.card__title').textContent = this._name;

    this._image = this._element.querySelector('.card__img');
    this._image.alt = this._name;
    this._image.src = this._link;

    this._trash = this._element.querySelector('.card__delete');

    this._like = this._element.querySelector('.card__like');
    this._likesCounter = this._element.querySelector('.card__like-counter');
    this._likesCounter.textContent = this._likes.length;

    if (this._ownerId !== this._userId) {
      this._trash.classList.add('card__delete_hidden');
    }

    if(this.isLiked()) {
      this._like.classList.add('card__like_active');
    }

    this._setEventListeners();

    return this._element;
  }
}
