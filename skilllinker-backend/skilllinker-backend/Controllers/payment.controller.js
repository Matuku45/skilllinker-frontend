const paymentService = require('../services/payment.service');

module.exports = {
  /**
   * Creates a new payment.
   * POST /payments
   */
  create: async (req, res) => {
    try {
      const { payeeUserId, jobId, amount, paymentMethod } = req.body;
      const payerUserId = req.user.id;  // Assumed to be set by authentication middleware
      
      const payment = await paymentService.createPayment({
        payerUserId,
        payeeUserId,
        jobId,
        amount,
        paymentMethod
      });
      
      // Updated success message
      res.status(201).json({ message: 'Payment created successfully.', payment });
      
    } catch (err) {
      const errorMessage = err.message;
      let statusCode = 400; // Default to Bad Request for general validation errors
      
      // Map user-friendly service errors to appropriate HTTP status codes
      if (errorMessage.includes('Authentication failed')) {
        statusCode = 401; // Unauthorized: User ID not found or session invalid
      } else if (errorMessage.includes('Transaction authorization failed')) {
        statusCode = 403; // Forbidden: User role (not 'assessor') is incorrect
      } else if (errorMessage.includes('not found') || errorMessage.includes('The referenced Job ID')) {
        statusCode = 404; // Not Found: Resource ID (Payee or Job) in payload is invalid
      }
      
      // Return a standardized error object
      res.status(statusCode).json({ 
        error: 'Payment initiation failed.', 
        details: errorMessage // Provides the user-friendly message
      });
    }
  },

  /**
   * Retrieves all payment records.
   * GET /payments
   */
  getAll: async (req, res) => {
    try {
      const payments = await paymentService.getAllPayments();
      res.json(payments);
    } catch (err) {
      // Use 500 for server-side error if the service failed
      res.status(500).json({ error: 'Failed to retrieve payment records.', details: err.message });
    }
  },

  /**
   * Retrieves a single payment record by ID.
   * GET /payments/:id
   */
  getById: async (req, res) => {
    try {
      const id = req.params.id;
      const payment = await paymentService.getPaymentById(id);
      res.json(payment);
    } catch (err) {
      // Assuming service throws 'Payment record not found.'
      res.status(404).json({ error: 'Payment lookup failed.', details: err.message });
    }
  },

  /**
   * Updates the status of a payment.
   * PUT /payments/:id/status
   */
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

  /**
   * Deletes a payment record.
   * DELETE /payments/:id
   */
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