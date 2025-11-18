require('dotenv').config();
const bcrypt = require('bcrypt');
const sequelize = require('../config/database'); // updated path
const User = require('./models/User');

async function seedUsers() {
  await sequelize.sync({ force: true }); // recreates tables

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
  process.exit();
}

seedUsers().catch(err => console.error(err));
