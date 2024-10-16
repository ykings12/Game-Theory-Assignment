const express = require('express');
const { 
  registerUser, 
  loginUser, 
  getUser, 
  getAllUsers,
  logoutUser 
} = require('../controllers/userController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

// Register a new user
router.post('/register', registerUser);

// Login a user
router.post('/login', loginUser);

// Get user profile (Protected route)
router.get('/profile', authMiddleware, getUser);

// Get all users (Admin only)
router.get('/users', authMiddleware, getAllUsers); // Protected route for admins

// Logout user
router.post('/logout', logoutUser); // Optional logout route

module.exports = router;
