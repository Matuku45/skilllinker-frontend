var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var multer = require('multer');
const cors = require('cors');

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
  'https://skilllinker-frontend.fly.dev'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin) || origin.includes('.ngrok-free.app')) {
      return callback(null, true);
    }
    return callback(new Error(`CORS policy does not allow origin: ${origin}`), false);
  },
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// View engine setup (optional)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Custom request logger
app.use((req, res, next) => {
  console.log(`➡️ ${req.method} ${req.url} from ${req.ip}`);
  next();
});

// Routes
app.use('/api', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/jobs', jobRouter);
app.use('/api/payments', paymentRouter);
app.use('/api/resumes', resumeRouter);
app.use('/api/applications', applicationRouter);
app.use('/api/messages', messageRouter);

// Root route
app.get('/', (req, res) => {
  console.log('✅ Root route accessed');
  res.status(200).json({ message: 'Backend is running!' });
});

// Catch 404
app.use((req, res, next) => {
  console.warn(`⚠️ 404 Not Found: ${req.method} ${req.url}`);
  next(createError(404, 'Route not found'));
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("💥 ERROR:", err);

  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      message: err.message,
      stack: err.stack
    });
  }

  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    stack: req.app.get('env') === 'development' ? err.stack : undefined
  });
});

module.exports = app;
