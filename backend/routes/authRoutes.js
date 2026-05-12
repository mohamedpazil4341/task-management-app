// ============================================
// Auth Routes — API Endpoints for Authentication
// ============================================
// Defines the URL paths for auth-related operations.
// Maps each route to its controller function.

const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { validateRegister, validateLogin } = require('../middleware/validate');

// Public routes (no authentication needed)
router.post('/register', validateRegister, registerUser);
router.post('/login', validateLogin, loginUser);

// Private routes (authentication required)
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

module.exports = router;
