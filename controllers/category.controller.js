const { request, response } = require("express")
const Category = require("../models/category.model")

const getCategories = async(req = request, res = response) => {
    
    const categories = await Category.find();
    
    res.json({
        data: {
            items: categories
        }
    })
}

const getCategoryById = (req = request, res = response) => {
    res.json({
        ok: true
    })
}

const postCategory = async(req = request, res = response) => {
    
    const { name, active } = req.body;

    const categoryDB = await Category.findOne({name});

    if(categoryDB){
        return res.json({
            errors: [
                {
                    errorCode: 'xxxx',
                    description: `Category ${name} already exists`
                }
            ]
        })
    }

    const category = new Category({ name, active });

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
