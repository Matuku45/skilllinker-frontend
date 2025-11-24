import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getUsersAPI, updateUserAPI } from '../../contexts/AdminContext';
import axios from 'axios';
import { FaUsers, FaBriefcase, FaCheck, FaTimes, FaEye, FaDollarSign, FaRedo } from 'react-icons/fa';

// --- Card Component (Formatted for currency/count) ---
const Card = ({ icon, title, value, isCurrency = false }) => {
  let displayValue = value;
  if (isCurrency && typeof value === 'number') {
    displayValue = value.toLocaleString('en-ZA', { style: 'currency', currency: 'ZAR' });
  }

  return (
    <div className="bg-white p-5 shadow-xl rounded-xl border border-gray-100 transition duration-300 hover:shadow-2xl">
      <div className="flex items-center space-x-4">
        <div className="p-3 rounded-full bg-blue-50 text-blue-600">
            {icon}
        </div>
        <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-extrabold mt-1 text-gray-900">{displayValue}</p>
        </div>
      </div>
    </div>
  );
};

// --- Detail Component ---
const Detail = ({ label, value }) => (
  <p className="text-sm py-1 flex justify-between">
    <span className="font-semibold text-gray-600">{label}:</span> <span className="text-gray-900">{value}</span>
  </p>
);

// --- User Modal ---
const UserModal = ({ user, closeModal }) => (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
      <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">
        User Details: {user.firstName} {user.lastName} 
        <span className="text-sm font-normal text-gray-500">(ID: {user.id})</span>
      </h3>
      <Detail label="Email" value={user.email} />
      <Detail label="User Type" value={user.userType} />
      <Detail label="Verified" value={user.verified ? 'Yes' : 'No'} />
      <button onClick={closeModal} className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
        Close
      </button>
    </div>
  </div>
);

// --- Users Tab (Placeholder) ---
const UsersTab = ({ filteredUsers, handleVerifyActivateUser, handleRejectUser, setSelectedUser }) => (
  <div className="bg-white shadow-xl overflow-hidden sm:rounded-lg p-6">
    <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">👥 User List</h3>
    <ul className="divide-y divide-gray-200">
      {filteredUsers.length === 0 ? (
        <p className="text-gray-500 py-3">No users found.</p>
      ) : (
        filteredUsers.map(user => (
          <li key={user.id} className="py-3 px-2 flex justify-between items-center hover:bg-gray-50 transition rounded-md">
            <div className='flex-1 min-w-0'>
                <p className="text-sm font-medium text-gray-900">
                    {user.firstName} {user.lastName} 
                    <span className="text-xs text-gray-400"> (ID: {user.id})</span>
                </p>
                <p className="text-xs text-gray-500">{user.email}</p>
            </div>
            <div className="flex space-x-3">
              {!user.verified && (
                <button onClick={() => handleVerifyActivateUser(user.id)} className="text-green-600 hover:text-green-800 text-sm font-medium">Verify</button>
              )}
              <button onClick={() => handleRejectUser(user.id)} className="text-red-600 hover:text-red-800 text-sm font-medium">Reject</button>
              <button onClick={() => setSelectedUser(user)} className="text-blue-600 hover:text-blue-800 text-sm flex items-center"><FaEye className="mr-1" /> View</button>
            </div>
          </li>
        ))
      )}
    </ul>
  </div>
);

