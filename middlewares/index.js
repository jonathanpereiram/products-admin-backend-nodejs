const inputValidator = require('./input-validator');
const validateJWT = require('./validate-jwt');

module.exports = {
    ...inputValidator,
    ...validateJWT
}