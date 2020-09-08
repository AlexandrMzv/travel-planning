/**
 * reducer'ы страницы списка поездок.
 */

import { combineReducers } from 'redux';

/**
 * reducer состояния загрузки данных.
 */
export function dataIsLoading(state = false, action) {
  if (action.type === 'DATA_IS_LOADING')
    return action.isLoading;
  return state;
}

/**
 * reducer краткой информации о поездке.
 */
export function tripsSummary(state = {}, action) {
  if (action.type === 'GET_TRIPS_SUMMARY')
    return action.trips;
  return state;
}

/**
 * reducer информации о поездке.
 */
export function currentTripData(state = {}, action) {
  if (action.type === 'GET_CURRENT_TRIP')
    return action.trip;
  return state;
}

export default combineReducers({
  dataIsLoading,
  tripsSummary,
  currentTripData,
});