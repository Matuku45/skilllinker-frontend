import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { mockJobs, mockUsers, getApplicantsForJob } from '../../data/mockData';
import { FaPlus, FaBriefcase, FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaEye, FaCheck, FaTimes } from 'react-icons/fa';

const SDPDashboard = () => {
  const { currentUser, logout } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [showPostJob, setShowPostJob] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [newJob, setNewJob] = useState({
    title: '',
    description: '',
    location: '',
    budget: '',
    deadline: '',
    requiredQualifications: ''
  });

  useEffect(() => {
    // Filter jobs posted by this SDP
    const sdpJobs = mockJobs.filter(job => job.sdpId === currentUser.id);
    setJobs(sdpJobs);
  }, [currentUser.id]);

  const handlePostJob = (e) => {
    e.preventDefault();
    const job = {
      id: mockJobs.length + 1,
      ...newJob,
      sdpId: currentUser.id,
      sdpName: currentUser.companyName || `${currentUser.firstName} ${currentUser.lastName}`,
      budget: parseInt(newJob.budget),
      status: 'open',
      applicants: [],
      postedDate: new Date().toISOString().split('T')[0],
      requiredQualifications: newJob.requiredQualifications.split(',').map(q => q.trim())
    };
    mockJobs.push(job);
    setJobs([...jobs, job]);
    setNewJob({
      title: '',
      description: '',
      location: '',
      budget: '',
      deadline: '',
      requiredQualifications: ''
    });
    setShowPostJob(false);
  };

  const handleAssignJob = (jobId, userId) => {
    const job = mockJobs.find(j => j.id === jobId);
    if (job) {
      job.assignedTo = [userId];
      job.status = 'in-progress';
      setJobs([...jobs]);
    }
  };

  const handleRejectApplicant = (jobId, userId) => {
    const job = mockJobs.find(j => j.id === jobId);
    if (job) {
      job.applicants = job.applicants.filter(id => id !== userId);
      setJobs([...jobs]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">SDP Dashboard - {currentUser.companyName}</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Welcome, {currentUser.firstName} {currentUser.lastName}
              </span>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                currentUser.verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {currentUser.verified ? 'Verified' : 'Pending Verification'}
              </span>
              <button
                onClick={() => setShowPostJob(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center"
              >
                <FaPlus className="mr-2" />
                Post Job
              </button>
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Jobs List */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">{job.title}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    job.status === 'open' ? 'bg-green-100 text-green-800' :
                    job.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {job.status}
                  </span>
                </div>

                <p className="mt-2 text-sm text-gray-600">{job.description}</p>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <FaMapMarkerAlt className="mr-2" />
                    {job.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <FaCalendarAlt className="mr-2" />
                    Deadline: {new Date(job.deadline).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <FaUsers className="mr-2" />
                    {getApplicantsForJob(job.id).length} applicants
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-sm font-medium text-gray-900 mb-2">Required Qualifications:</div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {job.requiredQualifications.map((qual, index) => (
                      <li key={index} className="flex items-center">
                        <FaCheck className="mr-2 text-green-500" />
                        {qual}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-lg font-bold text-green-600">R{job.budget.toLocaleString()}</span>
                  <button
                    onClick={() => setSelectedJob(job)}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center"
                  >
                    <FaEye className="mr-2" />
                    View Applicants
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {jobs.length === 0 && (
          <div className="text-center py-12">
            <FaBriefcase className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No jobs posted yet</h3>
            <p className="mt-1 text-sm text-gray-500">Start by posting your first job opportunity.</p>
            <button
              onClick={() => setShowPostJob(true)}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Post Your First Job
            </button>
          </div>
        )}
      </div>

      {/* Post Job Modal */}
      {showPostJob && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Post New Job</h3>
              <form onSubmit={handlePostJob} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Job Title"
                    value={newJob.title}
                    onChange={(e) => setNewJob({...newJob, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Job Description"
                    value={newJob.description}
                    onChange={(e) => setNewJob({...newJob, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    rows="3"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Location"
                    value={newJob.location}
                    onChange={(e) => setNewJob({...newJob, location: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="Budget (R)"
                    value={newJob.budget}
                    onChange={(e) => setNewJob({...newJob, budget: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <input
                    type="date"
                    value={newJob.deadline}
                    onChange={(e) => setNewJob({...newJob, deadline: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Required Qualifications (comma-separated)"
                    value={newJob.requiredQualifications}
                    onChange={(e) => setNewJob({...newJob, requiredQualifications: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowPostJob(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                  >
                    Post Job
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Applicants Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white max-h-96 overflow-y-auto">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Applicants for: {selectedJob.title}</h3>
              {getApplicantsForJob(selectedJob.id).length === 0 ? (
                <p className="text-gray-500">No applicants yet.</p>
              ) : (
                <div className="space-y-3">
                  {getApplicantsForJob(selectedJob.id).map((applicant) => (
                    <div key={applicant.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <div>
                        <p className="font-medium">{applicant.firstName} {applicant.lastName}</p>
                        <p className="text-sm text-gray-600">{applicant.email}</p>
                        <p className="text-sm text-gray-600">{applicant.location}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleAssignJob(selectedJob.id, applicant.id)}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                        >
                          <FaCheck />
                        </button>
                        <button
                          onClick={() => handleRejectApplicant(selectedJob.id, applicant.id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setSelectedJob(null)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SDPDashboard;
