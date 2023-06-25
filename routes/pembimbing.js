const express = require('express');
const router = express.Router();
const controllers = require('../controllers/index')
const middleware = require('../middleware/verifyToken')

/* GET users listing. */
router.get('/', controllers.mahasiswa.getAll);
router.get('/:id', controllers.mahasiswa.getById);
router.post('/', middleware.isLogin, controllers.pembimbing.create);
router.get('/:user_id/view/:mahasiswa_id', controllers.form.getAllNilaiByMahasiswa);
router.delete('/:id', middleware.isLogin, controllers.mahasiswa.delete);

module.exports = router;