const express = require('express');
const router = express.Router();
const controllers = require('../controllers/index')
const middleware = require('../middleware/verifyToken')

/* GET users listing. */
router.get('/', controllers.pembimbing.getAll);
router.get('/:id', controllers.pembimbing.getById);
router.post('/', middleware.isLogin, controllers.pembimbing.create);
router.put('/:id', middleware.isLogin, controllers.pembimbing.update);
router.delete('/:id', middleware.isLogin, controllers.pembimbing.delete);

module.exports = router;