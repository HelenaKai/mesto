/* console.log('hello'); */

// ----------Импорт
import Card from './Card.js';
import FormValidator from './FormValidator.js';


// ---------
// находим все "крестики" по универсальному селектору
const closeButtons = document.querySelectorAll('.popup__close');

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


// ---------Попап профиля

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

//Обработчик «отправки» формы
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfile);
}

profileCloseButton.addEventListener('click', () => { closePopup(popupProfile) });

profileForm.addEventListener('submit', handleProfileFormSubmit);

editButton.addEventListener('click', editPopupProfile);

// обработчики крестиков
closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});


//---------Попап места

const popupPlace = document.querySelector('.popup_place');
const placeAddButton = document.querySelector('.profile__add-button');
const placeCloseButton = popupPlace.querySelector('.popup__close_place');
const placeForm = popupPlace.querySelector('.popup__form_place');

const namePlaceInput = popupPlace.querySelector('.popup__input_img-title');
const urlPlaceInput = popupPlace.querySelector('.popup__input-url');


function handlePlaceFormSubmit(evt) {
  evt.preventDefault();  // сбрасываем стандартное поведение формы
  const card = createCard({ name: namePlaceInput.value, link: urlPlaceInput.value })

  // Добавляем в DOM
  renderCard(card);
  closePopup(popupPlace);

  // сброс данных формы
  evt.target.reset();
  validPopupCardForm.resetValidation();

}

// слушаем события
placeForm.addEventListener('submit', handlePlaceFormSubmit);
placeAddButton.addEventListener('click', () => { openPopup(popupPlace) });
placeCloseButton.addEventListener('click', () => { closePopup(popupPlace) });


// -----генерация карточек

function showInitialCards() {
  // Перебор массива с данными
  initialCards.forEach((dataCard) => {
    const cardElement = createCard(dataCard);
    // Добавляем в DOM
    renderCard(cardElement)
  });
}
showInitialCards();

function createCard(data) {
  const cards = new Card(data.name, data.link, '#card-template', openPopupZoomImage);
  // Создаём карточку и возвращаем
  return cards.generateCard();
}

// функция отрисовки карточки методом prepend()
function renderCard(node) {
  const cardList = document.querySelector(".cards__list");
  cardList.prepend(node);
}

//------функция для открытия окна c картинкой по клику на картинку

const imgPopup = document.querySelector('.popup_modal');

const imgPopupImage = imgPopup.querySelector('.popup__img');
const imgPopupTitle = imgPopup.querySelector('.popup__title-img');

imgPopup.querySelector('.popup__close').addEventListener('click', () => { closePopup(imgPopup) });

//popup открытия изображения
function openPopupZoomImage(name, link) {
  openPopup(imgPopup);
  imgPopupImage.src = link;
  imgPopupImage.alt = name;
  imgPopupTitle.textContent = name;
}

// ---- Валидация

const object = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitSelector: '.popup__save-button',
  disabledButtonClass: 'popup__save-button_inactive',
  errorClass: 'popup__input-error',
  inputErrorClass: 'popup__input_type_error',
};

const validPopupProfileForm = new FormValidator(object, popupProfile);
validPopupProfileForm.enableValidation();
validPopupProfileForm.submitFalse();


const validPopupPlaceForm = new FormValidator(object, popupPlace);
validPopupPlaceForm.enableValidation();
