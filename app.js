var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs')




var app = express();

//settings
app.set('dbconnection','mongodb://pos:test123@localhost:27017/admin');
app.set('dbname','POS');


//log setup
var accessLogStream = fs.createWriteStream( './access.log', {flags: 'a'})
app.use(logger('common', {stream: accessLogStream}));
app.use(logger('dev'));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


//env
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//auth
var passport = require("passport");
app.use(passport.initialize());
var cors = require('cors');
var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
//route
var index = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
app.use('/', index);
app.use('/users',passport.authenticate('jwt', { session: false}),users );
app.use('/login',cors(corsOptions), login);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




module.exports = app;
