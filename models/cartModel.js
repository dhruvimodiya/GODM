const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true },
      variant: { type: String }, 
    }
  ],
  createdAt: { type: Date, default: Date.now },

  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Cart", cartSchema);

console.log("Request Body:", req.body);
console.log("User ID:", userId);
console.log("Product ID:", productId);
console.log("Quantity:", quantity);
console.log("Variant:", variant);
