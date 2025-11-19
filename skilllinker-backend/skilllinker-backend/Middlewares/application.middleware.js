// application.middleware.js
function validateApplication(req, res, next) {
  const { jobId, userId } = req.body;
  if (!jobId || !userId) {
    return res.status(400).json({ message: 'jobId and userId are required' });
  }
  next();
}

module.exports = { validateApplication }; // now it’s an object
