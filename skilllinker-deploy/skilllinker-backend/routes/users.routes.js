const express = require('express');
const router = express.Router();
const usersController = require('../Controllers/users.controllers');
const { authenticate, authorizeRole } = require('../Middlewares/users.middleware');

// Public
router.post('/register', usersController.register);
router.post('/login', usersController.login);

// Protected
router.get('/', authenticate, authorizeRole('admin'), usersController.getAll);
router.put('/:id', authenticate, usersController.update);
router.delete('/:id', authenticate, authorizeRole('admin'), usersController.delete);

module.exports = router;
