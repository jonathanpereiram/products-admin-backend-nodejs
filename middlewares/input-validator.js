const { request, response } = require("express");
const { validationResult } = require("express-validator");
const { json } = require("express/lib/response");

const inputValidator = (req = request, res = response, next) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }

    next();
};

module.exports = {
    inputValidator
}