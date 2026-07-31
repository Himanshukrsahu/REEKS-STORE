import Coupon from '../models/Coupon.js';

// Validate Coupon
export const validateCoupon = async (req, res) => {
  const { code, cartTotal } = req.body;
  try {
    const coupon = await Coupon.findOne({ code: code.toUpperCase(), isActive: true });

    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found or inactive' });
    }

    if (new Date(coupon.expiryDate) < new Date()) {
      return res.status(400).json({ message: 'Coupon has expired' });
    }

    if (coupon.usageCount >= coupon.usageLimit) {
      return res.status(400).json({ message: 'Coupon usage limit reached' });
    }

    if (cartTotal < coupon.minOrderAmount) {
      return res.status(400).json({
        message: `Minimum order amount of ₹₹${coupon.minOrderAmount} required for this coupon`
      });
    }

    // Calculate discount
    let discount = (cartTotal * coupon.discountPercentage) / 100;
    if (coupon.maxDiscountAmount && discount > coupon.maxDiscountAmount) {
      discount = coupon.maxDiscountAmount;
    }

    res.json({
      code: coupon.code,
      discountPercentage: coupon.discountPercentage,
      discountAmount: Math.round(discount),
      message: 'Coupon applied successfully!'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create Coupon (Admin only)
export const createCoupon = async (req, res) => {
  try {
    const { code, discountPercentage, expiryDate, minOrderAmount, maxDiscountAmount, usageLimit } = req.body;

    const couponExists = await Coupon.findOne({ code: code.toUpperCase() });
    if (couponExists) {
      return res.status(400).json({ message: 'Coupon code already exists' });
    }

    const coupon = await Coupon.create({
      code: code.toUpperCase(),
      discountPercentage,
      expiryDate,
      minOrderAmount: minOrderAmount || 0,
      maxDiscountAmount,
      usageLimit: usageLimit || 100
    });

    res.status(201).json(coupon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all coupons (Admin only)
export const getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find({}).sort({ createdAt: -1 });
    res.json(coupons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get active coupons for checkout showcase
export const getActiveCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find({
      isActive: true,
      expiryDate: { $gt: new Date() }
    }).select('code discountPercentage minOrderAmount maxDiscountAmount description');
    res.json(coupons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Coupon (Admin only)
export const updateCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }

    Object.assign(coupon, req.body);
    const updatedCoupon = await coupon.save();
    res.json(updatedCoupon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Coupon (Admin only)
export const deleteCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }
    await Coupon.deleteOne({ _id: req.params.id });
    res.json({ message: 'Coupon deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
