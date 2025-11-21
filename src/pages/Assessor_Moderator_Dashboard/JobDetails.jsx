import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockJobs } from '../../data/mockData';
import { FaBriefcase, FaMapMarkerAlt, FaCalendarAlt, FaCheck } from 'react-icons/fa';

/* ---------------------------------------------------
   APPLICATION MODAL
--------------------------------------------------- */
const ApplicationModal = ({ job, user, onClose, onSubmit }) => {
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState("I am interested in this job.");

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = () => {
    if (!resume) return alert("Please upload your resume.");
    onSubmit({ resume, coverLetter });
  };

  if (!job) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-lg w-full max-w-lg p-6 shadow-xl">
        <h2 className="text-xl font-bold mb-4">Apply for {job.title}</h2>

        <div className="space-y-3">
          {/* Name */}
          <div>
            <label className="font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              value={`${user.firstName} ${user.lastName}`}
              disabled
              className="w-full border p-2 rounded bg-gray-100"
            />
          </div>

          {/* Email */}
          <div>
            <label className="font-medium text-gray-700">Email</label>
            <input
              type="text"
              value={user.email}
              disabled
              className="w-full border p-2 rounded bg-gray-100"
            />
          </div>

          {/* Resume Upload */}
          <div>
            <label className="font-medium text-gray-700">Upload Resume</label>
            <input type="file" onChange={handleFileChange} className="w-full" />
          </div>

          {/* Cover Letter */}
          <div>
            <label className="font-medium text-gray-700">Cover Letter</label>
            <textarea
              className="w-full border p-2 rounded"
              rows={4}
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
            />
          </div>
        </div>

        {/* Modal Buttons */}
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit Application
          </button>
        </div>
      </div>
    </div>
  );
};

/* ---------------------------------------------------
   MAIN PAGE — JOB DETAILS
--------------------------------------------------- */
const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  // Mock authenticated user (replace with real context later)
  const currentUser = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@mail.com"
  };

  useEffect(() => {
    const foundJob = mockJobs.find(j => j.id === parseInt(id));
    setJob(foundJob);
  }, [id]);

  if (!job) return <p className="p-6 text-gray-500">Loading job details...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 hover:underline"
      >
        &larr; Back to Job Board
      </button>

      {/* Job Details Card */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>

          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
            {job.status}
          </span>
        </div>

        <p className="mt-4 text-gray-700">{job.description}</p>

        <div className="mt-4 space-y-2">
          <div className="flex items-center text-gray-500">
            <FaBriefcase className="mr-2" />
            {job.sdpName}
          </div>

          <div className="flex items-center text-gray-500">
            <FaMapMarkerAlt className="mr-2" />
            {job.location}
          </div>

          <div className="flex items-center text-gray-500">
            <FaCalendarAlt className="mr-2" />
            Deadline: {new Date(job.deadline).toLocaleDateString()}
          </div>
        </div>

        {/* Qualifications */}
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-900 mb-2">
            Required Qualifications:
          </h3>

          <ul className="text-gray-700 space-y-1">
            {job.requiredQualifications.map((qual, index) => (
              <li key={index} className="flex items-center">
                <FaCheck className="mr-2 text-green-500" /> {qual}
              </li>
            ))}
          </ul>
        </div>

        {/* APPLY BUTTON */}
        <button
          onClick={() => setShowModal(true)}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Apply for this Job
        </button>
      </div>

      {/* APPLICATION MODAL */}
      {showModal && (
        <ApplicationModal
          job={job}
          user={currentUser}
          onClose={() => setShowModal(false)}
          onSubmit={({ resume, coverLetter }) => {
            
            // BUILD FORM-DATA
            const formData = new FormData();
            formData.append("jobId", job.id);
            formData.append("resume", resume);
            formData.append("coverLetter", coverLetter);

            // TODO: Replace with real API call
            console.log("APPLICATION SUBMITTED:", {
              jobId: job.id,
              resume,
              coverLetter
            });

            alert("Application submitted successfully!");

            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

export default JobDetails;
