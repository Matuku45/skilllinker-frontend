const { Sequelize, DataTypes } = require('sequelize');

// 1️⃣ Database connection
const sequelize = new Sequelize('skilllinker', 'user', 'enJjGw5p51QV61J8gpMidKCMxYbeOlaq', {
  host: 'dpg-d4hn31khg0os738i4n40-a.oregon-postgres.render.com',
  port: 5432,
  dialect: 'postgres',
  logging: console.log,
});

// 2️⃣ Define models

// User model
const User = sequelize.define('User', {
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING },
  verified: { type: DataTypes.BOOLEAN, defaultValue: false },
  userType: { type: DataTypes.ENUM('assessor', 'moderator', 'sdp'), allowNull: false },
  agreeToTerms: { type: DataTypes.BOOLEAN, defaultValue: false }
}, { tableName: 'users', timestamps: true });

// Job model
const Job = sequelize.define('Job', {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  sdpId: { type: DataTypes.INTEGER, allowNull: false },
  location: { type: DataTypes.STRING },
  budget: { type: DataTypes.DECIMAL(12,2) },
  status: { type: DataTypes.ENUM('open', 'in-progress', 'closed'), defaultValue: 'open' },
  requiredQualifications: { type: DataTypes.JSON },
  postedDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  deadline: { type: DataTypes.DATE, allowNull: true }
}, { tableName: 'jobs', timestamps: true });

// Application model
const Application = sequelize.define('Application', {
  jobId: { type: DataTypes.INTEGER, allowNull: false },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  coverLetter: { type: DataTypes.TEXT, allowNull: true },
  status: { type: DataTypes.ENUM('pending', 'accepted', 'rejected'), defaultValue: 'pending' }
}, { tableName: 'applications', timestamps: true });

// Message model
const Message = sequelize.define('Message', {
  fromUserId: { type: DataTypes.INTEGER, allowNull: false },
  toUserId: { type: DataTypes.INTEGER, allowNull: false },
  jobId: { type: DataTypes.INTEGER, allowNull: true },
  content: { type: DataTypes.TEXT, allowNull: false },
  timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  read: { type: DataTypes.BOOLEAN, defaultValue: false }
}, { tableName: 'messages', timestamps: false });

// Payment model
const Payment = sequelize.define('Payment', {
  payerUserId: { type: DataTypes.INTEGER, allowNull: false },
  payeeUserId: { type: DataTypes.INTEGER, allowNull: false },
  jobId: { type: DataTypes.INTEGER, allowNull: true },
  amount: { type: DataTypes.DECIMAL(12,2), allowNull: false },
  paymentMethod: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.ENUM('pending', 'completed', 'refunded'), defaultValue: 'pending' }
}, { tableName: 'payments', timestamps: true });

// Resume model
const Resume = sequelize.define('Resume', {
  userId: { type: DataTypes.INTEGER, allowNull: false },
  data: { type: DataTypes.BLOB('long'), allowNull: false },
  filename: { type: DataTypes.STRING, allowNull: false },
  mimetype: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: true }
}, { tableName: 'resumes', timestamps: true });

// 3️⃣ Seed function
async function seedDatabase() {
  try {
    // Sync all models
    await sequelize.sync({ force: true }); // WARNING: drops all tables first
    console.log('✅ All models synced.');

    // Insert sample users
    const user1 = await User.create({
      firstName: 'John', lastName: 'Doe', email: 'john@example.com', password: 'password', userType: 'sdp', agreeToTerms: true
    });
    const user2 = await User.create({
      firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', password: 'password', userType: 'moderator', agreeToTerms: true
    });

    // Insert sample jobs
    const job1 = await Job.create({
      title: 'Frontend Developer', description: 'Build React app', sdpId: user1.id, location: 'Oregon', budget: 1000
    });

    // Insert sample application
    await Application.create({
      jobId: job1.id,
      userId: user2.id,
      coverLetter: 'I am very interested in this role.'
    });

    // Insert sample message
    await Message.create({
      fromUserId: user1.id,
      toUserId: user2.id,
      jobId: job1.id,
      content: 'Hello, are you available for this job?'
    });

    console.log('✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// 4️⃣ Run the seeder
seedDatabase();
