import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import User from '../models/User.js';
import Coupon from '../models/Coupon.js';
import Order from '../models/Order.js';
import Review from '../models/Review.js';
import Notification from '../models/Notification.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '..', 'data');

const categoriesData = [
  { name: 'Day Cream', slug: 'day-cream', description: 'Hydrating, protective daily formulas.' },
  { name: 'Night Cream', slug: 'night-cream', description: 'Restorative overnight creams.' },
  { name: 'Moisturizer', slug: 'moisturizer', description: 'Daily hydration lock for all skin types.' },
  { name: 'Sunscreen SPF50', slug: 'sunscreen', description: 'High protection UV shields.' },
  { name: 'Face Wash', slug: 'face-wash', description: 'Gentle clarifying daily cleansers.' },
  { name: 'Face Cleanser', slug: 'face-cleanser', description: 'Deep melting oil and water-based cleansers.' },
  { name: 'Toner', slug: 'toner', description: 'pH balancing and prep lotions.' },
  { name: 'Vitamin C Serum', slug: 'vitamin-c-serum', description: 'Brightening antioxidant elixirs.' },
  { name: 'Niacinamide Serum', slug: 'niacinamide-serum', description: 'Pore refining and barrier support.' },
  { name: 'Retinol Serum', slug: 'retinol-serum', description: 'Age defying cell renewal concentrates.' },
  { name: 'Hyaluronic Acid Serum', slug: 'hyaluronic-serum', description: 'Intense moisture plumping serums.' },
  { name: 'Salicylic Acid Serum', slug: 'salicylic-serum', description: 'Clarifying and acne care serums.' },
  { name: 'Eye Cream', slug: 'eye-cream', description: 'Targeted care for dark circles and fine lines.' },
  { name: 'Lip Balm', slug: 'lip-balm', description: 'Restorative lip hydration treatments.' },
  { name: 'Face Mask', slug: 'face-mask', description: 'Express nourishment sheets and gels.' },
  { name: 'Clay Mask', slug: 'clay-mask', description: 'Detoxifying mineral mud treatments.' },
  { name: 'Acne Care', slug: 'acne-care', description: 'Targeted spot and breakout care.' },
  { name: 'Brightening Cream', slug: 'brightening-cream', description: 'Tone evening radiance creams.' },
  { name: 'Anti Aging Cream', slug: 'anti-aging-cream', description: 'Line smoothing peptide matrices.' },
  { name: 'Body Lotion', slug: 'body-lotion', description: 'Silken body moisture locks.' },
  { name: 'Body Wash', slug: 'body-wash', description: 'Refreshing aromatic shower gels.' },
  { name: 'Shampoo', slug: 'shampoo', description: 'Scalp optimizing clarifying shampoos.' },
  { name: 'Conditioner', slug: 'conditioner', description: 'Deep nourishing hair conditioners.' },
  { name: 'Hair Serum', slug: 'hair-serum', description: 'Frizz control and hair gloss elixirs.' },
  { name: 'Hair Oil', slug: 'hair-oil', description: 'Traditional root nourishing treatments.' }
];

const imagePool = [
  'https://images.unsplash.com/photo-1608248597481-496100c80836?w=600&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=600&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1617897903246-719242758050?w=600&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=600&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1601049676099-e7ed07d825b0?w=600&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=600&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&auto=format&fit=crop&q=60'
];

const productAdjectives = ['Advanced', 'Ultimate', 'Pure', 'Luminous', 'Hydra-Intense', 'Restorative', 'Ceramide-Infused', 'Clarifying', 'Deep Renewal', 'Bio-Active'];
const skinTypes = ['Dry', 'Oily', 'Sensitive', 'Combination', 'Normal'];
const ingredientsPool = [
  'Hyaluronic Acid', 'Niacinamide', 'Retinol', 'Vitamin C', 'Salicylic Acid', 'Ceramides', 
  'Squalane', 'Centella Asiatica', 'Peptides', 'Green Tea Extract', 'Panthenol', 'Glycolic Acid', 
  'Tea Tree Oil', 'Shea Butter', 'Bakuchiol', 'Coenzyme Q10', 'Allantoin', 'Glycerin'
];

