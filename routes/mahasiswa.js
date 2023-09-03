const express = require('express');
const router = express.Router();
const controllers = require('../controllers/index')
const middleware = require('../middleware/verifyToken')

/* GET users listing. */
router.get('/', controllers.mahasiswa.getAll);
router.get('/nilai-completed', controllers.mahasiswa.getAllWithFullNilai);
router.get('/detail/:id', controllers.mahasiswa.getById);
router.get('/pembimbing/', middleware.verifyTokenDosen, controllers.mahasiswa.getMahasiswaAndPembimbing);
router.post('/', middleware.verifyTokenAdminOrSuperAdmin, controllers.mahasiswa.create);
router.put('/:id', middleware.verifyTokenAdminOrSuperAdmin, controllers.mahasiswa.update);
router.delete('/:id', middleware.verifyTokenAdminOrSuperAdmin, controllers.mahasiswa.delete);

module.exports = router;