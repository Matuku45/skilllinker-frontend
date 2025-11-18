import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { mockJobs, getJobsBySDP } from '../../data/mockData';
import PostJob from './PostJob';
import JobDetails from './JobDetails';
import Notifications from './Notifications';

import Footer from '../../components/Footer';

// Define custom colors for the dashboard
const colors = {
  sidebarBg: '#2c3e50', // Dark blue-gray for sidebar
  sidebarText: '#ecf0f1', // Light gray for text
  activeButton: '#3498db', // Bright blue for active button
  inactiveButton: '#34495e', // Darker blue-gray for inactive
  primary: '#3498db', // Blue for primary elements
  secondary: '#95a5a6', // Gray for secondary
  success: '#27ae60', // Green for success
  warning: '#f39c12', // Orange for warning
  danger: '#e74c3c', // Red for danger
  light: '#ecf0f1', // Light background
  dark: '#2c3e50', // Dark text
};

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
    return (
      <div className="container-fluid min-vh-100" style={{ backgroundColor: colors.light }}>
        <div className="row">
          <div className="col-md-3 shadow" style={{ backgroundColor: colors.sidebarBg }}>
            <div className="p-4">
              <h2 className="h4 font-weight-bold mb-4" style={{ color: colors.sidebarText }}>Dashboard</h2>
              <nav className="nav flex-column">
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className="nav-link text-left py-3 px-3 rounded mb-2"
                  style={{
                    backgroundColor: currentView === 'dashboard' ? colors.activeButton : colors.inactiveButton,
                    color: colors.sidebarText,
                    border: 'none'
                  }}
                >
                  <i className="fas fa-briefcase mr-3"></i>
                  Your Jobs
                </button>
                <button
                  onClick={() => setCurrentView('postJob')}
                  className="nav-link text-left py-3 px-3 rounded mb-2"
                  style={{
                    backgroundColor: currentView === 'postJob' ? colors.activeButton : colors.inactiveButton,
                    color: colors.sidebarText,
                    border: 'none'
                  }}
                >
                  <i className="fas fa-plus mr-3"></i>
                  Post a New Job
                </button>
                <button
                  onClick={() => setCurrentView('notifications')}
                  className="nav-link text-left py-3 px-3 rounded mb-2"
                  style={{
                    backgroundColor: currentView === 'notifications' ? colors.activeButton : colors.inactiveButton,
                    color: colors.sidebarText,
                    border: 'none'
                  }}
                >
                  <i className="fas fa-bell mr-3"></i>
                  Notifications
                </button>
                <button
                  onClick={() => setCurrentView('profile')}
                  className="nav-link text-left py-3 px-3 rounded mb-2"
                  style={{
                    backgroundColor: currentView === 'profile' ? colors.activeButton : colors.inactiveButton,
                    color: colors.sidebarText,
                    border: 'none'
                  }}
                >
                  <i className="fas fa-user mr-3"></i>
                  Profile
                </button>
              </nav>
            </div>
          </div>
          <div className="col-md-9 p-4">
            <h1 className="h3 font-weight-bold mb-4" style={{ color: colors.dark }}>Profile</h1>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title" style={{ color: colors.dark }}>User Information</h5>
                <p className="card-text" style={{ color: colors.dark }}><strong>Name:</strong> {currentUser.companyName || `${currentUser.firstName} ${currentUser.lastName}`}</p>
                <p className="card-text" style={{ color: colors.dark }}><strong>Email:</strong> {currentUser.email}</p>
                <p className="card-text" style={{ color: colors.dark }}><strong>Role:</strong> Skill Development Provider</p>
                <button onClick={handleBackToDashboard} className="btn" style={{ backgroundColor: colors.secondary, color: colors.light }}>Back to Dashboard</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid min-vh-100 bg-light d-flex">
      {/* Sidebar */}
      <div className="col-md-3 bg-white shadow">
        <div className="p-4">
          <h2 className="h4 font-weight-bold text-dark mb-4">Dashboard</h2>
          <nav className="nav flex-column">
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`nav-link text-left py-3 px-3 rounded mb-2 ${currentView === 'dashboard' ? 'bg-primary text-white' : 'text-secondary'}`}
            >
              <i className="fas fa-briefcase mr-3"></i>
              Your Jobs
            </button>
            <button
              onClick={() => setCurrentView('postJob')}
              className={`nav-link text-left py-3 px-3 rounded mb-2 ${currentView === 'postJob' ? 'bg-primary text-white' : 'text-secondary'}`}
            >
              <i className="fas fa-plus mr-3"></i>
              Post a New Job
            </button>
            <button
              onClick={() => setCurrentView('notifications')}
              className={`nav-link text-left py-3 px-3 rounded mb-2 ${currentView === 'notifications' ? 'bg-primary text-white' : 'text-secondary'}`}
            >
              <i className="fas fa-bell mr-3"></i>
              Notifications
            </button>
            <button
              onClick={() => setCurrentView('profile')}
              className={`nav-link text-left py-3 px-3 rounded mb-2 ${currentView === 'profile' ? 'bg-primary text-white' : 'text-secondary'}`}
            >
              <i className="fas fa-user mr-3"></i>
              Profile
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="col-md-9 p-4">
        <h1 className="h3 font-weight-bold mb-4">Skill Development Provider Dashboard</h1>
        <p className="mb-4">Welcome, {currentUser.companyName || `${currentUser.firstName} ${currentUser.lastName}`}! Manage your jobs and connect with assessors and moderators.</p>

        <div className="card">
          <div className="card-body">
            <h2 className="h5 font-weight-bold text-dark mb-4">Your Posted Jobs</h2>
            {jobs.length === 0 ? (
              <div className="text-center py-5">
                <i className="fas fa-folder-open fa-3x text-muted mb-3"></i>
                <h3 className="h6 font-weight-medium text-dark">No jobs posted yet</h3>
                <p className="text-muted">Get started by posting your first job.</p>
                <div className="mt-4">
                  <button
                    onClick={() => setCurrentView('postJob')}
                    className="btn btn-primary"
                  >
                    <i className="fas fa-plus mr-2"></i>
                    Post a New Job
                  </button>
                </div>
              </div>
            ) : (
              <div className="row">
                {jobs.map(job => (
                  <div key={job.id} className="col-md-4 mb-4">
                    <div className="card h-100">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <h3 className="h6 font-weight-semibold text-dark">{job.title}</h3>
                          <span className={`badge ${
                            job.status === 'open' ? 'badge-success' :
                            job.status === 'in-progress' ? 'badge-warning' :
                            'badge-secondary'
                          }`}>
                            {job.status}
                          </span>
                        </div>
                        <p className="text-muted mb-3">{job.description}</p>
                        <div className="mb-3">
                          <div className="d-flex align-items-center mb-2">
                            <i className="fas fa-map-marker-alt mr-2 text-muted"></i>
                            <small className="text-muted">{job.location}</small>
                          </div>
                          <div className="d-flex align-items-center mb-2">
                            <i className="fas fa-dollar-sign mr-2 text-muted"></i>
                            <small className="text-muted">R{job.budget}</small>
                          </div>
                          <div className="d-flex align-items-center mb-2">
                            <i className="fas fa-calendar-alt mr-2 text-muted"></i>
                            <small className="text-muted">Deadline: {job.deadline}</small>
                          </div>
                          <div className="d-flex align-items-center">
                            <i className="fas fa-users mr-2 text-muted"></i>
                            <small className="text-muted">{job.applicants.length} applicants</small>
                          </div>
                        </div>
                        <button
                          onClick={() => handleViewJobDetails(job.id)}
                          className="btn btn-primary btn-block"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SDS_Dashboard;
