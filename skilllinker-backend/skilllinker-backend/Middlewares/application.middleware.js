function validateApplication(req, res, next) {
  const { jobId, userId, resumeId } = req.body;
  if (!jobId || !userId || !resumeId) {
    return res.status(400).json({ message: 'jobId, userId, and resumeId are required' });
  }
  next();
}

module.exports = { validateApplication };
