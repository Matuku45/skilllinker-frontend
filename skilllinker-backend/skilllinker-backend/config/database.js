require('dotenv').config(); // Make sure you have dotenv installed
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,       // skilllinker
  process.env.DB_USER,       // user
  process.env.DB_PASSWORD,   // 1234
  {
    host: process.env.DB_HOST, // localhost
    port: process.env.DB_PORT, // 3306
    dialect: 'mysql',
    logging: false
  }
);

// Test the connection
sequelize.authenticate()
  .then(() => console.log('✅ Database connection established successfully.'))
  .catch(err => console.error('❌ Unable to connect to the database:', err));

module.exports = sequelize;
