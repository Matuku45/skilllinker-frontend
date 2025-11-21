const express = require('express');
const router = express.Router();
const resumeController = require('../Controllers/resume.controller');
const { upload } = require('../Middlewares/resume.middleware');

router.post('/', upload.single('resume'), resumeController.uploadResume);
router.get('/', resumeController.getAllResumes);
router.get('/:id', resumeController.getResumeById);
router.delete('/:id', resumeController.deleteResume);

module.exports = router;
