const jobService = require('../Services/job.service');
// 🚨 NEW: Import the broadcast function from the message controller
const { broadcastJobNotification } = require('../Controllers/message.controller');

module.exports = {
  /**
   * Creates a new job and asynchronously triggers the broadcast notification.
   * POST /api/jobs
   */
  createJob: async (req, res) => {
    // Assuming currentUser is set by middleware and contains the job poster's ID and role
    const sdpId = req.currentUser.id; 
    
    try {
      // 1. Synchronously save the job (blocking)
      const job = await jobService.createJob(sdpId, req.body);

      // 2. Asynchronously trigger the message broadcast (NON-BLOCKING)
      // We do NOT use 'await' here. This ensures the response is sent immediately.
      broadcastJobNotification(job, sdpId).catch(err => {
        // Log the error if the background broadcast fails, but let the client response continue.
        console.error(`🚨 Background message broadcast failed for Job ID ${job.id}:`, err);
      });

      // 3. Immediately send a success response to the client
      res.status(201).json({ message: 'Job created and broadcast started', job });
    } catch (err) {
      // Only handles errors related to job creation/saving
      console.error("Error creating job:", err);
      res.status(400).json({ error: err.message });
    }
  },

  // -----------------------------------------------------------
  // Existing functions (no changes needed)
  // -----------------------------------------------------------

  getAllJobs: async (req, res) => {
    try {
      const jobs = await jobService.getAllJobs();
      res.json(jobs);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getJobById: async (req, res) => {
    try {
      const id = req.params.id;
      const job = await jobService.getJobById(id);
      res.json(job);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  },

  updateJob: async (req, res) => {
    try {
      const id = req.params.id;
      const sdpId = req.currentUser.id;
      const updated = await jobService.updateJob(id, sdpId, req.body);
      res.json({ message: 'Job updated', updated });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  deleteJob: async (req, res) => {
    try {
      const id = req.params.id;
      const sdpId = req.currentUser.id;
      await jobService.deleteJob(id, sdpId);
      res.json({ message: 'Job deleted' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};