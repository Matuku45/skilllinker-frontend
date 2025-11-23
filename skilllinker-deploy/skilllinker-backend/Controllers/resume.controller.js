const resumeService = require('../Services/resume.services');

exports.uploadResume = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const { userId, description } = req.body;
    if (!userId) return res.status(400).json({ message: 'User ID is required' });

    const resume = await resumeService.createResume(userId, req.file, description || "Resume upload");

    return res.status(201).json({ message: "Resume uploaded successfully", resume });
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    next(err); // forward to global error handler
  }
};

exports.getAllResumes = async (req, res, next) => {
  try {
    const resumes = await resumeService.getAllResumes();
    res.status(200).json(resumes);
  } catch (err) {
    console.error("GET ALL RESUMES ERROR:", err);
    next(err);
  }
};

exports.getResumeById = async (req, res, next) => {
  try {
    const resume = await resumeService.getResumeById(req.params.id);
    if (!resume) return res.status(404).json({ message: "Resume not found" });
    res.status(200).json(resume);
  } catch (err) {
    console.error("GET RESUME ERROR:", err);
    next(err);
  }
};

exports.deleteResume = async (req, res, next) => {
  try {
    await resumeService.deleteResume(req.params.id);
    res.status(200).json({ message: 'Resume deleted successfully' });
  } catch (err) {
    console.error("DELETE RESUME ERROR:", err);
    next(err);
  }
};
