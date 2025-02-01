// Import necessary modules
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Function to generate a JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d', // Token expires in 30 days
    });
};

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body; // Destructure user data from request body

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user
        const user = await User.create({ name, email, password });

        // Respond with user data and token if user is created
        if (user) {
            res.status(201).json({
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                },
                token: generateToken(user._id), // Include token in response
            });
        }
    } catch (error) {
        res.status(400).json({ message: error.message }); // Handle errors
    }
};

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body; // Destructure user data from request body

        // Check for user by email
        const user = await User.findOne({ email });

        // Validate password and respond with user data and token
        if (user && (await user.matchPassword(password))) {
            res.json({
                message: 'User successfully logged in', // Success message
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                },
                token: generateToken(user._id), // Include token in response
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' }); // Handle invalid credentials
        }
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle errors
    }
};

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Exclude password from the response
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Middleware to check if a user has admin privileges
const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next(); // User is admin, proceed to the next middleware
    } else {
        res.status(403).json({ message: 'Access denied. Admins only.' });
    }
};

// Export the functions for use in other parts of the application
module.exports = {
    registerUser,
    loginUser,
    getAllUsers,
    isAdmin,
}; 