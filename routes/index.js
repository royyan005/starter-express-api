const express = require('express');
const router = express.Router();
const user = require('./user');
const mahasiswa = require('./mahasiswa');
const form = require('./form');


/* GET home page. */

router.use('/user', user);
router.use('/mahasiswa', mahasiswa);
router.use('/form', form);

module.exports = router;
