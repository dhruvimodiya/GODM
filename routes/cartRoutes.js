const express = require('express');
const { addToCart } = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Protected route to add items to the cart
router.post('/', protect, addToCart);

module.exports = router; 