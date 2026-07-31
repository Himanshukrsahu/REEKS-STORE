import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  image: { type: String },
  createdAt: { type: Date, default: Date.now }
});

import { getModel } from '../utils/dbWrapper.js';

const Category = getModel('Category', categorySchema);
export default Category;
