const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req = request, res = response, next) => {
    
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            errors: [
                {
                    msg: 'Token is required',
                    param: 'x-token',
                    location: 'headers'
                }
            ]
        });
    }

    try {

        const payload = jwt.verify(token, process.env.JWT_SECRET);

        req.user = {
            uid: payload.uid
        };

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            errors: [
                {
                    msg: 'Invalid Token',
                    param: 'x-token',
                    location: 'headers'
                }
            ]
        });
    }

    next();
}

module.exports = {
    validateJWT
}