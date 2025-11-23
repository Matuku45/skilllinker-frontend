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
    FaBell,
    FaThLarge,
    FaSignOutAlt,
    FaAngleDown,
    FaBars, // New icon for mobile menu/sidebar toggle
} from "react-icons/fa";
import Profile from "./Profile";

// --- START: Placeholder Data and Components for Menus ---

// Placeholder Data
const mockNotifications = [
    { id: 1, message: "New application for 'Project Manager' received.", time: "2m ago" },
    { id: 2, message: "Job 'Web Developer' deadline is tomorrow.", time: "1h ago" },
    { id: 3, message: "System maintenance scheduled for 3 AM.", time: "5h ago" },
];

const mockApplications = [
    { name: "My Profile", icon: FaUser, link: "#", onClick: (setActiveTab) => setActiveTab("profile") },
    { name: "All Jobs", icon: FaBriefcase, link: "#", onClick: (setActiveTab) => setActiveTab("jobs") },
    { name: "View Notifications", icon: FaBell, link: "/notifications" }, 
    { name: "View Applications", icon: FaCheck, link: "/applications" }, 
    { name: "Make Payment", icon: FaThLarge, link: "/payment" }, // Used FaThLarge as a generic app icon
];

// Reusable Dropdown Component for Notifications and Applications
const DropdownMenu = ({ children, trigger, className = "" }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`relative ${className}`}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-full hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {trigger}
            </button>
            {isOpen && (
                // FIX: Use a backdrop for better mobile interaction outside the dropdown
                <>
                    <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setIsOpen(false)}
                    ></div>
                    <div 
                        className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 transform origin-top-right animate-fade-in-down"
                    >
                        {children}
                    </div>
                </>
            )}
        </div>
    );
};

// Notification Menu Component
const NotificationsMenu = ({ notifications }) => (
    <>
        <div className="p-4 border-b font-extrabold text-lg text-gray-800">
            Notifications ({notifications.length})
        </div>
        <ul className="max-h-80 overflow-y-auto">
            {notifications.length > 0 ? (
                notifications.map((n) => (
                    <li key={n.id} className="p-3 border-b last:border-b-0 hover:bg-blue-50 cursor-pointer transition-colors">
                        <p className="text-sm font-medium text-gray-800 truncate">{n.message}</p>
                        <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                    </li>
                ))
            ) : (
                <li className="p-4 text-center text-sm text-gray-500">No new notifications.</li>
            )}
        </ul>
        <div className="p-2 text-center border-t">
            <a href="/notifications" className="text-sm text-blue-600 hover:text-blue-800 font-medium">View All</a>
        </div>
    </>
);

// Applications Menu Component
const ApplicationsMenu = ({ applications, navigate, setActiveTab }) => (
    <>
        <div className="p-4 border-b font-extrabold text-lg text-gray-800">Quick Links</div>
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
                    className="flex flex-col items-center justify-center p-4 text-xs font-medium text-gray-700 bg-gray-50 hover:bg-blue-100 rounded-xl transition-colors shadow-sm hover:shadow-md"
                >
                    <app.icon className="text-2xl mb-2 text-blue-600" />
                    {app.name}
                </button>
            ))}
        </div>
    </>
);

// User Profile Dropdown Component
const UserDropdown = ({ currentUser, logout }) => (
    <>
        <div className="p-4 border-b">
            <p className="font-extrabold text-gray-800 truncate">{currentUser.firstName} {currentUser.lastName}</p>
            <p className="text-sm text-blue-500 font-medium">{currentUser.role || 'Assessor'}</p>
        </div>
        <ul>
            <li className="flex items-center p-3 hover:bg-red-50 cursor-pointer text-sm text-red-600 font-medium transition-colors" onClick={logout}>
                <FaSignOutAlt className="mr-3 text-lg" /> Logout
            </li>
        </ul>
    </>
);

