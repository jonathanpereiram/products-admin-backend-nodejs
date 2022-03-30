const express = require('express');
const { check } = require('express-validator');

const { login, register } = require('../controllers/auth.controller');
const { inputValidator } = require('../middlewares/input-validator');

const router = express.Router();

router.post('/login', login);

router.post('/register',[
    check('name', 'The name is required').not().isEmpty(),
    check('email', 'The email is required').not().isEmpty(),
    check('email', 'The email must be a valid email').isEmail(),
    check('password', 'The password is required').not().isEmpty(),
    inputValidator
], register);

module.exports = router;