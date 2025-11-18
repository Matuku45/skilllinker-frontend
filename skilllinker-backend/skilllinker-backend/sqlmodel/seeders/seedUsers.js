// seedUsers.js
require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

// -----------------------
// 1. Initialize Sequelize
// -----------------------
const sequelize = new Sequelize(
  process.env.DB_NAME || 'skilllinker_db',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT || 'mysql', // change to 'postgres' if using Postgres
    logging: false
  }
);

// -----------------------
// 2. Define User model
// -----------------------
const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'users',
  timestamps: true
});

// -----------------------
// 3. Seed users
// -----------------------
async function seedUsers() {
  try {
    // Force sync: drops table if exists, then creates new
    await sequelize.sync({ force: true });

    const users = [
      { username: 'alice', email: 'alice@example.com', password: 'password1' },
      { username: 'bob', email: 'bob@example.com', password: 'password2' },
      { username: 'charlie', email: 'charlie@example.com', password: 'password3' }
    ];

    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await User.create({ ...user, password: hashedPassword });
    }

    console.log('✅ 3 users created successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding users:', err);
    process.exit(1);
  }
}

// Run the seeding
seedUsers();
