// Services/users.services.js
const { User } = require('../sqlmodel/models'); // ✅ correct
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

module.exports = {
  createUser: async (data) => {
    return await User.create(data); // works now
  },

  getAllUsers: async () => {
    return await User.findAll({ attributes: { exclude: ['password'] } });
  },

  getUserByEmail: async (email) => {
    return await User.findOne({ where: { email } });
  },

  updateUser: async (id, data) => {
    const user = await User.findByPk(id);
    if (!user) throw new Error('User not found');
    return await user.update(data);
  },

  deleteUser: async (id) => {
    const user = await User.findByPk(id);
    if (!user) throw new Error('User not found');
    return await user.destroy();
  },

  login: async (email, password) => {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error('Invalid email or password');
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error('Invalid email or password');

    const token = jwt.sign(
      { id: user.id, email: user.email, userType: user.userType },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      },
      token
    };
  }
};
