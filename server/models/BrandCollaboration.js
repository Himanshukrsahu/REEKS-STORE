import mongoose from 'mongoose';

const brandCollaborationSchema = new mongoose.Schema({
  brandName: { type: String, required: true },
  contactPerson: { type: String, required: true },
  brandEmail: { type: String, required: true },
  contactNumber: { type: String, required: true },
  companyWebsite: { type: String },
  brandCategory: { type: String },
  monthlyPromotionBudget: { type: String },
  expectedDuration: { type: String },
  collaborationType: { type: String },
  additionalMessage: { type: String },
  createdAt: { type: Date, default: Date.now }
});

import { getModel } from '../utils/dbWrapper.js';

const BrandCollaboration = getModel('BrandCollaboration', brandCollaborationSchema);
export default BrandCollaboration;
