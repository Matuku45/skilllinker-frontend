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
  const [resume, setResume] = useState(null);
  const [loadingResume, setLoadingResume] = useState(false);

  const apiUrl = 'https://skilllinker-frontend.onrender.com/api';

  // ---------------------------
  // Jobs
  // ---------------------------
  const fetchJobs = useCallback(async () => {
    setLoadingJobs(true);
    try {
      const res = await axios.get(`${apiUrl}/jobs`);
      setJobs(res.data);
    } catch (err) {
      console.error('Error fetching jobs:', err);
    } finally {
      setLoadingJobs(false);
    }
  }, []);

  // ---------------------------
  // Applications
  // ---------------------------
  const fetchApplications = useCallback(async () => {
    if (!currentUser?.token) return;
    setLoadingApplications(true);
    try {
      const res = await axios.get(`${apiUrl}/applications`, {
        headers: { Authorization: `Bearer ${currentUser.token}` },
      });
      setApplications(res.data);
    } catch (err) {
      console.error('Error fetching applications:', err);
    } finally {
      setLoadingApplications(false);
    }
  }, [currentUser?.token]);

  const applyToJob = useCallback(
    async (jobId, coverLetter) => {
      if (!currentUser?.token) throw new Error('User not logged in');
      try {
        const res = await axios.post(
          `${apiUrl}/applications`,
          { jobId, coverLetter },
          { headers: { Authorization: `Bearer ${currentUser.token}` } }
        );
        fetchApplications(); // refresh applications after applying
        return res.data;
      } catch (err) {
        console.error('Error applying to job:', err);
        throw err;
      }
    },
    [currentUser?.token, fetchApplications]
  );

  // ---------------------------
  // Resume Management
  // ---------------------------
  const fetchResume = useCallback(async () => {
    if (!currentUser?.token) return;
    setLoadingResume(true);
    try {
      const res = await axios.get(`${apiUrl}/resumes`, {
        headers: { Authorization: `Bearer ${currentUser.token}` },
        responseType: 'blob',
      });
      if (res.data) setResume(res.data);
    } catch (err) {
      console.log('No resume found');
    } finally {
      setLoadingResume(false);
    }
  }, [currentUser?.token]);

  const uploadResume = useCallback(
    async (file) => {
      if (!currentUser?.token) throw new Error('User not logged in');

      const formData = new FormData();
      formData.append('resume', file);

      setLoadingResume(true);
      try {
        const res = await axios.post(`${apiUrl}/resumes/upload`, formData, {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        setResume(file); // update local state
        return { success: true, data: res.data };
      } catch (err) {
        console.error('Error uploading resume:', err);
        return { success: false, error: err.response?.data?.error || err.message };
      } finally {
        setLoadingResume(false);
      }
    },
    [currentUser?.token]
  );

  // ---------------------------
  // Effects
  // ---------------------------
  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  useEffect(() => {
    if (currentUser?.token) {
      fetchApplications();
      fetchResume();
    }
  }, [currentUser?.token, fetchApplications, fetchResume]);

  return (
    <AssessorContext.Provider
      value={{
        jobs,
        applications,
        resume,
        loadingJobs,
        loadingApplications,
        loadingResume,
        fetchJobs,
        fetchApplications,
        applyToJob,
        fetchResume,
        uploadResume,
      }}
    >
      {children}
    </AssessorContext.Provider>
  );
};
