import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext";
import { getJobs } from "../../contexts/SDSContext";
import {
    FaBriefcase, FaPlus, FaBell, FaUser, FaMapMarkerAlt,
    FaDollarSign, FaFolderOpen, FaSignOutAlt, FaLaptopCode
} from "react-icons/fa";
import axios from "axios";
const API_URL = "http://localhost:3000/api"; // ✅ Add this here

const SDS_Dashboard = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation(); // ✅ Detect navigation back

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentView, setCurrentView] = useState("dashboard");

const loadJobs = async () => {
    setLoading(true);
    try {
        const res = await axios.get(`${API_URL}/jobs?ts=${Date.now()}`, {
            headers: { Authorization: `Bearer ${currentUser.token}` },
        });
        setJobs(res.data); // Show all jobs
    } catch (err) {
        console.error("Error loading jobs:", err);
    } finally {
        setLoading(false);
    }
};



    // Load jobs on mount and whenever the user navigates back to this page
    useEffect(() => {
        loadJobs();
    }, [currentUser?.id, location.key]); // ✅ reload when returning to dashboard

    // Sidebar component remains the same...
    const Sidebar = ({ currentView, setCurrentView, onLogout }) => (
        <div className="w-72 bg-gray-900 shadow-2xl flex-shrink-0 flex flex-col justify-between rounded-r-xl">
            <div className="p-6">
                <h2 className="text-3xl font-extrabold text-white mb-10 border-b border-gray-700 pb-4 flex items-center gap-2">
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
                                setCurrentView(key);
                            }}
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
            <div className="p-6 border-t border-gray-800">
                <button
                    onClick={onLogout}
                    className="w-full text-left py-3 px-4 rounded-lg transition-colors duration-200 flex items-center text-sm font-medium text-red-400 hover:bg-gray-700 hover:text-red-300"
                >
                    <FaSignOutAlt /> <span className="ml-3">Logout</span>
                </button>
            </div>
        </div>
    );

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar currentView={currentView} setCurrentView={setCurrentView} onLogout={logout} />

            <div className="flex-1 overflow-y-auto p-10 bg-gray-100 relative">
                {/* Banner */}
                <div className="pb-8 mb-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl p-8">
                    <h1 className="text-4xl font-black">
                        Hello, {currentUser?.companyName || currentUser?.firstName}! 👋
                    </h1>
                    <p className="text-blue-100 mt-2 text-lg">
                        Manage your job posts here.
                    </p>
                </div>

                {/* Post Job Button */}
                <button
                    onClick={() => navigate('/sdp/post-job')}
                    className="fixed bottom-8 right-8 z-50 px-6 py-4 bg-green-500 text-white font-extrabold text-lg rounded-full shadow-2xl hover:bg-green-600 transition-all transform hover:scale-110 flex items-center space-x-2"
                >
                    <FaPlus /> <span className="ml-2">Post New Job</span>
                </button>

                {/* Jobs Section */}
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
                            <p className="text-gray-500 mt-2">
                                Use the Post New Job button to create your first job listing.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {jobs.map(job => (
                                <div
                                    key={job.id}
                                    className="bg-white border border-gray-200 rounded-2xl shadow-xl p-6
                                        hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.03] hover:border-blue-500"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-xl font-extrabold text-gray-900">{job.title}</h3>
                                        <span className="px-3 py-1 text-sm font-bold rounded-full bg-green-100 text-green-700">
                                            OPEN
                                        </span>
                                    </div>

                                    <p className="text-gray-600 mb-5 line-clamp-3 h-16">{job.description}</p>

                                    <button
                                        onClick={() => navigate(`/sdp/job/${job.id}`)}
                                        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg"
                                    >
                                        View Job
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
