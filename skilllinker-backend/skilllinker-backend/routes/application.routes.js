const express = require('express');
const router = express.Router();
const applicationController = require('../Controllers/application.controller');

router.post('/', applicationController.createApplication);
router.get('/', applicationController.getAllApplications);
router.get('/:id', applicationController.getApplicationById);
// 💡 FIX: ADD THE MISSING PUT ROUTE FOR UPDATING THE APPLICATION BY ID
router.put('/:id', applicationController.updateApplicationStatus);
router.delete('/:id', applicationController.deleteApplication);

module.exports = router;