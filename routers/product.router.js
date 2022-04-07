const express = require('express');
const { getProducts, getProductById, postProduct, deleteProduct, putProduct } = require('../controllers/product.controller');
const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', postProduct);
router.put('/:id', putProduct);
router.delete('/:id', deleteProduct);

module.exports = router;