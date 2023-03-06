/* console.log('hello'); */

/* Попап профиля */
const popupProfile = document.querySelector('.popup_profile');
const editButton = document.querySelector('.profile__edit-button')

const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");

const nameInput = popupProfile.querySelector(".popup__input_type_name");
const jobInput = popupProfile.querySelector(".popup__input_type_about");
const profileForm = popupProfile.querySelector('.popup__form_profile');
const profileCloseButton = popupProfile.querySelector('.popup__close_profile');


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

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfile);
}

profileCloseButton.addEventListener('click', () => {
  closePopup(popupProfile);
});

editButton.addEventListener('click', editPopupProfile);
profileForm.addEventListener('submit', handleProfileFormSubmit);


/* Попап места*/
const popupPlace = document.querySelector('.popup_place');
const placeAddButton = document.querySelector('.profile__add-button');
const placeCloseButton = popupPlace.querySelector('.popup__close_place');
const placeForm = popupPlace.querySelector('.popup__form_place');

const namePlaceInput = popupPlace.querySelector('#input-img-title');
const urlPlaceInput = popupPlace.querySelector('#input-url');
const newElementTitle = document.querySelector('.card__title');
const newElementImage = document.querySelector('.card__img');

placeAddButton.addEventListener('click', () => {
  openPopup(popupPlace)
});

placeCloseButton.addEventListener('click', () => {
  closePopup(popupPlace)
});


const handlePlaceFormSubmit = (evt) => {
  evt.preventDefault();
  const card = {
    name: namePlaceInput.value,
    link: urlPlaceInput.value
  };
  renderCard(cardsList, card);
  evt.target.reset();
  closePopup(popupPlace);
}

placeForm.addEventListener('submit', handlePlaceFormSubmit);


/* Карточки «из коробки» */

const cardsList = document.querySelector('.cards__list');
const cardTemplate = document.getElementById('card-template');

const imgPopup = document.querySelector('.popup_modal');
const imgPopupImage = imgPopup.querySelector('.popup__img');
const imgPopupTitle = imgPopup.querySelector('.popup__title-img');


const getElement = (item) => {
  const newElement = cardTemplate.content.cloneNode(true);

  const newElementTitle = newElement.querySelector('.card__title');
  const newElementImage = newElement.querySelector('.card__img');
  newElementTitle.textContent = item.name;
  newElementImage.src = item.link;
  newElementImage.alt = item.name;

  const likeButton = newElement.querySelector('.card__like');
  const deleteButton = newElement.querySelector('.card__delete');

  deleteButton.addEventListener('click', deleteCard);
  likeButton.addEventListener('click', toggleLike);
  newElementImage.addEventListener('click', () => openPopupZoomImage(item));

  return newElement;
};


const renderCard = (wrap, item) => {
  const cardElement = getElement(item);
  wrap.prepend(cardElement);
};


const toggleLike = (evt) => {
  evt.target.classList.toggle('card__like_active');
};

const deleteCard = (evt) => {
  evt.target.closest('.card').remove();
};


const openPopupZoomImage = (item) => {
  imgPopupImage.src  = item.link;
  imgPopupImage.alt = item.name;

  imgPopupTitle.textContent = item.name;
  openPopup(imgPopup);
};



/*   const openImgPopup = (evt) => {
  const card = evt.target.closest('.card');
  imgPopupTitle.textContent = card.querySelector('.card__title').textContent;
  imgPopupImage.src = card.querySelector('.card__img').src;
  imgPopupImage.alt = card.querySelector('.card__title').textContent;

  openPopup(imgPopup);
}; */

imgPopup.querySelector('.popup__close-img').addEventListener('click', () => {
  closePopup(imgPopup);
});

initialCards.forEach((card) => {
  renderCard(cardsList, card);
});


