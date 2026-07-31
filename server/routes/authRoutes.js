import express from 'express';
import {
  registerUser,
  verifyEmail,
  loginUser,
  googleLogin,
  forgotPassword,
  resetPassword,
  getUserProfile,
  updateUserProfile,
  addAddress,
  updateAddress,
  deleteAddress
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.get('/verify', verifyEmail);
router.post('/login', loginUser);
router.post('/google-login', googleLogin);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.route('/address')
  .post(protect, addAddress);

router.route('/address/:id')
  .put(protect, updateAddress)
  .delete(protect, deleteAddress);

export default router;
