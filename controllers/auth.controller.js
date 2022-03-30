const { request, response } = require('express');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const User = require('../models/user.model');
const bcrypt = require('bcryptjs/dist/bcrypt');
const { generateJWT } = require('../helpers/generate-jwt');

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

const register = async(req = request, res = response) => {

    const { name, email, password } = req.body;

    const userResult = await User.findOne({ email });

    if(userResult){
        return res.status(400).json({
            errors: [
                {
                    msg: 'Email already exist.'
                }
            ]
        }); 
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    
    const user = new User({
        name: name.toUpperCase(),
        email,
        password: hash,
        role: 'USER_ROLE'
    });

    await user.save();

    const token = await generateJWT({id: user.id});

    res.json({
        data: {
            user,
            token
        }
    })
}

module.exports = {
    login,
    register
}