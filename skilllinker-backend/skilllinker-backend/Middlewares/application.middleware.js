// middlewares/validation.middleware.js (REQUIRED CHANGE)

function validateApplication(req, res, next) {
  // Change: Remove resumeId from destructuring and validation check
  const { jobId, userId } = req.body; 
  if (!jobId || !userId) {
    return res.status(400).json({ message: 'jobId and userId are required' }); // Update error message
  }
  next();
}

module.exports = { validateApplication };