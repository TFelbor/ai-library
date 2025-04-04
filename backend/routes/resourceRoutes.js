import express from 'express';
import jwt from 'jsonwebtoken';
import { isAdmin } from '../middleware/auth.js';
import {
  submitResource,
  getPendingResources,
  getApprovedResources,
  verifyResource
} from '../controllers/resourceController.js';

const router = express.Router();

// Admin token generator - make sure this is the first route
router.get('/generate-admin-token', (req, res) => {
  try {
    const token = jwt.sign({ isAdmin: true }, process.env.JWT_SECRET);
    console.log('Generated admin token'); // Debug log
    res.json({ token });
  } catch (error) {
    console.error('Token generation error:', error);
    res.status(500).json({ message: 'Failed to generate token' });
  }
});

// Public routes
router.post('/submit', submitResource);
router.get('/approved', getApprovedResources);

// Admin routes
router.get('/pending', isAdmin, getPendingResources);
router.post('/:id/verify', isAdmin, verifyResource);

export default router;
