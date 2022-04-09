const { request, response } = require("express")
const Product = require('../models/product.model');
const Category = require('../models/category.model')

const getProducts = async (req = request, res = response) => {

    let { limit = 10, page = 0, fields = '' } = req.query;

    if(fields.length > 0){
        fields = fields.replaceAll(',', ' ');
    }

    const [countDocuments, products] = await Promise.all([
        Product.countDocuments(),
        Product.find().limit(limit).skip(page).select(fields).populate('category', 'name')
    ]);

    res.json({
        data: {
            page,
            limit,
            countDocuments,
            items: products
        }
    })
}

const getProductById = async(req = request, res = response) => {

    const { uid } = req.params;
    
    const product = await Product.findById(uid);

    if(!product){
        return res.status(404).end();
    }

    res.json({
        data: {
            ...product.toJSON()
        }
    })
}

const postProduct = async(req = request, res = response) => {
    
    const { name, price, stock, active, category } = req.body;

    const productDB = await Product.findOne({ name });

    if(productDB){
        return res.status(400).json({
            errors: [
                {
                    errorCode: 'xxxx',
                    description: `Product ${name} already exists`
                }
            ]
        });
    }

    const categoryDB = await Category.findById(category);

    if(!categoryDB){
        return res.status(400).json({
            errors: [
                {
                    errorCode: 'xxxx',
                    description: `Category ${category} does not exists`
                }
            ]
        });
    }

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
            ...product.toJSON()
        }
    })
}

const putProduct = async(req = request, res = response) => {

    const { uid } = req.params;

    const productById = await Product.findById(uid);
    
    if(!productById){
        return res.status(404).end();
    }

    const { ...payload } = req.body;

    const productByName = await Product.findOne({ name: payload.name });
    
    if(productByName && !(productById._id.equals(productByName._id))){
        console.log('paso if')
        return res.status(400).json({
            errors: [
                {
                    errorCode: 'xxxx',
                    description: `Product ${payload.name} already exists`
                }
            ]
        });
    }

    const userUpdated = await Product.findByIdAndUpdate(uid, payload, { new: true});

    res.json({
        data: {
            ...userUpdated.toJSON()
        }
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
