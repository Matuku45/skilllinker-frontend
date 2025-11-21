import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const AssessorContext = createContext();

export const useAssessor = () => useContext(AssessorContext);

export const AssessorProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [loadingApplications, setLoadingApplications] = useState(false);

  const apiUrl = 'http://localhost:3000/api';

  // Fetch all jobs (available to everyone)
  const fetchJobs = async () => {
    setLoadingJobs(true);
    try {
      const res = await axios.get(`${apiUrl}/jobs`); // no auth header
      setJobs(res.data);
    } catch (err) {
      console.error('Error fetching jobs:', err);
    } finally {
      setLoadingJobs(false);
    }
  };

  // Fetch applications for current user (only if logged in)
  const fetchApplications = async () => {
    if (!currentUser?.token) return; // skip if no token
    setLoadingApplications(true);
    try {
      const res = await axios.get(`${apiUrl}/applications`, {
        headers: { Authorization: `Bearer ${currentUser.token}` }
      });
      setApplications(res.data);
    } catch (err) {
      console.error('Error fetching applications:', err);
    } finally {
      setLoadingApplications(false);
    }
  };

  // Apply to a job (only for logged-in users)
  const applyToJob = async (jobId, coverLetter) => {
    if (!currentUser?.token) throw new Error('User not logged in');
    try {
      const res = await axios.post(`${apiUrl}/applications`, {
        jobId,
        coverLetter
      }, {
        headers: { Authorization: `Bearer ${currentUser.token}` }
      });
      fetchApplications(); // refresh applications
      return res.data;
    } catch (err) {
      console.error('Error applying to job:', err);
      throw err;
    }
  };

  // Fetch jobs for everyone; fetch applications only if logged in
  useEffect(() => {
    fetchJobs();
    if (currentUser?.token) {
      fetchApplications();
    }
  }, [currentUser?.token]);

  return (
    <AssessorContext.Provider
      value={{
        jobs,
        applications,
        loadingJobs,
        loadingApplications,
        fetchJobs,
        fetchApplications,
        applyToJob
      }}
    >
      {children}
    </AssessorContext.Provider>
  );
};
