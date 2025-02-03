const Product = require('../models/productModel');
const jwt = require('jsonwebtoken');    

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const generateToken = (id) => {
    console.log("🚀 ~ generateToken ~ generateToken:", generateToken)
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d', // Token expires in 30 days
    });
};


// add product
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products' });
    }
};

// @desc    Add a new product
// @route   POST /api/products
// @access  Public
const addProduct = async (req, res) => {
    // Check if user is admin
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied, admin only' });
    }

    const { name, brand, type, price, quantity, description, image } = req.body; // Assuming these fields are required
    try {
        const newProduct = new Product({ name, brand, type, price, quantity, description, image });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error adding product' });
    }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Public
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, brand, type, price, quantity, description, image } = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, { name, brand, type, price, quantity, description, image }, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error updating product' });
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Public
const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product' });
    }
};

module.exports = { getProducts, addProduct, updateProduct, deleteProduct };


