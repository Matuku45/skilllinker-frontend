require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false
  }
);

async function initDatabase() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');

    // 1. Validate existing userType values
    const [existingTypes] = await sequelize.query(
      "SELECT DISTINCT `userType` FROM `users`;"
    );
    const typeValues = existingTypes.map(r => r.userType);
    console.log("🔍 Existing userType values in DB:", typeValues);

    // 2. Sync models, but **do not force enum alteration** for userType
    //    You can control this by not using alter: true (or using migrations instead)
    await sequelize.sync();  // <-- no alter: true
    console.log('🗄 Database schema synced (no alter).');

    // 3. After sync, check for MySQL warnings
    const [warnings] = await sequelize.query("SHOW WARNINGS;");
    if (warnings && warnings.length > 0) {
      console.warn("⚠️ MySQL Warnings after sync:");
      warnings.forEach(w => {
        console.warn(` ‒ Level: ${w.Level}, Code: ${w.Code}, Message: ${w.Message}`);
      });
    } else {
      console.log("✅ No MySQL warnings after sync.");
    }

  } catch (error) {
    console.error('❌ Error during database init:', error);
    process.exit(1);
  }
}

initDatabase();

module.exports = sequelize;
