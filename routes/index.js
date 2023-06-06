const express = require('express');
const router = express.Router();
const user = require('./user');
const mahasiswa = require('./mahasiswa');


/* GET home page. */

router.use('/user', user);
router.use('/mahasiswa', mahasiswa);

module.exports = router;
