const express = require('express');
const router = express.Router();
const resumeController = require('../Controllers/resume.controller');
const resumeMiddleware = require('../Middlewares/resume.middleware');
const multer = require('multer');

// Multer config: store in memory for database blob storage
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  fileFilter: resumeMiddleware.validateFile
});

// Upload resume
router.post('/', upload.single('resume'), resumeController.uploadResume);

// Get all resumes
router.get('/', resumeController.getAllResumes);

// Get single resume by ID
router.get('/:id', resumeController.getResumeById);

// Delete resume
router.delete('/:id', resumeController.deleteResume);

module.exports = router;
