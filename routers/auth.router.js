const { Router } = require('express');
const { check } = require('express-validator');

const { login, register, getUser } = require('../controllers/auth.controller');
const { inputValidator, validateJWT } = require('../middlewares');

const router = Router();

router.post('/login', [
    check('email', 'The email is required').not().isEmpty(),
    check('email', 'The email must be a valid email').isEmail(),
    check('password', 'The password is required').not().isEmpty(),
    inputValidator
], login);

router.post('/register',[
    check('name', 'The name is required').not().isEmpty(),
    check('email', 'The email is required').not().isEmpty(),
    check('email', 'The email must be a valid email').isEmail(),
    check('password', 'The password is required').not().isEmpty(),
    inputValidator
], register);

router.get('/validate',[
    validateJWT,
    inputValidator
], getUser);

module.exports = router;