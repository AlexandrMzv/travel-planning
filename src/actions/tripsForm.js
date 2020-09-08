/**
 * action'ы страницы списка поездок.
 */

/**
 * actionsCreator, состояние загрузки данных.
 *
 * @param {boolean} bool Состояние загрузки данных.
 * @return {object} Возввращает объект действия загрузки.
 */
export function dataIsLoading(bool) {
  return {
    type: 'DATA_IS_LOADING',
    isLoading: bool,
  };
}

/**
 * actionsCreator краткая информация о поездках.
 *
 * @param {object} trips Краткая информация о поездках пользователя.
 * @return {object} Возввращает объект, содержащий краткую информацию о поездках.
 */
export function tripsSummary(trips) {
  return {
    type: 'GET_TRIPS_SUMMARY',
    trips: trips,
  };
}

/**
 * actionsCreator информация о поездке.
 *
 * @param {object} trip Информация о выбранной поездке.
 * @return {object} Возввращает объект, содержащий информацию о поездках.
 */
export function currentTripData(trip) {
  return {
    type: 'GET_CURRENT_TRIP',
    trip: trip,
  };
}

