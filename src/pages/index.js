/* console.log('hello'); */

import './index.css';

// ----------Импорт
import Api from "../components/Api.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import Card from '../components/Card.js';
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from '../components/PopupWithConfirmation.js'
import FormValidator from '../components/FormValidator.js';

import {
  profileNameSelector,
  profilePositionSelector,
  profileAvatarSelector,
  object
} from '../utils/data.js';


const sectionProfile = document.querySelector('.profile');
const editButton = sectionProfile.querySelector('.profile__edit-button');    // кнопка реактирования Профайла - карандашик
const placeAddButton = sectionProfile.querySelector('.profile__add-button');    // кнопка добавления карточки, +
const avatarEditButton = sectionProfile.querySelector('.profile__avatar');

const popupProfile = document.querySelector('.popup_profile');
const popupPlace = document.querySelector('.popup_place');
const popupAvatar = document.querySelector('.popup_avatar');




//----------Подключить API
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
  headers: {
    authorization: "75002ca2-dbbe-408c-9329-d30070b2e425",
    'Content-Type': "application/json"
  }
});

//----------Получить данные c сервера или вывести сообщение об ошибке
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([me, cards]) => {
    userId = me._id;
    userInfo.setUserInfo(me);
    cardsList.renderItems(cards);
  })
  .catch((err) => console.log(err))
  .finally(() => { })


let userId;

// ---------------------Profile
const userInfo = new UserInfo(
  profileNameSelector,
  profilePositionSelector,
  profileAvatarSelector
);


//--------------------- popupAvatar
const popupUpdateAvatar = new PopupWithForm('.popup_avatar', (formData) => {
  return  api.changeUserAvatar(formData)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupUpdateAvatar.close();
    })
    .catch((err) => console.log(err))
    .finally(() => popupUpdateAvatar.close());
});

popupUpdateAvatar.setEventListeners();

avatarEditButton.addEventListener('click', () => {
 validPopupAvatarForm.resetValidation();
  popupUpdateAvatar.open();
})


//---------Popup редактирования профиля

const popupEditProfile = new PopupWithForm('.popup_profile', (formData) => {
  return api.changeUserInfo(formData)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupEditProfile.close();
    })
    .catch((err) => console.log(err))
    .finally(() => popupEditProfile.close());
});

popupEditProfile.setEventListeners();

editButton.addEventListener('click', () => {
  validPopupProfileForm.resetValidation();
  popupEditProfile.setInputValues(userInfo.getUserInfo());
  popupEditProfile.open();
});


//---------Popup добавления карточки (места)

const handleEditCard = new PopupWithForm('.popup_place', (formData) => {
  return api.addCard(formData)
    .then((data) => {
      cardsList.addItem(data);
      handleEditCard.close();
    })
    .catch((err) => console.log(err))
    .finally(() => handleEditCard.close());
});

handleEditCard.setEventListeners();

placeAddButton.addEventListener('click', () => {
  handleEditCard.open();
  validPopupPlaceForm.resetValidation();

});


//---------Popup просмотра картинки в попапе - openPopupZoomImage
const openPopupZoomImage = new PopupWithImage('.popup_modal');
openPopupZoomImage.setEventListeners();


//--------- Popup подтвердить удаление карточки - popupWithConfirmation
const popupConfirmation = new PopupWithConfirmation('.popup_confirmation');
popupConfirmation.setEventListeners();



// рендер карточек
const createCard = (data) => {
  const card = new Card(
    data,
    '#card-template',
    () => openPopupZoomImage.open(data),
    () => {
      popupConfirmation.setConfirm(() => {
        popupConfirmation.renderLoading(true);
        api
          .deleteCard(data._id)
          .then(() => {
            card.deleteCard();
            popupConfirmation.close();
          })
          .catch((err) => console.log(err))
          .finally(() => popupConfirmation.renderLoading(false))
      })
      popupConfirmation.open()
    },
    () => {
      if (!card.isLiked()) {
        api
          .addLike(data._id)
          .then((data) => {
            card.updateData(data);
            card.updateLikesView();
          })
          .catch((err) => {
            console.log(err);
          })
      } else {
        api
          .deleteLike(data._id)
          .then((data) => {
            card.updateData(data);
            card.updateLikesView();
          })
          .catch((err) => {
            console.log(err);
          })
      }
    },
    userId,
  )
  return card.generate();
}
const cardsList = new Section((cardItem) => createCard(cardItem), '.cards__list');



// ---- Валидация

const validPopupProfileForm = new FormValidator(object, popupProfile);
const validPopupPlaceForm = new FormValidator(object, popupPlace);
const validPopupAvatarForm = new FormValidator(object, popupAvatar);

validPopupProfileForm.enableValidation();
validPopupPlaceForm.enableValidation();
validPopupAvatarForm.enableValidation();

