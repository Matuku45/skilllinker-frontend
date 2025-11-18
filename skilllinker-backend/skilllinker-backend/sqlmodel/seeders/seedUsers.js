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
  password: { type: DataTypes.STRING, allowNull: false }
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
      { username: 'alice', email: 'alice@example.com', password: 'password1' },
      { username: 'bob', email: 'bob@example.com', password: 'password2' },
      { username: 'charlie', email: 'charlie@example.com', password: 'password3' }
    ];

    for (const u of usersData) {
      u.password = await bcrypt.hash(u.password, 10); // hash passwords
      await User.create(u);
    }
    console.log('✅ Users created');

    // ----- READ -----
    const allUsers = await User.findAll({ raw: true });
    console.log('👀 All Users:', allUsers);

    // ----- UPDATE -----
    const bob = await User.findOne({ where: { username: 'bob' } });
    if (bob) {
      bob.email = 'bob.new@example.com';
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
    const finalUsers = await User.findAll({ raw: true });
    console.log('👀 Users after CRUD:', finalUsers);

    process.exit(0);
  } catch (err) {
    console.error('❌ Error in CRUD demo:', err);
    process.exit(1);
  }
}

// Run the CRUD demo
runCRUD();
