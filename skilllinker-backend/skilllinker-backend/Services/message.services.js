const Message = require('../sqlmodel/models/Message');

exports.sendMessage = async ({ fromUserId, toUserId, jobId, content }) => {
  const message = await Message.create({ fromUserId, toUserId, jobId, content });
  return message;
};

exports.getUserMessages = async (userId) => {
  return await Message.findAll({
    where: { toUserId: userId },
    order: [['timestamp', 'DESC']],
    include: [
      { association: 'sender', attributes: ['id', 'name', 'email'] },
      { association: 'recipient', attributes: ['id', 'name', 'email'] },
      { association: 'job' }
    ]
  });
};

exports.markAsRead = async (messageId) => {
  const message = await Message.findByPk(messageId);
  if (!message) throw new Error('Message not found');
  message.read = true;
  await message.save();
  return message;
};

exports.getJobMessages = async (jobId) => {
  return await Message.findAll({
    where: { jobId },
    order: [['timestamp', 'ASC']],
    include: [
      { association: 'sender', attributes: ['id', 'name', 'email'] },
      { association: 'recipient', attributes: ['id', 'name', 'email'] }
    ]
  });
};
