const Resume = require('../sqlmodel/models/Resume');

exports.createResume = async (userId, file, description) => {
  return await Resume.create({
    userId,
    data: file.buffer,
    filename: file.originalname,
    mimetype: file.mimetype,
    description
  });
};

exports.getAllResumes = async () => {
  return await Resume.findAll({ include: ['user'] });
};

exports.getResumeById = async (id) => {
  return await Resume.findByPk(id, { include: ['user'] });
};

exports.deleteResume = async (id) => {
  const resume = await Resume.findByPk(id);
  if (!resume) throw new Error('Resume not found');
  await resume.destroy();
  return true;
};
