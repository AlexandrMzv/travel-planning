/**
 * Запуск серверной части придожения.
 */

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const passport = require('passport');
require('./passport');

var user = require('./routes/user');
var auth = require('./routes/auth');
var form = require('./routes/form');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('build'));

/**
 * Маршруты авторизованного пользователя.
 */
app.use('/api/user', passport.authenticate('jwt', {session: false}), user);
app.use('/api/auth', auth);

/**
 * Маршруты неавторизованного пользователя.
 */
app.use('/api/trips', passport.authenticate('jwt', {session: false}), form);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
});

module.exports = app;

app.listen(8080, () => console.log('Running on localhost:8080'));