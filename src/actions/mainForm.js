/**
 * action'ы главной страницы приложения.
 */

import axios from "axios/index";
import { currentTripData, tripsSummary, dataIsLoading } from "./tripsForm";

/**
 * actionsCreator id поездки.
 *
 * @param {number} id Id поездки.
 * @return {object} Возввращает объект, содержащий id поездки.
 */
export function tripId(id) {
  return {
    type: 'TRIP_ID',
    id: id,
  };
}

/**
 * actionsCreator дата начала поездки.
 *
 * @param {date} dateFrom Дата начала поездки.
 * @return {object} Возввращает объект, содержащий дату начала поездки.
 */
export function tripDateFrom(dateFrom) {
  return {
    type: 'TRIP_DATE_FROM',
    dateFrom: dateFrom,
  };
}

/**
 * actionsCreator дата завершения поездки.
 *
 * @param {date} dateTo Дата завершения поездки.
 * @return {object} Возввращает объект, содержащий дату завершения поездки.
 */
export function tripDateTo(dateTo) {
  return {
    type: 'TRIP_DATE_TO',
    dateTo: dateTo,
  };
}

/**
 * actionsCreator местаназначение поездки.
 *
 * @param {object} place Местаназначение поездки.
 * @return {object} Возввращает объект, содержащий местаназначение поездки.
 */
export function tripPlace(place) {
  return {
    type: 'TRIP_PLACE',
    place: place,
  };
}

/**
 * actionsCreator цель поездки.
 *
 * @param {object} purpose Цель поездки.
 * @return {object} Возввращает объект, содержащий цель поездки.
 */
export function tripPurpose(purpose) {
  return {
    type: 'TRIP_PURPOSE',
    purpose: purpose,
  };
}

/**
 * actionsCreator сохранения данных в таблицу списка покупок.
 *
 * @param {array} newData добавляемые данные.
 * @return {object} Возввращает объект, содержащий новые данные.
 */
export function addTripShoppingList(newData) {
  return {
    type: 'ADD_SHOPPING_LIST',
    newData: newData,
  };
}

/**
 * actionsCreator изменения данных в таблице списка покупок.
 *
 * @param {array} newData добавляемые данные.
 * @param {array} oldData удаляемые данные.
 * @return {object} Возввращает объект, содержащий данные до и после изменения.
 */
export function updateTripShoppingList(newData, oldData) {
  return {
    type: 'UPDATE_SHOPPING_LIST',
    newData: newData,
    oldData: oldData,
  };
}

/**
 * actionsCreator удаления данных из таблицы списка покупок.
 *
 * @param {array} oldData удаляемые данные.
 * @return {object} Возввращает объект, содержащий удаляемые данные.
 */
export function deleteTripShoppingList(oldData) {
  return {
    type: 'DELETE_SHOPPING_LIST',
    oldData: oldData,
  };
}

/**
 * actionsCreator установки исходных данных в таблицу списка покупок.
 *
 * @param {array} data устанавлимые данные.
 * @return {object} Возввращает объект, содержащий устанавлимые данные.
 */
export function setTripShoppingList(data) {
  return {
    type: 'SET_SHOPPING_LIST',
    data: data,
  };
}

/**
 * actionsCreator установки данных в таблицу списка вещей.
 *
 * @param {array} data устанавлимые данные.
 * @return {object} Возввращает объект, содержащий устанавлимые данные.
 */
export function setTripPackingList(data) {
  return {
    type: 'SET_PACKING_LIST',
    data: data,
  };
}

/**
 * actionsCreator, запрос на изменение данных в базе.
 *
 * @param {object} tripInfo Объект, хранящий информацию о поездке.
 * @return {object} При успешном изменении данных в базе, возвращает объект, уведомляющий об этом.
 */
export const tripDataSend = tripInfo => {
  return () => {
    axios.post("/api/trips/send", tripInfo)
      .then((response) => {
        if (response.status !== 200) {
          throw Error(response.statusText);
        }
      })
      .catch(() => console.log("tripDataSend error"));
  }
};

/**
 * actionsCreator, запрос на получение краткой информации о поездке из БД.
 *
 * @param {object} user Объект, хранящий информацию о пользователе.
 * @return {object} При успешном получении данных в базе, возвращает объект, хранящий даты начала и завершения,
 * местоназначение и цель.
 */
export const tripDataGet = user => {
  return dispatch => {
    axios.get('/api/trips/get_trips_summary', user)
      .then((response) => {
        if (response.status !== 200) {
          throw Error(response.statusText);
        }
        dispatch(tripsSummary(response.data.trips));
      })
      .catch(() => console.log("tripDataGet error"));
  }
};

/**
 * actionsCreator, запрос на получение информации о поездке.
 *
 * @param {number} trip_id ID поездки.
 * @return {object} При успешном получении данных в базе, возвращает объект, хранящий полную информацию о поездке.
 */
export const currentTripDataGet = trip_id => {
  return dispatch => {
    dispatch(dataIsLoading(true));
    axios.get(`/api/trips/get_current_trip?trip_id=${trip_id}`)
      .then((response) => {
        if (response.status !== 200) {
          throw Error(response.statusText);
        }
        if (response.data.trip.o_packing_list) {
          response.data.trip.o_packing_list.forEach((item, index) => {
            item.id = index;
          });
        }
        dispatch(currentTripData(response));
        dispatch(dataIsLoading(false));
      })
      .catch((err) => console.log(err));
  }
};

/**
 * actionsCreator, запрос на удаление поездки.
 *
 * @param {number} trip_id ID поездки.
 * @return {object} При успешном удалении, возвращает объект, уведомляющий об этом.
 */
export const tripDataDelete = trip_id => {
  return () => {
    axios.post(`/api/trips/delete?trip_id=${trip_id}`)
      .then((response) => {
        if (response.status !== 200) {
          throw Error(response.statusText);
        }
      })
      .catch(() => console.log("tripDataDelete error"));
  }
};

/**
 * actionsCreator выход пользователя из аккаунта.
 *
 * @return {object} Возввращает объект, отправляющий сообщение о выходе пользователя из аккаунта.
 */
export const onLogout = () => {
  return dispatch => {
    dispatch({ type: 'USER_LOGGED_OUT' });
  };
};
