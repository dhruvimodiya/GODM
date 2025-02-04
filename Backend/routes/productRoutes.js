const express = require('express');
const router = express.Router();
const { getProducts, addProduct, updateProduct, deleteProduct, loginAdmin } = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');
const { isAdmin } = require('../controllers/userController');

// Public route to get all products
router.get('/', getProducts);

// Protected routes (admin only)
router.post('/', protect, isAdmin, addProduct);
router.put('/:id', protect, isAdmin, updateProduct);
router.delete('/:id', protect, isAdmin, deleteProduct);

// Add this route for admin login
router.post('/admin/login', loginAdmin);

module.exports = router;
