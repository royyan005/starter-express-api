const express = require('express');
const router = express.Router();
const controllers = require('../controllers/index')
const middleware = require('../middleware/verifyToken')

/* GET users listing. */
// router.get('/', controllers.mahasiswa.getAll);
// router.get('/:id', controllers.mahasiswa.getById);
router.post('/', middleware.verifyTokenDosen, controllers.form.postNilai);
router.get('/:user_id/view/:mahasiswa_id', controllers.form.getAllNilaiByMahasiswa);
router.put('/:mahasiswa_id', middleware.verifyTokenDosen, controllers.form.updateNilai);
// router.delete('/:id', controllers.mahasiswa.delete);

module.exports = router;