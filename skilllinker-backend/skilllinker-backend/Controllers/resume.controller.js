const resumeService = require('../Services/resume.services');

// Upload a new resume
exports.uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { description, userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "Missing userId" });
    }

    const resume = await resumeService.createResume(
      userId,
      req.file, 
      description
    );

    res.status(201).json({
      message: "Resume uploaded successfully",
      resume,
    });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all resumes
exports.getAllResumes = async (req, res) => {
  try {
    const resumes = await resumeService.getAllResumes();
    res.status(200).json(resumes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get resume by ID
exports.getResumeById = async (req, res) => {
  try {
    const resume = await resumeService.getResumeById(req.params.id);
    res.status(200).json(resume);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// Delete resume
exports.deleteResume = async (req, res) => {
  try {
    await resumeService.deleteResume(req.params.id);
    res.status(200).json({ message: "Resume deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
