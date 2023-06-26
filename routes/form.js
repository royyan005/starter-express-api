const express = require('express');
const router = express.Router();
const controllers = require('../controllers/index')
const middleware = require('../middleware/verifyToken')

/* GET users listing. */
// router.get('/', controllers.mahasiswa.getAll);
// router.get('/:id', controllers.mahasiswa.getById);
router.post('/:mahasiswa_id', middleware.verifyTokenDosen, controllers.form.postNilai);
router.get('/:mahasiswa_id/view/:user_id', controllers.form.getAllNilaiByMahasiswa);
router.put('/:mahasiswa_id', middleware.verifyTokenDosen, controllers.form.updateNilai);
// router.delete('/:id', controllers.mahasiswa.delete);

module.exports = router;