const express = require('express');
const router = express.Router();
const UsersController = require('../Controllers/users.controllers');
const { validateUser } = require('../MidleWares/users.middleware');

// Routes
router.post('/', validateUser, UsersController.createUser);
router.get('/', UsersController.getAllUsers);
router.get('/:id', UsersController.getUserById);
router.put('/:id', validateUser, UsersController.updateUser);
router.delete('/:id', UsersController.deleteUser);

module.exports = router;
