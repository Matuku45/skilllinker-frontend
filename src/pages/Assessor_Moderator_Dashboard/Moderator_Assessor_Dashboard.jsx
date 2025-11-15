import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { mockJobs, getApplicantsForJob } from '../../data/mockData';
import { FaBriefcase, FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaCheck } from 'react-icons/fa';
import Profile from './Profile';

const ModeratorAssessorDashboard = () => {
  const { currentUser, resume, logout } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [activeTab, setActiveTab] = useState('available');

  // Update jobs list whenever the tab or user changes
  useEffect(() => {
    const filteredJobs = mockJobs.filter(job => {
      if (activeTab === 'available') return job.status === 'open';
      if (activeTab === 'applied') return job.applicants.includes(currentUser.id);
      if (activeTab === 'assigned') return job.assignedTo?.includes(currentUser.id);
      return false;
    });
    setJobs(filteredJobs);
  }, [activeTab, currentUser.id]);

  const handleApply = (jobId) => {
    if (!resume) {
      alert("Please upload your resume in your profile before applying.");
      return;
    }

    const job = mockJobs.find(j => j.id === jobId);
    if (job && !job.applicants.includes(currentUser.id)) {
      job.applicants.push(currentUser.id);
      setJobs(prev => prev.map(j => j.id === jobId ? job : j)); // trigger re-render
      alert("Application submitted successfully!");
    }
  };

  const handleWithdraw = (jobId) => {
    const job = mockJobs.find(j => j.id === jobId);
    if (job) {
      job.applicants = job.applicants.filter(id => id !== currentUser.id);
      setJobs(prev => prev.map(j => j.id === jobId ? job : j)); // trigger re-render
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-2xl font-bold text-gray-900">SkillLinker Dashboard</h1>
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
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'available', name: 'Available Jobs' },
              { id: 'applied', name: 'Applied Jobs' },
              { id: 'assigned', name: 'Assigned Jobs' },
              { id: 'profile', name: 'Profile' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Profile Section */}
        {activeTab === 'profile' && <Profile />}

        {/* Jobs List */}
        {activeTab !== 'profile' && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map(job => (
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
                      <FaBriefcase className="mr-2" />
                      {job.sdpName}
                    </div>
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
                    {activeTab === 'available' && (
                      <button
                        onClick={() => handleApply(job.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                      >
                        Apply Now
                      </button>
                    )}
                    {activeTab === 'applied' && (
                      <button
                        onClick={() => handleWithdraw(job.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                      >
                        Withdraw Application
                      </button>
                    )}
                    {activeTab === 'assigned' && (
                      <span className="text-green-600 font-medium">Assigned to you</span>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {jobs.length === 0 && (
              <div className="text-center py-12 col-span-full">
                <FaBriefcase className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No jobs found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {activeTab === 'available' ? 'No available jobs at the moment.' :
                   activeTab === 'applied' ? "You haven't applied to any jobs yet." :
                   'No jobs assigned to you yet.'}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModeratorAssessorDashboard;
