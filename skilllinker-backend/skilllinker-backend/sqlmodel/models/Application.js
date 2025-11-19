// sqlmodel/models/Application.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

class Application extends Model {}

Application.init({
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  jobId: { 
    type: DataTypes.INTEGER, 
    allowNull: false
  },
  userId: { 
    type: DataTypes.INTEGER, 
    allowNull: false
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
  sequelize,
  modelName: 'Application',
  tableName: 'applications',
  timestamps: true
});

module.exports = Application;
