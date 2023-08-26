const express = require('express');
const router = express.Router();
const controllers = require('../controllers/index')
const middleware = require('../middleware/verifyToken')

/* GET users listing. */
router.get('/', controllers.matkul.getAll);
router.get('/all', controllers.matkul.getAllWoPagination);
router.get('/:id', controllers.matkul.getById);
router.post('/', middleware.verifyTokenAdmin, controllers.matkul.create);
router.put('/:id', middleware.verifyTokenAdmin, controllers.matkul.update);
router.delete('/:id', middleware.verifyTokenAdmin, controllers.matkul.delete);

module.exports = router;