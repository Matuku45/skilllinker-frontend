import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockJobs } from "../../data/mockData";
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaCheck,
} from "react-icons/fa";

/* ---------------------------------------------------
   APPLICATION MODAL — MODERN TAILWIND UI
--------------------------------------------------- */
const ApplicationModal = ({ job, user, onClose, onSubmit }) => {
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState(
    "I am interested in this job."
  );

  const handleSubmit = () => {
    if (!resume) return alert("Please upload your resume.");
    onSubmit({ resume, coverLetter });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center backdrop-blur-sm z-50">
      <div className="bg-white w-full max-w-xl p-6 rounded-xl shadow-2xl border border-gray-200 animate-fadeIn">
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Apply for {job.title}
        </h2>

        <div className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Full Name
            </label>
            <input
              disabled
              className="w-full bg-gray-100 border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-200"
              value={`${user.firstName} ${user.lastName}`}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Email
            </label>
            <input
              disabled
              className="w-full bg-gray-100 border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-200"
              value={user.email}
            />
          </div>

          {/* Resume */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Upload Resume
            </label>
            <input
              type="file"
              onChange={(e) => setResume(e.target.files[0])}
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* Cover Letter */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Cover Letter
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-200"
              rows={4}
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow transition"
          >
            Submit Application
          </button>
        </div>
      </div>
    </div>
  );
};

/* ---------------------------------------------------
   JOB DETAILS PAGE — MODERN TAILWIND UI
--------------------------------------------------- */
const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const currentUser = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@mail.com",
  };

  useEffect(() => {
    const foundJob = mockJobs.find((j) => j.id === parseInt(id));
    setJob(foundJob);
  }, [id]);

  if (!job)
    return (
      <p className="p-6 text-gray-500 text-center text-xl animate-pulse">
        Loading job details...
      </p>
    );

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

        {/* Header */}
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

        {/* Job Info */}
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
              Deadline:{" "}
              <strong>{new Date(job.deadline).toLocaleDateString()}</strong>
            </span>
          </div>
        </div>

        {/* Qualifications */}
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

        {/* APPLY BUTTON */}
        <button
          onClick={() => setShowModal(true)}
          className="mt-8 w-full py-3 bg-blue-600 text-white rounded-lg shadow-lg text-lg font-medium hover:bg-blue-700 transition"
        >
          Apply for this Job
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <ApplicationModal
          job={job}
          user={currentUser}
          onClose={() => setShowModal(false)}
          onSubmit={({ resume, coverLetter }) => {
            const formData = new FormData();
            formData.append("jobId", job.id);
            formData.append("resume", resume);
            formData.append("coverLetter", coverLetter);

            console.log("APPLICATION SUBMITTED:", formData);
            alert("Application submitted successfully!");
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

export default JobDetails;
