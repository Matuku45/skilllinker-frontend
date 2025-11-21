require('dotenv').config(); // must be at the very top

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,       // skilllinker
  process.env.DB_USER,       // user
  process.env.DB_PASSWORD,   // 1234
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, 
    dialect: 'mysql',
    logging: false,
  }
);

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connection has been established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  } finally {
    await sequelize.close();
  }
}

testConnection();
