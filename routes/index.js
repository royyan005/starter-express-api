const express = require('express');
const router = express.Router();
const user = require('./user');
const mahasiswa = require('./mahasiswa');
const form = require('./form');
const total_nilai_matkul = require('./total_nilai_matkul');
const pembimbing = require('./pembimbing');
const nilai_matkul = require('./nilai_matkul');
const nilai_sub_matkul = require('./nilai_sub_matkul');
const nilai_sub_sub_matkul = require('./nilai_sub_sub_matkul');

router.use('/user', user);
router.use('/mahasiswa', mahasiswa);
router.use('/form', form);
router.use('/total-nilai', total_nilai_matkul);
router.use('/pembimbing', pembimbing);
router.use('/nilai-matkul', nilai_matkul);
router.use('/nilai-sub-matkul', nilai_sub_matkul);
router.use('/nilai-sub-sub-matkul', nilai_sub_sub_matkul);

module.exports = router;
