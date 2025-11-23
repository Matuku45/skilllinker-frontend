const express = require('express');
const router = express.Router();

const paymentController = require('../Controllers/payment.controller');
const { authenticate, authorizeRole } = require('../Middlewares/users.middleware');

router.post('/', authenticate, authorizeRole('assessor'), paymentController.create);


router.get('/', authenticate, paymentController.getAll);
router.get('/:id', authenticate, authorizeRole('admin'), paymentController.getById);
router.put('/:id/status', authenticate, authorizeRole('admin'), paymentController.updateStatus);
router.delete('/:id', authenticate, authorizeRole('admin'), paymentController.delete);

module.exports = router;