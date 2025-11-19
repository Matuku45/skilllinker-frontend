// sqlmodel/models/Job.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database'); // adjust path

const Job = sequelize.define('Job', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  sdpId: { type: DataTypes.INTEGER, allowNull: false },
  location: { type: DataTypes.STRING },
  budget: { type: DataTypes.DECIMAL(12, 2) },
  status: { type: DataTypes.ENUM('open', 'in-progress', 'closed'), defaultValue: 'open' },
  requiredQualifications: { type: DataTypes.JSON },
  postedDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  deadline: { type: DataTypes.DATE, allowNull: true }
}, {
  tableName: 'jobs',
  timestamps: true
});

module.exports = Job; // export the model instance
