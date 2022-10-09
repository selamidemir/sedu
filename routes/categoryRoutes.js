const express = require('express');
const categoryController = require('../controlles/categoryControllers');

const router = express.Router();

router.route('/').post(categoryController.createCategory);
router.route('/').get(categoryController.getAllCategories);
router.route('/:id').delete(categoryController.deleteCategory);
module.exports = router;
