const express = require('express');
const router = express.Router();

// Fix the path: remove the backtick and use correct casing
const paymentController = require('../Controllers/payment.controller');  
const { authenticate, authorizeRole } = require('../Middlewares/users.middleware');

// Assessor (authenticated) can create payment
router.post('/', authenticate, authorizeRole('assessor'), paymentController.create);

// Admin-only routes
router.get('/:id', authenticate, authorizeRole('admin'), paymentController.getById);
router.put('/:id/status', authenticate, authorizeRole('admin'), paymentController.updateStatus);
router.delete('/:id', authenticate, authorizeRole('admin'), paymentController.delete);

module.exports = router;
