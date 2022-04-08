const express = require('express');
const { check } = require('express-validator');

const { getProducts, getProductById, postProduct, deleteProduct, putProduct } = require('../controllers/product.controller');
const { inputValidator } = require('../middlewares/input-validator');

const router = express.Router();

router.get('/', getProducts);

router.get('/:id', getProductById);

router.post('/', [
    check('name', 'The name is required').notEmpty(),
    check('price', 'The price is required').notEmpty(),
    check('stock', 'The stock is required').notEmpty(),
    check('category', 'The category is required').notEmpty(),
    inputValidator,
    check('category', 'The category is invalid').isMongoId(),
    inputValidator
], postProduct);

router.put('/:id', putProduct);

router.delete('/:id', deleteProduct);

module.exports = router;