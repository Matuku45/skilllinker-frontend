var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users.routes');
var jobRouter = require('./routes/job.routes');
const paymentRouter = require('./routes/payment.routes');
const resumeRouter = require('./routes/resume.routes');       // resume routes
const applicationRouter = require('./routes/application.routes'); // application routes

var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routers with /api prefix
app.use('/api', indexRouter);              // optional index routes
app.use('/api/users', usersRouter);
app.use('/api/jobs', jobRouter);
app.use('/api/payments', paymentRouter);
app.use('/api/resumes', resumeRouter);         // mount resume router
app.use('/api/applications', applicationRouter); // mount application router

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
