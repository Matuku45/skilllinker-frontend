import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext"; // Assuming this path
import {
    FaBriefcase, FaPlus, FaBell, FaUser, FaLaptopCode,
    FaTrashAlt, FaEdit, FaTimes, FaSave, FaFolderOpen, FaSignOutAlt, FaBars
} from "react-icons/fa";
import axios from "axios";

// --- Configuration ---
const API_URL = "https://skilllinker-frontend.onrender.com/api";

const SDS_Dashboard = () => {
    // --- Hooks & Context ---
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // --- State Management ---
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingJobId, setEditingJobId] = useState(null);
    const [editFormData, setEditFormData] = useState({});
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // --- Data Loading Function ---
    const loadJobs = async () => {
        setLoading(true);
        // Ensure currentUser and token are available
        if (!currentUser || !currentUser.token) {
            setLoading(false);
            return;
        }
        try {
            // Using Date.now() in the query to bust potential cache issues
            const res = await axios.get(`${API_URL}/jobs?ts=${Date.now()}`, {
                headers: { Authorization: `Bearer ${currentUser.token}` },
            });
            // Filter jobs to only include those posted by the current SDP
            setJobs(res.data.filter(job => job.sdpId === currentUser.id));
        } catch (err) {
            console.error("Error loading jobs:", err);
            // Optionally redirect to login or show error message
        } finally {
            setLoading(false);
        }
    };

    // --- Effects (Load data on mount/change) ---
    useEffect(() => {
        if (currentUser?.id) {
            loadJobs();
        }
    }, [currentUser?.id, location.key]); // Reruns if user ID changes or on location change (e.g., coming back from another page)

    // --- Job Action Handlers ---
    const handleEditJob = (job) => {
        setEditingJobId(job.id);
        setEditFormData({ ...job });
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setEditFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveEdit = async () => {
        try {
            await axios.put(`${API_URL}/jobs/${editingJobId}`, editFormData, {
                headers: { Authorization: `Bearer ${currentUser.token}` },
            });
            // Update local state to reflect changes without full reload
            setJobs(prev => prev.map(job => job.id === editingJobId ? { ...job, ...editFormData } : job));
            setEditingJobId(null);
            setEditFormData({});
        } catch (err) {
            console.error("Error saving job:", err);
            alert("Failed to save job changes.");
        }
    };

    const handleCancelEdit = () => {
        setEditingJobId(null);
        setEditFormData({});
    };

    const handleDeleteJob = async (jobId) => {
        if (!window.confirm("Are you sure you want to delete this job?")) return;
        try {
            await axios.delete(`${API_URL}/jobs/${jobId}`, {
                headers: { Authorization: `Bearer ${currentUser.token}` },
            });
            // Remove deleted job from local state
            setJobs(prev => prev.filter(job => job.id !== jobId));
        } catch (err) {
            console.error("Error deleting job:", err);
            alert("Failed to delete job.");
        }
    };

    // --- Sidebar Component (Internal) ---
    const Sidebar = ({ currentView, setCurrentView }) => (
        <div className="flex flex-col justify-between bg-gray-900 text-white w-72 h-full p-6 rounded-r-xl shadow-2xl">
            <h2 className="text-3xl font-extrabold mb-10 flex items-center gap-2">
                <FaLaptopCode /> SkillLinker SDP
            </h2>
            <nav className="space-y-3">
                {[
                    { key: 'dashboard', label: 'Your Jobs', icon: FaBriefcase },
                    { key: 'applications', label: 'Applications', icon: FaFolderOpen },
                    { key: 'postJob', label: 'Post a New Job', icon: FaPlus },
                    { key: 'notifications', label: 'Notifications', icon: FaBell },
                    { key: 'profile', label: 'Profile', icon: FaUser },
                ].map(({ key, label, icon: Icon }) => (
                    <button
                        key={key}
                        onClick={() => {
                            if (key === "postJob") return navigate("/sdp/post-job");
                            if (key === "applications") return navigate("/sdp/applications");
                            if (key === "profile") return navigate("/sdp/profile");
                            if (key === "notifications") return navigate("/notifications");
                            setCurrentView(key); // This should only run for the dashboard link if needed
                            setIsSidebarOpen(false); // close sidebar on mobile after click
                        }}
                        className={`w-full text-left py-4 px-6 rounded-xl transition-all duration-300 flex items-center text-sm font-semibold border-2 border-transparent
                        ${currentView === key
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 shadow-xl transform scale-[1.02] border-blue-400'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white hover:border-blue-500/50'
                            }`}
                    >
                        <Icon /> <span className="ml-3">{label}</span>
                    </button>
                ))}
            </nav>
            <button
                onClick={logout}
                className="w-full mt-6 text-left py-3 px-4 rounded-lg transition-colors duration-200 flex items-center text-sm font-medium text-red-400 hover:bg-gray-700 hover:text-red-300"
            >
                <FaSignOutAlt /> <span className="ml-3">Logout</span>
            </button>
        </div>
    );

    // --- Render Output ---
    return (
        <div className="flex h-screen overflow-hidden relative">
            {/* Mobile sidebar overlay */}
            {isSidebarOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setIsSidebarOpen(false)}></div>
            )}

            {/* Sidebar */}
            <div className={`fixed z-50 inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out`}>
                <Sidebar currentView="dashboard" setCurrentView={() => { }} />
            </div>

            {/* Main content */}
            <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-gray-100 md:ml-72"> {/* Added md:ml-72 offset */}
                {/* Mobile hamburger button */}
                <button
                    className="md:hidden fixed top-6 left-6 z-50 p-3 bg-gray-900 text-white rounded-lg shadow-lg"
                    onClick={() => setIsSidebarOpen(true)}
                >
                    <FaBars />
                </button>
                
                {/* Ensure content doesn't overlap fixed sidebar in mobile */}
                <div className="pt-20 md:pt-0"> 

                <div className="pb-8 mb-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl p-8">
                    <h1 className="text-4xl font-black">
                        Hello, {currentUser?.companyName || currentUser?.firstName}! 👋
                    </h1>
                    <p className="text-blue-100 mt-2 text-lg">
                        Manage your job posts here.
                    </p>
                </div>

                <button
                    onClick={() => navigate('/sdp/post-job')}
                    className="fixed bottom-8 right-8 z-50 px-6 py-4 bg-green-500 text-white font-extrabold text-lg rounded-full shadow-2xl hover:bg-green-600 transition-all transform hover:scale-110 flex items-center space-x-2"
                >
                    <FaPlus /> <span className="ml-2">Post New Job</span>
                </button>

                <div className="bg-white p-8 rounded-xl shadow-2xl">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">
                        Your Active Job Listings ({jobs.length})
                    </h2>

                    {loading ? (
                        <p className="text-center text-gray-500">Loading jobs...</p>
                    ) : jobs.length === 0 ? (
                        <div className="text-center py-16 border-4 border-dashed border-purple-300 rounded-2xl bg-purple-50">
                            <FaFolderOpen className="mx-auto text-purple-400 text-6xl mb-4" />
                            <h3 className="text-xl font-semibold text-gray-700">No jobs posted yet</h3>
                            <p className="text-gray-500 mt-2">Use the Post New Job button to create your first job listing.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {jobs.map(job => (
                                <div key={job.id} className={`bg-white border border-gray-200 rounded-2xl shadow-xl p-6 relative transition-all duration-300
                                ${editingJobId === job.id ? 'border-4 border-yellow-500 shadow-2xl' : 'hover:shadow-2xl hover:scale-[1.03] hover:border-blue-500'}`}>
                                    {editingJobId === job.id ? (
                                        <div className="space-y-4">
                                            <input
                                                type="text"
                                                name="title"
                                                value={editFormData.title}
                                                onChange={handleFormChange}
                                                className="w-full text-xl font-extrabold text-gray-900 border-b-2 border-yellow-500 focus:ring-0 focus:border-yellow-600 p-1"
                                                placeholder="Job Title"
                                            />
                                            <textarea
                                                name="description"
                                                value={editFormData.description}
                                                onChange={handleFormChange}
                                                className="w-full text-gray-600 border border-gray-300 rounded-lg p-3 h-24 focus:ring-yellow-500 focus:border-yellow-500"
                                                placeholder="Job Description"
                                            />
                                            {/* Add more fields for editing here (e.g., location, budget) */}
                                            <div className="flex space-x-3 mt-6">
                                                <button onClick={handleSaveEdit} className="flex-1 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors shadow-lg flex items-center justify-center text-sm">
                                                    <FaSave className="mr-2" /> Save Changes
                                                </button>
                                                <button onClick={handleCancelEdit} className="py-3 px-6 bg-gray-400 text-white font-semibold rounded-xl hover:bg-gray-500 transition-colors shadow-lg flex items-center justify-center text-sm">
                                                    <FaTimes className="mr-2" /> Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="flex justify-between items-start mb-4">
                                                <h3 className="text-xl font-extrabold text-gray-900">{job.title}</h3>
                                                <span className="px-3 py-1 text-sm font-bold rounded-full bg-green-100 text-green-700">
                                                    {job.status ? job.status.toUpperCase() : 'ACTIVE'}
                                                </span>
                                            </div>
                                            <p className="text-gray-600 mb-2"><strong>Location:</strong> {job.location}</p>
                                            <p className="text-gray-600 mb-2"><strong>Budget:</strong> {job.budget || "N/A"}</p>
                                            <p className="text-gray-600 mb-2"><strong>Qualifications:</strong> {job.requiredQualifications?.join(", ") || "N/A"}</p>
                                            <p className="text-gray-600 mb-2"><strong>Posted:</strong> {new Date(job.postedDate).toLocaleDateString()}</p>
                                            <p className="text-gray-600 mb-5 line-clamp-3">{job.description}</p>

                                            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mt-4">
                                                <button onClick={() => handleEditJob(job)} className="flex-1 py-3 bg-yellow-500 text-white font-semibold rounded-xl hover:bg-yellow-600 transition-colors shadow-lg flex items-center justify-center text-sm">
                                                    <FaEdit className="mr-2" /> Edit Job
                                                </button>
                                                <button onClick={() => handleDeleteJob(job.id)} className="flex-1 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors shadow-lg flex items-center justify-center text-sm">
                                                    <FaTrashAlt className="mr-2" /> Delete
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                </div> {/* End pt-20 div */}
            </div>
        </div>
    );
};

export default SDS_Dashboard;