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


const userInfo = new UserInfo({
  userName: profileName,
  userJob: profileJob
});

editButton.addEventListener('click', () => {
  editPopupProfile.open();
  const userInfoGet = userInfo.getUserInfo();
  nameInput.value = userInfoGet.name;
  jobInput.value = userInfoGet.job;
  validPopupPlaceForm.resetValidation();
});

const editPopupProfile = new PopupWithForm(popupProfile, (data) => {
  userInfo.setUserInfo(data);
  editPopupProfile.close();
});
editPopupProfile.setEventListeners();


//---------Попап места

const placeAddButton = sectionProfile.querySelector('.profile__add-button');

// форма в popup_place
const popupPlace = document.querySelector('.popup_place');


function createCard(card) {
  const newCard = new Card(card, '#card-template', handleCardClick);
  return newCard.generateCard();
}


//функция-обработчик
const handleEditCard = new PopupWithForm(popupPlace, (data) => {
  cards.addItem(createCard({ name: data.input_img_title, link: data.input_url }));
  handleEditCard.close();
  validPopupPlaceForm.resetValidation();
});
handleEditCard.setEventListeners();

// слушаем события
placeAddButton.addEventListener("click", () => { handleEditCard.open(); });

// -----генерация карточек

//const placeElements = document.querySelector('.cards__list');

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



//------функция для открытия окна c картинкой по клику на картинку

const imgPopup = document.querySelector('.popup_modal');
const openPopupZoomImage = new PopupWithImage(imgPopup);

function handleCardClick(name, link) {
  openPopupZoomImage.open(name, link);
  /*   console.log(name, link); */
}
openPopupZoomImage.setEventListeners();


// ---- Валидация

const validPopupProfileForm = new FormValidator(object, popupProfile);
validPopupProfileForm.enableValidation();

const validPopupPlaceForm = new FormValidator(object, popupPlace);
validPopupPlaceForm.enableValidation();
