// sqlmodel/models/index.js
const path = require('path');
const Sequelize = require('sequelize');

// Import your database config
const sequelize = require(path.join(__dirname, '..', '..', 'config', 'database'));

// Import models using function-style
const User = require('./User')(sequelize, Sequelize.DataTypes);
const Job = require('./Job')(sequelize, Sequelize.DataTypes);
const Application = require('./Application')(sequelize, Sequelize.DataTypes); // if you have Application model

// Optional: Define associations here (avoid circular dependencies)
User.hasMany(Application, { foreignKey: 'userId' });
Application.belongsTo(User, { foreignKey: 'userId' });

Job.hasMany(Application, { foreignKey: 'jobId' });
Application.belongsTo(Job, { foreignKey: 'jobId' });

// Export models and sequelize instance
module.exports = {
  sequelize,
  Sequelize,
  User,
  Job,
  Application
};
