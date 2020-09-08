/**
 * action'ы авторизации пользователя.
 */

import axios from 'axios';

/**
 * actionsCreator токен пользователя.
 *
 * @param {boolean} token Токен пользователя.
 * @return {object} Возввращает объект, содержащий token пользователя.
 */
export function token(token) {
  return {
    type: 'SAVE_TOKEN',
    token: token,
  };
}

/**
 * actionsCreator информация о пользователе.
 *
 * @param {object} user Объект, хранящий информацию пользователя.
 * @return {object} Возввращает объект, содержащий информацию пользователя.
 */
export function userInfo(user) {
  return {
    type: 'USER_INFO',
    user: user,
  };
}

/**
 * actionsCreator, запрос на регистрацию пользователя.
 *
 * @param {object} user Объект, хранящий информацию пользователя.
 * @return {object} При успешной регистрации, возвращает токен и объект, хранящий id, email, имя пользователя.
 */
export function actions(user) {
  return dispatch => {
    axios.post("/api/auth/register", {user})
      .then((response) => {
        if (response.status !== 200) {
          throw Error(response.statusText);
        }
        dispatch(token(response.data.token));
      })
      .catch(() => console.log("registration error"));
  };
}

/**
 * actionsCreator, запрос на вход пользователя.
 *
 * @param {object} user Объект, хранящий информацию пользователя.
 * @return {object} При успешной авторизации, возвращает токен и информацию пользователя.
 */
export const userLoginFetch = user => {
  return dispatch => {
    axios.post("/api/auth/", { email: user.email, password: user.password })
      .then((response) => {
        if (response.status !== 200) {
          throw Error(response.statusText);
        }
        dispatch(token(response.data.token));
      })
      .catch(() => console.log("loginFetch error"));
  }
};