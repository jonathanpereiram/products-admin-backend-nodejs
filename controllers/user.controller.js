const User = require('../models/user.model');

const { request, response } = require("express")

const getAll = async(req = request, res = response) => {

    const { limit = 10, page = 0 } = req.query;

    const [countDocuments, users] = await Promise.all([
        User.countDocuments(),
        User.find().limit(limit).skip(page)
    ]);

    res.json({
        data: {
            page,
            limit,   
            countDocuments,
            items: users
        }
    });
}

module.exports = {
    getAll
}