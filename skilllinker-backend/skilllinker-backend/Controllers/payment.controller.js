const paymentService = require('../services/payment.service');

module.exports = {
  // POST /payments — create a payment
  create: async (req, res) => {
    try {
      const { payeeUserId, jobId, amount, paymentMethod } = req.body;
      const payerUserId = req.user.id;  // from authenticate
      const payment = await paymentService.createPayment({
        payerUserId,
        payeeUserId,
        jobId,
        amount,
        paymentMethod
      });
      res.status(201).json({ message: 'Payment created', payment });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // GET /payments/:id — view a payment (admin only)
  getById: async (req, res) => {
    try {
      const id = req.params.id;
      const payment = await paymentService.getPaymentById(id);
      res.json(payment);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  },

  // PUT /payments/:id/status — update payment status (admin only)
  updateStatus: async (req, res) => {
    try {
      const id = req.params.id;
      const { status } = req.body;
      const updated = await paymentService.updatePaymentStatus(id, status);
      res.json({ message: 'Payment status updated', updated });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // DELETE /payments/:id — delete a payment (admin only)
  delete: async (req, res) => {
    try {
      const id = req.params.id;
      await paymentService.deletePayment(id);
      res.json({ message: 'Payment deleted' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};
