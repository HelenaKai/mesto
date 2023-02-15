const aboutButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__close");


const formProfile = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_about");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");

const toggleOpenPopup = () => {
  popup.classList.toggle("popup_opened");
};

const handleAboutButtonClick = () => {
  toggleOpenPopup();
}

const handleCloseButtonClick = () => {
  toggleOpenPopup();
}

const handleOverlyClick = (event) => {
  if (event.target === event.currentTarget) {
    toggleOpenPopup();
  }
}

// Обработчик «отправки» формы
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  /*   console.log('моя кнопка: ', aboutButton); */
  // Получите значение полей jobInput и nameInput из свойства value

  // Выберите элементы, куда должны быть вставлены значения полей

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  toggleOpenPopup();
}



aboutButton.addEventListener("click", handleAboutButtonClick);
closeButton.addEventListener("click", handleCloseButtonClick);

popup.addEventListener("click", handleOverlyClick);


/* // Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка» */

formProfile.addEventListener('submit', handleFormSubmit);

