require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const router = require('./routes/index');
const cors = require('cors');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', router);

// error handler
app.use((err, res) => {
  console.error(err.stack);
  return res.status(404).json({
      status: false,
      message: err.message,
      data: null
  });
});

app.use((err, res) => {
  console.error(err.stack);
  return res.status(500).json({
      status: false,
      message: err.message,
      data: null
  });
});

module.exports = app;
