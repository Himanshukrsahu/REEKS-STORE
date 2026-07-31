import Product from '../models/Product.js';
import User from '../models/User.js';

// Get all products (with pagination, filtering, searching, and sorting)
export const getProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      category,
      skinType,
      minPrice,
      maxPrice,
      rating,
      search,
      sort,
      isNewArrival,
      isBestSeller
    } = req.query;

    const query = {};

    if (category) {
      query.category = { $regex: new RegExp(`^${category}$`, 'i') };
    }

    if (skinType) {
      // Check if product includes specified skin type (e.g. Dry)
      query.skinType = { $regex: new RegExp(`^${skinType}$`, 'i') };
    }

    if (minPrice || maxPrice) {
      query.finalPrice = {};
      if (minPrice) query.finalPrice.$gte = Number(minPrice);
      if (maxPrice) query.finalPrice.$lte = Number(maxPrice);
    }

    if (rating) {
      query.rating = { $gte: Number(rating) };
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { sku: { $regex: search, $options: 'i' } }
      ];
    }

    if (isNewArrival === 'true') {
      query.isNewArrival = true;
    }

    if (isBestSeller === 'true') {
      query.isBestSeller = true;
    }

    // Sorting
    let sortQuery = { createdAt: -1 }; // default: newest
    if (sort) {
      if (sort === 'price_asc') {
        sortQuery = { finalPrice: 1 };
      } else if (sort === 'price_desc') {
        sortQuery = { finalPrice: -1 };
      } else if (sort === 'rating') {
        sortQuery = { rating: -1 };
      } else if (sort === 'name_asc') {
        sortQuery = { name: 1 };
      } else if (sort === 'name_desc') {
        sortQuery = { name: -1 };
      }
    }

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    const products = await Product.find(query)
      .sort(sortQuery)
      .skip(skip)
      .limit(limitNum);

    const totalProducts = await Product.countDocuments(query);

    res.json({
      products,
      page: pageNum,
      pages: Math.ceil(totalProducts / limitNum),
      totalProducts
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single product by SKU
export const getProductBySku = async (req, res) => {
  try {
    const product = await Product.findOne({ sku: req.params.sku.toUpperCase() });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create Product (Admin only)
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      sku,
      description,
      ingredients,
      skinType,
      usage,
      benefits,
      price,
      discount,
      stock,
      category,
      brand,
      images,
      isNewArrival,
      isBestSeller
    } = req.body;

    const productExists = await Product.findOne({ sku: sku.toUpperCase() });
    if (productExists) {
      return res.status(400).json({ message: 'SKU already exists' });
    }

    const finalPrice = discount ? Math.round(price * (1 - discount / 100)) : price;

    const product = await Product.create({
      name,
      sku: sku.toUpperCase(),
      description,
      ingredients: Array.isArray(ingredients) ? ingredients : ingredients.split(',').map(i => i.trim()),
      skinType: Array.isArray(skinType) ? skinType : skinType.split(',').map(s => s.trim()),
      usage,
      benefits: Array.isArray(benefits) ? benefits : benefits.split(',').map(b => b.trim()),
      price,
      discount,
      finalPrice,
      stock,
      category,
      brand: brand || 'Reeks Store',
      images,
      isNewArrival: isNewArrival || false,
      isBestSeller: isBestSeller || false
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Product (Admin only)
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    Object.assign(product, req.body);
    
    // Final price updated in model's pre-save middleware, but force recalculation here just in case
    if (req.body.price !== undefined || req.body.discount !== undefined) {
      const p = req.body.price !== undefined ? req.body.price : product.price;
      const d = req.body.discount !== undefined ? req.body.discount : product.discount;
      product.finalPrice = Math.round(p * (1 - d / 100));
    }

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Product (Admin only)
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await Product.deleteOne({ _id: req.params.id });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Toggle Wishlist
export const toggleWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const { productId } = req.body;
    const isWishlisted = user.wishlist.includes(productId);

    if (isWishlisted) {
      user.wishlist = user.wishlist.filter(id => id.toString() !== productId);
    } else {
      user.wishlist.push(productId);
    }

    await user.save();
    res.json({
      wishlist: user.wishlist,
      message: isWishlisted ? 'Product removed from wishlist' : 'Product added to wishlist'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Wishlist Products
export const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('wishlist');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
