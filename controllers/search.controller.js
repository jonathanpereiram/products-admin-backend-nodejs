const { request, response } = require("express");
const { ObjectId } = require('mongoose').Types;

const User = require('../models/user.model');
const Product = require('../models/product.model');
const Category = require('../models/category.model');

const allowedCollections = [
    'users',
    'categories',
    'products',
    'roles'
]

const search = (req = request, res = response) => {

    const { collection, term } = req.params;

    if (!allowedCollections.includes(collection)) {
        return res.status(400).json({
            msg: `Allowed collections are ${allowedCollections}`
        })
    }

    switch (collection) {
        case 'users':
            searchUsers(term, res);
            break;
        case 'categories':
            searchCategories(term, res);
            break;
        case 'products':
            searchProducts(term, res);
            break;
        default:
            res.status(500).json({
                msg: 'Se me olvido hacer esta busqueda'
            });
    }
}

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

const searchProducts = async(term = '', res = response) => {
    const isMongoId = ObjectId.isValid(term);

    if(isMongoId){
        const product = await Product.findById(term);
        return res.json({
            result: (product) ? [ product ] : []
        })
    }

    const regex = new RegExp(term, 'i');

    const products = await Product.find({ name: regex, active: true })

    res.json({
        result: products
    })
}

const searchCategories = async(term = '', res = response) => {
    const isMongoId = ObjectId.isValid(term);

    if(isMongoId){
        const category = await Category.findById(term);
        return res.json({
            result: (category) ? [ category ] : []
        })
    }

    const regex = new RegExp(term, 'i');

    const categories = await Category.find({ name: regex, active: true })

    res.json({
        result: categories
    })
}

module.exports = {
    search
}