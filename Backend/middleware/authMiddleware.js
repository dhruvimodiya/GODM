const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = (req, res, next) => {
    let token;

    // Check if token is in the headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = { id: decoded.id }; // Attach user info to request
            next(); // Proceed to the next middleware or route handler
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = protect; 