import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useAssessor } from "../../contexts/AssessorContext";
import {
    FaBriefcase,
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaCheck,
    FaUser,
    FaSearch,
    // New icons for menus
    FaBell, // Notification icon
    FaThLarge, // Applications icon
    FaSignOutAlt, // Logout icon in dropdown
    FaAngleDown, // Dropdown caret
} from "react-icons/fa";
import Profile from "./Profile";

// --- START: New Placeholder Data and Components for Menus ---

// Placeholder Data
const mockNotifications = [
    { id: 1, message: "New application for 'Project Manager' received.", time: "2m ago" },
    { id: 2, message: "Job 'Web Developer' deadline is tomorrow.", time: "1h ago" },
    { id: 3, message: "System maintenance scheduled for 3 AM.", time: "5h ago" },
];

const mockApplications = [
    { name: "My Profile", icon: FaUser, link: "#", onClick: (setActiveTab) => setActiveTab("profile") },
    { name: "All Jobs", icon: FaBriefcase, link: "#", onClick: (setActiveTab) => setActiveTab("jobs") },
    // ADD THIS NEW ITEM:
    { name: "View Notifications", icon: FaBell, link: "/notifications" }, 
    { name: "View Applications", icon: FaCheck, link: "/applications" }, 
];

// Reusable Dropdown Component for Notifications and Applications
const DropdownMenu = ({ children, trigger, className = "" }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`relative ${className}`}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-full hover:bg-gray-200 transition-colors"
            >
                {trigger}
            </button>
            {isOpen && (
                <div 
                    className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-100 z-50"
                    onMouseLeave={() => setIsOpen(false)} // Close on mouse leave
                >
                    {children}
                </div>
            )}
        </div>
    );
};

// Notification Menu Component
const NotificationsMenu = ({ notifications }) => (
    <>
        <div className="p-3 border-b font-semibold text-gray-700">
            Notifications ({notifications.length})
        </div>
        <ul className="max-h-80 overflow-y-auto">
            {notifications.length > 0 ? (
                notifications.map((n) => (
                    <li key={n.id} className="p-3 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer">
                        <p className="text-sm text-gray-800">{n.message}</p>
                        <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                    </li>
                ))
            ) : (
                <li className="p-3 text-center text-sm text-gray-500">No new notifications.</li>
            )}
        </ul>
    </>
);

// Applications Menu Component
const ApplicationsMenu = ({ applications, navigate, setActiveTab }) => (
    <>
        <div className="p-3 border-b font-semibold text-gray-700">Quick Links</div>
        <div className="grid grid-cols-2 gap-2 p-3">
            {applications.map((app, index) => (
                <button
                    key={index}
                    onClick={() => {
                        if (app.link && app.link !== "#") {
                            navigate(app.link);
                        } else if (app.onClick) {
                            app.onClick(setActiveTab);
                        }
                    }}
                    className="flex flex-col items-center justify-center p-3 text-sm text-gray-700 hover:bg-blue-50 rounded-lg transition-colors"
                >
                    <app.icon className="text-xl mb-1 text-blue-600" />
                    {app.name}
                </button>
            ))}
        </div>
    </>
);

// User Profile Dropdown Component
const UserDropdown = ({ currentUser, logout }) => (
    <>
        <div className="p-3 border-b">
            <p className="font-semibold text-gray-800">{currentUser.firstName} {currentUser.lastName}</p>
            <p className="text-sm text-gray-500">{currentUser.role || 'Moderator/Assessor'}</p>
        </div>
        <ul>
            <li className="flex items-center p-3 hover:bg-red-50 cursor-pointer text-sm text-red-600" onClick={logout}>
                <FaSignOutAlt className="mr-2" /> Logout
            </li>
        </ul>
    </>
);

