const express = require('express');
const router = express.Router();
const { addToCart } = require('../controllers/addtocartController');
const { protect } = require('../middleware/authMiddleware');
// Route to add an item to the cart
router.post('/add', protect, addToCart);


module.exports = router;
