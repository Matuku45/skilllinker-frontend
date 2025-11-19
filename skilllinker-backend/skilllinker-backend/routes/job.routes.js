const express = require('express');
const router = express.Router();

// Correct path to controller:
const jobController = require('../Controllers/job.controller');  
const { authenticate, authorizeRole } = require('../Middlewares/users.middleware');

router.get('/', jobController.getAllJobs);
router.get('/:id', jobController.getJobById);

// Only SDP can do these:
router.post('/', authenticate, authorizeRole('sdp'), jobController.createJob);
router.put('/:id', authenticate, authorizeRole('sdp'), jobController.updateJob);
router.delete('/:id', authenticate, authorizeRole('sdp'), jobController.deleteJob);

module.exports = router;
