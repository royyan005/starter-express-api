const express = require('express');
const router = express.Router();
const controllers = require('../controllers/index')
const middleware = require('../middleware/verifyToken')

/* GET users listing. */
router.get('/', controllers.sub_sub_matkul.getAll);
router.get('/:id', controllers.sub_sub_matkul.getById);
router.post('/', middleware.verifyTokenAdminOrSuperAdmin, controllers.sub_sub_matkul.create);
router.put('/:id', middleware.verifyTokenAdminOrSuperAdmin, controllers.sub_sub_matkul.update);
router.delete('/:id', middleware.verifyTokenAdminOrSuperAdmin, controllers.sub_sub_matkul.delete);

module.exports = router;