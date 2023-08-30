const express = require('express');
const router = express.Router();
const controllers = require('../controllers/index')
const middleware = require('../middleware/verifyToken')


router.get('/:mahasiswa_id', controllers.berita_acara.getBeritaAcara);

module.exports = router;