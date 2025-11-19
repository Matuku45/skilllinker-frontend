const { body, validationResult } = require('express-validator');

exports.validateMessage = [
  body('fromUserId').isInt().withMessage('Sender ID must be an integer'),
  body('toUserId').isInt().withMessage('Recipient ID must be an integer'),
  body('content').notEmpty().withMessage('Message content cannot be empty'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
