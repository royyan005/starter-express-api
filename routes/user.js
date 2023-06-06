const express = require('express');
const router = express.Router();
const controllers = require('../controllers/index')

/* GET users listing. */
router.get('/', controllers.user.getAll);
router.get('/:id', controllers.user.getById);

module.exports = router;