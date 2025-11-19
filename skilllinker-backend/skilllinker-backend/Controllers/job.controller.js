
const jobService = require('../Services/job.service');

module.exports = {
  createJob: async (req, res) => {
    try {
      const sdpId = req.currentUser.id; // from authorizeRole, set before
      const job = await jobService.createJob(sdpId, req.body);
      res.status(201).json({ message: 'Job created', job });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

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
