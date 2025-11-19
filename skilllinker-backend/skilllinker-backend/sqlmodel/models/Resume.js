// sqlmodel/models/Resume.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const User = require('./User');

const Resume = sequelize.define('Resume', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  data: {
    type: DataTypes.BLOB('long'),
    allowNull: false
  },
  filename: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  mimetype: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: {
        args: [['image/jpeg', 'image/png', 'image/gif', 'image/webp']], // allowed image MIME types
        msg: 'Only image files are allowed (jpeg, png, gif, webp)'
      }
    }
  }
}, {
  tableName: 'resumes',
  timestamps: true
});

// Associations
User.hasMany(Resume, { foreignKey: 'userId', as: 'resumes' });
Resume.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = Resume;
