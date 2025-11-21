import React, { useState, useMemo } from "react";
import { FaBell, FaCheckCircle, FaBriefcase, FaInfoCircle, FaTrash, FaEnvelopeOpen } from "react-icons/fa";
import { HiOutlineDocumentCheck } from "react-icons/hi2"; // A more specific icon for success/verification

const Notifications = () => {
    // Mock notification data (replace with API later)
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            title: "Verification Approved",
            message: "Your accreditation documents were reviewed and your account is now verified. You can now bid on jobs.",
            type: "success",
            date: "2025-11-12",
            read: false,
        },
        {
            id: 2,
            title: "New Job: ETDP Assessor",
            message: "A new job matching your 'ETDP Assessor' qualification was posted in Pretoria.",
            type: "job",
            date: "2025-11-13",
            read: false,
        },
        {
            id: 3,
            title: "Application Shortlisted",
            message: "Your application for 'Project Manager' has been short-listed by the SDP. Awaiting interview scheduling.",
            type: "info",
            date: "2025-11-10",
            read: true,
        },
        {
            id: 4,
            title: "System Update Complete",
            message: "The scheduled maintenance is complete. All services are running normally.",
            type: "system",
            date: "2025-11-09",
            read: true,
        },
        {
            id: 5,
            title: "New Job: Trade Test Moderator",
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

    // Handle marking notifications as read/unread
    const toggleRead = (id) => {
        setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
        );
    };

    // Delete notification
    const deleteNotification = (id) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    // Global Actions
    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const deleteAllRead = () => {
        setNotifications(prev => prev.filter(n => !n.read));
    };

    // Icon mapping and styling
    const getIcon = (type) => {
        switch (type) {
            case "success":
                return { icon: HiOutlineDocumentCheck, color: "text-green-600", bg: "bg-green-100" };
            case "job":
                return { icon: FaBriefcase, color: "text-blue-600", bg: "bg-blue-100" };
            case "info":
                return { icon: FaInfoCircle, color: "text-yellow-600", bg: "bg-yellow-100" };
            case "system":
            default:
                return { icon: FaBell, color: "text-gray-600", bg: "bg-gray-100" };
        }
    };

    // Tab Data
    const tabs = [
        { key: "all", name: "All", count: notifications.length },
        { key: "success", name: "Success", count: notifications.filter(n => n.type === 'success').length },
        { key: "job", name: "Job Alerts", count: notifications.filter(n => n.type === 'job').length },
        { key: "info", name: "Info/Updates", count: notifications.filter(n => n.type === 'info').length },
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-6 sm:p-8">
                
                <h1 className="text-4xl font-extrabold text-gray-800 mb-2 flex items-center gap-3">
                    <FaBell className="text-blue-600" /> Notification Center
                </h1>
                <p className="text-gray-500 mb-8">Manage all your account alerts and updates here.</p>

                {/* --- Action Buttons & Filter --- */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b pb-4">
                    <div className="flex space-x-2 mb-4 sm:mb-0">
                        <button
                            onClick={markAllAsRead}
                            className="flex items-center px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                            disabled={notifications.every(n => n.read)}
                        >
                            <FaEnvelopeOpen className="mr-2" /> Mark All Read
                        </button>
                        <button
                            onClick={deleteAllRead}
                            className="flex items-center px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
                            disabled={notifications.every(n => !n.read)}
                        >
                            <FaTrash className="mr-2" /> Clear Read
                        </button>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex space-x-1 p-1 bg-gray-200 rounded-lg">
                        {tabs.map(tab => (
                            <button
                                key={tab.key}
                                onClick={() => setFilter(tab.key)}
                                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                                    filter === tab.key
                                        ? "bg-white text-blue-700 shadow"
                                        : "text-gray-600 hover:bg-gray-300"
                                }`}
                            >
                                {tab.name} ({tab.count})
                            </button>
                        ))}
                    </div>
                </div>

                {/* --- No notifications --- */}
                {filteredNotifications.length === 0 && (
                    <div className="text-center py-20 border border-dashed border-gray-300 rounded-lg bg-gray-50">
                        <FaBell className="mx-auto text-gray-400 text-6xl mb-4" />
                        <h2 className="text-xl font-semibold text-gray-600">
                            {filter === 'all' ? "You're all caught up!" : `No ${filter} notifications.`}
                        </h2>
                        <p className="text-gray-500 mt-2">Check back later for new alerts.</p>
                    </div>
                )}

                {/* --- Notification list --- */}
                <div className="space-y-4">
                    {filteredNotifications.map((note) => {
                        const { icon: Icon, color, bg } = getIcon(note.type);
                        
                        return (
                            <div
                                key={note.id}
                                className={`p-4 rounded-lg shadow-md transition-all duration-300 border hover:shadow-lg relative 
                                    ${note.read ? "bg-white border-gray-200" : "bg-white border-blue-300 ring-2 ring-blue-100"}`
                                }
                            >
                                <div className="flex items-start gap-4">
                                    {/* Icon Container */}
                                    <div className={`p-3 rounded-full ${bg}`}>
                                        <Icon className={`${color} text-xl`} />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-center">
                                            <h2 className={`text-lg font-semibold ${note.read ? 'text-gray-800' : 'text-blue-700'}`}>
                                                {note.title}
                                            </h2>
                                            {/* Unread Indicator */}
                                            {!note.read && (
                                                <span className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0" title="Unread"></span>
                                            )}
                                        </div>
                                        
                                        <p className="text-gray-600 text-sm mt-1">{note.message}</p>
                                        <p className="text-gray-400 text-xs mt-2">
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
                                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors border ${
                                            note.read
                                                ? "bg-blue-100 text-blue-600 hover:bg-blue-200 border-blue-100"
                                                : "bg-gray-100 text-gray-600 hover:bg-gray-200 border-gray-100"
                                        }`}
                                    >
                                        {note.read ? "Mark Unread" : "Mark Read"}
                                    </button>

                                    <button
                                        onClick={() => deleteNotification(note.id)}
                                        className="p-1.5 text-red-500 hover:text-red-700 rounded-full hover:bg-red-50 transition-colors"
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