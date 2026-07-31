import express from 'express';
import { addReview, getProductReviews } from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, addReview);

router.route('/product/:productId')
  .get(getProductReviews);

export default router;
