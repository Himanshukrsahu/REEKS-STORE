import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: { type: String, required: true },
  sku: { type: String, required: true },
  price: { type: Number, required: true }, // unit price paid
  quantity: { type: Number, required: true },
  image: { type: String }
}, { _id: false });

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [orderItemSchema],
  shippingAddress: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true }
  },
  paymentMethod: { type: String, enum: ['Stripe', 'Razorpay', 'COD'], required: true },
  paymentStatus: { type: String, enum: ['Pending', 'Completed', 'Failed', 'Refunded'], default: 'Pending' },
  paymentId: { type: String }, // Stripe Session ID or Razorpay Payment ID
  orderStatus: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  subtotal: { type: Number, required: true },
  discountAmount: { type: Number, default: 0 },
  couponApplied: { type: String },
  shippingCharges: { type: Number, default: 0 },
  tax: { type: Number, default: 0 },
  total: { type: Number, required: true },
  trackingNumber: { type: String },
  invoiceUrl: { type: String },
  createdAt: { type: Date, default: Date.now }
});

import { getModel } from '../utils/dbWrapper.js';

const Order = getModel('Order', orderSchema);
export default Order;
