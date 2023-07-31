require('dotenv').config();
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const router = require('./routes/index');
const cors = require('cors');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', router);

// error handler
app.use((err, res) => {
  console.error(err.stack);
  return res.status(404).json({
      status: false,
      code:res.statusCode,
      message: err.message
  });
});

app.use((err, res) => {
  console.error(err.stack);
  return res.status(500).json({
      status: false,
      code:res.statusCode,
      message: err.message
  });
});

module.exports = app;
