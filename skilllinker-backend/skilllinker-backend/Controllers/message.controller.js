const messageService = require('../Services/message.services');

exports.sendMessage = async (req, res) => {
  try {
    const message = await messageService.sendMessage(req.body);
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserMessages = async (req, res) => {
  try {
    const messages = await messageService.getUserMessages(req.params.userId);
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const updatedMessage = await messageService.markAsRead(req.params.messageId);
    res.json(updatedMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getJobMessages = async (req, res) => {
  try {
    const messages = await messageService.getJobMessages(req.params.jobId);
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
