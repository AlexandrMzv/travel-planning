/**
 * reducer'ы главной страницы приложения.
 */

import { combineReducers } from 'redux';
import * as _ from 'lodash';

let initialState = {
  dateFrom: new Date(),
  dateTo: new Date(),
};

/**
 * reducer id поездки.
 */
export function tripId(state = 0 , action) {
  if (action.type === 'TRIP_ID')
    return { ...state, id: action.id };
  return state;
}

/**
 * reducer дат начала и конца поездки.
 */
function tripDates(state = initialState, action) {
  switch(action.type) {
    case 'TRIP_DATE_FROM':
      return { ...state, dateFrom: action.dateFrom };
    case 'TRIP_DATE_TO':
      return { ...state, dateTo: action.dateTo };
    default:
      return state;
  }
}

/**
 * reducer местаназначения поездки.
 */
export function tripPlace(state = { place: { label: '' } }, action) {
  if (action.type === 'TRIP_PLACE')
    return { ...state, place: action.place };
  return state;
}

/**
 * reducer цели поездки.
 */
export function tripPurpose(state = { purpose: { label: '' } }, action) {
  if (action.type === 'TRIP_PURPOSE')
    return { ...state, purpose: action.purpose };
  return state;
}

/**
 * reducer таблицы списка покупок.
 */
function tripShoppingList(state = [], action) {
  switch(action.type) {
    case 'ADD_SHOPPING_LIST':
      return _.concat(state, action.newData);
    case 'UPDATE_SHOPPING_LIST':
      let index = state.indexOf(action.oldData);
      return _.fill(_.slice(state), action.newData, index, index + 1);
    case 'DELETE_SHOPPING_LIST':
      return _.difference(state, [action.oldData]);
    case 'SET_SHOPPING_LIST':
      return action.data.map((item) => {
        return {...item};
      });
    default:
      return state;
  }
}

/**
 * reducer таблицы списка вещей.
 */
function tripPackingList(state = [], action) {
  switch(action.type) {
    case 'SET_PACKING_LIST':
      return action.data.map((item) => {
        return {...item};
      });
    default:
      return state;
  }
}

export default combineReducers({
  tripId,
  tripDates,
  tripPlace,
  tripPurpose,
  tripShoppingList,
  tripPackingList,
});