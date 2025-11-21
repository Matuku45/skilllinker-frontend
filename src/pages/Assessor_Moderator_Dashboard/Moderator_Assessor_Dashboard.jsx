import React, { useState, useMemo } from "react"; // ✅ Added useMemo
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useAssessor } from "../../contexts/AssessorContext";
import {
    FaBriefcase,
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaCheck,
    FaUser,
    FaSearch, // ✅ Added search icon
} from "react-icons/fa";
import Profile from "./Profile";

const ModeratorAssessorDashboard = () => {
    const navigate = useNavigate();
    const { currentUser, logout } = useAuth();
    const { jobs, loadingJobs } = useAssessor();

    const [activeTab, setActiveTab] = useState("profile");
    // 1. State for filtering jobs
    const [filterText, setFilterText] = useState(""); 

    if (!currentUser) {
        return (
            <div className="text-center py-12 text-gray-500">Loading user...</div>
        );
    }

    // 2. Memoized filtering logic
    const filteredJobs = useMemo(() => {
        if (!jobs) return [];
        const lowerCaseFilter = filterText.toLowerCase();

        return jobs.filter((job) => {
            // Check title, ID, or location for the filter text
            const matchesTitle = job.title.toLowerCase().includes(lowerCaseFilter);
            const matchesId = String(job.id).includes(lowerCaseFilter);
            const matchesLocation = job.location.toLowerCase().includes(lowerCaseFilter);

            return matchesTitle || matchesId || matchesLocation;
        });
    }, [jobs, filterText]);

    // Function to render the filter input (used in two places)
    const renderFilterInput = () => (
        <div className="relative mb-4">
            <input
                type="text"
                placeholder="Filter by Title, ID, or Location..."
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
    );

    // Function to render the job list, accepts the list to render
    const renderJobList = (jobList) => {
        if (loadingJobs) {
            return <div className="text-gray-500">Loading...</div>;
        }
        if (jobList.length === 0 && filterText.length > 0) {
             return <div className="text-gray-400">No jobs match your filter.</div>;
        }
        if (jobs.length === 0) {
            return <div className="text-gray-400">No jobs found</div>;
        }

        return (
            <ul className="space-y-2">
                {jobList.map((job) => (
                    <li
                        key={job.id}
                        className="p-2 border rounded hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                        onClick={() => navigate(`/job-details/${job.id}`)}
                    >
                        {/* 3. Job ID in Sidebar */}
                        <span className="font-medium">
                            {job.title} <span className="text-xs text-gray-500">(ID: {job.id})</span>
                        </span>
                        <span
                            className={`px-2 py-0.5 text-xs rounded ${
                                job.status === "open"
                                    ? "bg-green-100 text-green-800"
                                    : job.status === "in-progress"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-gray-100 text-gray-800"
                            }`}
                        >
                            {job.status}
                        </span>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
            {/* SIDEBAR */}
            <aside className="w-full md:w-64 bg-white shadow-md p-4 sticky top-0 h-screen overflow-y-auto z-20">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                    <FaBriefcase className="mr-2" /> Jobs
                </h2>

                {/* 4. Filter Input in Sidebar */}
                {renderFilterInput()} 
                
                {/* Display filtered jobs */}
                {renderJobList(filteredJobs)}

            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 relative">
                {/* HEADER (Omitted for brevity, no changes here) */}
                <div className="sticky top-0 bg-gray-50 shadow-sm z-30">
                    <header className="flex justify-between items-center p-4 border-b border-gray-200">
                        <h1 className="text-2xl font-bold text-gray-900">
                            SkillLinker Dashboard
                        </h1>
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-700">
                                Welcome, {currentUser.firstName} {currentUser.lastName}
                            </span>
                            <button
                                onClick={logout}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm"
                            >
                                Logout
                            </button>
                        </div>
                    </header>
                    {/* TABS (Omitted for brevity, no changes here) */}
                    <nav className="flex space-x-8 px-4 py-2 border-b bg-gray-50">
                        <button
                            onClick={() => setActiveTab("profile")}
                            className={`py-2 ${
                                activeTab === "profile"
                                    ? "text-blue-600 border-b-2 border-blue-600"
                                    : "text-gray-600"
                            }`}
                        >
                            <FaUser className="inline mr-1" /> Profile
                        </button>
                        <button
                            onClick={() => setActiveTab("jobs")}
                            className={`py-2 ${
                                activeTab === "jobs"
                                    ? "text-blue-600 border-b-2 border-blue-600"
                                    : "text-gray-600"
                            }`}
                        >
                            All Jobs
                        </button>
                    </nav>
                </div>

                {/* CONTENT */}
                <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
                    {activeTab === "profile" && <Profile />}

                    {activeTab === "jobs" && (
                        <>
                            {/* 4. Filter Input in Main Content */}
                            <div className="max-w-4xl mx-auto mb-6">
                                {renderFilterInput()}
                            </div>

                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {loadingJobs ? (
                                    <div className="col-span-full text-center text-gray-500">
                                        Loading...
                                    </div>
                                ) : filteredJobs.length === 0 ? (
                                    <div className="col-span-full text-center text-gray-400">
                                        {filterText ? "No jobs match your filter." : "No jobs found."}
                                    </div>
                                ) : (
                                    filteredJobs.map((job) => (
                                        <div
                                            key={job.id}
                                            className="shadow-lg rounded-lg bg-white overflow-hidden hover:scale-105 transition-transform cursor-pointer"
                                            onClick={() => navigate(`/job-details/${job.id}`)}
                                        >
                                            <div className="p-6 flex flex-col justify-between h-full">
                                                <div>
                                                    <div className="flex justify-between items-center">
                                                        <h3 className="text-lg font-semibold">
                                                            {job.title}
                                                        </h3>
                                                        <span
                                                            className={`px-2 py-1 text-xs rounded-full ${
                                                                job.status === "open"
                                                                    ? "bg-green-100 text-green-800"
                                                                    : job.status === "in-progress"
                                                                    ? "bg-blue-100 text-blue-800"
                                                                    : "bg-gray-100 text-gray-800"
                                                            }`}
                                                        >
                                                            {job.status}
                                                        </span>
                                                    </div>
                                                    
                                                    {/* 3. Job ID in Job Card */}
                                                    <p className="text-xs font-medium text-blue-500 mb-2">
                                                        Job ID: {job.id}
                                                    </p>

                                                    <p className="mt-2 text-sm text-gray-600">
                                                        {job.description}
                                                    </p>

                                                    {/* Other details (sdpId, location, deadline, qualifications) */}
                                                    <div className="mt-4 text-sm space-y-1 text-gray-500">
                                                        <div className="flex items-center">
                                                            <FaBriefcase className="mr-2" /> SDP ID: {job.sdpId}
                                                        </div>
                                                        <div className="flex items-center">
                                                            <FaMapMarkerAlt className="mr-2" /> {job.location}
                                                        </div>
                                                        <div className="flex items-center">
                                                            <FaCalendarAlt className="mr-2" /> Deadline:{" "}
                                                            {job.deadline
                                                                ? new Date(job.deadline).toLocaleDateString()
                                                                : "N/A"}
                                                        </div>
                                                    </div>

                                                    {/* Qualifications list (Omitted for brevity, no changes here) */}
                                                    {job.requiredQualifications?.length > 0 && (
                                                        <div className="mt-4">
                                                            <h4 className="font-medium text-gray-900 text-sm">
                                                                Required Qualifications:
                                                            </h4>
                                                            <ul className="mt-1 text-sm text-gray-700 space-y-1">
                                                                {job.requiredQualifications.map((qual, idx) => (
                                                                    <li key={idx} className="flex items-center text-gray-700">
                                                                        <FaCheck className="mr-2 text-green-500" />
                                                                        {qual}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="mt-6 text-lg font-bold text-green-600">
                                                    {job.budget
                                                        ? `R${parseFloat(job.budget).toLocaleString()}`
                                                        : "N/A"}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
};

export default ModeratorAssessorDashboard;