const express = require('express');
const router = express.Router();
const controllers = require('../controllers/index')
const middleware = require('../middleware/verifyToken')

/* GET users listing. */
// router.get('/', controllers.mahasiswa.getAll);
// router.get('/:id', controllers.mahasiswa.getById);
router.get('/:mahasiswa_id', controllers.total_nilai_matkul.getTotal);
router.get('/', controllers.total_nilai_matkul.getTotalAllMahasiswa);
// router.get('/:user_id/view/:mahasiswa_id', controllers.form.getAllNilaiByMahasiswa);
// router.delete('/:id', controllers.mahasiswa.delete);

module.exports = router;