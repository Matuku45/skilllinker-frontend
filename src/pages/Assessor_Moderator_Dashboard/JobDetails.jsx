import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { mockJobs } from '../../data/mockData';
import { FaBriefcase, FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaCheck, FaTimes } from 'react-icons/fa';

const JobDetails = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const [job, setJob] = useState(null);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const foundJob = mockJobs.find(j => j.id === parseInt(id));
    setJob(foundJob);
  }, [id]);

  if (!job) return <p className="p-6 text-gray-500">Loading job details...</p>;

  const isApplied = job.applicants.includes(currentUser.id);

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (files.length === 0) {
      alert("Please select at least one file to submit.");
      return;
    }
    // Mock submission
    job.applicants.push(currentUser.id);
    setJob({ ...job });
    setFiles([]);
    setShowUploadForm(false);
    alert("Application submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 hover:underline"
      >
        &larr; Back to Job Board
      </button>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
            {job.status}
          </span>
        </div>

        <p className="mt-4 text-gray-700">{job.description}</p>

        <div className="mt-4 space-y-2">
          <div className="flex items-center text-gray-500"><FaBriefcase className="mr-2" /> {job.sdpName}</div>
          <div className="flex items-center text-gray-500"><FaMapMarkerAlt className="mr-2" /> {job.location}</div>
          <div className="flex items-center text-gray-500"><FaCalendarAlt className="mr-2" /> Deadline: {new Date(job.deadline).toLocaleDateString()}</div>
          <div className="flex items-center text-gray-500"><FaUsers className="mr-2" /> {job.applicants.length} applicants</div>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Required Qualifications:</h3>
          <ul className="text-gray-700 space-y-1">
            {job.requiredQualifications.map((qual, index) => (
              <li key={index} className="flex items-center"><FaCheck className="mr-2 text-green-500" /> {qual}</li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          {isApplied ? (
            <button
              onClick={() => {
                job.applicants = job.applicants.filter(uid => uid !== currentUser.id);
                setJob({ ...job });
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium"
            >
              Withdraw Application
            </button>
          ) : (
            <button
              onClick={() => setShowUploadForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium"
            >
              Register / Upload Documents
            </button>
          )}
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
            <button
              onClick={() => setShowUploadForm(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <FaTimes size={20} />
            </button>
            <h2 className="text-xl font-bold mb-4">Upload Application Documents</h2>
            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Documents</label>
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                />
              </div>
              {files.length > 0 && (
                <div className="text-gray-600 text-sm">
                  <strong>Selected files:</strong>
                  <ul className="list-disc list-inside">
                    {files.map((file, idx) => <li key={idx}>{file.name}</li>)}
                  </ul>
                </div>
              )}
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-medium"
              >
                Submit Application
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetails;
