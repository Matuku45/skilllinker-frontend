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
    FaLaptopCode, // General dashboard icon
    FaRegBuilding // For SDP/Company
} from 'react-icons/fa'; 

// NOTE: Ensure these components exist or are mocked for the code to run
import PostJob from './PostJob';
import JobDetails from './JobDetails';
import Notifications from './Notifications';
// Removed Footer import as it wasn't used in the main return block and messes with h-screen layout.

// Mock data imports
import { getJobsBySDP } from '../../data/mockData';

// --- Dashboard Layout Component ---
const SDS_Dashboard = () => {
    const { currentUser, logout } = useAuth(); 
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
        return <Notifications onBack={handleBackToDashboard} />; 
    }
    
    // Helper component for the Profile View
    const ProfileView = () => (
        <div className="flex-1 p-8 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-2xl">
                <h1 className="text-3xl font-extrabold text-gray-800 mb-6 border-b pb-3">
                    <FaUser className="inline-block mr-3 text-purple-600" /> My Profile & SDP Details
                </h1>
                
                <div className="space-y-4 text-gray-700">
                    <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-lg shadow-inner">
                        <p className="font-semibold flex items-center gap-2">
                            <FaRegBuilding className="text-lg text-purple-600" /> Company Name: 
                            <span className="font-bold text-gray-800">{currentUser.companyName || 'N/A'}</span>
                        </p>
                    </div>
                    <div className="p-4 bg-gray-50 border-l-4 border-gray-400 rounded-lg shadow-inner">
                        <p className="font-semibold">Email: <span className="text-gray-800">{currentUser.email}</span></p>
                    </div>
                    <div className="p-4 bg-gray-50 border-l-4 border-gray-400 rounded-lg shadow-inner">
                        <p className="font-semibold">Role: <span className="text-gray-800">Skill Development Provider (SDP)</span></p>
                    </div>
                </div>

                <button 
                    onClick={handleBackToDashboard} 
                    className="mt-8 px-6 py-3 bg-gray-600 text-white font-medium rounded-xl hover:bg-gray-700 transition-all shadow-lg"
                >
                    <FaBriefcase className="inline-block mr-2" /> Back to Jobs Dashboard
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
        <div className="w-72 bg-gray-900 shadow-2xl flex-shrink-0 flex flex-col justify-between">
            <div className="p-6">
                <h2 className="text-3xl font-extrabold text-white mb-10 border-b border-gray-700 pb-4 flex items-center gap-2">
                    <FaLaptopCode className="text-blue-400 text-3xl" /> SkillLinker SDP
                </h2>
                <nav className="space-y-3">
                    {/* Navigation Buttons */}
                    {[
                        { key: 'dashboard', label: 'Your Jobs', icon: FaBriefcase },
                        { key: 'postJob', label: 'Post a New Job', icon: FaPlus },
                        { key: 'notifications', label: 'Notifications', icon: FaBell },
                        { key: 'profile', label: 'Profile', icon: FaUser },
                    ].map(({ key, label, icon: Icon }) => (
                        <button
                            key={key}
                            onClick={() => setCurrentView(key)}
                            className={`w-full text-left py-4 px-6 rounded-xl transition-all duration-300 flex items-center text-sm font-semibold border-2 border-transparent 
                                ${currentView === key
                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl transform scale-[1.02] border-blue-400'
                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white hover:border-blue-500/50'
                                }`}
                        >
                            <Icon className="mr-3 text-lg" /> {label}
                        </button>
                    ))}
                </nav>
            </div>
            {/* Logout Button */}
            <div className="p-6 border-t border-gray-800">
                <button
                    onClick={logout}
                    className="w-full text-left py-3 px-4 rounded-lg transition-colors duration-200 flex items-center text-sm font-medium text-red-400 hover:bg-gray-700 hover:text-red-300"
                >
                    <FaSignOutAlt className="mr-3 text-lg" /> Logout
                </button>
            </div>
        </div>
    );


    // --- Default Dashboard View (Your Jobs) ---

    return (
        <div className="flex h-screen overflow-hidden"> 
            
            <Sidebar currentView={currentView} setCurrentView={setCurrentView} onLogout={logout} />

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto p-10 bg-gray-100 relative"> 
                
                {/* Modern Welcome Banner */}
                <div className="pb-8 mb-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl p-8">
                    <h1 className="text-4xl font-black">
                        Hello, {currentUser.companyName || currentUser.firstName}! 👋
                    </h1>
                    <p className="text-blue-100 mt-2 text-lg">Your dedicated dashboard to manage talent sourcing and job posts.</p>
                </div>
                
                {/* Floating "Post a New Job" button for instant action */}
                <button
                    onClick={() => setCurrentView('postJob')}
                    className="fixed bottom-8 right-8 z-50 px-6 py-4 bg-green-500 text-white font-extrabold text-lg rounded-full shadow-2xl hover:bg-green-600 transition-all transform hover:scale-110 flex items-center space-x-2"
                >
                    <FaPlus className="text-xl" />
                    <span>Post New Job</span>
                </button>


                <div className="bg-white p-8 rounded-xl shadow-2xl">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">Your Active Job Listings ({jobs.length})</h2>
                    
                    {jobs.length === 0 ? (
                        <div className="text-center py-16 border-4 border-dashed border-purple-300 rounded-2xl bg-purple-50">
                            <FaFolderOpen className="mx-auto text-purple-400 text-6xl mb-4" />
                            <h3 className="text-xl font-semibold text-gray-700">No jobs posted yet</h3>
                            <p className="text-gray-500 mt-2">Use the **Post a New Job** button to connect with assessors and moderators.</p>
                            
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {jobs.map(job => (
                                <div key={job.id} 
                                     className="bg-white border border-gray-200 rounded-2xl shadow-xl p-6 
                                                hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.03] hover:border-blue-500"
                                >
                                    
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-xl font-extrabold text-gray-900 leading-tight">{job.title}</h3>
                                        <span className={`px-3 py-1 text-sm font-bold rounded-full flex-shrink-0 whitespace-nowrap ${
                                            job.status === 'open' ? 'bg-green-100 text-green-700' :
                                            job.status === 'in-progress' ? 'bg-yellow-100 text-yellow-700' :
                                            'bg-gray-100 text-gray-700'
                                        }`}>
                                            {job.status.toUpperCase()}
                                        </span>
                                    </div>
                                    
                                    <p className="text-gray-600 text-base mb-5 line-clamp-3 h-16">{job.description}</p>
                                    
                                    <div className="text-sm text-gray-500 space-y-3 mb-6">
                                        <div className="flex items-center">
                                            <FaMapMarkerAlt className="mr-3 text-lg text-red-500" />
                                            <span className="font-medium">{job.location}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <FaDollarSign className="mr-3 text-lg text-green-500" />
                                            <span className="font-medium">R{job.budget} (Budget)</span>
                                        </div>
                                        <div className="flex items-center">
                                            <FaUsers className="mr-3 text-lg text-blue-500" />
                                            <span className="font-medium">{job.applicants.length} Applicants</span>
                                        </div>
                                    </div>
                                    
                                    <button
                                        onClick={() => handleViewJobDetails(job.id)}
                                        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg"
                                    >
                                        Manage Applicants
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