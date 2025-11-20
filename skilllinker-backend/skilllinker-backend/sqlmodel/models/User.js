module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false }, 
    phone: { type: DataTypes.STRING },
    verified: { type: DataTypes.BOOLEAN, defaultValue: false },

    userType: { 
      type: DataTypes.ENUM('assessor', 'moderator', 'sdp'),
      allowNull: false
    },

    agreeToTerms: { type: DataTypes.BOOLEAN, defaultValue: false }
  }, {
    tableName: 'users',
    timestamps: true
  });

  return User;
};
