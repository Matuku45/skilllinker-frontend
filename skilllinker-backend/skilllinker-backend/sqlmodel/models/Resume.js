const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const User = require('./User');

const Resume = sequelize.define('Resume', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: { // explicit foreign key
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    },
    onDelete: 'CASCADE'
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
  description: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'resumes',
  timestamps: true
});

// Associations
User.hasMany(Resume, { foreignKey: 'userId', as: 'resumes' });
Resume.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = Resume;
