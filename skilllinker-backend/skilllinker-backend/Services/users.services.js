// Services/users.services.js
const bcrypt = require('bcrypt');
const { User } = require('../sqlmodel/models/User');

class UserService {
  // Create a new user
  static async createUser(data) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return User.create({ ...data, password: hashedPassword });
  }

  // Get all users
  static async getAllUsers() {
    return User.findAll({ raw: true });
  }

  // Get single user by ID
  static async getUserById(id) {
    return User.findByPk(id, { raw: true });
  }

  // Update user
  static async updateUser(id, data) {
    const user = await User.findByPk(id);
    if (!user) return null;
    if (data.password) data.password = await bcrypt.hash(data.password, 10);
    return user.update(data);
  }

  // Delete user
  static async deleteUser(id) {
    const user = await User.findByPk(id);
    if (!user) return null;
    await user.destroy();
    return true;
  }
}

module.exports = UserService;
