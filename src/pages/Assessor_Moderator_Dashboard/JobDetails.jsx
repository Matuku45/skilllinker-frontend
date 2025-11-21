import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockJobs } from "../../data/mockData";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

import { FaBriefcase, FaMapMarkerAlt, FaCalendarAlt, FaCheck } from "react-icons/fa";
// NOTE: Assuming ApplicationModal is correctly imported or defined elsewhere for JobDetails.
import ApplicationModal from "./ApplicationModal"; 

/* =========================================================================
   JOB DETAILS PAGE
=========================================================================== */
const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [job, setJob] = useState(null);
  const [showModal, setShowModal] = useState(false);

  /* Get Job from Mock Data */
  useEffect(() => {
    const foundJob = mockJobs.find((j) => j.id === parseInt(id));
    setJob(foundJob);
  }, [id]);

  if (!job) {
    return (
      <p className="p-6 text-gray-500 text-center text-xl animate-pulse">
        Loading job details...
      </p>
    );
  }

  /* =========================================================================
     HANDLE APPLICATION (SIMPLIFIED - Only creates application)
  ========================================================================= */
// Arguments simplified: Only receives coverLetter from the updated ApplicationModal
const handleApplication = async (coverLetter) => { 
  if (!currentUser) {
    alert("You must be logged in to apply.");
    return;
  }

  // 💡 ADDED: Client-side validation/debug check
  const finalJobId = Number(job?.id); 
  const finalUserId = Number(currentUser.id); 
  
  if (!finalJobId || !finalUserId) {
    console.error("DEBUG ERROR: Cannot send request. Client-side ID check failed.", {
      jobId: job?.id,
      userId: currentUser.id,
      finalJobId, // Check if this is NaN or 0
      finalUserId // Check if this is NaN or 0 (The likely culprit)
    });
    alert("Error: Missing Job ID or User ID. Please ensure you are logged in correctly and try refreshing.");
    return; // 🛑 Stop the request immediately
  }
  // END DEBUG CHECK
  
  // Removed: if (!resume) { ... } validation is gone.
  try {
    // ---------------------------
    // STEP 1: Upload Resume logic REMOVED
    // ---------------------------
    
    // ---------------------------
    // STEP 2: Create Application (Simplified Payload)
    // ---------------------------
    const applicationPayload = {
      jobId: finalJobId,           // Use validated ID
      userId: finalUserId,  // Use validated ID
      // resumeId field REMOVED 👈
      coverLetter: coverLetter?.toString() || "No cover letter provided",
    };
// ...

    await axios.post(
      "http://localhost:3000/api/applications",
      applicationPayload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
      }
    );

    alert("Application submitted successfully!");
    setShowModal(false);
  } catch (err) {
    console.error(
      "Application submission error:",
      err.response?.data || err.message || err
    );
    alert(
      `Failed to submit application: ${
        err.response?.data?.message || err.message
      }`
    );
  }
};


  /* =========================================================================
     UI RENDERING
  ========================================================================= */
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-6">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 hover:text-blue-800 transition mb-6"
      >
        ← Back to Jobs
      </button>

      {/* Main Job Card */}
      <div className="bg-white rounded-xl shadow-xl p-8 border border-gray-100 max-w-3xl mx-auto">

        {/* Job Header */}
        <div className="flex justify-between items-start">
          <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
          <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700">
            {job.status}
          </span>
        </div>

        {/* Description */}
        <p className="mt-4 text-gray-700 text-lg leading-relaxed">
          {job.description}
        </p>

        {/* Job Info Section */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center text-gray-600">
            <FaBriefcase className="mr-2 text-blue-500" />
            <span>{job.sdpName}</span>
          </div>

          <div className="flex items-center text-gray-600">
            <FaMapMarkerAlt className="mr-2 text-red-500" />
            <span>{job.location}</span>
          </div>

          <div className="flex items-center text-gray-600">
            <FaCalendarAlt className="mr-2 text-purple-500" />
            <span>
              Deadline: <strong>{new Date(job.deadline).toLocaleDateString()}</strong>
            </span>
          </div>
        </div>

        {/* Required Qualifications */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Required Qualifications:
          </h3>
          <ul className="space-y-2">
            {job.requiredQualifications.map((qual, index) => (
              <li
                key={index}
                className="flex items-center bg-gray-100 p-2 rounded-lg text-gray-700"
              >
                <FaCheck className="mr-2 text-green-600" /> {qual}
              </li>
            ))}
          </ul>
        </div>

        {/* Apply Button */}
        <button
          onClick={() => setShowModal(true)}
          className="mt-8 w-full py-3 bg-blue-600 text-white rounded-lg shadow-lg text-lg font-medium hover:bg-blue-700 transition"
        >
          Apply for this Job
        </button>
      </div>

      {/* Application Modal */}
      {showModal && (
        <ApplicationModal
          job={job}
          user={currentUser}
          onClose={() => setShowModal(false)}
          onSubmit={({ coverLetter }) => handleApplication(coverLetter)} // 👈 Updated to only pass coverLetter
        />
      )}
    </div>
  );
};

export default JobDetails;