/* console.log('hello'); */

/* Попап профиля */
const popupProfile = document.querySelector('.popup_profile');
const editButton = document.querySelector('.profile__edit-button')

const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");

const nameInput = popupProfile.querySelector(".popup__input_type_name");
const jobInput = popupProfile.querySelector(".popup__input_type_about");
const formProfile = popupProfile.querySelector('.popup__form_profile');
const closeButton = popupProfile.querySelector('.popup__close_profile');


function editPopupProfile() {
  openPopup(popupProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function openPopup(popup) {
  popup.classList.add('popup_opened');

}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfile);
}

closeButton.addEventListener('click', () => {
  closePopup(popupProfile);
});

editButton.addEventListener('click', editPopupProfile);
formProfile.addEventListener('submit', handleFormSubmit);



/* Попап места*/
const popupPlace = document.querySelector('.popup_place');
const addButton = document.querySelector('.profile__add-button');
const closeButtonPlace = popupPlace.querySelector('.popup__close_place');
const formPlace = popupPlace.querySelector('.popup__form_place');

const placeNameInput = popupPlace.querySelector('#input-img-title');
const placeImageInput = popupPlace.querySelector('#input-url');
const newElementTitle = document.querySelector('.card__title');
const newElementImage = document.querySelector('.card__img');

addButton.addEventListener('click', () => {
  openPopup(popupPlace)
});

closeButtonPlace.addEventListener('click', () => {
  closePopup(popupPlace)
});


const handlePlaceFormSubmit = (evt) => {
  evt.preventDefault();
  const fieldForm = {
    name: placeNameInput.value,
    link: placeImageInput.value
  };
  renderCard(cardsList, fieldForm);
  placeNameInput.value = '';
  placeImageInput.value = '';
  closePopup(popupPlace);
}

formPlace.addEventListener('submit', handlePlaceFormSubmit);


/* Карточки «из коробки» */

const cardsList = document.querySelector('.cards__list');
const cardForm = document.querySelector('.popup__form_place');
const cardTemplate = document.getElementById('card-template');

const popupContainerImg = document.querySelector('.popup_container-img');
const popupImage = popupContainerImg.querySelector('.popup__img');
const popupTitleImg = popupContainerImg.querySelector('.popup__title-img');

const getElement = (fieldForm) => {
  const newElement = cardTemplate.content.cloneNode(true);

  const newElementTitle = newElement.querySelector('.card__title');
  const newElementImage = newElement.querySelector('.card__img');
  newElementTitle.textContent = fieldForm.name;
  newElementImage.src = fieldForm.link;
  newElementImage.alt = fieldForm.name;

  const likeButton = newElement.querySelector('.card__like');
  const deleteButton = newElement.querySelector('.card__delete');
  const openContainerImgButton = newElement.querySelector('.card__img');

  deleteButton.addEventListener('click', cardDelete);
  likeButton.addEventListener('click', likeToggle);
  openContainerImgButton.addEventListener('click', openContainerImg);

  return newElement;
};

const renderCard = (wrap, fieldForm) => {
  const cardElement = getElement(fieldForm);
  wrap.prepend(cardElement);
};


const likeToggle = (evt) => {
  evt.target.classList.toggle('card__like_active');
};

const cardDelete = (evt) => {
  evt.target.closest('.card').remove();
};


const openContainerImg = (evt) => {
  const Card = evt.target.closest('.card');
  popupTitleImg.textContent = Card.querySelector('.card__title').textContent;
  popupImage.src = Card.querySelector('.card__img').src;
  popupImage.alt = Card.querySelector('.card__title').textContent;

  openPopup(popupContainerImg);
};

popupContainerImg.querySelector('.popup__close-img').addEventListener('click', () => {
  closePopup(popupContainerImg)
});

initialCards.forEach((card) => {
  renderCard(cardsList, card);
});


