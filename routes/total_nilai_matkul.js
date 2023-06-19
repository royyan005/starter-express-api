const express = require('express');
const router = express.Router();
const controllers = require('../controllers/index')

/* GET users listing. */
// router.get('/', controllers.mahasiswa.getAll);
// router.get('/:id', controllers.mahasiswa.getById);
router.post('/:mahasiswa_id', controllers.total_nilai_matkul.autoCreate);
// router.get('/:user_id/view/:mahasiswa_id', controllers.form.getAllNilaiByMahasiswa);
// router.delete('/:id', controllers.mahasiswa.delete);

module.exports = router;