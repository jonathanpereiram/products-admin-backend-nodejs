const { request, response } = require('express');

const User = require('../models/user.model');

const login = async(req = request, res = response) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if(!user){
        return res.status(400).json({
            errors: [
                {
                    msg: 'invalid credentials'
                }
            ]
        });
    }

    res.json({
        msg: 'response from controller'
    })
}

module.exports = {
    login
}