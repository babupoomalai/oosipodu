var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var couponRouter = require('./routes/coupon');


var app = express();

// view engine setup
app.use(express.static('web/dist')); // serve static files (css & js) from the 'public' directory
// app.use(express.static(path.join(__dirname, 'web/dist')));
// app.set('views', path.join(__dirname, 'web/dist'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


let serverBaseUrl = '/api/';
app.use(serverBaseUrl, indexRouter);
app.use(`${serverBaseUrl}users`, usersRouter);
app.use(`${serverBaseUrl}coupons`, couponRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
