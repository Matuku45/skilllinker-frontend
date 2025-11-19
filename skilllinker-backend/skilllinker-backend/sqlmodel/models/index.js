const path = require('path');
const Sequelize = require('sequelize');

// Database
const sequelize = require(path.join(__dirname, '..', '..', 'config', 'database'));

// Function-style models
const User = require('./User')(sequelize, Sequelize.DataTypes);
const Job = require('./Job')(sequelize, Sequelize.DataTypes);

// Class-style model
const Application = require('./Application'); // <-- do NOT call it

// Associations
User.hasMany(Application, { foreignKey: 'userId' });
Application.belongsTo(User, { foreignKey: 'userId' });

Job.hasMany(Application, { foreignKey: 'jobId' });
Application.belongsTo(Job, { foreignKey: 'jobId' });

// Export
module.exports = {
  sequelize,
  Sequelize,
  User,
  Job,
  Application
};
