/**
 * Маршруты REST API.
 */

import express from 'express';
import db from '../../database/db';

const router  = express.Router();

/**
 * Маршрут изменения данных о поездке.
 */
router.post('/send', (req, res) => {
  let user_id = req.user.id;
  let trip = req.body;
  let shoppingList = trip.tripShoppingList.map((sl) => {
      return {
        sl_id: 0,
        ...sl
      }
  });
  let packingList = trip.tripPackingList.map((pl) => {
    return {
      pl_id: 0,
      ...pl
    }
  });
  console.log(JSON.stringify(shoppingList).toString());
  console.log(trip);
  db.one('select trips_persistence(${id}, ${user_id}, ${date_from}::date, ${date_to}::date,\n' +
               '${place}, ${purpose}, ${shopping_list}, ${packing_list})',
    {
      id: Number(trip.tripId.id),
      user_id: user_id,
      date_from: trip.tripDates.dateFrom,
      date_to: trip.tripDates.dateTo,
      place: trip.tripPlace.place.label,
      purpose: trip.tripPurpose.purpose.label,
      shopping_list: JSON.stringify(shoppingList).toString(),
      packing_list: JSON.stringify(packingList).toString(),
    }
  )
    .then((operation) => {
      console.log(operation);
      res.json({status: 'done'});
    })
    .catch(error => {
      console.log(error);
      res.json({
        error: {
          msg: 'error'
        }
      });
    });
  console.log('end');
});

/**
 * Маршрут удаления поездки.
 */
router.post('/delete', (req, res) => {
  db.result('select trips_persistence(${id})',
    {
      id: req.query.trip_id,
    }
  )
    .then((result) => {
      console.log(result);
        res.json({status: 'done'});
    })
    .catch(error => {
      console.log(error);
      res.json({
        error: {
          msg: 'error'
        }
      });
    });
});

/**
 * Маршрут получения краткой информации о поездке.
 */
router.get('/get_trips_summary', (req, res) => {
  let user_id = req.user.id;
  db.any('SELECT id, date_from, date_to, get_place_name(place_id) as place,\n' +
               'get_purpose_name(purpose_id) as purpose FROM\n' +
               'trips WHERE user_id = ${user_id} AND parent_id isnull',
    {
      user_id: user_id,
    }
  )
    .then((trips) => {
      res.json({trips});
    })
    .catch(error => {
      console.log(error);
      res.json({
        error: {
          msg: 'error'
        }
      });
    });
});

/**
 * Маршрут получения данных о поездке .
 */
router.get('/get_current_trip', (req, res) => {
    db.one('SELECT * FROM trip_summary_json(${id})',
    {
      id: req.query.trip_id,
    }
  )
    .then((trip) => {
      res.json({trip});
    })
    .catch(error => {
      console.log(error);
      res.json({
        error: {
          msg: 'error'
        }
      });
    });
});

module.exports = router;