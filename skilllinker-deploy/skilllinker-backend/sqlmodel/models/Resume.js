const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Resume = sequelize.define(
  'Resume',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false, // must come from payload
    },
    data: {
      type: DataTypes.BLOB('long'),
      allowNull: false,
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    mimetype: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [
            [
              'text/plain',
              'application/pdf',
              'application/msword',
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
              'application/rtf',
            ],
          ],
          msg: 'Only txt, pdf, doc, docx, rtf are allowed',
        },
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'resumes',
    timestamps: true,
  }
);

module.exports = Resume;
