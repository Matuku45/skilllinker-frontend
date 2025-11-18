// Controllers/users.controllers.js
const UserService = require('../Services/users.services');

class UsersController {
  static async createUser(req, res) {
    try {
      const user = await UserService.createUser(req.body);
      res.status(201).json({ message: 'User created', user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error creating user', error: err.message });
    }
  }

  static async getAllUsers(req, res) {
    try {
      const users = await UserService.getAllUsers();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching users', error: err.message });
    }
  }

  static async getUserById(req, res) {
    try {
      const user = await UserService.getUserById(req.params.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching user', error: err.message });
    }
  }

  static async updateUser(req, res) {
    try {
      const user = await UserService.updateUser(req.params.id, req.body);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json({ message: 'User updated', user });
    } catch (err) {
      res.status(500).json({ message: 'Error updating user', error: err.message });
    }
  }

  static async deleteUser(req, res) {
    try {
      const success = await UserService.deleteUser(req.params.id);
      if (!success) return res.status(404).json({ message: 'User not found' });
      res.json({ message: 'User deleted' });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting user', error: err.message });
    }
  }
}

module.exports = UsersController;
