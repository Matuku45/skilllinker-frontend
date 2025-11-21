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

  const apiUrl = 'http://localhost:3000/api';

  // Fetch all jobs (public)
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

  // Fetch applications for logged-in user
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

  // Apply to a job
  const applyToJob = useCallback(
    async (jobId, coverLetter) => {
      if (!currentUser?.token) throw new Error('User not logged in');
      try {
        const res = await axios.post(
          `${apiUrl}/applications`,
          { jobId, coverLetter },
          { headers: { Authorization: `Bearer ${currentUser.token}` } }
        );
        fetchApplications(); // refresh after applying
        return res.data;
      } catch (err) {
        console.error('Error applying to job:', err);
        throw err;
      }
    },
    [currentUser?.token, fetchApplications]
  );

  // ---------------------------
  // Resume Management Functions
  // ---------------------------

  // Fetch resume for logged-in user
  const fetchResume = useCallback(async () => {
    if (!currentUser?.token) return;
    setLoadingResume(true);
    try {
      const res = await axios.get(`${apiUrl}/resume`, {
        headers: { Authorization: `Bearer ${currentUser.token}` },
        responseType: 'blob', // to download or preview
      });
      if (res.data) setResume(res.data);
    } catch (err) {
      console.log('No resume found');
    } finally {
      setLoadingResume(false);
    }
  }, [currentUser?.token]);

  // Upload resume
export const uploadResume = async (file, token) => {
  const formData = new FormData();
  formData.append('resume', file);

  const res = await fetch('http://localhost:3000/api/resumes/upload', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}` // Make sure you send the JWT if required
    },
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json();
    return { success: false, error: error.message || 'Upload failed' };
  }

  return { success: true };
};

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
