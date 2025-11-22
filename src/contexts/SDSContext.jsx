import axios from "axios";

// NOTE: The API_URL was missing the closing backtick, I've assumed you intended to close it on the same line.
const API_URL = "http://localhost:3000/api";

/**
 * Job-related API calls
 */

export const getJobs = async (token) => {
    // Corrected: Use backticks (`) for template literals and surround the token variable
    const res = await axios.get(`${API_URL}/jobs?ts=${Date.now()}`, {
        // Corrected: Use backticks (`) for template literals and surround the token variable
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

export const createJob = async (jobData, token) => {
    // Corrected: Use backticks (`) for template literals
    const res = await axios.post(`${API_URL}/jobs`, jobData, {
        headers: {
            // Corrected: Use backticks (`) for template literals and surround the token variable
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
    });
    return res.data;
};

export const getJobById = async (jobId) => {
    // Corrected: Use backticks (`) for template literals and surround the jobId variable
    const res = await axios.get(`${API_URL}/jobs/${jobId}`);
    return res.data;
};

export const updateJob = async (jobId, jobData, token) => {
    // Corrected: Use backticks (`) for template literals and surround the jobId variable
    const res = await axios.put(`${API_URL}/jobs/${jobId}`, jobData, {
        // Corrected: Use backticks (`) for template literals and surround the token variable
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

export const deleteJob = async (jobId, token) => {
    // Corrected: Use backticks (`) for template literals and surround the jobId variable
    const res = await axios.delete(`${API_URL}/jobs/${jobId}`, {
        // Corrected: Use backticks (`) for template literals and surround the token variable
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

/**
 * Resume-related API calls
 */

export const getResume = async (userId, token) => {
    // Corrected: Use backticks (`) for template literals and surround the userId variable
    const res = await axios.get(`${API_URL}/resumes/${userId}`, {
        // Corrected: Use backticks (`) for template literals and surround the token variable
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

export const uploadResume = async (formData, token) => {
    // Corrected: Use backticks (`) for template literals
    const res = await axios.post(`${API_URL}/resumes/upload`, formData, {
        headers: {
            // Corrected: Use backticks (`) for template literals and surround the token variable
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
        },
    });
    return res.data;
};

export const updateResume = async (resumeId, formData, token) => {
    // Corrected: Use backticks (`) for template literals and surround the resumeId variable
    const res = await axios.put(`${API_URL}/resumes/${resumeId}`, formData, {
        headers: {
            // Corrected: Use backticks (`) for template literals and surround the token variable
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
        },
    });
    return res.data;
};

export const deleteResume = async (resumeId, token) => {
    // Corrected: Use backticks (`) for template literals and surround the resumeId variable
    const res = await axios.delete(`${API_URL}/resumes/${resumeId}`, {
        // Corrected: Use backticks (`) for template literals and surround the token variable
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

/**
 * Application-related API calls
 */

export const createApplication = async (applicationData, token) => {
    // Corrected: Use backticks (`) for template literals
    const res = await axios.post(`${API_URL}/applications`, applicationData, {
        headers: {
            // Corrected: Use backticks (`) for template literals and surround the token variable
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
    });
    return res.data;
};

export const getUserApplications = async (userId, token) => {
    // Corrected: Use backticks (`) for template literals and surround the userId variable
    const res = await axios.get(`${API_URL}/applications/user/${userId}`, {
        // Corrected: Use backticks (`) for template literals and surround the token variable
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

export const getApplicationsForJob = async (jobId, token) => {
    // Corrected: Use backticks (`) for template literals and surround the jobId variable
    const res = await axios.get(`${API_URL}/applications/job/${jobId}`, {
        // Corrected: Use backticks (`) for template literals and surround the token variable
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

export const deleteApplication = async (applicationId, token) => {
    // Corrected: Use backticks (`) for template literals and surround the applicationId variable
    const res = await axios.delete(`${API_URL}/applications/${applicationId}`, {
        // Corrected: Use backticks (`) for template literals and surround the token variable
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};