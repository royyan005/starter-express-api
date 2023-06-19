const express = require('express');
const router = express.Router();
const user = require('./user');
const mahasiswa = require('./mahasiswa');
const form = require('./form');
const total_nilai_matkul = require('./total_nilai_matkul');
const pembimbing = require('./pembimbing');


/* GET home page. */

router.use('/user', user);
router.use('/mahasiswa', mahasiswa);
router.use('/form', form);
router.use('/total-nilai', total_nilai_matkul);
router.use('/pembimbing', pembimbing);

module.exports = router;
