/* console.log('hello'); */

import './index.css';

// ----------Импорт
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';

/* import Popup from "../components/Popup.js"; */
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

import { initialCards, object } from '../utils/data.js';


// ---------Попап профиля
const sectionProfile = document.querySelector('.profile');
const editButton = sectionProfile.querySelector('.profile__edit-button');
const profileName = sectionProfile.querySelector('.profile__title');
const profileJob = sectionProfile.querySelector('.profile__subtitle');
// форма в popup_profile
const popupProfile = document.querySelector('.popup_profile');
const nameInput = popupProfile.querySelector('.popup__input_type_name');
const jobInput = popupProfile.querySelector('.popup__input_type_about');

//---------Попап места
const placeAddButton = sectionProfile.querySelector('.profile__add-button');
// форма в popup_place
const popupPlace = document.querySelector('.popup_place');



const userInfo = new UserInfo({
  userName: profileName,
  userJob: profileJob
});


// Создание карточки
function createCard(card) {
  const newCard = new Card(card, '#card-template', handleCardClick);
  return newCard.generateCard();
}

const cards = new Section({
  items: initialCards,
  renderer: (data) => {
    const cardItem = createCard(data);
    cards.addItem(cardItem);
  },
},
  '.cards__list'
);

cards.renderItems(initialCards);



//---------Popup редактирования профиля

const editPopupProfile = new PopupWithForm('.popup_profile', (data) => {
  userInfo.setUserInfo(data);
  editPopupProfile.close();

});


editButton.addEventListener('click', () => {
  editPopupProfile.open();
  validPopupProfileForm.resetValidation();
  const userInfoGet = userInfo.getUserInfo();
  nameInput.value = userInfoGet.name;
  jobInput.value = userInfoGet.job;

});


//---------Popup  добавления карточки (места)

//функция-обработчик
const handleEditCard = new PopupWithForm('.popup_place', (data) => {
  cards.addItem(createCard({ name: data.input_img_title, link: data.input_url }));
  handleEditCard.close();
});


placeAddButton.addEventListener("click", () => {
  handleEditCard.open();
  validPopupPlaceForm.resetValidation();
});


const openPopupZoomImage = new PopupWithImage('.popup_modal');

function handleCardClick(name, link) {
  openPopupZoomImage.open(name, link);
}


openPopupZoomImage.setEventListeners();
editPopupProfile.setEventListeners();
handleEditCard.setEventListeners();

// ---- Валидация

const validPopupProfileForm = new FormValidator(object, popupProfile);
validPopupProfileForm.enableValidation();

const validPopupPlaceForm = new FormValidator(object, popupPlace);
validPopupPlaceForm.enableValidation();





// -----генерация карточек
//const placeElements = document.querySelector('.cards__list');

//------функция для открытия окна c картинкой по клику на картинку
//const imgPopup = document.querySelector('.popup_modal');

