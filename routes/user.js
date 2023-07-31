const express = require('express');
const router = express.Router();
const controllers = require('../controllers/index')
const middleware = require('../middleware/verifyToken')

/* GET users listing. */
router.get('/', middleware.isLogin, controllers.user.getAll);
router.get('/:id', middleware.isLogin, controllers.user.getById);
router.post('/', middleware.verifyTokenAdmin, controllers.user.create);
router.put('/:id', middleware.verifyTokenAdmin, controllers.user.update);
router.delete('/delete/:id', middleware.verifyTokenAdmin, controllers.user.delete);
router.post('/login', controllers.user.login);
router.delete('/logout', controllers.user.logout);

module.exports = router;