// Dashboard Header Component (with new menus and mobile adjustments)
const DashboardHeader = ({ currentUser, logout, navigate, setActiveTab, activeTab, toggleSidebar }) => { 
    const unreadCount = mockNotifications.length;

    return (
        <div className="sticky top-0 bg-white shadow-lg z-30">
            <header className="flex justify-between items-center p-4 border-b border-gray-100">
                {/* Mobile Sidebar Toggle Button */}
                <button 
                    onClick={toggleSidebar}
                    className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <FaBars className="text-xl text-gray-700" />
                </button>
                
                <h1 className="text-lg md:text-2xl font-extrabold text-gray-900 mx-auto md:mx-0">
                    SkillLinker
                </h1>
                
                <div className="flex items-center space-x-2 md:space-x-4">
                    {/* 1. Applications Menu (Hidden on mobile for simplicity) */}
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
                            <div className="flex items-center space-x-2 cursor-pointer p-1 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors">
                                <FaUser className="text-xl text-blue-600" />
                                <span className="text-sm font-medium hidden sm:inline text-gray-800">
                                    {currentUser.firstName}
                                </span>
                                <FaAngleDown className="text-xs text-gray-500 hidden sm:inline" />
                            </div>
                        }
                        className="ml-4"
                    >
                        <UserDropdown currentUser={currentUser} logout={logout} />
                    </DropdownMenu>
                </div>
            </header>
            
            {/* TABS (Always visible below header) */}
            <nav className="flex justify-around md:justify-start md:space-x-8 px-4 py-2 border-t border-gray-100 bg-gray-50/50">
                <button
                    onClick={() => setActiveTab("profile")}
                    className={`flex items-center text-sm md:text-base py-2 transition-colors border-b-2 ${
                        activeTab === "profile"
                            ? "text-blue-600 border-blue-600 font-extrabold"
                            : "text-gray-600 border-transparent hover:text-blue-500"
                    }`}
                >
                    <FaUser className="inline mr-1 text-base md:text-lg" /> Profile
                </button>
                <button
                    onClick={() => setActiveTab("jobs")}
                    className={`flex items-center text-sm md:text-base py-2 transition-colors border-b-2 ${
                        activeTab === "jobs"
                            ? "text-blue-600 border-blue-600 font-extrabold"
                            : "text-gray-600 border-transparent hover:text-blue-500"
                    }`}
                >
                    <FaBriefcase className="inline mr-1 text-base md:text-lg" /> Jobs
                </button>
            </nav>
        </div>
    );
};
// --- END: Placeholder Data and Components for Menus ---


