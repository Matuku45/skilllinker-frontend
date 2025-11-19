// sqlmodel/models/User.js
module.exports = (sequelize, DataTypes) => {
  const bcrypt = require('bcrypt');

  const User = sequelize.define('User', {
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: true },
    verified: { type: DataTypes.BOOLEAN, defaultValue: false },
    userType: { type: DataTypes.ENUM('assessor', 'moderator', 'sdp'), allowNull: false },
    agreeToTerms: { type: DataTypes.BOOLEAN, defaultValue: false }
  }, {
    tableName: 'users',
    timestamps: true,
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      }
    }
  });

  return User;
};
