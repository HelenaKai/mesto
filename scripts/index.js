/* console.log('hello'); */

let editButton = document.querySelector('.profile__edit-button')
let popup = document.querySelector('.popup')
let closeButton = document.querySelector('.popup__close')

let formProfile = document.querySelector(".popup__form");
let nameInput = document.querySelector(".popup__input_type_name");
let jobInput = document.querySelector(".popup__input_type_about");
let profileName = document.querySelector(".profile__title");
let profileJob = document.querySelector(".profile__subtitle");

function openPopup(){
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function closePopup(){
  popup.classList.remove('popup_opened');
}

// Обработчик «отправки» формы
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

   // Получите значение полей jobInput и nameInput из свойства value
  // Выберите элементы, куда должны быть вставлены значения полей

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  openPopup();
}


editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

formProfile.addEventListener('submit', handleFormSubmit); // Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
