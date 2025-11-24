import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FaBriefcase, FaMapMarkerAlt, FaCalendarAlt, FaCheck, FaTimesCircle } from "react-icons/fa";

import { useAuth } from "../../contexts/AuthContext";
import { useAssessor } from "../../contexts/AssessorContext";

import axios from "axios";

const API_BASE_URL = "https://skilllinker-frontend.onrender.com/api";

// --- Application Modal ---
const ApplicationModal = ({ job, onClose, onSubmit }) => {
  const [coverLetter, setCoverLetter] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!coverLetter.trim()) {
      setError("Cover letter is required.");
      return;
    }

    setSubmitting(true);
    await onSubmit(coverLetter);
    setSubmitting(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">

        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-xl font-bold">Apply for: {job.title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <FaTimesCircle className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 mb-4">{error}</p>}

          <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-2">
            Cover Letter
          </label>

          <textarea
            id="coverLetter"
            rows="6"
            value={coverLetter}
            onChange={(e) => { setCoverLetter(e.target.value); setError(null); }}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 resize-none"
            placeholder="Write your cover letter..."
          />

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              disabled={submitting}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting}
              className={`py-2 px-4 rounded-lg text-white ${submitting ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"}`}
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

// --- Job List Page ---
const JobListPage = () => {
  const navigate = useNavigate();
  const { currentUser, isAuthenticated } = useAuth();
  const { jobs, applyToJob } = useAssessor();

  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // ✅ FIXED: SEND jobId & userId CORRECTLY
const handleApply = async (coverLetter) => {
  if (!selectedJob) return;

  if (!currentUser || !currentUser.id) {
    alert("User not authenticated.");
    return;
  }

  try {
    const payload = {
      jobId: Number(selectedJob.id),
      userId: Number(currentUser.id),
      coverLetter: coverLetter
    };

    console.log("📤 Sending Application Payload:", payload);

    const response = await axios.post(
      `${API_BASE_URL}/applications`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`
        }
      }
    );

    alert("Application submitted!");
    setShowModal(false);
    setSelectedJob(null);

  } catch (err) {
    console.error("❌ Application API Error:", err.response?.data || err);
    alert(err.response?.data?.message || err.message || "Failed to submit application.");
  }
};


  if (!jobs || jobs.length === 0)
    return <div className="p-6 text-center text-xl">Loading jobs list...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">

      <button onClick={() => navigate(-1)} className="text-blue-600 hover:text-blue-800 mb-4 font-medium">
        ← Back
      </button>

      <h1 className="text-3xl font-bold text-gray-900 mb-6">All Jobs</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {jobs.map(job => {
          const qualifications = Array.isArray(job.requiredQualifications)
            ? job.requiredQualifications
            : job.requiredQualifications
            ? [job.requiredQualifications]
            : [];

          return (
            <div key={job.id} className="bg-white shadow-lg hover:shadow-xl transition-shadow rounded-xl p-6 border border-gray-200">

              <h2 className="text-xl font-semibold text-gray-800 mb-2">{job.title}</h2>
              <p className="text-sm text-gray-600 line-clamp-3">{job.description}</p>

              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center text-gray-600">
                  <FaBriefcase className="w-4 h-4 mr-2 text-blue-500" /> Company: {job.sdpName || "N/A"}
                </div>
                <div className="flex items-center text-gray-600">
                  <FaMapMarkerAlt className="w-4 h-4 mr-2 text-red-500" /> Location: {job.location || "N/A"}
                </div>
                <div className="flex items-center text-gray-600">
                  <FaCalendarAlt className="w-4 h-4 mr-2 text-purple-500" /> Deadline: {job.deadline ? new Date(job.deadline).toLocaleDateString() : "N/A"}
                </div>
              </div>

              <div className="mt-4">
                <h3 className="font-semibold text-gray-800 mb-1">Required Qualifications:</h3>

                <ul className="space-y-1 text-sm">

                  {qualifications.slice(0, 3).map((q, i) => {
                    const content =
                      typeof q === "string"
                        ? q
                        : `${q.skills || ''}${q.experience ? ' - ' + q.experience : ''}`;

                    return (
                      <li key={i} className="flex items-start text-gray-700">
                        <FaCheck className="w-3 h-3 mr-2 mt-1 text-green-600 flex-shrink-0" />
                        <span className="line-clamp-1">{content}</span>
                      </li>
                    );
                  })}

                  {qualifications.length > 3 && (
                    <li className="text-gray-500 text-xs mt-1">
                      ...and {qualifications.length - 3} more
                    </li>
                  )}

                  {qualifications.length === 0 && (
                    <li className="text-gray-500">No qualifications listed</li>
                  )}

                </ul>
              </div>

              <button
                onClick={() => { setSelectedJob(job); setShowModal(true); }}
                disabled={!isAuthenticated || job.status !== "open"}
                className={`mt-6 w-full py-2 rounded text-white font-medium transition-colors 
                  ${!isAuthenticated || job.status !== "open"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                  }`}
              >
                {isAuthenticated ? "Apply for this Job" : "Login to Apply"}
              </button>

            </div>
          );
        })}

      </div>

      {showModal && selectedJob && (
        <ApplicationModal
          job={selectedJob}
          onClose={() => { setShowModal(false); setSelectedJob(null); }}
          onSubmit={handleApply}
        />
      )}

    </div>
  );
};

export default JobListPage;
