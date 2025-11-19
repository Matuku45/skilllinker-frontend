// sqlmodel/models/Resume.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

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
        args: [['text/plain', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/rtf']],
        msg: 'Only text or document files (txt, pdf, doc, docx, rtf) are allowed'
      }
    }
  },
  description: {  // optional extra field
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'resumes',
  timestamps: true
});

// Associations removed since no user dependency

module.exports = Resume;
