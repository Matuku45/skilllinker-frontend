// Services/application.service.js
const Application = require('../sqlmodel/models/Application');


exports.createApplication = async ({ jobId, userId, resumeId, coverLetter }) => {
  if (!jobId || !userId || !resumeId) throw new Error('jobId, userId, and resumeId are required');
  
  return await Application.create({ jobId, userId, resumeId, coverLetter });
};

exports.getAllApplications = async () => {
  return await Application.findAll();
};

exports.getApplicationById = async (id) => {
  return await Application.findByPk(id);
};

exports.deleteApplication = async (id) => {
  const app = await Application.findByPk(id);
  if (!app) throw new Error('Application not found');
  await app.destroy();
  return true;
};

