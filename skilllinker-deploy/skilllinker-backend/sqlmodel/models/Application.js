// ../sqlmodel/models/Application.js

const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Application = sequelize.define(
  'Application',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    jobId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // ❌ REMOVE THIS ENTIRE FIELD:
    // resumeId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // }, 
    coverLetter: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
      defaultValue: 'pending',
    },
  },
  {
    tableName: 'applications',
    timestamps: true,
  }
);

module.exports = Application;