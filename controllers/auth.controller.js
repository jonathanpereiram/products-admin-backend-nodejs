const { request, response } = require('express');

const login = (req = request, res = response) => {

    res.json({
        msg: 'response from controller'
    })
}

module.exports = {
    login
}