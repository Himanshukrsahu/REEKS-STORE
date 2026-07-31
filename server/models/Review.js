import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userName: { type: String, required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true, index: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  title: { type: String },
  comment: { type: String, required: true },
  verifiedPurchase: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

// Auto-calculate average rating for product after review is saved
reviewSchema.post('save', async function () {
  const Product = mongoose.model('Product');
  const reviews = await this.constructor.find({ product: this.product });
  const numReviews = reviews.length;
  const rating = reviews.reduce((acc, curr) => acc + curr.rating, 0) / numReviews;
  
  await Product.findByIdAndUpdate(this.product, {
    rating: parseFloat(rating.toFixed(1)),
    numReviews
  });
});

import { getModel } from '../utils/dbWrapper.js';

const Review = getModel('Review', reviewSchema);
export default Review;
