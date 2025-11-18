const express = require('express');
const router = express.Router();
const usersController = require('../Controllers/users.controllers');
const { authenticate } = require('../Middlewares/users.middleware');

// Public routes
router.post('/register', usersController.register);
router.post('/login', usersController.login);

// Protected routes
router.get('/', authenticate, usersController.getAll);
router.put('/:id', authenticate, usersController.update);
router.delete('/:id', authenticate, usersController.delete);

module.exports = router;
