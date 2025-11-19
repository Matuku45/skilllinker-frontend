require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

// 1. Initialize Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false
  }
);

// 2. Define User model (now with 'admin' as a userType)
const User = sequelize.define('User', {
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: true },
  verified: { type: DataTypes.BOOLEAN, defaultValue: false },
  userType: { type: DataTypes.ENUM('assessor','moderator','sdp','admin'), allowNull: false },
  agreeToTerms: { type: DataTypes.BOOLEAN, defaultValue: false }
}, {
  tableName: 'users',
  timestamps: true,
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        user.password = await bcrypt.hash(user.password, 10);
      }
    }
  }
});

// 3. Define Job model
const Job = sequelize.define('Job', {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  sdpId: { type: DataTypes.INTEGER, allowNull: false },
  location: { type: DataTypes.STRING },
  budget: { type: DataTypes.DECIMAL(12, 2) },
  status: { type: DataTypes.ENUM('open', 'in-progress', 'closed'), defaultValue: 'open' },
  requiredQualifications: { type: DataTypes.JSON },
  postedDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  deadline: { type: DataTypes.DATE, allowNull: true }
}, {
  tableName: 'jobs',
  timestamps: true
});

// 4. Define Payment model
const Payment = sequelize.define('Payment', {
  payerUserId: { type: DataTypes.INTEGER, allowNull: false },
  payeeUserId: { type: DataTypes.INTEGER, allowNull: false },
  jobId: { type: DataTypes.INTEGER, allowNull: true },
  amount: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
  paymentMethod: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.ENUM('pending', 'completed', 'refunded'), defaultValue: 'pending' }
}, {
  tableName: 'payments',
  timestamps: true
});

// 5. Define associations
User.hasMany(Payment, { foreignKey: 'payerUserId', as: 'paymentsMade' });
User.hasMany(Payment, { foreignKey: 'payeeUserId', as: 'paymentsReceived' });
Payment.belongsTo(User, { foreignKey: 'payerUserId', as: 'payer' });
Payment.belongsTo(User, { foreignKey: 'payeeUserId', as: 'payee' });

Job.hasMany(Payment, { foreignKey: 'jobId' });
Payment.belongsTo(Job, { foreignKey: 'jobId' });

// 6. Seed function
async function seedAll() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');

    // Sync all models
    await sequelize.sync({ alter: true });
    console.log('🗄 Models synced');

    // Seed Users
    const usersData = [
      { firstName: 'Alicsdfe', lastName: 'Smith', email: 'asdflice@example.com', password: 'password1', userType: 'assessor', agreeToTerms: true, phone: '1234567890', verified: true },
      { firstName: 'Bob', lastName: 'Johnson', email: 'bodsfb@example.com', password: 'password2', userType: 'moderator', agreeToTerms: true, phone: '2345678901', verified: false },
      { firstName: 'Charlie', lastName: 'Brown', email: 'chsdfarlie@example.com', password: 'password3', userType: 'sdp', agreeToTerms: true, phone: '3456789012', verified: false },
      { firstName: 'Admin', lastName: 'User', email: 'admsdfin@example.com', password: 'adminpass', userType: 'admin', agreeToTerms: true, verified: true }
    ];
    for (const u of usersData) {
      u.password = await bcrypt.hash(u.password, 10);
      await User.create(u);
    }
    console.log('✅ Users created');

    // Seed Jobs
    const jobsData = [
      {
        title: 'Assessment Services for IT Certification',
        description: 'Need qualified assessors for IT certification assessments.',
        sdpId: 3, // Charlie
        location: 'Johannesburg',
        budget: 5000,
        requiredQualifications: ['SETA Registered Assessor'],
        deadline: new Date('2025-03-01')
      }
    ];
    for (const j of jobsData) {
      await Job.create(j);
    }
    console.log('✅ Jobs created');

    // Seed Payments
    const paymentsData = [
      { payerUserId: 1, payeeUserId: 3, jobId: 1, amount: 1000.00, paymentMethod: 'bank_transfer', status: 'pending' }
    ];
    for (const p of paymentsData) {
      await Payment.create(p);
    }
    console.log('✅ Payments created');

    process.exit(0);
  } catch (err) {
    console.error('❌ Error in seedAll:', err);
    process.exit(1);
  }
}

seedAll();
