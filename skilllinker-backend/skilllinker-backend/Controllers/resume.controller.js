const resumeService = require('../Services/resume.services');

exports.uploadResume = async (req, res) => {
  try {
    const { description } = req.body;
    const userId = req.user.id; // assuming req.user is set from auth middleware

    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const resume = await resumeService.createResume(userId, req.file, description);
    res.status(201).json({ message: 'Resume uploaded successfully', resume });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllResumes = async (req, res) => {
  try {
    const resumes = await resumeService.getAllResumes();
    res.status(200).json(resumes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getResumeById = async (req, res) => {
  try {
    const resume = await resumeService.getResumeById(req.params.id);
    if (!resume) return res.status(404).json({ message: 'Resume not found' });
    res.status(200).json(resume);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteResume = async (req, res) => {
  try {
    await resumeService.deleteResume(req.params.id);
    res.status(200).json({ message: 'Resume deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
