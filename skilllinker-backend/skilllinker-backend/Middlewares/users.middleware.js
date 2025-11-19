// Middlewares/users.middleware.js
const path = require('path');
const { User } = require(path.join(__dirname, '..', 'sqlmodel', 'models'));
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

async function authenticate(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Access denied, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token' });
  }
}

function authorizeRole(...allowedRoles) {
  return async (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (!allowedRoles.includes(user.userType)) {
      return res.status(403).json({ error: 'Forbidden — you do not have the right role' });
    }

    req.currentUser = user;
    next();
  };
}

module.exports = {
  authenticate,
  authorizeRole
};
