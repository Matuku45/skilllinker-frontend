const usersService = require('../Services/users.services');

module.exports = {
  register: async (req, res) => {
    try {
      const user = await usersService.createUser(req.body);
      res.status(201).json({ message: 'User registered', user });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const result = await usersService.login(email, password);
      res.json(result);
    } catch (err) {
      res.status(401).json({ error: err.message });
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
      res.json({ message: 'User updated', updated });
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