// Dashboard Header Component (with new menus)
// FIX: Added 'activeTab' to the prop destructuring
const DashboardHeader = ({ currentUser, logout, navigate, setActiveTab, activeTab }) => { 
    // Determine the number of unread notifications (using mock data length as a badge)
    const unreadCount = mockNotifications.length;

    return (
        <div className="sticky top-0 bg-white shadow-md z-30">
            <header className="flex justify-between items-center p-4 border-b border-gray-200">
                <h1 className="text-2xl font-bold text-gray-900">
                    SkillLinker Dashboard
                </h1>
                <div className="flex items-center space-x-2 md:space-x-4">
                    {/* 1. Applications Menu */}
                    <DropdownMenu 
                        trigger={<FaThLarge className="text-xl text-gray-600" />}
                        className="hidden sm:block" 
                    >
                        <ApplicationsMenu applications={mockApplications} navigate={navigate} setActiveTab={setActiveTab} />
                    </DropdownMenu>

                    {/* 2. Notifications Menu */}
                    <DropdownMenu 
                        trigger={
                            <div className="relative">
                                <FaBell className="text-xl text-gray-600" />
                                {unreadCount > 0 && (
                                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 text-xs text-white justify-center items-center"></span>
                                    </span>
                                )}
                            </div>
                        }
                    >
                        <NotificationsMenu notifications={mockNotifications} />
                    </DropdownMenu>

                    {/* 3. User Profile Dropdown */}
                    <DropdownMenu
                        trigger={
                            <div className="flex items-center space-x-2 cursor-pointer p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                                <FaUser className="text-blue-600" />
                                <span className="text-sm font-medium hidden sm:inline">
                                    {currentUser.firstName}
                                </span>
                                <FaAngleDown className="text-xs text-gray-500" />
                            </div>
                        }
                        className="ml-4"
                    >
                        <UserDropdown currentUser={currentUser} logout={logout} />
                    </DropdownMenu>
                </div>
            </header>
            {/* TABS */}
            <nav className="flex space-x-8 px-4 py-2 border-b bg-gray-50">
                <button
                    onClick={() => setActiveTab("profile")}
                    className={`py-2 transition-colors ${
                        activeTab === "profile"
                            ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
                            : "text-gray-600 hover:text-blue-500"
                    }`}
                >
                    <FaUser className="inline mr-1" /> Profile
                </button>
                <button
                    onClick={() => setActiveTab("jobs")}
                    className={`py-2 transition-colors ${
                        activeTab === "jobs"
                            ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
                            : "text-gray-600 hover:text-blue-500"
                    }`}
                >
                    <FaBriefcase className="inline mr-1" /> All Jobs
                </button>
            </nav>
        </div>
    );
};
// --- END: New Placeholder Data and Components for Menus ---


