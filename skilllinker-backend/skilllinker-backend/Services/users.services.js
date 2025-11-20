const { User } = require('../sqlmodel/models');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

module.exports = {
  createUser: async (data) => {
    const required = ['firstName', 'lastName', 'email', 'password', 'userType'];
    for (const field of required) {
      if (!data[field]) throw new Error(`Missing required field: ${field}`);
    }

    const userPayload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone || null,
      password: data.password, 
      userType: data.userType,
      verified: data.verified || false,
      agreeToTerms: data.agreeToTerms || false
      // ❌ active removed
    };

    return await User.create(userPayload);
  },

  login: async (email, password) => {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error('Invalid email or password');

    if (password !== user.password) {
      throw new Error('Invalid email or password');
    }

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
        lastName: user.lastName,
        userType: user.userType
      },
      token
    };
  },

  getAllUsers: async () => {
    return await User.findAll({ attributes: { exclude: ['password'] } });
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
  }
};
