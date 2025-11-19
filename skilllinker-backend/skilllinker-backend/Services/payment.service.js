const { Payment, User, Job } = require('../sqlmodel/models');

const paymentService = {
  // Create a new payment
  createPayment: async ({ payerUserId, payeeUserId, jobId, amount, paymentMethod }) => {
    const payer = await User.findByPk(payerUserId);
    const payee = await User.findByPk(payeeUserId);
    if (!payer) {
      throw new Error('Payer not found');
    }
    if (!payee) {
      throw new Error('Payee not found');
    }

    // Optional: only allow assessors to create payments
    if (payer.userType !== 'assessor') {
      throw new Error('Only assessors can create payments');
    }

    // If jobId is provided, check the job exists
    if (jobId) {
      const job = await Job.findByPk(jobId);
      if (!job) throw new Error('Job not found');
    }

    const payment = await Payment.create({
      payerUserId,
      payeeUserId,
      jobId,
      amount,
      paymentMethod,
      status: 'pending'
    });

    return payment;
  },

  // Get a payment by its ID
  getPaymentById: async (id) => {
    const payment = await Payment.findByPk(id, {
      include: [
        { model: User, as: 'payer' },
        { model: User, as: 'payee' },
        { model: Job }
      ]
    });
    if (!payment) throw new Error('Payment not found');
    return payment;
  },

  // Admin-only: update the status of a payment
  updatePaymentStatus: async (id, status) => {
    const payment = await Payment.findByPk(id);
    if (!payment) throw new Error('Payment not found');
    payment.status = status;
    await payment.save();
    return payment;
  },

  // Admin-only: delete payment
  deletePayment: async (id) => {
    const payment = await Payment.findByPk(id);
    if (!payment) throw new Error('Payment not found');
    await payment.destroy();
    return;
  }
};

module.exports = paymentService;
