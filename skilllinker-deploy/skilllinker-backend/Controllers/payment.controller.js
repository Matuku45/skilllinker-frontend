const paymentService = require('../Services/payment.service');

module.exports = {

  // Create a new payment (POST /payments)
  create: async (req, res) => {
    try {
      // Destructure and validate required body parameters
      const { payeeUserId, jobId, amount, paymentMethod } = req.body;
      
      // Assumes authentication middleware sets req.user
      const payerUserId = req.user.id; 

      const payment = await paymentService.createPayment({
        payerUserId,
        payeeUserId,
        jobId,
        amount,
        paymentMethod
      });

      res.status(201).json({ message: 'Payment created successfully.', payment });

    } catch (err) {
      let statusCode = 400;
      const errorMessage = err.message;

      // Custom error status code mapping
      if (errorMessage.includes('Authentication failed')) {
        statusCode = 401;
      } else if (errorMessage.includes('Transaction authorization failed')) {
        statusCode = 403;
      } else if (errorMessage.includes('not found') || errorMessage.includes('The referenced Job ID')) {
        statusCode = 404;
      }

      res.status(statusCode).json({ error: 'Payment initiation failed.', details: errorMessage });
    }
  },

  // Get all payments (GET /payments)
getAll: async (req, res) => {
    try {
      const payments = await paymentService.getAllPayments();
      res.json(payments);
    } catch (err) {
      // If paymentService.getAllPayments throws a model association error, 
      // it is caught here and returned as a 500 error, matching your log.
      res.status(500).json({ error: 'Failed to retrieve payment records.', details: err.message });
    }
  },

  // Get a payment by ID (GET /payments/:id)
  getById: async (req, res) => {
    try {
      const id = req.params.id;
      const payment = await paymentService.getPaymentById(id);
      
      if (!payment) {
        return res.status(404).json({ error: 'Payment lookup failed.', details: `Payment with ID ${id} not found.` });
      }
      
      res.json(payment);
    } catch (err) {
      // A general catch for service errors, often 404 is appropriate if not found
      res.status(404).json({ error: 'Payment lookup failed.', details: err.message });
    }
  },

  // Update payment status (PUT /payments/:id/status)
  updateStatus: async (req, res) => {
    try {
      const id = req.params.id;
      const { status } = req.body;

      const updated = await paymentService.updatePaymentStatus(id, status);

      res.json({ message: 'Payment status updated successfully.', updated });
    } catch (err) {
      res.status(400).json({ error: 'Failed to update payment status.', details: err.message });
    }
  },

  // Delete a payment (DELETE /payments/:id)
  delete: async (req, res) => {
    try {
      const id = req.params.id;
      await paymentService.deletePayment(id);
      res.json({ message: 'Payment record deleted successfully.' });
    } catch (err) {
      res.status(400).json({ error: 'Failed to delete payment record.', details: err.message });
    }
  }
};