// routes/application.routes.js
const express = require('express');
const router = express.Router();
const ApplicationController = require('../Controllers/application.controller');

// Create a new application
router.post('/', ApplicationController.createApplication);

// Get all applications
router.get('/', ApplicationController.getAllApplications);

// Get single application
router.get('/:id', ApplicationController.getApplicationById);

// Update application status
router.put('/:id/status', ApplicationController.updateApplicationStatus);

// Delete an application
router.delete('/:id', ApplicationController.deleteApplication);

module.exports = router;
