const jwt = require('jsonwebtoken');

const generateJWT = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1h'
        }, (error, token) => {
            if(error){
                console.log(error);
                reject('Error creating jwt');
            } else {
                resolve(token);
            }
        })
    });
};

module.exports = {
    generateJWT
}