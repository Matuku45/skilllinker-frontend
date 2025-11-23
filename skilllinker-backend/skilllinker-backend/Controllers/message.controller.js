const { User, Message } = require('../sqlmodel/models'); // ✅ ADDED Message model here
const { Op } = require('sequelize');            // ✅ Import Op for query operators
const messageService = require('../Services/message.services');

/**
 * Send single message
 * POST /api/messages
 */
exports.sendMessage = async (req, res) => {
  try {
    const message = await messageService.sendMessage(req.body);
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Get all messages (for admin or testing purposes)
 * GET /api/messages
 */
exports.getAllMessages = async (req, res) => {
  try {
    // Fetches all messages, ordered by timestamp descending
    const messages = await Message.findAll({
      order: [['timestamp', 'DESC']]
    });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


/**
 * Get all messages for a user
 * GET /api/messages/user/:userId
 */
exports.getUserMessages = async (req, res) => {
  try {
    const messages = await messageService.getUserMessages(req.params.userId);
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Mark message as read
 * PUT /api/messages/:messageId/read
 */
exports.markAsRead = async (req, res) => {
  try {
    const updatedMessage = await messageService.markAsRead(req.params.messageId);
    res.json(updatedMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Get messages for a job
 * GET /api/messages/job/:jobId
 */
exports.getJobMessages = async (req, res) => {
  try {
    const messages = await messageService.getJobMessages(req.params.jobId);
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Broadcast job notification to all relevant users
 * This is called internally by the job controller.
 */
exports.broadcastJobNotification = async (jobDetails, posterId) => {
  try {
    // Find all recipients except the poster
    const recipients = await User.findAll({
      where: {
        id: { [Op.ne]: posterId }, // exclude poster
        userType: { [Op.in]: ['assessor', 'moderator', 'sdp', 'admin'] } // include all relevant roles
      }
    });

    if (!recipients || recipients.length === 0) return [];

    const broadcastMessages = recipients.map(user => ({
      timestamp: new Date(),
      read: false,
      fromUserId: posterId,
      toUserId: user.id,
      jobId: jobDetails.id,
      // Fixed syntax: Using backticks for template literal
      content: `📢 New job posted: "${jobDetails.title}". Apply now!` 
    }));

    const results = await messageService.sendMessagesBatch(broadcastMessages);

    // Fixed syntax: Using backticks for template literal
    console.log(`Broadcast successful for Job ID ${jobDetails.id} to ${recipients.length} users.`);

    return results;
  } catch (err) {
    // Fixed syntax: Using backticks for template literal
    console.error(`Broadcast failed for Job ID ${jobDetails.id}:`, err);

    throw err;
  }
};