const ModeratorAssessorDashboard = () => {
    const navigate = useNavigate();
    const { currentUser, logout } = useAuth(); 
    const { jobs, loadingJobs } = useAssessor();

    const [activeTab, setActiveTab] = useState("jobs"); 
    const [filterText, setFilterText] = useState(""); 
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // New state for mobile sidebar

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

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
            const matchesTitle = job.title.toLowerCase().includes(lowerCaseFilter);
            const matchesId = String(job.id).includes(lowerCaseFilter);
            const matchesLocation = job.location.toLowerCase().includes(lowerCaseFilter);

            return matchesTitle || matchesId || matchesLocation;
        });
    }, [jobs, filterText]);

    // Function to render the filter input (reused)
    const renderFilterInput = () => (
        <div className="relative mb-4">
            <input
                type="text"
                placeholder="Filter by Title, ID, or Location..."
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                className="w-full p-2 pl-10 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
    );

    // Function to render the job list for the sidebar
    const renderSidebarJobList = (jobList) => {
        if (loadingJobs) {
            return <div className="text-gray-500 p-2">Loading...</div>;
        }
        if (jobList.length === 0) {
            return <div className="text-gray-400 p-2 text-sm">No jobs match your filter.</div>;
        }

        return (
            <ul className="space-y-1">
                {jobList.map((job) => (
                    <li
                        key={job.id}
                        className="p-3 border rounded-lg bg-white hover:bg-blue-50 cursor-pointer flex justify-between items-center transition-all duration-150 shadow-sm"
                        onClick={() => {
                            navigate(`/job-details/${job.id}`);
                            setIsSidebarOpen(false); // Close sidebar on mobile after selection
                        }}
                    >
                        <span className="font-medium text-sm text-gray-700 truncate">
                            {job.title} 
                            <span className="text-xs text-gray-400 ml-1">(ID: {job.id})</span>
                        </span>
                        <span
                            className={`px-2 py-0.5 text-xs font-semibold rounded-full flex-shrink-0 ${
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
        <div className="flex flex-col min-h-screen bg-gray-100">
            
            {/* Header: Sticky and always visible */}
            <DashboardHeader 
                currentUser={currentUser} 
                logout={logout} 
                navigate={navigate}
                setActiveTab={setActiveTab}
                activeTab={activeTab} 
                toggleSidebar={toggleSidebar} // Pass the toggle function
            />

            <div className="flex flex-1 overflow-hidden"> 
                {/* Mobile Backdrop for Sidebar */}
                {isSidebarOpen && (
                    <div 
                        className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                        onClick={toggleSidebar}
                    ></div>
                )}

                {/* SIDEBAR: Only for Jobs tab on medium screens and up, or when explicitly open on mobile */}
                {activeTab === "jobs" && (
                    <aside 
                        className={`
                            fixed inset-y-0 left-0 w-64 bg-white shadow-2xl p-4 z-40
                            transform transition-transform duration-300 ease-in-out
                            md:translate-x-0 md:static md:shadow-lg md:w-64 md:h-auto md:overflow-y-auto 
                            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                        `}
                    >
                        <h2 className="text-xl font-extrabold mb-4 flex items-center text-blue-700 border-b pb-2">
                            <FaBriefcase className="mr-2" /> All Job Listings
                        </h2>

                        {/* Filter Input in Sidebar */}
                        {renderFilterInput()} 
                        
                        {/* Display filtered jobs in a compact list */}
                        {renderSidebarJobList(filteredJobs)}

                    </aside>
                )}


                {/* MAIN CONTENT */}
                <main className="flex-1 overflow-y-auto">
                    <div className="p-4 sm:p-6 bg-gray-100 min-h-full">
                        {activeTab === "profile" && <Profile />}

                        {activeTab === "jobs" && (
                            <>
                                <h2 className="text-2xl font-extrabold mb-6 text-gray-800 border-b pb-3">
                                    Available Jobs
                                </h2>
                                
                                {/* Filter Input in Main Content (Only shows on mobile/small screens where sidebar is hidden) */}
                                <div className="block md:hidden mb-6">
                                    {renderFilterInput()}
                                </div>

                                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
                                                className="shadow-xl rounded-xl bg-white overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer border border-gray-100"
                                                onClick={() => navigate(`/job-details/${job.id}`)}
                                            >
                                                <div className="p-5 flex flex-col justify-between h-full">
                                                    <div>
                                                        <div className="flex justify-between items-start mb-2">
                                                            <h3 className="text-lg font-extrabold text-blue-700 line-clamp-2">
                                                                {job.title}
                                                            </h3>
                                                            <span
                                                                className={`ml-3 px-3 py-1 text-xs font-bold rounded-full flex-shrink-0 ${
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
                                                        
                                                        <p className="text-xs font-medium text-gray-500 mb-4">
                                                            Job ID: {job.id} | SDP ID: {job.sdpId}
                                                        </p>

                                                        <p className="mt-2 text-sm text-gray-600 line-clamp-3 mb-4">
                                                            {job.description}
                                                        </p>

                                                        <div className="text-sm space-y-2 text-gray-500 border-t pt-4">
                                                            <div className="flex items-center">
                                                                <FaMapMarkerAlt className="mr-2 text-red-400" /> 
                                                                <span className="truncate">{job.location}</span>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <FaCalendarAlt className="mr-2 text-yellow-500" /> Deadline:{" "}
                                                                {job.deadline
                                                                    ? new Date(job.deadline).toLocaleDateString()
                                                                    : "N/A"}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="mt-6 text-xl font-extrabold text-green-600 border-t pt-4">
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
        </div>
    );
};

export default ModeratorAssessorDashboard;












