import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Route Imports
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import couponRoutes from './routes/couponRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';

// Model Imports (for populating orders, etc.)
import Order from './models/Order.js';
import { generateInvoiceHtml } from './utils/pdfGenerator.js';
import { protect } from './middleware/authMiddleware.js';

dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middlewares
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/notifications', notificationRoutes);

// Invoice PDF/HTML download API endpoint
app.get('/api/orders/:id/invoice', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const html = generateInvoiceHtml(order);
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Root API Check
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reeksto API Gateway</title>
      <style>
        body {
          background-color: #030308;
          color: #f8fafc;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          margin: 0;
          text-align: center;
        }
        .container {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(16px);
          padding: 3rem;
          border-radius: 24px;
          max-width: 450px;
        }
        h1 {
          font-size: 2rem;
          font-weight: 900;
          margin-bottom: 1rem;
          letter-spacing: -0.05em;
        }
        p {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.65);
          line-height: 1.6;
          margin-bottom: 2rem;
        }
        a {
          display: inline-block;
          background: #f8fafc;
          color: #030308;
          text-decoration: none;
          padding: 0.8rem 2rem;
          border-radius: 12px;
          font-weight: 700;
          font-size: 0.85rem;
          transition: opacity 0.2s;
        }
        a:hover {
          opacity: 0.9;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Reeksto API Gateway</h1>
        <p>The premium Swiss molecular skincare back-end service is running successfully on Port 5000.</p>
        <a href="http://localhost:3000">Enter Reeksto Storefront</a>
      </div>
    </body>
    </html>
  `);
});

// Error handling Middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
