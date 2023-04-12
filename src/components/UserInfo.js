/** Класс UserInfo отвечает за управление отображением информации о пользователе на странице.
 * Этот класс:
 * Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
 * Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
 * Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.
*/

export default class UserInfo {
  constructor({ userName, userJob }) {
    this._name = userName;
    this._job = userJob;
  }

  // getUserInfo - возвращает объект с данными пользователя
  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent
    }
  }

  // setUserInfo - принимает первоначальные данные пользователя, добавляет их на страницу
  setUserInfo(data) {
    this._name.textContent = data.input_name;
    this._job.textContent = data.input_about;
  }
}
