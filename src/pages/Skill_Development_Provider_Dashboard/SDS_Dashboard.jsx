import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
// Import icons for a nicer UI
import { 
    FaBriefcase, 
    FaPlus, 
    FaBell, 
    FaUser, 
    FaMapMarkerAlt, 
    FaDollarSign, 
    FaCalendarAlt, 
    FaUsers,
    FaFolderOpen,
    FaSignOutAlt,
    FaLaptopCode // General dashboard icon
} from 'react-icons/fa'; 

// NOTE: Ensure these components exist or are mocked for the code to run
import PostJob from './PostJob';
import JobDetails from './JobDetails';
import Notifications from './Notifications';
import Footer from '../../components/Footer';

// Mock data imports
import { getJobsBySDP } from '../../data/mockData';

// --- Dashboard Layout Component ---
const SDS_Dashboard = () => {
    const { currentUser, logout } = useAuth(); // Assuming useAuth provides a logout function
    // Initialize jobs using the user ID
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

    // --- Dynamic View Rendering ---

    if (currentView === 'postJob') {
        return <PostJob onJobPosted={handleJobPosted} onBack={handleBackToDashboard} />;
    }

    if (currentView === 'jobDetails') {
        return <JobDetails jobId={selectedJobId} onBack={handleBackToDashboard} />;
    }

    if (currentView === 'notifications') {
        // Notifications is assumed to handle its own back navigation or use onBack prop
        return <Notifications onBack={handleBackToDashboard} />; 
    }
    
    // Helper component for the Profile View
    const ProfileView = () => (
        <div className="flex-1 p-8 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3">
                    <FaUser className="inline-block mr-3 text-blue-600" /> My Profile
                </h1>
                
                <div className="space-y-4 text-gray-700">
                    <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-lg">
                        <p><strong>Company/User Name:</strong> {currentUser.companyName || `${currentUser.firstName} ${currentUser.lastName}`}</p>
                    </div>
                    <div className="p-4 bg-gray-50 border-l-4 border-gray-400 rounded-lg">
                        <p><strong>Email:</strong> {currentUser.email}</p>
                    </div>
                    <div className="p-4 bg-gray-50 border-l-4 border-gray-400 rounded-lg">
                        <p><strong>Role:</strong> Skill Development Provider (SDP)</p>
                    </div>
                </div>

                <button 
                    onClick={handleBackToDashboard} 
                    className="mt-6 px-4 py-2 bg-gray-400 text-white font-medium rounded-lg hover:bg-gray-500 transition-colors"
                >
                    Back to Jobs
                </button>
            </div>
        </div>
    );

    if (currentView === 'profile') {
        return (
            <div className="flex h-screen overflow-hidden">
                <Sidebar currentView={currentView} setCurrentView={setCurrentView} onLogout={logout} />
                <ProfileView />
            </div>
        );
    }
    
    // --- Sidebar Component ---
    const Sidebar = ({ currentView, setCurrentView, onLogout }) => (
        <div className="w-64 bg-gray-800 shadow-2xl flex-shrink-0 flex flex-col justify-between">
            <div className="p-6">
                <h2 className="text-2xl font-extrabold text-white mb-8 border-b border-gray-700 pb-4 flex items-center gap-2">
                    <FaLaptopCode className="text-blue-400" /> SDP Panel
                </h2>
                <nav className="space-y-2">
                    {/* Dashboard Button */}
                    <button
                        onClick={() => setCurrentView('dashboard')}
                        className={`w-full text-left py-3 px-4 rounded-lg transition-all duration-200 flex items-center text-sm font-medium ${
                            currentView === 'dashboard'
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        }`}
                    >
                        <FaBriefcase className="mr-3 text-lg" /> Your Jobs
                    </button>
                    {/* Post Job Button */}
                    <button
                        onClick={() => setCurrentView('postJob')}
                        className={`w-full text-left py-3 px-4 rounded-lg transition-all duration-200 flex items-center text-sm font-medium ${
                            currentView === 'postJob'
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        }`}
                    >
                        <FaPlus className="mr-3 text-lg" /> Post a New Job
                    </button>
                    {/* Notifications Button */}
                    <button
                        onClick={() => setCurrentView('notifications')}
                        className={`w-full text-left py-3 px-4 rounded-lg transition-all duration-200 flex items-center text-sm font-medium ${
                            currentView === 'notifications'
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        }`}
                    >
                        <FaBell className="mr-3 text-lg" /> Notifications
                    </button>
                    {/* Profile Button */}
                    <button
                        onClick={() => setCurrentView('profile')}
                        className={`w-full text-left py-3 px-4 rounded-lg transition-all duration-200 flex items-center text-sm font-medium ${
                            currentView === 'profile'
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        }`}
                    >
                        <FaUser className="mr-3 text-lg" /> Profile
                    </button>
                </nav>
            </div>
            {/* Logout Button */}
            <div className="p-6 border-t border-gray-700">
                <button
                    onClick={onLogout}
                    className="w-full text-left py-3 px-4 rounded-lg transition-colors duration-200 flex items-center text-sm font-medium text-red-400 hover:bg-gray-700 hover:text-red-300"
                >
                    <FaSignOutAlt className="mr-3 text-lg" /> Logout
                </button>
            </div>
        </div>
    );


    // --- Default Dashboard View (Your Jobs) ---

    return (
        // Main container with full height and flex layout
        <div className="flex h-screen overflow-hidden"> 
            
            <Sidebar currentView={currentView} setCurrentView={setCurrentView} onLogout={logout} />

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto p-8 bg-gray-100"> 
                <div className="pb-4 border-b border-gray-200 mb-6">
                    <h1 className="text-3xl font-extrabold text-gray-900">
                        Welcome, {currentUser.companyName || currentUser.firstName}!
                    </h1>
                    <p className="text-gray-500 mt-1">Manage your posted jobs and connect with top accredited professionals.</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h2 className="text-xl font-bold text-gray-800 mb-5 border-b pb-3">Your Posted Jobs ({jobs.length})</h2>
                    
                    {jobs.length === 0 ? (
                        <div className="text-center py-10 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                            <FaFolderOpen className="mx-auto text-gray-400 text-5xl mb-4" />
                            <h3 className="text-lg font-semibold text-gray-700">No jobs posted yet</h3>
                            <p className="text-gray-500 mt-2">Get started by posting your first job now!</p>
                            <div className="mt-6">
                                <button
                                    onClick={() => setCurrentView('postJob')}
                                    className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                                >
                                    <FaPlus className="mr-2" />
                                    Post a New Job
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {jobs.map(job => (
                                <div key={job.id} className="bg-white border border-gray-200 rounded-xl shadow-md p-5 hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                                    
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-lg font-bold text-gray-900 leading-snug">{job.title}</h3>
                                        <span className={`px-3 py-1 text-xs font-semibold rounded-full flex-shrink-0 ${
                                            job.status === 'open' ? 'bg-green-100 text-green-800' :
                                            job.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-gray-100 text-gray-800'
                                        }`}>
                                            {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                                        </span>
                                    </div>
                                    
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{job.description}</p>
                                    
                                    <div className="text-xs text-gray-500 space-y-2 mb-5">
                                        <div className="flex items-center">
                                            <FaMapMarkerAlt className="mr-2 text-blue-500" />
                                            <span>{job.location}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <FaDollarSign className="mr-2 text-green-500" />
                                            <span>R{job.budget} (Budget)</span>
                                        </div>
                                        <div className="flex items-center">
                                            <FaCalendarAlt className="mr-2 text-red-500" />
                                            <span>Deadline: {job.deadline}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <FaUsers className="mr-2 text-purple-500" />
                                            <span>{job.applicants.length} Applicants</span>
                                        </div>
                                    </div>
                                    
                                    <button
                                        onClick={() => handleViewJobDetails(job.id)}
                                        className="w-full py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors mt-2"
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