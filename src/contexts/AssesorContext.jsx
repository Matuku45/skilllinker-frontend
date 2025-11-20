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

  // Fetch all jobs
  const fetchJobs = async () => {
    setLoadingJobs(true);
    try {
      const res = await axios.get(`${apiUrl}/jobs`, {
        headers: { Authorization: `Bearer ${currentUser.token}` }
      });
      setJobs(res.data);
    } catch (err) {
      console.error('Error fetching jobs:', err);
    } finally {
      setLoadingJobs(false);
    }
  };

  // Fetch all applications by current user
  const fetchApplications = async () => {
    setLoadingApplications(true);
    try {
      const res = await axios.get(`${apiUrl}/applications`, {
        headers: { Authorization: `Bearer ${currentUser.token}` }
      });
      // Filter applications only for this user if needed
      setApplications(res.data);
    } catch (err) {
      console.error('Error fetching applications:', err);
    } finally {
      setLoadingApplications(false);
    }
  };

  // Apply to a job
  const applyToJob = async (jobId, coverLetter) => {
    try {
      const res = await axios.post(`${apiUrl}/applications`, {
        jobId,
        coverLetter
      }, {
        headers: { Authorization: `Bearer ${currentUser.token}` }
      });
      // Refresh applications list
      fetchApplications();
      return res.data;
    } catch (err) {
      console.error('Error applying to job:', err);
      throw err;
    }
  };

  // On mount, fetch jobs and applications
  useEffect(() => {
    if (currentUser?.token) {
      fetchJobs();
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
