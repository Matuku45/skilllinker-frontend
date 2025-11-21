require('dotenv').config(); // <-- must be first
const { Sequelize } = require('sequelize');

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

(async () => {
  try {
    console.log('Connecting as user:', process.env.DB_USER); // <-- debug
    await sequelize.authenticate();
    console.log('✅ Connection successful');
  } catch (err) {
    console.error('❌ Connection failed:', err);
  } finally {
    await sequelize.close();
  }
})();
