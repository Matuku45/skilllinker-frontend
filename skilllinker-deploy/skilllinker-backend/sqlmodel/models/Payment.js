const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Payment = sequelize.define('Payment', {
id: {
type: DataTypes.INTEGER,
primaryKey: true,
autoIncrement: true
},
payerUserId: {
type: DataTypes.INTEGER,
allowNull: false
},
payeeUserId: {
type: DataTypes.INTEGER,
allowNull: false
},
jobId: {
type: DataTypes.INTEGER,
allowNull: true
},
amount: {
type: DataTypes.DECIMAL(12, 2),
allowNull: false
},
paymentMethod: {
type: DataTypes.STRING,
allowNull: false
},
status: {
type: DataTypes.ENUM('pending', 'completed', 'refunded'),
defaultValue: 'pending'
},
createdAt: {
type: DataTypes.DATE,
defaultValue: DataTypes.NOW
},
updatedAt: {
type: DataTypes.DATE,
allowNull: true
}
}, {
tableName: 'payments',
timestamps: true
});

module.exports = Payment;
