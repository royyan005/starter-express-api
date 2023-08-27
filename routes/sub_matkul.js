const express = require('express');
const router = express.Router();
const controllers = require('../controllers/index')
const middleware = require('../middleware/verifyToken')

/* GET users listing. */
router.get('/', controllers.sub_matkul.getAll);
router.get('/sub-sub-matkul-true', controllers.sub_matkul.getAllwSubSub);
router.get('/:id', controllers.sub_matkul.getById);
router.post('/', middleware.verifyTokenAdminOrSuperAdmin, controllers.sub_matkul.create);
router.put('/:id', middleware.verifyTokenAdminOrSuperAdmin, controllers.sub_matkul.update);
router.delete('/:id', middleware.verifyTokenAdminOrSuperAdmin, controllers.sub_matkul.delete);

module.exports = router;