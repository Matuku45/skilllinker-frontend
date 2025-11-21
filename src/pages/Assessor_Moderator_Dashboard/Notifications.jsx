import React, { useState, useMemo } from "react";
// We import useNavigate for the back button functionality
import { useNavigate } from 'react-router-dom'; 
import { 
    FaBell, 
    FaBriefcase, 
    FaInfoCircle, 
    FaTrash, 
    FaEnvelopeOpen,
    FaArrowLeft, // Back button icon
    FaRegLightbulb // Icon for System/Tips
} from "react-icons/fa";
import { HiOutlineDocumentCheck } from "react-icons/hi2"; // Success/Verification icon

const Notifications = () => {
    // Hook to allow programmatic navigation (for the back button)
    const navigate = useNavigate();

    // Mock notification data 
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            title: "Verification Approved 🎉",
            message: "Your accreditation documents were reviewed and your account is now verified. Start applying!",
            type: "success",
            date: "2025-11-12",
            read: false,
        },
        {
            id: 2,
            title: "New Job Alert: ETDP Assessor",
            message: "A new job matching your 'ETDP Assessor' qualification was posted in Pretoria.",
            type: "job",
            date: "2025-11-13",
            read: false,
        },
        {
            id: 3,
            title: "Application Shortlisted",
            message: "Your application for 'Project Manager' has been short-listed. Awaiting interview scheduling.",
            type: "info",
            date: "2025-11-10",
            read: true,
        },
        {
            id: 4,
            title: "Tip: Update your Profile",
            message: "Ensure your profile is 100% complete to increase visibility to SDPs.",
            type: "tip", // New type for system messages/tips
            date: "2025-11-09",
            read: true,
        },
        {
            id: 5,
            title: "Trade Test Moderator Job",
            message: "A high-priority moderator job requires immediate attention. Click to view details.",
            type: "job",
            date: "2025-11-14",
            read: false,
        },
    ]);

    const [filter, setFilter] = useState("all");

    // Memoized filtering logic
    const filteredNotifications = useMemo(() => {
        if (filter === "all") return notifications;
        return notifications.filter(n => n.type === filter);
    }, [notifications, filter]);

    // Handlers (toggleRead, deleteNotification, markAllAsRead, deleteAllRead remain the same)
    const toggleRead = (id) => {
        setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
        );
    };

    const deleteNotification = (id) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const deleteAllRead = () => {
        setNotifications(prev => prev.filter(n => !n.read));
    };

    // Icon mapping and styling (Updated to include 'tip' type)
    const getIcon = (type) => {
        switch (type) {
            case "success":
                return { icon: HiOutlineDocumentCheck, color: "text-green-600", bg: "bg-green-100" };
            case "job":
                return { icon: FaBriefcase, color: "text-indigo-600", bg: "bg-indigo-100" }; // Changed to Indigo for Jobs
            case "info":
                return { icon: FaInfoCircle, color: "text-yellow-600", bg: "bg-yellow-100" };
            case "tip":
            default:
                return { icon: FaRegLightbulb, color: "text-cyan-600", bg: "bg-cyan-100" }; // New icon/color for tips
        }
    };

    // Tab Data (Updated to include 'tip' type)
    const tabs = [
        { key: "all", name: "All", count: notifications.length },
        { key: "job", name: "Job Alerts", count: notifications.filter(n => n.type === 'job').length },
        { key: "success", name: "Success", count: notifications.filter(n => n.type === 'success').length },
        { key: "info", name: "Updates", count: notifications.filter(n => n.type === 'info').length + notifications.filter(n => n.type === 'tip').length },
    ];


        const handleBack = () => {
        if (window.history.length > 1) navigate(-1);
        else navigate("/assessor/dashboard");
    };

    return (
        // Gradient background for the page
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl p-6 sm:p-10 border border-gray-100">
                
                {/* --- Header & Back Button --- */}
                <div className="flex justify-between items-center mb-8">
                  <button
                    onClick={handleBack}
                    className="mb-4 px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
                >
                    ← Back
                </button>
                    <h1 className="text-4xl font-extrabold text-gray-800 flex items-center gap-3">
                        <FaBell className="text-blue-600" /> Notification Center
                    </h1>
                </div>

                {/* --- Action Buttons & Filter --- */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b pb-4">
                    <div className="flex space-x-3 mb-4 sm:mb-0">
                        <button
                            onClick={markAllAsRead}
                            className="flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:scale-100"
                            disabled={notifications.every(n => n.read)}
                        >
                            <FaEnvelopeOpen className="mr-2" /> Mark All Read
                        </button>
                        <button
                            onClick={deleteAllRead}
                            className="flex items-center px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg shadow-md hover:bg-red-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:scale-100"
                            disabled={notifications.every(n => !n.read)}
                        >
                            <FaTrash className="mr-2" /> Clear Read
                        </button>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex space-x-1 p-1 bg-gray-100 rounded-xl shadow-inner">
                        {tabs.map(tab => (
                            <button
                                key={tab.key}
                                onClick={() => setFilter(tab.key)}
                                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${
                                    filter === tab.key
                                        ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                                        : "text-gray-600 hover:bg-white hover:text-blue-600"
                                }`}
                            >
                                {tab.name} ({tab.count})
                            </button>
                        ))}
                    </div>
                </div>

                {/* --- No notifications --- */}
                {filteredNotifications.length === 0 && (
                    <div className="text-center py-20 border-4 border-dashed border-blue-200 rounded-2xl bg-white/50 animate-fadeIn">
                        <FaBell className="mx-auto text-blue-400 text-6xl mb-4 animate-bounce-slow" />
                        <h2 className="text-2xl font-bold text-gray-700">
                            {filter === 'all' ? "You're all caught up! ☕" : `No ${filter} notifications.`}
                        </h2>
                        <p className="text-gray-500 mt-2">Time to focus on the next task!</p>
                    </div>
                )}

                {/* --- Notification list --- */}
                <div className="space-y-4">
                    {filteredNotifications.map((note) => {
                        const { icon: Icon, color, bg } = getIcon(note.type);
                        
                        return (
                            <div
                                key={note.id}
                                className={`p-5 rounded-xl shadow-lg transition-all duration-300 relative border-l-4 
                                    ${note.read 
                                        ? "bg-white border-gray-200 opacity-80 hover:opacity-100" 
                                        : "bg-white/90 border-blue-600 hover:shadow-xl hover:scale-[1.01] animate-pulse-once"
                                    }`
                                }
                            >
                                <div className="flex items-start gap-4">
                                    {/* Icon Container with subtle gradient */}
                                    <div className={`p-3 rounded-full ${bg} bg-opacity-70 shadow-inner`}>
                                        <Icon className={`${color} text-2xl`} />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-center">
                                            <h2 className={`text-lg font-bold ${note.read ? 'text-gray-600' : 'text-blue-700'}`}>
                                                {note.title}
                                            </h2>
                                            {/* Unread Indicator */}
                                            {!note.read && (
                                                <span className="w-3 h-3 bg-red-500 rounded-full flex-shrink-0 animate-ping-slow" title="New"></span>
                                            )}
                                        </div>
                                        
                                        <p className="text-gray-700 text-sm mt-1">{note.message}</p>
                                        <p className="text-gray-400 text-xs mt-2 italic">
                                            {new Date(note.date).toLocaleDateString("en-ZA", {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                            })}
                                        </p>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-3 mt-4 pt-3 border-t border-dashed justify-end">
                                    <button
                                        onClick={() => toggleRead(note.id)}
                                        className={`px-4 py-1 rounded-full text-xs font-medium transition-colors border shadow-sm hover:shadow-md ${
                                            note.read
                                                ? "bg-blue-100 text-blue-600 hover:bg-blue-200"
                                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                        }`}
                                    >
                                        {note.read ? "Mark Unread" : "Mark Read"}
                                    </button>

                                    <button
                                        onClick={() => deleteNotification(note.id)}
                                        className="p-2 text-red-500 hover:text-white rounded-full hover:bg-red-600 transition-colors duration-200"
                                        title="Delete"
                                    >
                                        <FaTrash className="text-sm" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Notifications;