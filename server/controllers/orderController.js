import Order from '../models/Order.js';
import Product from '../models/Product.js';
import Coupon from '../models/Coupon.js';
import Notification from '../models/Notification.js';

// Create Order
export const createOrder = async (req, res) => {
  const {
    items,
    shippingAddress,
    paymentMethod,
    couponCode,
    shippingCharges = 0,
    tax = 0
  } = req.body;

  try {
    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    // Verify stock and fetch fresh pricing
    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Product ${item.name} not found` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${product.name}. Available: ${product.stock}` });
      }

      subtotal += product.finalPrice * item.quantity;
      orderItems.push({
        product: product._id,
        name: product.name,
        sku: product.sku,
        price: product.finalPrice,
        quantity: item.quantity,
        image: product.images[0] || ''
      });
    }

    // Apply Coupon
    let discountAmount = 0;
    if (couponCode) {
      const coupon = await Coupon.findOne({ code: couponCode.toUpperCase(), isActive: true });
      if (coupon && new Date(coupon.expiryDate) >= new Date() && coupon.usageCount < coupon.usageLimit) {
        if (subtotal >= coupon.minOrderAmount) {
          discountAmount = (subtotal * coupon.discountPercentage) / 100;
          if (coupon.maxDiscountAmount && discountAmount > coupon.maxDiscountAmount) {
            discountAmount = coupon.maxDiscountAmount;
          }
          discountAmount = Math.round(discountAmount);
          
          // Increment usage
          coupon.usageCount += 1;
          await coupon.save();
        }
      }
    }

    const total = subtotal - discountAmount + Number(shippingCharges) + Number(tax);

    // Create Order in DB
    const trackingNumber = 'RKST-' + Math.floor(10000000 + Math.random() * 90000000);
    const paymentStatus = paymentMethod === 'COD' ? 'Pending' : 'Pending';

    const order = await Order.create({
      user: req.user.id,
      items: orderItems,
      shippingAddress,
      paymentMethod,
      paymentStatus,
      paymentId: paymentMethod === 'COD' ? 'MOCK-COD-' + Date.now() : undefined,
      subtotal,
      discountAmount,
      couponApplied: couponCode,
      shippingCharges,
      tax,
      total,
      trackingNumber,
      orderStatus: 'Pending'
    });

    // Deduct stock immediately
    for (const item of orderItems) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity }
      });
    }

    // Create notification
    await Notification.create({
      user: req.user.id,
      title: 'Order Placed successfully',
      message: `Your order ${order.trackingNumber} has been received and is being processed.`
    });

    // Generate mock payment parameters for frontend
    let paymentParameters = {};
    if (paymentMethod === 'Stripe') {
      paymentParameters = {
        checkoutSessionId: 'cs_test_' + Math.random().toString(36).substr(2, 9),
        successUrl: `http://localhost:3000/checkout/success?orderId=${order._id}`
      };
      order.paymentId = paymentParameters.checkoutSessionId;
      await order.save();
    } else if (paymentMethod === 'Razorpay') {
      paymentParameters = {
        razorpayOrderId: 'order_pay_' + Math.random().toString(36).substr(2, 9),
        amount: total * 100, // paisa
        currency: 'USD',
        key: 'rzp_test_mockkey12345'
      };
      order.paymentId = paymentParameters.razorpayOrderId;
      await order.save();
    }

    res.status(201).json({
      order,
      paymentParameters
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Verify/Complete Payment
export const verifyPayment = async (req, res) => {
  const { orderId, paymentId, status } = req.body;
  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (status === 'success') {
      order.paymentStatus = 'Completed';
      if (paymentId) order.paymentId = paymentId;
      await order.save();

      // Create notification
      await Notification.create({
        user: order.user,
        title: 'Payment Received',
        message: `Payment for your order ${order.trackingNumber} has been successfully verified.`
      });

      res.json({ message: 'Payment verified and completed successfully', order });
    } else {
      order.paymentStatus = 'Failed';
      await order.save();
      res.status(400).json({ message: 'Payment verification failed', order });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single order details
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Only allow user who placed order or admin
    if (order.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view this order' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get logged-in user orders
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all orders (Admin only)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'name email').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Order Status (Admin only)
export const updateOrderStatus = async (req, res) => {
  const { status, trackingNumber } = req.body;
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (status) order.orderStatus = status;
    if (trackingNumber) order.trackingNumber = trackingNumber;

    // Auto complete payment if delivered
    if (status === 'Delivered') {
      order.paymentStatus = 'Completed';
    }

    await order.save();

    // Create user notification
    await Notification.create({
      user: order.user,
      title: `Order Status: ${order.orderStatus}`,
      message: `Your order ${order.trackingNumber} status has been updated to: ${order.orderStatus}.`
    });

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
