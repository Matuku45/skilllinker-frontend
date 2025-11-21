const resumeService = require('../Services/resume.services');

/**
 * Upload Resume (BLOB storage)
 */
exports.uploadResume = async (req, res) => {
  try {
    // Validate file upload
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { userId, description } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Create resume entry in DB (with BLOB)
    const resume = await resumeService.createResume(
      userId,
      req.file, // req.file.buffer exists because we use memoryStorage
      description || "Resume upload"
    );

    return res.status(201).json({
      message: "Resume uploaded successfully",
      resume
    });

  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    return res.status(500).json({
      message: "Resume upload failed",
      error: err.message
    });
  }
};


/**
 * Get all resumes
 */
exports.getAllResumes = async (req, res) => {
  try {
    const resumes = await resumeService.getAllResumes();
    return res.status(200).json(resumes);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


/**
 * Get resume by ID
 */
exports.getResumeById = async (req, res) => {
  try {
    const resume = await resumeService.getResumeById(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    return res.status(200).json(resume);

  } catch (err) {
    return res.status(404).json({ error: err.message });
  }
};


/**
 * Delete resume
 */
exports.deleteResume = async (req, res) => {
  try {
    await resumeService.deleteResume(req.params.id);

    return res.status(200).json({
      message: 'Resume deleted successfully'
    });

  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
