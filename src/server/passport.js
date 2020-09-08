/**
 * Конфигурирование passport.js
 */

const passport    = require('passport');
const passportJWT = require("passport-jwt");
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy   = passportJWT.Strategy;
import User from '../database/User';

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function (email, password, cb) {
    return User.findOne({email, password})
      .then(user => {
        console.log(User.checkPassword(password, user.password));
        if (!user || !User.checkPassword(password, user.password)) {
          return cb(null, false, {message: 'Incorrect email or password.'});
        }
        return cb(null, { id: user.id, user: email, name: user.name }, {
          message: 'Logged In Successfully'
        });
      })
      .catch(err => {
        return cb(err);
      });
  }
));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : 'your_jwt_secret'
  },
  function (jwtPayload, cb) {
    return User.findById(jwtPayload.id)
      .then(user => {
        console.log(jwtPayload);
        return cb(null, user);
      })
      .catch(err => {
        return cb(err);
      });
  }
));