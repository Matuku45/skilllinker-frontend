import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockJobs } from "../../data/mockData";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaCheck,
} from "react-icons/fa";
import ApplicationModal from "./ApplicationModal"; // assume extracted

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [job, setJob] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

  /* ------------------------------------------
     MAIN APPLICATION LOGIC
  ------------------------------------------ */
  const handleApplication = async (resume, coverLetter) => {
    try {
      if (!currentUser) {
        alert("You must be logged in to apply.");
        return;
      }

      const uploadForm = new FormData();
      uploadForm.append("userId", currentUser.id);
      uploadForm.append("description", "Resume upload");
      uploadForm.append("resume", resume);

      // 1️⃣ Upload Resume to Backend
      const uploadResponse = await axios.post(
        "http://localhost:3000/api/resumes/upload",
        uploadForm,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );

      const uploadedResumeId = uploadResponse.data.resume.id;

      // 2️⃣ Create Application Record
      await axios.post(
        "http://localhost:3000/api/applications",
        {
          jobId: job.id,
          userId: currentUser.id,
          coverLetter,
          resumeId: uploadedResumeId,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );

      alert("Application submitted successfully!");
      setShowModal(false);

    } catch (err) {
      console.error("Application error:", err);
      alert("Failed to submit application.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 hover:text-blue-800 transition mb-6"
      >
        ← Back to Jobs
      </button>

      <div className="bg-white rounded-xl shadow-xl p-8 border border-gray-100 max-w-3xl mx-auto">
        <div className="flex justify-between items-start">
          <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
          <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700">
            {job.status}
          </span>
        </div>

        <p className="mt-4 text-gray-700 text-lg leading-relaxed">
          {job.description}
        </p>

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

        <button
          onClick={() => setShowModal(true)}
          className="mt-8 w-full py-3 bg-blue-600 text-white rounded-lg shadow-lg text-lg font-medium hover:bg-blue-700 transition"
        >
          Apply for this Job
        </button>
      </div>

      {showModal && (
        <ApplicationModal
          job={job}
          user={currentUser}
          onClose={() => setShowModal(false)}
          onSubmit={({ resume, coverLetter }) =>
            handleApplication(resume, coverLetter)
          }
        />
      )}
    </div>
  );
};

export default JobDetails;
