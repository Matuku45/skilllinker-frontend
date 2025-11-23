const usersService = require('../Services/users.services');
const { ValidationError } = require('sequelize');

module.exports = {
  register: async (req, res) => {
    try {
      const user = await usersService.createUser(req.body);
      // Exclude password from response
      const responseUser = user.toJSON();
      delete responseUser.password; 
      
      res.status(201).json({ message: 'User registered', user: responseUser });
    } catch (err) {
      if (err instanceof ValidationError) {
        const errors = err.errors.map(e => ({ field: e.path, message: e.message }));
        return res.status(400).json({ error: 'Validation error', details: errors });
      }
      // Handle database or service-level errors (e.g., email already exists)
      res.status(400).json({ error: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const result = await usersService.login(email, password);

      res.json({
        success: true,
        user: result.user,
        token: result.token
      });
    } catch (err) {
      // 401 Unauthorized for login failures
      res.status(401).json({ success: false, error: err.message });
    }
  },

  getAll: async (req, res) => {
    try {
      const users = await usersService.getAllUsers();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  update: async (req, res) => {
    try {
      const updated = await usersService.updateUser(req.params.id, req.body);
      const responseUser = updated.toJSON();
      delete responseUser.password;
      res.json({ message: 'User updated', updated: responseUser });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      await usersService.deleteUser(req.params.id);
      res.json({ message: 'User deleted' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};