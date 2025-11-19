const path = require('path');
const Sequelize = require('sequelize');

// Database
const sequelize = require(path.join(__dirname, '..', '..', 'config', 'database'));

// Function-style models
const User = require('./User')(sequelize, Sequelize.DataTypes);
const Job = require('./Job')(sequelize, Sequelize.DataTypes);
const Message = require('./Message')(sequelize, Sequelize.DataTypes); // function-style

// Class-style models
const Application = require('./Application'); // class-style

// Associations
User.hasMany(Application, { foreignKey: 'userId' });
Application.belongsTo(User, { foreignKey: 'userId' });

Job.hasMany(Application, { foreignKey: 'jobId' });
Application.belongsTo(Job, { foreignKey: 'jobId' });

// Messages
User.hasMany(Message, { foreignKey: 'fromUserId', as: 'sentMessages' });
User.hasMany(Message, { foreignKey: 'toUserId', as: 'receivedMessages' });
Message.belongsTo(User, { foreignKey: 'fromUserId', as: 'sender' });
Message.belongsTo(User, { foreignKey: 'toUserId', as: 'recipient' });

Job.hasMany(Message, { foreignKey: 'jobId' });
Message.belongsTo(Job, { foreignKey: 'jobId' });

// Export
module.exports = {
  sequelize,
  Sequelize,
  User,
  Job,
  Application,
  Message
};
