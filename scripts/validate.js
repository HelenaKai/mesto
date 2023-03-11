const object = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  errorClass: 'popup__input-error',
   inputErrorClass: 'popup__input_type_error',
}

function enableValidation(object) {
  const formList = Array.from(document.querySelectorAll(object.formSelector));

  formList.forEach((formElement) => {
/*     formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
 */
    setEventListeners(formElement, object);
  })
}


//Добавляет обработчики сразу всем полям формы
function setEventListeners(formElement, object) {
  const {inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass} = object;
  const inputList = Array.from(formElement.querySelectorAll(`${inputSelector}`));
  const buttonElement = formElement.querySelector(`${submitButtonSelector}`);

  toggleButtonState(inputList, buttonElement, inactiveButtonClass);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    })
  })
}

// Функция, проверяющая валидность поля
function checkInputValidity(formElement, inputElement, inputErrorClass, errorClass) {
 /*  console.log(formElement, inputElement, inputErrorClass, errorClass); */
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
}

// добавить класс с ошибкой
function showInputError(formElement, inputElement, errorMessage, inputErrorClass, errorClass) {

/*   console.log(formElement, inputElement, errorMessage, inputErrorClass, errorClass); */

  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(`${inputErrorClass}`);
  console.log(errorElement);
  errorElement.textContent = errorMessage;        // Показать сообщение об ошибке
  errorElement.classList.add(`${errorClass}`);    // Заменить содержимое span с ошибкой на переданный параметр

}


// Удалить класс с ошибкой
function hideInputError(formElement, inputElement, inputErrorClass, errorClass) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(`${inputErrorClass}`);
  errorElement.classList.remove(`${errorClass}`);
  errorElement.textContent = '';
}

// Функция проверяет валидность полей и отключает или включает кнопку отправки

function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(`${inactiveButtonClass}`);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(`${inactiveButtonClass}`);
    buttonElement.disabled = false;
  }
}

// искать невалидные поля

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);
}







