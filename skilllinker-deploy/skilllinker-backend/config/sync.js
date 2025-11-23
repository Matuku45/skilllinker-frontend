const sequelize = require('./config/database');
const User = require('./sqlmodel/User');

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database & users table synced!');
    process.exit();
  })
  .catch(err => console.error(err));
