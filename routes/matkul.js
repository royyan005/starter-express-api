const express = require('express');
const router = express.Router();
const controllers = require('../controllers/index')
const middleware = require('../middleware/verifyToken')

/* GET users listing. */
router.get('/', controllers.matkul.getAll);
router.get('/wopagination', controllers.matkul.getAllWoPagination);
router.get('/all-things', controllers.matkul.getWholeThings);
router.get('/:id', controllers.matkul.getById);
router.post('/', middleware.verifyTokenAdminOrSuperAdmin, controllers.matkul.create);
router.put('/:id', middleware.verifyTokenAdminOrSuperAdmin, controllers.matkul.update);
router.delete('/:id', middleware.verifyTokenAdminOrSuperAdmin, controllers.matkul.delete);

module.exports = router;