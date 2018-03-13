var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');

var index = require('./routes/index');
var login = require('./routes/login');
var profile = require('./routes/profile');
var register = require('./routes/register');
var auto = require('./routes/auto');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// use sessions for tracking login
app.use(session({
  secret: 'rick brown loves you',
  resave: true,
  saveUninitialized: false
}));

// mongoDB connection
mongoose.connect('mongodb://localhost:27017/homedb')
var db = mongoose.connection;
// mongo error
db.on('error', console.error.bind(console, 'DATABASE CONNECTION ERROR: '));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/login', login);
app.use('/profile', profile);
app.use('/register', register);
app.use('/auto', auto);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('404 : Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;