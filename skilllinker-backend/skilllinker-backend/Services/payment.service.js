// payment.service.js
// 🚨 FIX: Import the entire database object (db) instead of attempting to destructure the models directly.
const db = require('../sqlmodel/models'); 

// Access the models via the db object (or re-destructure them from db)
const Payment = db.Payment;
const User = db.User;
const Job = db.Job;

const paymentService = {
  // Create a new payment
  createPayment: async ({ payerUserId, payeeUserId, jobId, amount, paymentMethod }) => {
    // This function still needs User and Job models to perform checks before creation
    const payer = await User.findByPk(payerUserId);
    const payee = await User.findByPk(payeeUserId);
    
    // --- User-Friendly Error Messages ---
    
    // 1. Payer (Authenticated User) Check
    if (!payer) {
      throw new Error('Authentication failed. The initiating user account could not be identified.');
    }
    
    // 2. Payee (Recipient) Check
    if (!payee) {
      throw new Error('Payment recipient (Payee) not found. Please verify the Payee ID.');
    }

    // 3. Authorization (Role) Check
    if (payer.userType !== 'assessor') {
      throw new Error('Transaction authorization failed. Only users with the Assessor role can initiate payments.');
    }

    // 4. Job Existence Check
    if (jobId) {
      const job = await Job.findByPk(jobId);
      if (!job) throw new Error('The referenced Job ID was not found.');
    }

    // --- Creation ---
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

  // Get all payments (Admin Only)
  getAllPayments: async () => {
    // 🔥 MODIFIED: Removed the 'include' array entirely to prevent the 500 error 
    // caused by problematic model associations or setup.
    // The resulting data will only contain the columns from the Payment table (e.g., payerUserId, payeeUserId).
    const payments = await Payment.findAll({
      order: [['createdAt', 'DESC']]
    });
    return payments;
  },

  // Get a payment by its ID
  getPaymentById: async (id) => {
    // Note: The include array is also removed here to maintain consistency with the 'no relationship' request
    const payment = await Payment.findByPk(id); 
    // 5. Payment Existence Check
    if (!payment) throw new Error('Payment record not found.');
    return payment;
  },

  // Admin-only: update the status of a payment
  updatePaymentStatus: async (id, status) => {
    const payment = await Payment.findByPk(id);
    // 6. Payment Existence Check
    if (!payment) throw new Error('Payment record not found.');
    payment.status = status;
    await payment.save();
    return payment;
  },

  // Admin-only: delete payment
  deletePayment: async (id) => {
    const payment = await Payment.findByPk(id);
    // 7. Payment Existence Check
    if (!payment) throw new Error('Payment record not found.');
    await payment.destroy();
    return;
  }
};

module.exports = paymentService;