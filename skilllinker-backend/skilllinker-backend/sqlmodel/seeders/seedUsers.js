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
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: true },         // new phone field
  verified: { type: DataTypes.BOOLEAN, defaultValue: false } // new verified field
}, {
  tableName: 'users',
  timestamps: true
});

// -----------------------
// 3. CRUD Demo Function
// -----------------------
async function runCRUD() {
  try {
    // Test DB connection
    await sequelize.authenticate();
    console.log('✅ Database connected');

    // Sync DB (drops tables if exists)
    await sequelize.sync({ force: true });
    console.log('🗄 Tables synced');

    // ----- CREATE -----
    const usersData = [
      { username: 'alice', email: 'alice@example.com', password: 'password1', phone: '1234567890', verified: true },
      { username: 'bob', email: 'bob@example.com', password: 'password2', phone: '2345678901', verified: false },
      { username: 'charlie', email: 'charlie@example.com', password: 'password3', phone: '3456789012', verified: false }
    ];

    for (const u of usersData) {
      u.password = await bcrypt.hash(u.password, 10); // hash passwords
      await User.create(u);
    }
    console.log('✅ Users created');

    // ----- READ -----
    let allUsers = await User.findAll({ raw: true });
    console.log('👀 All Users:', allUsers);

    // ----- UPDATE -----
    const bob = await User.findOne({ where: { username: 'bob' } });
    if (bob) {
      bob.email = 'bob.new@example.com';
      bob.verified = true; // toggle verified
      await bob.save();
      console.log('✏️ Bob updated:', bob.get({ plain: true }));
    }

    // ----- DELETE -----
    const charlie = await User.findOne({ where: { username: 'charlie' } });
    if (charlie) {
      await charlie.destroy();
      console.log('🗑 Charlie deleted');
    }

    // ----- READ AFTER DELETE -----
    allUsers = await User.findAll({ raw: true });
    console.log('👀 Users after CRUD:', allUsers);

    // ----- TOGGLE VERIFIED -----
    async function toggleVerified(username) {
      const user = await User.findOne({ where: { username } });
      if (!user) return console.log(`User ${username} not found`);
      user.verified = !user.verified;
      await user.save();
      console.log(`🔄 ${username} verified toggled to:`, user.verified);
    }

    // Example toggle
    await toggleVerified('alice');

    process.exit(0);
  } catch (err) {
    console.error('❌ Error in CRUD demo:', err);
    process.exit(1);
  }
}

// Run the CRUD demo
runCRUD();
