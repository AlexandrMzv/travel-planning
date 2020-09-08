/**
 * Маршруты авторизации пользователя.
 */

import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import passport from 'passport';
import User from '../../database/User';
import db from '../../database/db';

import express from 'express';
const router  = express.Router();

/**
 * Маршрут входа пользователя.
 */
router.post('/', function (req, res, next) {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: info ? info.message : 'Login failed',
        user   : user
      });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }
      const token = jwt.sign(user, 'your_jwt_secret');
      return res.json({user, token});
    });
  })
  (req, res);
});

/**
 * Маршрут регистрации пользователя.
 */
router.post('/register', (req, res) => {
  let { user } = req.body;
  let passwordBcrypt = bcrypt.hashSync(user.password, User.salt);
  db.one('INSERT INTO users(name, last_name, password, email) VALUES(${name}, ${last_name}, ${password}, ${email}) RETURNING id',
      {
        name: user.firstName,
        last_name: user.lastName,
        password: passwordBcrypt,
        email: user.email
      }
  )
    .then((newUser) => {
      let userForToken = { id: newUser.id, user: user.email, name: user.firstName };
      const token = jwt.sign(userForToken, 'your_jwt_secret');
      res.json({ userForToken, token });
    })
    .catch(error => {
      res.json({
        error: {
          msg: error
        }
      });
    })
});

module.exports = router;