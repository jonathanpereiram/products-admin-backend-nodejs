const { request, response } = require("express")
const Category = require("../models/category.model")

const getCategories = (req = request, res = response) => {
    res.json({
        ok: true
    })
}

const getCategoryById = (req = request, res = response) => {
    res.json({
        ok: true
    })
}

const postCategory = async(req = request, res = response) => {
    
    const { name } = req.body;

    const category = new Category({
        name,
    });

    await category.save();
    
    res.json({
        data: {
            ...category.toJSON()
        }
    });
}

const putCategory = (req = request, res = response) => {
    res.json({
        ok: true
    })
}

const deleteCategory = (req = request, res = response) => {
    res.json({
        ok: true
    })
}

module.exports = {
    getCategories,
    getCategoryById,
    postCategory,
    putCategory,
    deleteCategory
}
