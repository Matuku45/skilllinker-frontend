// Validate uploaded file type
exports.validateFile = (req, file, cb) => {
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
