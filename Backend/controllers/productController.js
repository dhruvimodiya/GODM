const Product = require('../models/productModel');
const jwt = require('jsonwebtoken');    

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const generateToken = (id) => {
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
    const { name,brand,type,price,quantity, description,image,createdAt } = req.body; // Assuming these fields are required
    try {
        const newProduct = new Product({  name,brand,type,price,quantity, description,image,createdAt });
        console.log("🚀 ~ addProduct ~ newProduct:", newProduct)
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error adding product' });
    }
};

module.exports = { getProducts, addProduct };


