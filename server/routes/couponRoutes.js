import express from 'express';
import {
  validateCoupon,
  createCoupon,
  getCoupons,
  getActiveCoupons,
  updateCoupon,
  deleteCoupon
} from '../controllers/couponController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, admin, getCoupons)
  .post(protect, admin, createCoupon);

router.route('/active')
  .get(getActiveCoupons);

router.route('/validate')
  .post(protect, validateCoupon);

router.route('/:id')
  .put(protect, admin, updateCoupon)
  .delete(protect, admin, deleteCoupon);

export default router;
