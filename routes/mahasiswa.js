const express = require('express');
const router = express.Router();
const controllers = require('../controllers/index')

/* GET users listing. */
router.get('/', controllers.mahasiswa.getAll);
router.get('/:id', controllers.mahasiswa.getById);
router.post('/', controllers.mahasiswa.create);
router.put('/:id', controllers.mahasiswa.update);
router.delete('/:id', controllers.mahasiswa.delete);

module.exports = router;