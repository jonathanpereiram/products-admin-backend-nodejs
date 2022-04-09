const { Router } = require('express');
const { getCategories, getCategoryById, postCategory, deleteCategory, putCategory } = require('../controllers/category.controller');

const router = Router();

router.get('/', getCategories);
router.get('/:id', getCategoryById);
router.post('/', postCategory);
router.put('/:id', putCategory);
router.delete('/:id', deleteCategory);

module.exports = router;