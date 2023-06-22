const express = require('express');
const router = express.Router();
const controllers = require('../controllers/index')

/* GET users listing. */
// router.get('/', controllers.nilai_matkul.getAll);
// router.get('/:id', controllers.nilai_matkul.getById);
router.post('/:mahasiswa_id', controllers.nilai_matkul.create);
// router.put('/:id', controllers.nilai_matkul.update);
// router.delete('/:id', controllers.nilai_matkul.delete);

module.exports = router;