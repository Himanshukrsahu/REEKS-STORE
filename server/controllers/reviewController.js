import Review from '../models/Review.js';
import Order from '../models/Order.js';

// Add Product Review
export const addReview = async (req, res) => {
  const { productId, rating, title, comment } = req.body;
  try {
    // Check if user already reviewed this product
    const alreadyReviewed = await Review.findOne({ user: req.user.id, product: productId });
    if (alreadyReviewed) {
      return res.status(400).json({ message: 'Product already reviewed by this user' });
    }

    // Check if user purchased this product (verified purchase)
    const userOrders = await Order.find({ user: req.user.id, paymentStatus: 'Completed' });
    const verifiedPurchase = userOrders.some(order => 
      order.items.some(item => item.product.toString() === productId)
    );

    const review = await Review.create({
      user: req.user.id,
      userName: req.user.name,
      product: productId,
      rating: Number(rating),
      title,
      comment,
      verifiedPurchase
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get reviews for a product
export const getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