const generateProducts = () => {
  const products = [];
  let skuCounter = 1000;

  categoriesData.forEach(cat => {
    // Generate 3 products per category to get 75 total products (covers the 60+ requirement)
    for (let i = 1; i <= 3; i++) {
      const adj = productAdjectives[Math.floor(Math.random() * productAdjectives.length)];
      const name = `Reeks Store ${adj} ${cat.name} v${i}`;
      skuCounter++;
      const sku = `RKST-${cat.name.substring(0,3).toUpperCase()}-${skuCounter}`;
      
      const price = (Math.floor(10 + Math.random() * 40)) * 100 - 1;
      const discount = Math.random() > 0.5 ? Math.floor(5 + Math.random() * 25) : 0;
      const finalPrice = discount > 0 ? Math.round(price * (1 - discount / 100)) : price;
      
      // Randomly select 2-4 skin types
      const pSkinTypes = [];
      const numSkinTypes = 2 + Math.floor(Math.random() * 3);
      while(pSkinTypes.length < numSkinTypes) {
        const t = skinTypes[Math.floor(Math.random() * skinTypes.length)];
        if (!pSkinTypes.includes(t)) pSkinTypes.push(t);
      }

      // Randomly select 3-5 ingredients
      const pIng = [];
      const numIng = 3 + Math.floor(Math.random() * 3);
      while(pIng.length < numIng) {
        const ing = ingredientsPool[Math.floor(Math.random() * ingredientsPool.length)];
        if (!pIng.includes(ing)) pIng.push(ing);
      }

      // Select 2 images from the pool
      const img1 = imagePool[(skuCounter) % imagePool.length];
      const img2 = imagePool[(skuCounter + 1) % imagePool.length];

      products.push({
        name,
        sku,
        description: `Experience the future of dermatology with Reeks Store\'s ${name.toLowerCase()}. Formulated in Switzerland, this luxury blend utilizes micro-encapsulation technology to deliver active molecules deep within the skin layers. Perfect for daily incorporation to achieve a glass-like skin finish.`,
        ingredients: pIng,
        skinType: pSkinTypes,
        usage: `Apply 3-4 drops to cleansed, damp skin morning and night. Gently press into the face and neck until fully absorbed, following with your custom Reeks Store moisturizer.`,
        benefits: [
          `Enhances skin barrier function and hydration retention by up to 200%.`,
          `Noticeably refines pores and smooths uneven skin texture within 14 days.`,
          `Protects against urban pollutants and oxidative stress factors.`
        ],
        rating: parseFloat((4.0 + Math.random() * 1.0).toFixed(1)),
        numReviews: Math.floor(5 + Math.random() * 120),
        price,
        discount,
        finalPrice,
        couponEligible: true,
        stock: Math.floor(10 + Math.random() * 150),
        category: cat.name,
        brand: 'Reeks Store',
        images: [img1, img2],
        isNewArrival: Math.random() > 0.7,
        isBestSeller: Math.random() > 0.7
      });
    }
  });

  return products;
};

const seedMockDatabase = () => {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  // Categories
  fs.writeFileSync(path.join(DATA_DIR, 'categories.json'), JSON.stringify(categoriesData, null, 2));
  console.log('Mock Categories seeded.');

  // Products
  const products = generateProducts();
  fs.writeFileSync(path.join(DATA_DIR, 'products.json'), JSON.stringify(products, null, 2));
  console.log(`${products.length} Mock Products seeded.`);

  // Users
  const users = [
    {
      _id: 'admin-mock-id-12345',
      name: 'Reeks Store Executive Admin',
      email: 'admin@reeksstore.com',
      password: 'adminpassword123',
      role: 'admin',
      isVerified: true,
      addresses: []
    },
    {
      _id: 'customer-mock-id-12345',
      name: 'Slick Skincare Dev',
      email: 'user@reeksstore.com',
      password: 'userpassword123',
      role: 'user',
      isVerified: true,
      addresses: [
        {
          _id: 'addr-mock-id-12345',
          name: 'Slick Skincare Dev',
          phone: '+1 555 123 4567',
          street: '123 Aurora Glass Way',
          city: 'San Francisco',
          state: 'CA',
          zipCode: '94105',
          country: 'United States',
          isDefault: true
        }
      ]
    }
  ];
  fs.writeFileSync(path.join(DATA_DIR, 'users.json'), JSON.stringify(users, null, 2));
  console.log('Mock Users seeded.');

  // Coupons
  const coupons = [
    { _id: 'c1', code: 'WELCOME20', discountPercentage: 20, expiryDate: '2028-12-31', minOrderAmount: 1000, maxDiscountAmount: 300, usageLimit: 100, usageCount: 0, isActive: true },
    { _id: 'c2', code: 'SKIN10', discountPercentage: 10, expiryDate: '2028-12-31', minOrderAmount: 500, maxDiscountAmount: 150, usageLimit: 100, usageCount: 0, isActive: true },
    { _id: 'c3', code: 'FIRSTORDER', discountPercentage: 15, expiryDate: '2028-12-31', minOrderAmount: 0, usageLimit: 100, usageCount: 0, isActive: true },
    { _id: 'c4', code: 'SUMMER25', discountPercentage: 25, expiryDate: '2028-09-01', minOrderAmount: 2000, maxDiscountAmount: 500, usageLimit: 100, usageCount: 0, isActive: true },
    { _id: 'c5', code: 'BUY2GET1', discountPercentage: 33, expiryDate: '2028-12-31', minOrderAmount: 1500, usageLimit: 100, usageCount: 0, isActive: true }
  ];
  fs.writeFileSync(path.join(DATA_DIR, 'coupons.json'), JSON.stringify(coupons, null, 2));
  console.log('Mock Coupons seeded.');

  // Notifications
  const notifications = [
    {
      _id: 'n1',
      user: 'customer-mock-id-12345',
      title: 'Welcome to Reeks Store',
      message: 'Welcome to the premium skincare universe of Reeks Store. Take the AI Quiz to start your routine.',
      read: false,
      createdAt: new Date().toISOString()
    },
    {
      _id: 'n2',
      user: 'customer-mock-id-12345',
      title: 'Claim Your Welcome Gift',
      message: 'Use coupon code WELCOME20 to get 20% off your first luxury order above ₹1,000.',
      read: false,
      createdAt: new Date().toISOString()
    }
  ];
  fs.writeFileSync(path.join(DATA_DIR, 'notifications.json'), JSON.stringify(notifications, null, 2));
  console.log('Mock Notifications seeded.');

  // Reviews
  const reviews = [];
  for (let i = 0; i < 5; i++) {
    const prod = products[i];
    reviews.push({
      _id: `rev-${i}`,
      user: 'customer-mock-id-12345',
      userName: 'Slick Skincare Dev',
      product: prod._id || `mock-p-${i}`,
      rating: 5,
      title: 'Absolutely Life-Changing',
      comment: 'This product completely transformed my skin texture in just a week! The glassmorphic aesthetic of the bottle matches the glow it gives my face. 10/10 recommendation.',
      verifiedPurchase: true,
      createdAt: new Date().toISOString()
    });
  }
  fs.writeFileSync(path.join(DATA_DIR, 'reviews.json'), JSON.stringify(reviews, null, 2));
  console.log('Mock Reviews seeded.');
  console.log('Mock database files created successfully!');
};

