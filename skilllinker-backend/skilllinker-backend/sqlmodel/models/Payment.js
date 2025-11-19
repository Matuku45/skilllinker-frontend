const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Job = require('./Job');

const Payment = sequelize.define('Payment', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  payerUserId: { 
    type: DataTypes.INTEGER, 
    allowNull: false,
    references: { model: User, key: 'id' }
  },
  payeeUserId: { 
    type: DataTypes.INTEGER, 
    allowNull: false,
    references: { model: User, key: 'id' }
  },
  jobId: { 
    type: DataTypes.INTEGER, 
    allowNull: true,
    references: { model: Job, key: 'id' }
  },
  amount: { 
    type: DataTypes.DECIMAL(12, 2), 
    allowNull: false 
  },
  paymentMethod: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  status: { 
    type: DataTypes.ENUM('pending', 'completed', 'refunded'), 
    defaultValue: 'pending' 
  },
  createdAt: { 
    type: DataTypes.DATE, 
    defaultValue: DataTypes.NOW 
  },
  updatedAt: { 
    type: DataTypes.DATE, 
    allowNull: true 
  }
}, {
  tableName: 'payments',
  timestamps: true
});

// Associations:
User.hasMany(Payment, { foreignKey: 'payerUserId', as: 'paymentsMade' });
User.hasMany(Payment, { foreignKey: 'payeeUserId', as: 'paymentsReceived' });
Payment.belongsTo(User, { foreignKey: 'payerUserId', as: 'payer' });
Payment.belongsTo(User, { foreignKey: 'payeeUserId', as: 'payee' });

Job.hasMany(Payment, { foreignKey: 'jobId' });
Payment.belongsTo(Job, { foreignKey: 'jobId' });

module.exports = Payment;
