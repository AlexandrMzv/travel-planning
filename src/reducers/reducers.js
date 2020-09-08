/**
 * reducer'ы авторизации пользователя.
 */

/**
 * reducer токена пользователя.
 */
export function token(state = '', action) {
  if (action.type === 'SAVE_TOKEN')
    return action.token;
  return state;
}

/**
 * reducer информации о пользователе.
 */
export function userInfo(state = {}, action) {
  if (action.type === 'USER_INFO')
    return action.user;
  return state;
}