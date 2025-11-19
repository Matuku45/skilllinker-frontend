// routes/resume.routes.js
const express = require('express');
const router = express.Router();
const resumeController = require('../Controllers/resume.controller');
const multer = require('multer');
const path = require('path');

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // make sure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

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

const upload = multer({ storage, fileFilter });

// Routes
router.post('/upload', upload.single('resume'), resumeController.uploadResume);
router.get('/', resumeController.getAllResumes);
router.get('/:id', resumeController.getResumeById);
router.delete('/:id', resumeController.deleteResume);

module.exports = router;
