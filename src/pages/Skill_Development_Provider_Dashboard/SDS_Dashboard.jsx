import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
// 1. MOCKING EXTERNAL CONTEXT/HOOKS: Since the AuthContext path is unknown, we will mock the necessary hook and data.
const useAuth = () => ({
    // Mock user data structure matching the original component's usage
    currentUser: {
        id: 'sdp-mock-123',
        companyName: 'Mock SDP Corp',
        firstName: 'Alex',
    },
    logout: () => {
        console.log("Mock Logout Triggered");
        // In a real app, this would handle actual logout.
    },
});

// 2. MOCKING REACT-ICONS/FA: Use inline SVG or simple text as fallbacks to ensure compilation.
// For this environment, we'll use simple text/emoji indicators instead of relying on external icon packages.
const FaBriefcase = () => <span>💼</span>;
const FaPlus = () => <span>➕</span>;
const FaBell = () => <span>🔔</span>;
const FaUser = () => <span>👤</span>;
const FaMapMarkerAlt = () => <span>📍</span>;
const FaDollarSign = () => <span>💰</span>;
const FaUsers = () => <span>👥</span>;
const FaFolderOpen = () => <span>📂</span>;
const FaSignOutAlt = () => <span>🚪</span>;
const FaLaptopCode = () => <span>💻</span>;

// 3. MOCKING CHILD COMPONENTS: Using simple placeholder components for compilation stability.
// These components would be defined in their respective files in a real project.
const PostJob = ({ onJobPosted, onBack }) => (
    <div className="p-8 text-center bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Post New Job View</h2>
        <p className="mb-6">This is where the job posting form goes.</p>
        <button onClick={onBack} className="px-4 py-2 bg-gray-500 text-white rounded">Back to Dashboard</button>
    </div>
);

const JobDetails = ({ jobId, onBack }) => (
    <div className="p-8 text-center bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Job Details for ID: {jobId}</h2>
        <p className="mb-6">This is where applicants for job {jobId} would be managed.</p>
        <button onClick={onBack} className="px-4 py-2 bg-gray-500 text-white rounded">Back to Dashboard</button>
    </div>
);

// --- Dashboard Layout Component ---
const SDS_Dashboard = () => {
    const { currentUser, logout } = useAuth(); 
    // Initialize the navigate hook
    const navigate = useNavigate();

    // Initializing jobs state as an empty array, ready for real data fetching
    // NOTE: In a complete application, you would use a useEffect hook here
    // to fetch job data from Firestore (e.g., using onSnapshot).
    const [jobs, setJobs] = useState([
        // Mock data structure re-added for demonstration purposes since the mockData import was removed
        { id: 'j1', title: 'Senior Assessor', description: 'Evaluate competence against unit standards.', location: 'Remote', budget: '15,000', status: 'open', applicants: [1, 2] },
        { id: 'j2', title: 'Skills Moderator', description: 'Oversee assessment process quality and fairness.', location: 'Cape Town', budget: '10,000', status: 'in-progress', applicants: [3] },
    ]); 

    const [currentView, setCurrentView] = useState('dashboard');
    const [selectedJobId, setSelectedJobId] = useState(null);

    const handleJobPosted = (newJob) => {
        // This logic is simplified; real app would update Firestore.
        setJobs([...jobs, { ...newJob, id: Date.now().toString(), applicants: [] }]);
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

    // --- Dynamic View Rendering (Internal Views) ---

    if (currentView === 'postJob') {
        return <PostJob onJobPosted={handleJobPosted} onBack={handleBackToDashboard} />;
    }

    if (currentView === 'jobDetails') {
        return <JobDetails jobId={selectedJobId} onBack={handleBackToDashboard} />;
    }
    
    // --- Dynamic View Rendering (External Navigation) ---
    // We use navigate() for external routes defined in the main App router.
    
    if (currentView === 'applications') {
        navigate('/sdp/applications');
        return null;
    }

    if (currentView === 'notifications') {
        navigate('/notifications');
        return null; 
    }
    
    if (currentView === 'profile') {
        navigate('/sdp/profile');
        return null;
    }
    
    // --- Sidebar Component ---
    const Sidebar = ({ currentView, setCurrentView, onLogout }) => (
        <div className="w-72 bg-gray-900 shadow-2xl flex-shrink-0 flex flex-col justify-between rounded-r-xl">
            <div className="p-6">
                <h2 className="text-3xl font-extrabold text-white mb-10 border-b border-gray-700 pb-4 flex items-center gap-2">
                    <FaLaptopCode /> SkillLinker SDP
                </h2>
                <nav className="space-y-3">
                    {/* Navigation Buttons */}
                    {[
                        { key: 'dashboard', label: 'Your Jobs', icon: FaBriefcase },
                        { key: 'applications', label: 'Applications', icon: FaFolderOpen }, 
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
                            <Icon /> <span className="ml-3">{label}</span>
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
                    <FaSignOutAlt /> <span className="ml-3">Logout</span>
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
                        Hello, {currentUser?.companyName || currentUser?.firstName || 'User'}! 👋
                    </h1>
                    <p className="text-blue-100 mt-2 text-lg">Your dedicated dashboard to manage talent sourcing and job posts.</p>
                </div>
                
                {/* Floating "Post a New Job" button for instant action */}
                <button
                    onClick={() => navigate('/sdp/post-job')}

                    className="fixed bottom-8 right-8 z-50 px-6 py-4 bg-green-500 text-white font-extrabold text-lg rounded-full shadow-2xl hover:bg-green-600 transition-all transform hover:scale-110 flex items-center space-x-2"
                >
                    <FaPlus /> <span className="ml-2">Post New Job</span>
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
                                            <FaMapMarkerAlt /> <span className="ml-3 font-medium">{job.location}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <FaDollarSign /> <span className="ml-3 font-medium">R{job.budget} (Budget)</span>
                                        </div>
                                        <div className="flex items-center">
                                            <FaUsers /> <span className="ml-3 font-medium">{job.applicants.length} Applicants</span>
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