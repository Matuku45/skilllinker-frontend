const path = require('path');
const Sequelize = require('sequelize');

// Database connection instance
// Note: This path uses path.join for cross-platform compatibility
const sequelize = require(path.join(__dirname, '..', '..', 'config', 'database'));

// Load models
// Function-style models (Assuming these model files export a function: module.exports = (sequelize, DataTypes) => { ... })
const User = require('./User')(sequelize, Sequelize.DataTypes);
const Job = require('./Job')(sequelize, Sequelize.DataTypes);
const Message = require('./Message')(sequelize, Sequelize.DataTypes);

// Direct Model Exports / Class-style models (Assuming these model files export the defined Model class directly)
const Application = require('./Application'); 
// FIX: Changed from function-style call to direct require to match the Payment model's likely export style.
const Payment = require('./Payment'); 


// --- Define Associations ---

// User to Application (One-to-Many)
User.hasMany(Application, { foreignKey: 'userId' });
Application.belongsTo(User, { foreignKey: 'userId' });

// Job to Application (One-to-Many)
Job.hasMany(Application, { foreignKey: 'jobId' });
Application.belongsTo(Job, { foreignKey: 'jobId' });

// Messages (Self-referencing for sender/recipient, and Job association)
User.hasMany(Message, { foreignKey: 'fromUserId', as: 'sentMessages' });
User.hasMany(Message, { foreignKey: 'toUserId', as: 'receivedMessages' });
Message.belongsTo(User, { foreignKey: 'fromUserId', as: 'sender' });
Message.belongsTo(User, { foreignKey: 'toUserId', as: 'recipient' });

// Job to Message (One-to-Many)
Job.hasMany(Message, { foreignKey: 'jobId' });
Message.belongsTo(Job, { foreignKey: 'jobId' });

// Export models and Sequelize instance
module.exports = {
  sequelize,
  Sequelize,
  User,
  Job,
  Application,
  Message,
  Payment
};