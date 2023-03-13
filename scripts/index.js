/* console.log('hello'); */

const popupsAll = document.querySelectorAll('.popup');

// Функция открытия Pupup`s
const openPopup = (popupName) => {
  popupName.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}

// Функция закрытия Pupup`s при клике на "крестик"
const closePopup = (popupName) => {
  popupName.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
}

// Функция закрытия Pupup`s при клике ESC
function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

// Функция закрытия Pupup`s при клике за его пределами (по оверлею)
popupsAll.forEach((overlayPopup) => {
  overlayPopup.addEventListener('mousedown', (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(overlayPopup);
    }
  });
});


/* Попап профиля */
const popupProfile = document.querySelector('.popup_profile');
const editButton = document.querySelector('.profile__edit-button')

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

const nameInput = popupProfile.querySelector('.popup__input_type_name');
const jobInput = popupProfile.querySelector('.popup__input_type_about');
const profileForm = popupProfile.querySelector('.popup__form_profile');
const profileCloseButton = popupProfile.querySelector('.popup__close_profile');


function editPopupProfile() {
  openPopup(popupProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
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

const namePlaceInput = popupPlace.querySelector('.popup__input_img-title');
const urlPlaceInput = popupPlace.querySelector('.popup__input-url');
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
  closePopup(popupPlace);



  // сброс данных формы
  evt.target.reset();
  evt.submitter.classList.add('popup__save-button_inactive');
  evt.submitter.disabled = true;

}

placeForm.addEventListener('submit', handlePlaceFormSubmit);


/* Карточки «из коробки» */

const cardsList = document.querySelector('.cards__list');
const cardTemplate = document.getElementById('card-template');


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

// функция отрисовки карточки методом prepend()
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


const imgPopup = document.querySelector('.popup_modal');
const imgPopupImage = imgPopup.querySelector('.popup__img');
const imgPopupTitle = imgPopup.querySelector('.popup__title-img');


const openPopupZoomImage = (item) => {
  imgPopupImage.src = item.link;
  imgPopupImage.alt = item.name;

  imgPopupTitle.textContent = item.name;
  openPopup(imgPopup);
};


imgPopup.querySelector('.popup__close-img').addEventListener('click', () => {
  closePopup(imgPopup);
});

initialCards.forEach((card) => {
  renderCard(cardsList, card);
});


enableValidation(object);
