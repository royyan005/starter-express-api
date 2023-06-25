const express = require('express');
const router = express.Router();
const controllers = require('../controllers/index')
const middleware = require('../middleware/verifyToken')

/* GET users listing. */
router.get('/', controllers.mahasiswa.getAll);
router.get('/:id', controllers.mahasiswa.getById);
router.post('/', middleware.verifyTokenAdmin, controllers.mahasiswa.create);
router.put('/:id', middleware.verifyTokenAdmin, controllers.mahasiswa.update);
router.delete('/:id', middleware.verifyTokenAdmin, controllers.mahasiswa.delete);

module.exports = router;