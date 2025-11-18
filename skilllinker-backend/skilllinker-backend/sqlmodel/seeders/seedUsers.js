require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

// -----------------------
// 1. Initialize Sequelize
// -----------------------
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

// -----------------------
// 2. Define User model
// -----------------------
const User = sequelize.define('User', {
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: true },
  verified: { type: DataTypes.BOOLEAN, defaultValue: false },
  userType: { type: DataTypes.ENUM('assessor','moderator','sdp'), allowNull: false },
  agreeToTerms: { type: DataTypes.BOOLEAN, defaultValue: false }
}, {
  tableName: 'users',
  timestamps: true,
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) user.password = await bcrypt.hash(user.password, 10);
    }
  }
});

// -----------------------
// 3. Seed Function
// -----------------------
async function seedUsers() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');

    // Sync DB (force: true drops table and recreates it)
    await sequelize.sync({ force: true });
    console.log('🗄 Tables synced');

    // ----- CREATE USERS -----
    const usersData = [
      { firstName: 'Alice', lastName: 'Smith', email: 'alice@example.com', password: 'password1', userType: 'assessor', agreeToTerms: true, phone: '1234567890', verified: true },
      { firstName: 'Bob', lastName: 'Johnson', email: 'bob@example.com', password: 'password2', userType: 'moderator', agreeToTerms: true, phone: '2345678901', verified: false },
      { firstName: 'Charlie', lastName: 'Brown', email: 'charlie@example.com', password: 'password3', userType: 'sdp', agreeToTerms: true, phone: '3456789012', verified: false }
    ];

    for (const u of usersData) {
      u.password = await bcrypt.hash(u.password, 10);
      await User.create(u);
    }
    console.log('✅ Users created');

    // ----- CHECK TABLE STRUCTURE -----
    const [columns] = await sequelize.query('DESCRIBE users;');
    console.log('🗂 Users table columns:', columns);

    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding users:', err);
    process.exit(1);
  }
}

seedUsers();
