const { request, response } = require("express");
const { ObjectId } = require('mongoose').Types;

const User = require('../models/user.model');

const allowedCollections = [
    'users',
    'categories',
    'products',
    'roles'
]

const searchUsers = async(term = '', res = response) => {
    const isMongoId = ObjectId.isValid(term);

    if(isMongoId){
        const user = await User.findById(term);
        return res.json({
            result: (user) ? [ user ] : []
        })
    }

    const regex = new RegExp(term, 'i');

    const users = await User.find({
        $or: [{ name : regex}, { email : regex}],
        $and: [{ active: true }]
    })

    res.json({
        result: users
    })
}

const search = (req = request, res = response) => {

    const { collection, term } = req.params;

    if (!allowedCollections.includes(collection)) {
        return res.status(400).json({
            msg: `Allowed collections are ${allowedCollections}`
        })
    }

    switch (collection) {
        case 'users':
            searchUsers(term, res)
            break;
        case 'categories':

            break;
        case 'products':

            break;

        default:
            res.status(500).json({
                msg: 'Se me olvido hacer esta busqueda'
            });
    }
}

module.exports = {
    search
}