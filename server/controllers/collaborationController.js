import BrandCollaboration from '../models/BrandCollaboration.js';

// Create brand collaboration application
export const createCollaboration = async (req, res) => {
  try {
    const {
      brandName,
      contactPerson,
      brandEmail,
      contactNumber,
      companyWebsite,
      brandCategory,
      monthlyPromotionBudget,
      expectedDuration,
      collaborationType,
      additionalMessage
    } = req.body;

    // Validation
    if (!brandName || !contactPerson || !brandEmail || !contactNumber) {
      return res.status(400).json({ message: 'Please fill in all required fields' });
    }

    const collaboration = await BrandCollaboration.create({
      brandName,
      contactPerson,
      brandEmail,
      contactNumber,
      companyWebsite,
      brandCategory,
      monthlyPromotionBudget,
      expectedDuration,
      collaborationType,
      additionalMessage
    });

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully!',
      data: collaboration
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
