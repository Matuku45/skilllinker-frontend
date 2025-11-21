// In AssessorContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
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

  // Use useCallback to prevent infinite loop
  const fetchJobs = useCallback(async () => {
    setLoadingJobs(true);
    try {
      const res = currentUser?.token
        ? await axios.get(`${apiUrl}/jobs`, { headers: { Authorization: `Bearer ${currentUser.token}` } })
        : await axios.get(`${apiUrl}/jobs`); // public fetch if no token
      setJobs(res.data);
    } catch (err) {
      console.error('Error fetching jobs:', err);
    } finally {
      setLoadingJobs(false);
    }
  }, [currentUser?.token]);

  const fetchApplications = useCallback(async () => {
    if (!currentUser?.token) return;
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
  }, [currentUser?.token]);

  useEffect(() => {
    fetchJobs();
    fetchApplications();
  }, [fetchJobs, fetchApplications]);

  return (
    <AssessorContext.Provider
      value={{
        jobs,
        applications,
        loadingJobs,
        loadingApplications,
        fetchJobs,
        fetchApplications,
      }}
    >
      {children}
    </AssessorContext.Provider>
  );
};
