import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  FaUsers, 
  FaBriefcase, 
  FaCheck, 
  FaTimes, 
  FaEye, 
  FaUserCheck, 
  FaUserTimes 
} from 'react-icons/fa';

const AdminDashboard = () => {
  const { currentUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('users');
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState(getUsers);
  const [jobs, setJobs] = useState(() => {
    const storedJobs = localStorage.getItem('skilllinker_jobs');
    return storedJobs ? JSON.parse(storedJobs) : [];
  });

  // Save jobs to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('skilllinker_jobs', JSON.stringify(jobs));
  }, [jobs]);

  const handleVerifyUser = (userId) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      const updated = { ...user, verified: true };
      updateUser(userId, updated);
      setUsers(getUsers());
    }
  };

  const handleRejectUser = (userId) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      const updated = { ...user, verified: false };
      updateUser(userId, updated);
      setUsers(getUsers());
    }
  };

  const handleActivateUser = (userId) => {
    activateUser(userId);
    setUsers(getUsers());
  };

  const handleDeactivateUser = (userId) => {
    deactivateUser(userId);
    setUsers(getUsers());
  };

  const handleDeleteJob = (jobId) => {
    const updatedJobs = jobs.filter(job => job.id !== jobId);
    setJobs(updatedJobs);
  };

  const filteredUsers = users?.filter(u => u.userType !== 'admin') || [];
  const pendingUsers = users.filter(u => !u.verified);
  const verifiedUsers = users.filter(u => u.verified);
  const totalJobs = jobs.length;
  const openJobs = jobs.filter(job => job.status === 'open').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Welcome, {currentUser.firstName} {currentUser.lastName}
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
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card icon={<FaUsers className="h-6 w-6 text-gray-400" />} title="Total Users" value={users.length} />
          <Card icon={<FaUserCheck className="h-6 w-6 text-green-400" />} title="Verified Users" value={verifiedUsers.length} />
          <Card icon={<FaUserTimes className="h-6 w-6 text-yellow-400" />} title="Pending Verification" value={pendingUsers.length} />
          <Card icon={<FaBriefcase className="h-6 w-6 text-blue-400" />} title="Total Jobs" value={totalJobs} />
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {['users', 'jobs'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab === 'users' ? 'User Management' : 'Job Management'}
              </button>
            ))}
          </nav>
        </div>

        {/* User Management Tab */}
        {activeTab === 'users' && (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {filteredUsers.map(user => (
                <li key={user.id}>
                  <div className="px-4 py-4 sm:px-6 flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">
                          {user.firstName[0]}{user.lastName[0]}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center">
                          <p className="text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</p>
                          <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${
                            user.verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>{user.verified ? 'Verified' : 'Pending'}</span>
                        </div>
                        <p className="text-sm text-gray-500">{user.email}</p>
                        <p className="text-sm text-gray-500 capitalize">{user.userType}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {!user.verified && (
                        <>
                          <button onClick={() => handleVerifyUser(user.id)} className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm flex items-center">
                            <FaCheck className="mr-1" /> Verify
                          </button>
                          <button onClick={() => handleRejectUser(user.id)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm flex items-center">
                            <FaTimes className="mr-1" /> Reject
                          </button>
                        </>
                      )}
                      {user.userType === 'assessor' && (
                        <>
                          {user.active ? (
                            <button onClick={() => handleDeactivateUser(user.id)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm flex items-center">
                              <FaUserMinus className="mr-1" /> Deactivate
                            </button>
                          ) : (
                            <button onClick={() => handleActivateUser(user.id)} className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm flex items-center">
                              <FaUserPlus className="mr-1" /> Activate
                            </button>
                          )}
                        </>
                      )}
                      <button onClick={() => setSelectedUser(user)} className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm flex items-center">
                        <FaEye className="mr-1" /> View
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Job Management Tab */}
        {activeTab === 'jobs' && (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {jobs.map(job => (
                <li key={job.id}>
                  <div className="px-4 py-4 sm:px-6 flex justify-between items-center">
                    <div className="flex items-center">
                      <FaBriefcase className="h-6 w-6 text-gray-400" />
                      <div className="ml-4">
                        <div className="flex items-center">
                          <p className="text-sm font-medium text-gray-900">{job.title}</p>
                          <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${
                            job.status === 'open' ? 'bg-green-100 text-green-800' :
                            job.status === 'in-progress' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                          }`}>{job.status}</span>
                        </div>
                        <p className="text-sm text-gray-500">{job.sdpName}</p>
                        <p className="text-sm text-gray-500">{job.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900">R{job.budget.toLocaleString()}</span>
                      <button onClick={() => handleDeleteJob(job.id)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm flex items-center">
                        <FaTimes className="mr-1" /> Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-start z-50 pt-20">
          <div className="bg-white p-5 rounded-md shadow-lg w-96">
            <h3 className="text-lg font-medium text-gray-900 mb-4">User Details</h3>
            <div className="space-y-2">
              <Detail label="Name" value={`${selectedUser.firstName} ${selectedUser.lastName}`} />
              <Detail label="Email" value={selectedUser.email} />
              <Detail label="User Type" value={selectedUser.userType} />
              <Detail label="Location" value={selectedUser.location} />
              <Detail label="Verified" value={selectedUser.verified ? 'Yes' : 'No'} />
              {selectedUser.companyName && <Detail label="Company" value={selectedUser.companyName} />}
            </div>
            <div className="mt-4 flex justify-end">
              <button onClick={() => setSelectedUser(null)} className="px-4 py-2 bg-gray-100 border rounded-md hover:bg-gray-200 text-sm font-medium">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Reusable card component
const Card = ({ icon, title, value }) => (
  <div className="bg-white overflow-hidden shadow rounded-lg">
    <div className="p-5 flex items-center">
      <div className="flex-shrink-0">{icon}</div>
      <div className="ml-5 w-0 flex-1">
        <dl>
          <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
          <dd className="text-lg font-medium text-gray-900">{value}</dd>
        </dl>
      </div>
    </div>
  </div>
);

// Reusable detail row for modal
const Detail = ({ label, value }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <p className="text-sm text-gray-900">{value}</p>
  </div>
);

export default AdminDashboard;