const ModeratorAssessorDashboard = () => {
    const navigate = useNavigate();
    const { currentUser, logout } = useAuth(); 
    const { jobs, loadingJobs } = useAssessor();

    const [activeTab, setActiveTab] = useState("jobs"); 
    const [filterText, setFilterText] = useState(""); 

    if (!currentUser) {
        return (
            <div className="text-center py-12 text-gray-500">Loading user...</div>
        );
    }

    // Memoized filtering logic
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

    // Function to render the filter input
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
        if (jobList.length === 0 && jobs.length === 0) {
            return <div className="text-gray-400">No jobs found</div>;
        }

        return (
            <ul className="space-y-2">
                {jobList.map((job) => (
                    <li
                        key={job.id}
                        className="p-2 border rounded hover:bg-gray-100 cursor-pointer flex justify-between items-center transition-shadow duration-150"
                        onClick={() => navigate(`/job-details/${job.id}`)}
                    >
                        <span className="font-medium text-sm">
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
            <aside className="w-full md:w-64 bg-white shadow-lg p-4 sticky top-0 md:h-screen overflow-y-auto z-20">
                <h2 className="text-xl font-bold mb-4 flex items-center text-blue-700">
                    <FaBriefcase className="mr-2" /> Job List
                </h2>

                {/* Filter Input in Sidebar */}
                {renderFilterInput()} 
                
                {/* Display filtered jobs */}
                {renderJobList(filteredJobs)}

            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 relative">
                
                {/* NEW HEADER with Notifications and Applications Menus */}
                {/* The fix ensures activeTab is passed here */}
                <DashboardHeader 
                    currentUser={currentUser} 
                    logout={logout} 
                    navigate={navigate}
                    setActiveTab={setActiveTab}
                    activeTab={activeTab} 
                />

                {/* CONTENT */}
                <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
                    {activeTab === "profile" && <Profile />}

                    {activeTab === "jobs" && (
                        <>
                            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Available Job Vacancies</h2>
                            
                            {/* Filter Input in Main Content (Only shows on large screens where sidebar is sticky and narrow) */}
                            <div className="max-w-4xl mx-auto mb-6 hidden md:block lg:hidden">
                                {renderFilterInput()}
                            </div>

                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {loadingJobs ? (
                                    <div className="col-span-full text-center text-gray-500 py-10">
                                        <FaBriefcase className="inline animate-spin mr-2" /> Loading jobs...
                                    </div>
                                ) : filteredJobs.length === 0 ? (
                                    <div className="col-span-full text-center text-gray-500 py-10">
                                        <FaSearch className="inline mr-2" /> {filterText ? "No jobs match your filter." : "No jobs found."}
                                    </div>
                                ) : (
                                    filteredJobs.map((job) => (
                                        <div
                                            key={job.id}
                                            className="shadow-xl rounded-lg bg-white overflow-hidden hover:scale-[1.02] transition-transform duration-300 cursor-pointer border border-gray-200"
                                            onClick={() => navigate(`/job-details/${job.id}`)}
                                        >
                                            <div className="p-6 flex flex-col justify-between h-full">
                                                <div>
                                                    <div className="flex justify-between items-start">
                                                        <h3 className="text-lg font-bold text-blue-700">
                                                            {job.title}
                                                        </h3>
                                                        <span
                                                            className={`ml-3 px-2 py-1 text-xs font-medium rounded-full flex-shrink-0 ${
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
                                                    
                                                    <p className="text-xs font-medium text-gray-500 mb-2">
                                                        Job ID: {job.id} | SDP ID: {job.sdpId}
                                                    </p>

                                                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                                                        {job.description}
                                                    </p>

                                                    <div className="mt-4 text-sm space-y-1 text-gray-500">
                                                        <div className="flex items-center">
                                                            <FaMapMarkerAlt className="mr-2 text-red-400" /> {job.location}
                                                        </div>
                                                        <div className="flex items-center">
                                                            <FaCalendarAlt className="mr-2 text-yellow-500" /> Deadline:{" "}
                                                            {job.deadline
                                                                ? new Date(job.deadline).toLocaleDateString()
                                                                : "N/A"}
                                                        </div>
                                                    </div>

                                                    {job.requiredQualifications?.length > 0 && (
                                                        <div className="mt-4 border-t pt-3">
                                                            <h4 className="font-medium text-gray-900 text-sm">
                                                                Key Requirements:
                                                            </h4>
                                                            <ul className="mt-1 text-sm text-gray-700 space-y-1">
                                                                {/* Only show first 2 qualifications for card view */}
                                                                {job.requiredQualifications.slice(0, 2).map((qual, idx) => (
                                                                    <li key={idx} className="flex items-start text-gray-700">
                                                                        <FaCheck className="mr-2 mt-1 text-green-500 flex-shrink-0" />
                                                                        <span className="truncate">{qual}</span>
                                                                    </li>
                                                                ))}
                                                                {job.requiredQualifications.length > 2 && (
                                                                    <li className="text-xs text-gray-400 mt-1">
                                                                        ...and {job.requiredQualifications.length - 2} more.
                                                                    </li>
                                                                )}
                                                            </ul>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="mt-6 text-xl font-extrabold text-green-600 border-t pt-3">
                                                    {job.budget
                                                        ? `R${parseFloat(job.budget).toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
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