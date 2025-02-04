const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const app = express();

// Connect to database first
connectDB();

// Enhanced CORS configuration
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Handle 404 routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Try different ports if default port is in use
const startServer = async (retries = 3) => {
  const BASE_PORT = parseInt(process.env.PORT) || 5001;
  
  for (let i = 0; i < retries; i++) {
    try {
      const port = BASE_PORT + i;
      const server = await new Promise((resolve, reject) => {
        const server = app.listen(port)
          .once('listening', () => {
            console.log(`Server running on port ${port}`);
            resolve(server);
          })
          .once('error', (err) => {
            if (err.code === 'EADDRINUSE') {
              console.log(`Port ${port} is busy, trying next port...`);
              server.close();
              reject(err);
            } else {
              reject(err);
            }
          });
      });
      
      // Handle unhandled promise rejections
      process.on('unhandledRejection', (err) => {
        console.log('Unhandled Rejection:', err);
        server.close(() => process.exit(1));
      });
      
      return server;
    } catch (err) {
      if (i === retries - 1) throw err;
    }
  }
};

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
