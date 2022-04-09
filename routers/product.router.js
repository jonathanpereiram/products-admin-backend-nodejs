const { Router } = require('express');
const { check } = require('express-validator');

const { getProducts, getProductById, postProduct, deleteProduct, putProduct } = require('../controllers/product.controller');
const { inputValidator } = require('../middlewares');

const router = Router();

router.get('/', getProducts);

router.get('/:uid', [
    check('uid', 'uid is required').notEmpty(),
    check('uid', 'uid is invalid').isMongoId(),
    inputValidator
], getProductById);

router.post('/', [
    check('name', 'The name is required').notEmpty(),
    check('price', 'The price is required').notEmpty(),
    check('stock', 'The stock is required').notEmpty(),
    check('category', 'The category is required').notEmpty(),
    check('category', 'The category is invalid').isMongoId(),
    inputValidator
], postProduct);

router.put('/:uid', [
    check('uid', 'uid is required').notEmpty(),
    check('uid', 'uid is invalid').isMongoId(),
    check('name', 'The name is required').notEmpty(),
    check('price', 'The price is required').notEmpty(),
    check('stock', 'The stock is required').notEmpty(),
    check('category', 'The category is required').notEmpty(),
    check('category', 'The category is invalid').isMongoId(),
    inputValidator
], putProduct);

router.delete('/:uid', deleteProduct);

module.exports = router;