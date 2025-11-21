import axios from "axios";

const API_URL = "http://localhost:3000/api";

// Fetch ALL jobs
export const getJobs = async () => {
  const res = await axios.get(`${API_URL}/jobs`);
  return res.data;
};

// Create a NEW Job
export const createJob = async (jobData, token) => {
  const res = await axios.post(`${API_URL}/jobs`, jobData, {
    headers: { 
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
  });
  return res.data;
};

// Get job BY ID
export const getJobById = async (jobId) => {
  const res = await axios.get(`${API_URL}/jobs/${jobId}`);
  return res.data;
};

// Update Job
export const updateJob = async (jobId, jobData, token) => {
  const res = await axios.put(`${API_URL}/jobs/${jobId}`, jobData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Delete Job
export const deleteJob = async (jobId, token) => {
  const res = await axios.delete(`${API_URL}/jobs/${jobId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
