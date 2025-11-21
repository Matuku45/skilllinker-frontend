// Services/application.service.js
const Application = require('../sqlmodel/models/Application');


// Services/application.service.js (REQUIRED CHANGE)

exports.createApplication = async ({ jobId, userId, coverLetter }) => { // 1. Remove resumeId from destructuring
  // 2. Update validation to only check for required fields (jobId, userId)
  if (!jobId || !userId) throw new Error('jobId and userId are required');
  
  // 3. Remove resumeId from the create payload
  return await Application.create({ jobId, userId, coverLetter }); 
};

// ... (rest of the file remains the same)

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

