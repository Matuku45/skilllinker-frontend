require('dotenv').config({ path: __dirname + '/../../.env' });
// In seedPayments.js
const sequelize = require('../../config/database');
const Payment = require('../models/Payment');

async function seedPayments() {
  try {
    // Test DB connection
    await sequelize.authenticate();
    console.log('✅ Database connection successful');

    // Sync Payment table
    await Payment.sync({ alter: true });
    console.log('🗄 Payment table synced');

    // Seed sample payments
    const paymentsData = [
      {
        payerUserId: 1,
        payeeUserId: 2,
        jobId: 1,
        amount: 5000.00,
        paymentMethod: 'card',
        status: 'completed',
      },
      {
        payerUserId: 2,
        payeeUserId: 1,
        jobId: 2,
        amount: 7500.00,
        paymentMethod: 'paypal',
        status: 'pending',
      },
      {
        payerUserId: 1,
        payeeUserId: 3,
        jobId: null,
        amount: 1200.50,
        paymentMethod: 'bank transfer',
        status: 'refunded',
      },
    ];

    for (const payment of paymentsData) {
      const [record, created] = await Payment.findOrCreate({
        where: {
          payerUserId: payment.payerUserId,
          payeeUserId: payment.payeeUserId,
          jobId: payment.jobId,
        },
        defaults: payment,
      });

      console.log(`✅ Payment seeded: payerUserId=${record.payerUserId}, payeeUserId=${record.payeeUserId}, amount=${record.amount}`);
    }

    console.log('🎉 Payment seeding completed successfully');

  } catch (err) {
    console.error('❌ Error seeding payments:', err);
  } finally {
    await sequelize.close();
  }
}

seedPayments();