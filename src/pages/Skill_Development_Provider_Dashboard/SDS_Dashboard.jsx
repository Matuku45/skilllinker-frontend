import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { mockJobs, getJobsBySDP } from '../../data/mockData';
import PostJob from './PostJob';
import JobDetails from './JobDetails';
import Notifications from './Notifications';

const SDS_Dashboard = () => {
  const { currentUser } = useAuth();
  const [jobs, setJobs] = useState(getJobsBySDP(currentUser.id));
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedJobId, setSelectedJobId] = useState(null);

  const handleJobPosted = (newJob) => {
    setJobs([...jobs, newJob]);
    setCurrentView('dashboard');
  };

  const handleViewJobDetails = (jobId) => {
    setSelectedJobId(jobId);
    setCurrentView('jobDetails');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedJobId(null);
  };

  if (currentView === 'postJob') {
    return <PostJob onJobPosted={handleJobPosted} />;
  }

  if (currentView === 'jobDetails') {
    return <JobDetails jobId={selectedJobId} onBack={handleBackToDashboard} />;
  }

  if (currentView === 'notifications') {
    return <Notifications onBack={handleBackToDashboard} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Skill Development Provider Dashboard</h1>
        <p className="mb-6">Welcome, {currentUser.companyName || `${currentUser.firstName} ${currentUser.lastName}`}! Manage your jobs and connect with assessors and moderators.</p>

        <div className="mb-6 flex space-x-4">
          <button
            onClick={() => setCurrentView('postJob')}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Post a New Job
          </button>
          <button
            onClick={() => setCurrentView('notifications')}
            className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
          >
            View Notifications
          </button>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Your Posted Jobs</h2>
          {jobs.length === 0 ? (
            <p className="text-gray-500">No jobs posted yet. Click "Post a New Job" to get started.</p>
          ) : (
            <div className="space-y-4">
              {jobs.map(job => (
                <div key={job.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-semibold">{job.title}</h3>
                  <p className="text-gray-700 mb-2">{job.description}</p>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-2">
                    <div>Location: {job.location}</div>
                    <div>Budget: R{job.budget}</div>
                    <div>Status: {job.status}</div>
                    <div>Deadline: {job.deadline}</div>
                    <div>Applicants: {job.applicants.length}</div>
                  </div>
                  <button
                    onClick={() => handleViewJobDetails(job.id)}
                    className="bg-indigo-600 text-white py-1 px-3 rounded-md hover:bg-indigo-700 text-sm"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SDS_Dashboard;
