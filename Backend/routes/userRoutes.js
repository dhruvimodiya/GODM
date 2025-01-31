const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getAllUsers } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Protect the route and allow only admin to access it
router.get('/', protect, getAllUsers); // New route to get all users
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router; 