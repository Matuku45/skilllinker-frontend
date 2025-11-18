import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { mockJobs, getJobsBySDP } from '../../data/mockData';
import PostJob from './PostJob';
import JobDetails from './JobDetails';
import Notifications from './Notifications';
import Profile from '../../components/Profile';
import Footer from '../../components/Footer';

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

  if (currentView === 'profile') {
    return <Profile onBack={handleBackToDashboard} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Dashboard</h2>
          <nav className="space-y-4">
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`w-full text-left py-3 px-4 rounded-lg transition-colors ${
                currentView === 'dashboard' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <svg className="w-5 h-5 inline mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
              </svg>
              Your Jobs
            </button>
            <button
              onClick={() => setCurrentView('postJob')}
              className={`w-full text-left py-3 px-4 rounded-lg transition-colors ${
                currentView === 'postJob' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <svg className="w-5 h-5 inline mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Post a New Job
            </button>
            <button
              onClick={() => setCurrentView('notifications')}
              className={`w-full text-left py-3 px-4 rounded-lg transition-colors ${
                currentView === 'notifications' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <svg className="w-5 h-5 inline mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM15 7h5l-5-5v5zM4 12h9" />
              </svg>
              Notifications
            </button>
            <button
              onClick={() => setCurrentView('profile')}
              className={`w-full text-left py-3 px-4 rounded-lg transition-colors ${
                currentView === 'profile' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <svg className="w-5 h-5 inline mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Profile
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Skill Development Provider Dashboard</h1>
        <p className="mb-6">Welcome, {currentUser.companyName || `${currentUser.firstName} ${currentUser.lastName}`}! Manage your jobs and connect with assessors and moderators.</p>

        <div className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Posted Jobs</h2>
          {jobs.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No jobs posted yet</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by posting your first job.</p>
              <div className="mt-6">
                <button
                  onClick={() => setCurrentView('postJob')}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Post a New Job
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map(job => (
                <div key={job.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow bg-gray-50">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      job.status === 'open' ? 'bg-green-100 text-green-800' :
                      job.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {job.status}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                      R{job.budget}
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Deadline: {job.deadline}
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {job.applicants.length} applicants
                    </div>
                  </div>
                  <button
                    onClick={() => handleViewJobDetails(job.id)}
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SDS_Dashboard;
