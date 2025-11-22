var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var multer = require('multer'); // Make sure multer is required

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

// CORS setup
const allowedOrigins = [
  'http://localhost:5173',                 // local dev
  'https://skilllinker-frontend.fly.dev', // deployed frontend
  'https://866c5e8983e9.ngrok-free.app'   // optional ngrok URL
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps, Postman)
    if (!origin) return callback(null, true);

    // Allow requests if the origin is in the whitelist
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // Block requests from unknown origins
    return callback(new Error(`The CORS policy for this site does not allow access from the specified Origin: ${origin}`), false);
  },
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));


// View engine setup (optional if you only return JSON)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/jobs', jobRouter);
app.use('/api/payments', paymentRouter);
app.use('/api/resumes', resumeRouter);
app.use('/api/applications', applicationRouter);
app.use('/api/messages', messageRouter);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404, 'Route not found'));
});

// Global error handler
app.use((err, req, res, next) => {
  // Log the full error stack in the console
  console.error("💥 ERROR:", err);

  // Handle Multer errors separately
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      message: err.message,
      stack: err.stack
    });
  }

  // Default error response
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    stack: req.app.get('env') === 'development' ? err.stack : undefined
  });
});

module.exports = app;
