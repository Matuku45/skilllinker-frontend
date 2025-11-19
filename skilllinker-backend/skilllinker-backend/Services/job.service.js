const path = require('path');
const { Job, User } = require(path.join(__dirname, '..', 'sqlmodel', 'models'));

const jobService = {
  createJob: async (sdpId, jobData) => {
    const user = await User.findByPk(sdpId);
    if (!user || user.userType !== 'sdp') {
      throw new Error('Only SDPs can create jobs');
    }
    const job = await Job.create({ ...jobData, sdpId });
    return job;
  },

  getAllJobs: async () => {
    return await Job.findAll();
  },

  getJobById: async (id) => {
    const job = await Job.findByPk(id);
    if (!job) throw new Error('Job not found');
    return job;
  },

  updateJob: async (id, sdpId, updates) => {
    const job = await Job.findByPk(id);
    if (!job) throw new Error('Job not found');
    if (job.sdpId !== sdpId) throw new Error('Not allowed to update this job');
    return await job.update(updates);
  },

  deleteJob: async (id, sdpId) => {
    const job = await Job.findByPk(id);
    if (!job) throw new Error('Job not found');
    if (job.sdpId !== sdpId) throw new Error('Not allowed to delete this job');
    await job.destroy();
  }
};

module.exports = jobService;
