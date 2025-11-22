const express = require('express');
const router = express.Router();
const messageController = require('../Controllers/message.controller');
const messageMiddleware = require('../Middlewares/message.middleware');

// Send a message
router.post('/', messageMiddleware.validateMessage, messageController.sendMessage);

// ✅ NEW: Get all messages (must be first, as it matches '/')
router.get('/', messageController.getAllMessages);

// ✅ FIXED: Get all messages for a specific user - restored :userId
router.get('/user/:userId', messageController.getUserMessages);

// ✅ FIXED: Mark a specific message as read - restored :messageId
router.put('/:messageId/read', messageController.markAsRead);

// ✅ FIXED: Get all messages related to a specific job - restored :jobId
router.get('/job/:jobId', messageController.getJobMessages);

module.exports = router;