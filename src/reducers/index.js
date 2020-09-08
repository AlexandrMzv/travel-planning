/**
 * Составной reducer приложения.
 */

import { combineReducers } from 'redux';
import { token, userInfo, } from './reducers';
import mainForm from './mainForm';
import tripsForm from './tripsForm';

const appReducer = combineReducers({
  token,
  userInfo,
  mainForm,
  tripsForm,
});

/**
 * Корневой reducer.
 * при выходе из системы сбрасывается состояние хранилища redux
 */
const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGGED_OUT') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;