let express = require('express');
let router = express.Router();
import User from '../../database/User';

/**
 * Маршрут получения профиля пользователя.
 */
router.get('/profile', function(req, res, next) {
  console.log(req);
  User.findById(req.user.id)
    .then(user => {
      res.send({ user: user })
    })
    .catch(err => {
      res.send(err);
    });
});
module.exports = router;