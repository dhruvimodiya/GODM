const express = require('express');
const isAdmin = require('../middleware/roleMiddleware');
const router = express.Router();

router.post('/admin-only', isAdmin, (req, res) => {
    // Admin-only logic here
    res.status(200).json({ message: 'Welcome, admin!' });
});

module.exports = router; 