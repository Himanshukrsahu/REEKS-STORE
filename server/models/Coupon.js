import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true, index: true },
  discountPercentage: { type: Number, required: true }, // e.g. 20 for 20%
  expiryDate: { type: Date, required: true },
  minOrderAmount: { type: Number, default: 0 },
  maxDiscountAmount: { type: Number },
  usageLimit: { type: Number, default: 100 },
  usageCount: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

import { getModel } from '../utils/dbWrapper.js';

const Coupon = getModel('Coupon', couponSchema);
export default Coupon;
