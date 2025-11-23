const { Sequelize } = require('sequelize');

// Render PostgreSQL credentials
const sequelize = new Sequelize('skilllinker', 'user', 'enJjGw5p51QV61J8gpMidKCMxYbeOlaq', {
  host: 'dpg-d4hn31khg0os738i4n40-a.oregon-postgres.render.com',
  port: 5432,
  dialect: 'postgres',
  logging: console.log, // Logs SQL queries
});

// Function to test connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connection has been established successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    process.exit(1);
  }
}

// Run the test immediately
testConnection();
