import express from 'express';
import {
  getProducts,
  getProductBySku,
  createProduct,
  updateProduct,
  deleteProduct,
  toggleWishlist,
  getWishlist
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getProducts)
  .post(protect, admin, createProduct);

router.route('/wishlist')
  .get(protect, getWishlist)
  .post(protect, toggleWishlist);

router.route('/sku/:sku')
  .get(getProductBySku);

router.route('/:id')
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

export default router;
