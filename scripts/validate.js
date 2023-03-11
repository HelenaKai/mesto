const object = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitSelector: '.popup__save-button',
  disabledButtonClass: 'popup__save-button_inactive',
  errorClass: 'popup__input-error',
  inputErrorClass: 'popup__input_type_error',
}

//Добавляет обработчики сразу всем полям формы
const setEventListeners = (object, formElement) => {

  const inputList = Array.from(formElement.querySelectorAll(object.inputSelector));
  // Находим в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector(object.submitSelector);

  toggleButtonState(object, inputList, buttonElement);

  inputList.forEach((inputElement) => {

    inputElement.addEventListener('input', () => {

      isValid(object, formElement, inputElement);

      toggleButtonState(object, inputList, buttonElement);
    });
  });
};

// Добавляем класс с ошибкой.
const showInputError = (object, formElement, inputElement, errorMessage) => {

  console.log('object, formElement, inputElement, errorMessage');

  // находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(object.inputErrorClass);

  console.log('errorElement');

  errorElement.textContent = errorMessage; // Показываем сообщение об ошибке
  errorElement.classList.add(object.errorClass); // Замена содержимого span с ошибкой на переданный параметр
};

// Удаляем класс с ошибкой
const hideInputError = (object, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(object.inputErrorClass);
  errorElement.classList.add(object.errorClass);
  errorElement.textContent = '';
};

// Ищем невалидные поля. Функция принимает массив полей формы и вернет true, если хотя бы одно поле не валидно, и false, если все валидны.
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

// Делаем кнопку отправки неактивной
const disabledSubmitBtm = (object, buttonElement) => {
  buttonElement.classList.add(object.disabledButtonClass);
  buttonElement.disabled = true;
};
// Активной
const activeSubmitBtm = (object, buttonElement) => {
  buttonElement.classList.remove(object.disabledButtonClass);
  buttonElement.disabled = false;
};

// Функция, которая проверяет валидность полей и отключает или включает кнопку отправки.
const toggleButtonState = (object, inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {             //если хотя бы один невалидный инпут, кнопка неактивна
    disabledSubmitBtm(object, buttonElement);
  } else {
    activeSubmitBtm(object, buttonElement);
  }
};

// Функция проверяет валидность поля
const isValid = (object, formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку

    console.log('inputElement');

    showInputError(object, formElement, inputElement, inputElement.validationMessage);
  } else {
    // Если проходит, скроем
    hideInputError(object, formElement, inputElement);
  }
};

// Переберем все формы на странице и добавим всем формам обработчик
const enableValidation = (object) => {
  const formList = Array.from(document.querySelectorAll(object.formSelector));

  formList.forEach((formElement) => {
    // Для каждой формы вызываем функцию setEventListeners, передав ей элемент формы
    setEventListeners(object, formElement);
  });
};

enableValidation(object);






