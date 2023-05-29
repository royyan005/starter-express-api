const express = require('express');
const router = express.Router();
const user_c = require('../controllers/index')

/* GET users listing. */
router.get('/', user_c.users.getAll);
router.get('/:id', user_c.users.getById);

module.exports = router;