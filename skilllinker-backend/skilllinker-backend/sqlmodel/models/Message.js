const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Job = require('./Job');

const Message = sequelize.define('Message', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  fromUserId: { 
    type: DataTypes.INTEGER, 
    allowNull: false,
    references: { model: User, key: 'id' }
  },
  toUserId: { 
    type: DataTypes.INTEGER, 
    allowNull: false,
    references: { model: User, key: 'id' }
  },
  jobId: { 
    type: DataTypes.INTEGER, 
    allowNull: true,
    references: { model: Job, key: 'id' }
  },
  content: { 
    type: DataTypes.TEXT, 
    allowNull: false 
  },
  timestamp: { 
    type: DataTypes.DATE, 
    defaultValue: DataTypes.NOW 
  },
  read: { 
    type: DataTypes.BOOLEAN, 
    defaultValue: false 
  }
}, {
  tableName: 'messages',
  timestamps: false // or true, depending if you want createdAt, updatedAt
});

// Associations:
User.hasMany(Message, { foreignKey: 'fromUserId', as: 'sentMessages' });
User.hasMany(Message, { foreignKey: 'toUserId', as: 'receivedMessages' });
Message.belongsTo(User, { foreignKey: 'fromUserId', as: 'sender' });
Message.belongsTo(User, { foreignKey: 'toUserId', as: 'recipient' });

Job.hasMany(Message, { foreignKey: 'jobId' });
Message.belongsTo(Job, { foreignKey: 'jobId' });

module.exports = Message;
