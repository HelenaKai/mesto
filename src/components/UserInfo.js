/** Класс UserInfo отвечает за управление отображением информации о пользователе на странице.
 * Этот класс:
 * Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
 * Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
 * Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.
*/

export default class UserInfo {
  constructor(nameSelector, jobSelector, avatarSelector) {
    this._userName = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      job: this._job.textContent,
    };
  }

  setUserInfo({ name, about, avatar }) {
    this._userName.textContent = name;
    this._job.textContent = about;
    this._avatar.style.backgroundImage = `url(${avatar})`;
   // this._avatar.src = avatar;
  }

}



