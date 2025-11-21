const express = require('express');
const router = express.Router();
const multer = require('multer');
const resumeController = require('../controllers/resume.controller');

// Memory storage for file upload
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const allowed = [
      'text/plain',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/rtf',
    ];
    if (!allowed.includes(file.mimetype)) {
      return cb(new Error('Invalid file type'));
    }
    cb(null, true);
  },
});

// Routes
router.post('/upload', upload.single('resume'), resumeController.uploadResume);
router.get('/', resumeController.getAllResumes);
router.get('/:id', resumeController.getResumeById);
router.delete('/:id', resumeController.deleteResume);

module.exports = router;
