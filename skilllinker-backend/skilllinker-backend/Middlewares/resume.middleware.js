const multer = require('multer');

// Memory storage for BLOB storage
const storage = multer.memoryStorage();

// File type validation
const fileFilter = (req, file, cb) => {
  const allowedMimes = [
    'text/plain',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/rtf'
  ];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only txt, pdf, doc, docx, and rtf files are allowed'));
  }
};

// Limit file size to 5MB
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
});

module.exports = { upload };
