const Cart = require("../models/Cart");

const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity, variant } = req.body;

    // Find or create cart for the user
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, products: [] });
    }

    // Check if the product is already in the cart
    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId && p.variant === variant
    );

    if (productIndex > -1) {
      // Update quantity if product exists
      cart.products[productIndex].quantity += quantity;
    } else {
      // Add new product to cart
      cart.products.push({ productId, quantity, variant });
    }

    cart.updatedAt = Date.now();
    await cart.save();

    res.status(200).json({ message: "Product added to cart", cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addToCart };