const seedDatabase = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/reeksstore');
    console.log(`Connected to database: ${conn.connection.host}`);

    await User.deleteMany({});
    await Product.deleteMany({});
    await Category.deleteMany({});
    await Coupon.deleteMany({});
    await Order.deleteMany({});
    await Review.deleteMany({});
    await Notification.deleteMany({});

    console.log('Database cleared.');

    await Category.insertMany(categoriesData);
    console.log('Categories seeded.');

    const products = generateProducts();
    const seededProducts = await Product.insertMany(products);
    console.log(`${seededProducts.length} Products seeded.`);

    const adminUser = await User.create({
      name: 'Reeks Store Executive Admin',
      email: 'admin@reeksstore.com',
      password: 'adminpassword123',
      role: 'admin',
      isVerified: true
    });
    console.log('Admin user seeded: admin@reeksstore.com / adminpassword123');

    const customerUser = await User.create({
      name: 'Slick Skincare Dev',
      email: 'user@reeksstore.com',
      password: 'userpassword123',
      role: 'user',
      isVerified: true,
      addresses: [
        {
          name: 'Slick Skincare Dev',
          phone: '+1 555 123 4567',
          street: '123 Aurora Glass Way',
          city: 'San Francisco',
          state: 'CA',
          zipCode: '94105',
          country: 'United States',
          isDefault: true
        }
      ]
    });
    console.log('Customer user seeded: user@reeksstore.com / userpassword123');

    const coupons = [
      { code: 'WELCOME20', discountPercentage: 20, expiryDate: new Date('2028-12-31'), minOrderAmount: 1000, maxDiscountAmount: 300 },
      { code: 'SKIN10', discountPercentage: 10, expiryDate: new Date('2028-12-31'), minOrderAmount: 500, maxDiscountAmount: 150 },
      { code: 'FIRSTORDER', discountPercentage: 15, expiryDate: new Date('2028-12-31'), minOrderAmount: 0 },
      { code: 'SUMMER25', discountPercentage: 25, expiryDate: new Date('2028-09-01'), minOrderAmount: 2000, maxDiscountAmount: 500 },
      { code: 'BUY2GET1', discountPercentage: 33, expiryDate: new Date('2028-12-31'), minOrderAmount: 1500 }
    ];
    await Coupon.insertMany(coupons);
    console.log('Coupons seeded.');

    await Notification.create([
      {
        user: customerUser._id,
        title: 'Welcome to Reeks Store',
        message: 'Welcome to the premium skincare universe of Reeks Store. Take the AI Quiz to start your routine.'
      },
      {
        user: customerUser._id,
        title: 'Claim Your Welcome Gift',
        message: 'Use coupon code WELCOME20 to get 20% off your first luxury order above ₹1,000.'
      }
    ]);
    console.log('Mock notifications seeded.');

    for (let i = 0; i < 5; i++) {
      const prod = seededProducts[i];
      await Review.create({
        user: customerUser._id,
        userName: customerUser.name,
        product: prod._id,
        rating: 5,
        title: 'Absolutely Life-Changing',
        comment: 'This product completely transformed my skin texture in just a week! The glassmorphic aesthetic of the bottle matches the glow it gives my face. 10/10 recommendation.',
        verifiedPurchase: true
      });
    }
    console.log('Mock reviews seeded and aggregates calculated.');

    console.log('Database seeding successfully finished!');
    process.exit(0);
  } catch (error) {
    console.warn(`MongoDB Connection Failed: ${error.message}`);
    console.warn('Falling back to local JSON database seeding...');
    seedMockDatabase();
    console.log('Database seeding successfully finished!');
    process.exit(0);
  }
};

seedDatabase();
