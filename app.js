const mongoose = require('mongoose');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require("express-session")
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const passport = require("passport")
var app = express();
const flash = require("connect-flash")
// view engine setup
require('dotenv').config()
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(flash())
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: "i am secret"
}))
app.use(passport.initialize())
app.use(passport.session())
passport.serializeUser(usersRouter.serializeUser())
passport.deserializeUser(usersRouter.deserializeUser())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

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
mongoose.connect(process.env.DATABASE_URL, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.log(err));

module.exports = app;
