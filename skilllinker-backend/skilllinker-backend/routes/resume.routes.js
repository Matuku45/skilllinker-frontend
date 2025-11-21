// routes/resume.routes.js
const express = require('express');
const router = express.Router();
const resumeController = require('../Controllers/resume.controller');
const multer = require('multer');

// Store file in memory (required for BLOB storage)
const storage = multer.memoryStorage();

// File validation
const fileFilter = (req, file, cb) => {
  const allowedMimes = [
    'text/plain',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/rtf',
  ];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only txt, pdf, doc, docx, and rtf files are allowed'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // optional: 10MB limit
});

// Routes
router.post('/upload', upload.single('resume'), resumeController.uploadResume);
router.get('/', resumeController.getAllResumes);
router.get('/:id', resumeController.getResumeById);
router.delete('/:id', resumeController.deleteResume);

module.exports = router;
