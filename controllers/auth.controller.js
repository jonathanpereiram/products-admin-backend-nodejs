const { request, response } = require('express');
const bcrypt = require('bcryptjs/dist/bcrypt');

const { generateJWT } = require('../helpers/generate-jwt');

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

    const isValidPassword = bcrypt.compareSync(password, user.password);

    if(!isValidPassword){
        return res.status(400).json({
            errors: [
                {
                    msg: 'invalid credentials'
                }
            ]
        });
    }

    const token = await generateJWT({uid: user.id});


    res.json({
        data: {
            ...user.toJSON(),
            token
        }
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

    const token = await generateJWT({uid: user.id});

    res.json({
        data: {
            ...user.toJSON(),
            token
        }
    });
}

const getUser = async(req = request, res = response) => {

    const { uid } = req.user;

    const user = await User.findById(uid);

    res.json({ data: user});
}

module.exports = {
    login,
    register,
    getUser
}