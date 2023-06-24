const express = require('express');
const router = express.Router();
const controllers = require('../controllers/index')
const middleware = require('../middleware/verifyToken')

/* GET users listing. */
router.get('/', controllers.user.getAll);
router.get('/:id', controllers.user.getById);
router.post('/', middleware.verifyTokenAdmin, controllers.user.create);
router.post('/login', controllers.user.login);
router.delete('/logout', controllers.user.logout);

module.exports = router;