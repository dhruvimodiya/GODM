const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a product name']
        },
        brand: {
            type: String,
            required: [true, 'Please add a brand name']
        },
        type: {
            type: String,
            required: [true, 'Please specify the product type'] // e.g., pen, notebook, etc.
        },
        price: {
            type: Number,
            required: [true, 'Please add a price'],
            min: [0, 'Price must be a positive number'] // Ensure price is non-negative
        },
        quantity: {
            type: Number,
            required: [true, 'Please add a quantity'],
            min: [0, 'Quantity must be a non-negative number'] // Ensure quantity is non-negative
        },
        description: {
            type: String,
            default: 'No description provided' // Default description
        },
        image: {
            type: String,
            required: [true, 'Please upload an image'] // Field for image upload
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true // Automatically manage createdAt and updatedAt fields
    }
);

module.exports = mongoose.model('Product', productSchema);
