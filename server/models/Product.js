import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sku: { type: String, required: true, unique: true, index: true },
  description: { type: String, required: true },
  ingredients: [{ type: String }],
  skinType: [{ type: String }], // e.g., 'Dry', 'Oily', 'Sensitive', 'Combination', 'Normal'
  usage: { type: String },
  benefits: [{ type: String }],
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  price: { type: Number, required: true }, // MRP
  discount: { type: Number, default: 0 }, // e.g. 15 for 15%
  finalPrice: { type: Number, required: true }, // price after discount
  couponEligible: { type: Boolean, default: true },
  stock: { type: Number, required: true, default: 0 },
  category: { type: String, required: true }, // Can match category slug/name
  brand: { type: String, default: 'Reeks Store' },
  images: [{ type: String }],
  isNewArrival: { type: Boolean, default: false },
  isBestSeller: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

// Update finalPrice automatically before saving
productSchema.pre('save', function (next) {
  if (this.discount > 0) {
    this.finalPrice = Math.round(this.price * (1 - this.discount / 100));
  } else {
    this.finalPrice = this.price;
  }
  next();
});

import { getModel } from '../utils/dbWrapper.js';

const Product = getModel('Product', productSchema);
export default Product;
