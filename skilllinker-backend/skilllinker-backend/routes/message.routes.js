const express = require('express');
const router = express.Router();
const messageController = require('../Controllers/message.controller');
const messageMiddleware = require('../Middlewares/message.middleware');

// Send a message
router.post('/', messageMiddleware.validateMessage, messageController.sendMessage);

// Get messages for a user
router.get('/user/:userId', messageController.getUserMessages);

// Mark message as read
router.put('/:messageId/read', messageController.markAsRead);

// Get messages related to a job
router.get('/job/:jobId', messageController.getJobMessages);

module.exports = router;
