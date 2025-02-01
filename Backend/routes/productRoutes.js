const express = require('express');
const router = express.Router();
const { getProducts, addProduct } = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');

// Public route to get all products
router.get('/', getProducts);

// Protected route to add a new product (only admin can access)
router.post('/', protect, addProduct);

module.exports = router;
