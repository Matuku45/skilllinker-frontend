// sqlmodel/models/Job.js
const path = require('path');

module.exports = (sequelize, DataTypes) => {
  const Job = sequelize.define('Job', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    sdpId: { type: DataTypes.INTEGER, allowNull: false },
    location: { type: DataTypes.STRING },
    budget: { type: DataTypes.DECIMAL(12, 2) },
    status: { type: DataTypes.ENUM('open', 'in‑progress', 'closed'), defaultValue: 'open' },
    requiredQualifications: { type: DataTypes.JSON },
    postedDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    deadline: { type: DataTypes.DATE, allowNull: true }
  }, {
    tableName: 'jobs',
    timestamps: true
  });

  return Job;
};
