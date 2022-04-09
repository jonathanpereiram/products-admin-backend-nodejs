const { Router } = require('express');
const { getAll } = require('../controllers/user.controller');

const router = Router();

router.get('/', getAll);

module.exports = router;