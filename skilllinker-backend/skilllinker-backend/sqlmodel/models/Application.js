const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Job = require('./Job');
const User = require('./User'); // assuming exist

const Application = sequelize.define('Application', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  jobId: { 
    type: DataTypes.INTEGER, 
    allowNull: false,
    references: { model: Job, key: 'id' }
  },
  userId: { 
    type: DataTypes.INTEGER, 
    allowNull: false,
    references: { model: User, key: 'id' }
  },
  applicationDate: { 
    type: DataTypes.DATE, 
    defaultValue: DataTypes.NOW 
  },
  status: { 
    type: DataTypes.ENUM('applied', 'accepted', 'rejected'), 
    defaultValue: 'applied' 
  }
}, {
  tableName: 'applications',
  timestamps: true
});

// Associations (if you want):
Job.hasMany(Application, { foreignKey: 'jobId' });
Application.belongsTo(Job, { foreignKey: 'jobId' });

User.hasMany(Application, { foreignKey: 'userId' });
Application.belongsTo(User, { foreignKey: 'userId' });

module.exports = Application;
