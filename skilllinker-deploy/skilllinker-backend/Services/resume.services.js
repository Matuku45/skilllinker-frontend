const Resume = require('../sqlmodel/models/Resume');

exports.createResume = async (userId, file, description) => {
  if (!userId || !file) throw new Error('userId and file are required');

  return await Resume.create({
    userId,
    data: file.buffer,
    filename: file.originalname,
    mimetype: file.mimetype,
    description,
  });
};

exports.getAllResumes = async () => {
  return await Resume.findAll(); // no associations
};

exports.getResumeById = async (id) => {
  return await Resume.findByPk(id); // no associations
};

exports.deleteResume = async (id) => {
  const resume = await Resume.findByPk(id);
  if (!resume) throw new Error('Resume not found');
  await resume.destroy();
  return true;
};
