// Global Variables
var http = require('http');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var io = require('socket.io');
var five = require("johnny-five");
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');

var index = require('./routes/index');
var login = require('./routes/login');
var profile = require('./routes/profile');
var register = require('./routes/register');
var auto = require('./routes/auto');

var Temp = require('./models/temperature');

// Create board instance
var board = new five.Board();

// Create app instance
var app = express();

// Set the port number
let port = 8000;

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
mongoose.connect('mongodb://localhost:27017/homedb');
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

// board.on
board.on("ready", function() {
  // Connection message in the console
  console.log('ARDUINO BOARD READY STATE: TRUE');

  // The DS18b20 requires OneWire support using the ConfigurableFirmata
  // Create a thermometer instance
  let thermometer = new five.Thermometer({
    controller: "DS18B20",
    pin: 2,
    freq: 1000
  });

  // On.change
  thermometer.on("data", function() {
    //Prints data to 'server' console
    console.log(this.celsius + "°C");
    lcd.clear().cursor(0, 0).print(this.celsius + " C");

    // create temp object
    let tempData = new Temp({
      temp: this.celsius,
      date: Date.now()
    });

    // save data to mongoDB
    tempData.save(function(error){
      console.log('Data saved!');
      console.log(tempData.date);
      if(error){
        console.log(error);
      }
    });

  // Send data via sockets.io
  io.emit('data', this.celsius);
  }); // End of thermometer

  // Create a LCD instance
  let lcd = new five.LCD({
    // LCD pin name         RS  EN  DB4 DB5 DB6 DB7
    // Arduino pin numbers  7   8   9   10  11  12
    pins: [7, 8, 9, 10, 11, 12],
    backlight: 6,
    rows: 2,
    cols: 20
  });

  lcd.clear().cursor(0, 0).print("PREPARING SENSOR");

  this.repl.inject({
    lcd: lcd
  });
});

// Begin 'listening' on the pre defined port number (3000)
const server = http.createServer(app).listen(port, function(req, res){
  console.log('LISTENING ON PORT ' + port);
});

// Set up socket.io to 'listen'
io = io.listen(server);

// Display a conection message
io.on('connection', function(socket){
  console.log('SOCKET.IO CONNECTED');

  // Display a disconnection message
  socket.on('disconnect', function(){
    console.log('SOCKET.IO DISCONNECTED');
  })
});

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