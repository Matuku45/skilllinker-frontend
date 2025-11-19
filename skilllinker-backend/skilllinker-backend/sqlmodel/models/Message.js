// sqlmodel/models/Message.js
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },
    fromUserId: { 
      type: DataTypes.INTEGER, 
      allowNull: false
    },
    toUserId: { 
      type: DataTypes.INTEGER, 
      allowNull: false
    },
    jobId: { 
      type: DataTypes.INTEGER, 
      allowNull: true
    },
    content: { 
      type: DataTypes.TEXT, 
      allowNull: false 
    },
    timestamp: { 
      type: DataTypes.DATE, 
      defaultValue: DataTypes.NOW 
    },
    read: { 
      type: DataTypes.BOOLEAN, 
      defaultValue: false 
    }
  }, {
    tableName: 'messages',
    timestamps: false
  });

  return Message;
};
