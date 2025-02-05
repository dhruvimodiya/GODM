const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');
const User = require('../models/userModel');
const Cart = require('../models/addtocartModel');

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user._id; // From auth middleware

        // Validate product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        // Check if item already exists in cart
        let cartItem = await Cart.findOne({ userId, productId });
        
        if (cartItem) {
            // Update quantity if item exists
            cartItem.quantity += quantity || 1;
            await cartItem.save();
        } else {
            // Create new cart item if it doesn't exist
            cartItem = await Cart.create({
                userId,
                productId,
                quantity: quantity || 1
            });
        }

        res.status(200).json({
            success: true,
            data: cartItem
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Define the route
router.post('/api/cart', addToCart);

module.exports = router;
