const { Message, User, Job } = require('../sqlmodel/models');

/**
 * Sends a single message
 */
exports.sendMessage = async ({ fromUserId, toUserId, jobId, content }) => {
  return await Message.create({ fromUserId, toUserId, jobId, content });
};

/**
 * Sends multiple messages at once (batch)
 */
exports.sendMessagesBatch = async (messagesArray) => {
  if (!messagesArray || messagesArray.length === 0) return [];
  return await Message.bulkCreate(messagesArray);
};

/**
 * Retrieves all messages for a user
 */
exports.getUserMessages = async (userId) => {
  const messages = await Message.findAll({
    where: { toUserId: userId },
    order: [['timestamp', 'DESC']]
  });

  // Manually enrich with sender and recipient info
  const enrichedMessages = await Promise.all(
    messages.map(async (msg) => {
      const sender = await User.findByPk(msg.fromUserId);
      const recipient = await User.findByPk(msg.toUserId);
      let job = null;
      if (msg.jobId) job = await Job.findByPk(msg.jobId);

      return {
        ...msg.dataValues,
        sender: sender ? { id: sender.id, name: sender.name, email: sender.email } : null,
        recipient: recipient ? { id: recipient.id, name: recipient.name, email: recipient.email } : null,
        job: job ? { id: job.id, title: job.title } : null
      };
    })
  );

  return enrichedMessages;
};

/**
 * Marks a message as read
 */
exports.markAsRead = async (messageId) => {
  const message = await Message.findByPk(messageId);
  if (!message) throw new Error('Message not found');
  message.read = true;
  await message.save();
  return message;
};

/**
 * Retrieves messages for a specific job
 */
exports.getJobMessages = async (jobId) => {
  const messages = await Message.findAll({
    where: { jobId },
    order: [['timestamp', 'ASC']]
  });

  const enrichedMessages = await Promise.all(
    messages.map(async (msg) => {
      const sender = await User.findByPk(msg.fromUserId);
      const recipient = await User.findByPk(msg.toUserId);

      return {
        ...msg.dataValues,
        sender: sender ? { id: sender.id, name: sender.name, email: sender.email } : null,
        recipient: recipient ? { id: recipient.id, name: recipient.name, email: recipient.email } : null
      };
    })
  );

  return enrichedMessages;
};
