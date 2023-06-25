const express = require('express');
const router = express.Router();
const controllers = require('../controllers/index')
const middleware = require('../middleware/verifyToken')

/* GET users listing. */
router.get('/', controllers.nilai_matkul.getAll);
router.get('/:id', controllers.nilai_matkul.getById);
router.post('/:mahasiswa_id', middleware.verifyTokenDosen, controllers.nilai_sub_sub_matkul.create);
router.put('/:id', middleware.verifyTokenDosen, controllers.nilai_sub_sub_matkul.update);
router.delete('/:id', middleware.verifyTokenDosen, controllers.nilai_matkul.delete);

module.exports = router;