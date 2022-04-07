const { request, response } = require("express")
const Product = require('../models/product.model');

const getProducts = (req = request, res = response) => {
    res.json({
        ok: true
    })
}

const getProductById = (req = request, res = response) => {
    res.json({
        ok: true
    })
}

const postProduct = async(req = request, res = response) => {
    
    const { name, price, stock, active, category } = req.body;

    const product = new Product({
        name,
        price,
        stock,
        active,
        category
    });

    await product.save();
    
    res.json({
        data: {
            product
        }
    })
}

const putProduct = (req = request, res = response) => {
    res.json({
        ok: true
    })
}

const deleteProduct = (req = request, res = response) => {
    res.json({
        ok: true
    })
}

module.exports = {
    getProducts,
    getProductById,
    postProduct,
    putProduct,
    deleteProduct
}
