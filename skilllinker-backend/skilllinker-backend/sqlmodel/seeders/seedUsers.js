require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

// 1️⃣ Initialize Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false,
  }
);

// 2️⃣ Define models

// Users
const User = sequelize.define('User', {
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: true },
  verified: { type: DataTypes.BOOLEAN, defaultValue: false },
  userType: { type: DataTypes.ENUM('assessor','moderator','sdp','admin'), allowNull: false },
  agreeToTerms: { type: DataTypes.BOOLEAN, defaultValue: false },
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

// Jobs
const Job = sequelize.define('Job', {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  sdpId: { type: DataTypes.INTEGER, allowNull: false },
  location: { type: DataTypes.STRING },
  budget: { type: DataTypes.DECIMAL(12,2) },
  status: { type: DataTypes.ENUM('open','in-progress','closed'), defaultValue: 'open' },
  requiredQualifications: { type: DataTypes.JSON },
  postedDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  deadline: { type: DataTypes.DATE, allowNull: true },
}, {
  tableName: 'jobs',
  timestamps: true
});

// Payments
const Payment = sequelize.define('Payment', {
  payerUserId: { type: DataTypes.INTEGER, allowNull: false },
  payeeUserId: { type: DataTypes.INTEGER, allowNull: false },
  jobId: { type: DataTypes.INTEGER, allowNull: true },
  amount: { type: DataTypes.DECIMAL(12,2), allowNull: false },
  paymentMethod: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.ENUM('pending','completed','refunded'), defaultValue: 'pending' },
}, {
  tableName: 'payments',
  timestamps: true
});

// Resumes
const Resume = sequelize.define('Resume', {
  userId: { type: DataTypes.INTEGER, allowNull: false },
  filename: { type: DataTypes.STRING, allowNull: false },
  mimetype: { type: DataTypes.STRING, allowNull: false },
  data: { type: DataTypes.BLOB('long'), allowNull: false },
  description: { type: DataTypes.STRING, allowNull: true },
}, {
  tableName: 'resumes',
  timestamps: true
});

// 3️⃣ Define associations
User.hasMany(Payment, { foreignKey: 'payerUserId', as: 'paymentsMade' });
User.hasMany(Payment, { foreignKey: 'payeeUserId', as: 'paymentsReceived' });
Payment.belongsTo(User, { foreignKey: 'payerUserId', as: 'payer' });
Payment.belongsTo(User, { foreignKey: 'payeeUserId', as: 'payee' });

Job.hasMany(Payment, { foreignKey: 'jobId' });
Payment.belongsTo(Job, { foreignKey: 'jobId' });

User.hasMany(Resume, { foreignKey: 'userId', as: 'resumes' });
Resume.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// 4️⃣ Seed function
async function seedAll() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');

    // Sync models (alter without dropping)
    await sequelize.sync({ alter: true });
    console.log('🗄 Models synced');

    // Users
    const usersData = [
      { firstName: 'Alice', lastName: 'Smith', email: 'aliSDFce@example.com', password: 'password1', userType: 'assessor', agreeToTerms: true, phone: '1234567890', verified: true },
      { firstName: 'Bob', lastName: 'Johnson', email: 'boSDFb@example.com', password: 'password2', userType: 'moderator', agreeToTerms: true, phone: '2345678901', verified: false },
      { firstName: 'Charlie', lastName: 'Brown', email: 'chaSDFSDrlie@example.com', password: 'password3', userType: 'sdp', agreeToTerms: true, phone: '3456789012', verified: false },
      { firstName: 'Admin', lastName: 'User', email: 'admDFGin@example.com', password: 'adminpass', userType: 'admin', agreeToTerms: true, verified: true }
    ];

    for (const u of usersData) {
      const [user, created] = await User.findOrCreate({
        where: { email: u.email },
        defaults: { ...u, password: await bcrypt.hash(u.password, 10) }
      });
      if (created) console.log(`✅ User created: ${u.email}`);
      else console.log(`⏩ User already exists: ${u.email}`);
    }

    // Jobs
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
      const [job, created] = await Job.findOrCreate({
        where: { title: j.title },
        defaults: j
      });
      if (created) console.log(`✅ Job created: ${j.title}`);
      else console.log(`⏩ Job already exists: ${j.title}`);
    }

    // Payments
    const paymentsData = [
      { payerUserId: 1, payeeUserId: 3, jobId: 1, amount: 1000.00, paymentMethod: 'bank_transfer', status: 'pending' }
    ];

    for (const p of paymentsData) {
      const [payment, created] = await Payment.findOrCreate({
        where: { payerUserId: p.payerUserId, payeeUserId: p.payeeUserId, jobId: p.jobId },
        defaults: p
      });
      if (created) console.log(`✅ Payment created: ${p.payerUserId} → ${p.payeeUserId}`);
      else console.log(`⏩ Payment already exists: ${p.payerUserId} → ${p.payeeUserId}`);
    }

    // Resumes
    const resumesData = [
      { userId: 1, filename: 'alice_resume.pdf', mimetype: 'application/pdf', data: Buffer.from('Sample Resume'), description: 'Alice resume' }
    ];

    for (const r of resumesData) {
      const [resume, created] = await Resume.findOrCreate({
        where: { filename: r.filename },
        defaults: r
      });
      if (created) console.log(`✅ Resume created: ${r.filename}`);
      else console.log(`⏩ Resume already exists: ${r.filename}`);
    }

    console.log('🎉 Seeding completed successfully');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error in seedAll:', err);
    process.exit(1);
  }
}

seedAll();
