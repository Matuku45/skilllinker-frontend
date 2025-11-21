var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const cors = require('cors');

// Routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users.routes');
var jobRouter = require('./routes/job.routes');
var paymentRouter = require('./routes/payment.routes');
var resumeRouter = require('./routes/resume.routes');
var applicationRouter = require('./routes/application.routes');
var messageRouter = require('./routes/message.routes');

var app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://866c5e8983e9.ngrok-free.app'
];


app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes with /api prefix
app.use('/api', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/jobs', jobRouter);
app.use('/api/payments', paymentRouter);
app.use('/api/resumes', resumeRouter);
app.use('/api/applications', applicationRouter);
app.use('/api/messages', messageRouter);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
