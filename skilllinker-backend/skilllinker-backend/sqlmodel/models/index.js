// sqlmodel/models/index.js
const path = require('path');
const Sequelize = require('sequelize');

// import your database config
const sequelize = require(path.join(__dirname, '..', '..', 'config', 'database'));

// Import each model definition:
const User = require('./User')(sequelize, Sequelize.DataTypes);
const Job = require('./Job')(sequelize, Sequelize.DataTypes);

// (If you have associations, define them here, e.g. User.hasMany(Job) etc.)

module.exports = {
  sequelize,
  User,
  Job
};
