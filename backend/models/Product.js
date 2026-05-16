const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    oldPrice: { type: Number },
    image: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true, default: 0 },
    rating: { type: Number, default: 4 },
    reviews: { type: Number, default: 0 },
    orders: { type: Number, default: 0 },
    shipping: { type: String, default: "Free Shipping" },
    condition: { type: String, default: "Brand new" },
    material: { type: String },
    itemNum: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);