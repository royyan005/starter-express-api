const express = require('express');
const router = express.Router();
const controllers = require('../controllers/index')
const middleware = require('../middleware/verifyToken')

/* GET users listing. */
router.get('/', controllers.nilai_matkul.getAll);
router.get('/:id', controllers.nilai_matkul.getById);
router.delete('/:id', middleware.verifyTokenDosen, controllers.nilai_matkul.delete);

module.exports = router;