// --- Payments Tab (UPDATED) ---
const PaymentsTab = ({ payments, isPaymentsLoading, fetchPayments, totalPaymentsCount }) => (
    <div className="bg-white shadow-xl overflow-hidden sm:rounded-lg">
        {/* Payments Header with Refresh Button */}
        <div className="p-4 flex justify-between items-center border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800">💸 Payment Transactions</h3>
            <button
                onClick={fetchPayments}
                disabled={isPaymentsLoading}
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white transition ${
                    isPaymentsLoading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
            >
                <FaRedo className={`mr-2 h-4 w-4 ${isPaymentsLoading ? 'animate-spin' : ''}`} />
                {isPaymentsLoading ? 'Refreshing...' : 'Refresh Payments'}
            </button>
        </div>
        
        {payments.length === 0 && !isPaymentsLoading ? (
            <p className="p-6 text-gray-500">No payment records found.</p>
        ) : isPaymentsLoading ? (
            <p className="p-6 text-indigo-600 flex items-center">
                <FaRedo className="mr-2 h-4 w-4 animate-spin" /> Loading payments...
            </p>
        ) : (
            <ul className="divide-y divide-gray-200">
                {payments.map(payment => (
                    <li key={payment.id} className="hover:bg-indigo-50 transition">
                        <div className="px-6 py-4 flex justify-between items-center">
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900">
                                    **{payment.payer?.firstName} {payment.payer?.lastName}** <span className="text-xs text-gray-400"> (ID: {payment.payer?.id})</span> 
                                    → **{payment.payee?.firstName} {payment.payee?.lastName}**
                                </p>
                                <p className="text-xs text-gray-600 mt-1">Job: {payment.job?.title || 'N/A'}</p>
                                <p className={`text-xs font-semibold ${payment.status === 'pending' ? 'text-yellow-600' : 'text-green-600'}`}>
                                    Method: {payment.paymentMethod} | Status: {payment.status} | Transaction ID: {payment.id}
                                </p>
                            </div>
                            <div className="ml-4 flex-shrink-0 text-right">
                                <p className="text-lg font-bold text-gray-900">
                                    {Number(payment.amount || 0).toLocaleString('en-ZA', { style: 'currency', currency: 'ZAR' })}
                                </p>
                                <p className="text-xs text-gray-500">{new Date(payment.createdAt).toLocaleString()}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        )}
    </div>
);


// --- Jobs Tab (Placeholder) ---
const JobsTab = ({ jobs }) => (
  <div className="bg-white shadow-xl overflow-hidden sm:rounded-lg p-6">
    <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">💼 Job List</h3>
    <ul className="divide-y divide-gray-200">
      {jobs.length === 0 ? (
        <p className="text-gray-500 py-3">No jobs found.</p>
      ) : (
        jobs.map(job => (
          <li key={job.id} className="py-3 px-2 hover:bg-gray-50 transition rounded-md">
            <p className="text-sm font-medium text-gray-900">{job.title}</p>
            <p className="text-xs text-gray-500">Status: **{job.status}** | Created: {new Date(job.createdAt).toLocaleDateString()}</p>
          </li>
        ))
      )}
    </ul>
  </div>
);

// --- Profile Tab (Placeholder) ---
const ProfileTab = ({ currentUser }) => (
  <div className="bg-white shadow-xl overflow-hidden sm:rounded-lg p-6">
    <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">👤 Admin Profile</h3>
    <Detail label="Name" value={`${currentUser?.firstName} ${currentUser?.lastName}`} />
    <Detail label="Email" value={currentUser?.email} />
    <Detail label="User Type" value="Admin" />
  </div>
);


// --- Admin Dashboard ---
const AdminDashboard = () => {

  const { currentUser, logout } = useAuth();

  const [activeTab, setActiveTab] = useState('users');
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [payments, setPayments] = useState([]);
  const [isPaymentsLoading, setIsPaymentsLoading] = useState(false); 

  // Fetch users
  const fetchUsers = async () => {
    try {
      const data = await getUsersAPI();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  // Fetch jobs
  const fetchJobs = async () => {
    try {
      const res = await axios.get('https://skilllinker-frontend.onrender.com/api/jobs');
      setJobs(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Error fetching jobs:', err);
    }
  };

  // Fetch payments (Wrapped in useCallback for stability)
  const fetchPayments = useCallback(async () => {
    if (!currentUser?.token) return;
    setIsPaymentsLoading(true);
    try {
      const res = await axios.get('https://skilllinker-frontend.onrender.com/api/payments', {
        headers: { Authorization: `Bearer ${currentUser.token}` }
      });
      setPayments(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Error fetching payments:', err);
    } finally {
      setIsPaymentsLoading(false);
    }
  }, [currentUser]);

  useEffect(() => { fetchUsers(); fetchJobs(); }, []);
  // Initial fetch for payments when user context is ready
  useEffect(() => { fetchPayments(); }, [fetchPayments]); 

  // Update user
  const updateUserAndRefresh = async (userId, updatedFields) => {
    try {
      const result = await updateUserAPI(userId, updatedFields);
      if (result) fetchUsers();
    } catch (err) {
      console.error('Error updating user:', err);
    }
  };
  const handleVerifyActivateUser = (userId) => updateUserAndRefresh(userId, { verified: true, active: true });
  const handleRejectUser = (userId) => updateUserAndRefresh(userId, { verified: false, active: false });

  // Stats
  const filteredUsers = Array.isArray(users) ? users.filter(u => u.userType !== 'admin') : [];
  const pendingUsers = filteredUsers.filter(u => !u.verified);
  const verifiedUsers = filteredUsers.filter(u => u.verified);
  const totalJobs = jobs.length;
  const totalPaymentsCount = payments.length;
  const totalRevenue = payments.reduce((sum, payment) => sum + (payment.amount || 0), 0); 

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-indigo-700 pb-32 shadow-2xl">
        <header className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-4xl font-extrabold text-white tracking-tight">
              🚀 Admin Dashboard
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-white text-lg font-medium opacity-90">Welcome, **{currentUser?.firstName} {currentUser?.lastName}**</span>
              <button
                onClick={logout}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-md text-indigo-700 bg-white hover:bg-gray-100 transition"
              >
                Logout
              </button>
            </div>
            
          </div>
        </header>
      </div>

      <main className="-mt-32">
        <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <Card icon={<FaUsers className="h-6 w-6" />} title="Total Users" value={filteredUsers.length} />
            <Card icon={<FaCheck className="h-6 w-6 text-green-500" />} title="Verified Users" value={verifiedUsers.length} />
            <Card icon={<FaTimes className="h-6 w-6 text-yellow-500" />} title="Pending Verif." value={pendingUsers.length} />
            <Card icon={<FaBriefcase className="h-6 w-6 text-blue-500" />} title="Total Jobs" value={totalJobs} />
        
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6 bg-white rounded-t-lg shadow">
            <nav className="-mb-px flex space-x-8 px-6">
              {['users', 'jobs', 'payments', 'profile'].map(tab => (
                <button 
                  key={tab} 
                  onClick={() => setActiveTab(tab)} 
                  className={`py-3 px-1 border-b-4 font-semibold text-base transition duration-150 ease-in-out ${
                    activeTab === tab
                      ? 'border-indigo-600 text-indigo-700'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab === 'users' ? 'User Management' : tab === 'jobs' ? 'Job Management' : tab === 'payments' ? `Payments (${totalPaymentsCount})` : 'Profile'}
                </button>
              ))}
            </nav>
          </div>

          {/* Tabs Content */}
          {activeTab === 'users' && <UsersTab filteredUsers={filteredUsers} handleVerifyActivateUser={handleVerifyActivateUser} handleRejectUser={handleRejectUser} setSelectedUser={setSelectedUser} />}
          {activeTab === 'jobs' && <JobsTab jobs={jobs} />}
          {activeTab === 'payments' && <PaymentsTab payments={payments} isPaymentsLoading={isPaymentsLoading} fetchPayments={fetchPayments} totalPaymentsCount={totalPaymentsCount} />}
          {activeTab === 'profile' && <ProfileTab currentUser={currentUser} />}
        </div>
      </main>

      {selectedUser && <UserModal user={selectedUser} closeModal={() => setSelectedUser(null)} />}
    </div>
  );
};
export default AdminDashboard;