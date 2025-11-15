import React, { useState } from "react";
import { FaBell, FaCheckCircle, FaTimesCircle, FaBriefcase, FaInfoCircle } from "react-icons/fa";

const Notifications = () => {
  // Mock notification data (replace with API later)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Verification Approved",
      message: "Your accreditation documents were reviewed and your account is now verified.",
      type: "success",
      date: "2025-11-12",
      read: false,
    },
    {
      id: 2,
      title: "New Job Posted",
      message: "An SDP in Johannesburg posted a new job matching your qualifications.",
      type: "job",
      date: "2025-11-13",
      read: false,
    },
    {
      id: 3,
      title: "Application Update",
      message: "Your application for 'ETDP Assessor Needed' has been short-listed.",
      type: "info",
      date: "2025-11-10",
      read: true,
    },
  ]);

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

  // Icon mapping
  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <FaCheckCircle className="text-green-500 text-xl" />;
      case "job":
        return <FaBriefcase className="text-blue-500 text-xl" />;
      case "info":
      default:
        return <FaInfoCircle className="text-yellow-500 text-xl" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-6 md:px-20">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 flex items-center gap-2">
          <FaBell /> Notifications
        </h1>

        {/* No notifications */}
        {notifications.length === 0 && (
          <div className="text-center py-20">
            <FaBell className="mx-auto text-gray-400 text-6xl mb-4" />
            <h2 className="text-xl font-semibold text-gray-600">No Notifications</h2>
            <p className="text-gray-500 mt-2">You're all caught up!</p>
          </div>
        )}

        {/* Notification list */}
        <div className="space-y-6">
          {notifications.map((note) => (
            <div
              key={note.id}
              className={`p-5 rounded-lg shadow border relative ${
                note.read ? "bg-gray-100" : "bg-blue-50 border-blue-200"
              }`}
            >
              {/* Icon + title */}
              <div className="flex items-start gap-4">
                {getIcon(note.type)}

                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{note.title}</h2>
                  <p className="text-gray-700 text-sm mt-1">{note.message}</p>
                  <p className="text-gray-400 text-xs mt-2">
                    {new Date(note.date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4 mt-4 justify-end">
                <button
                  onClick={() => toggleRead(note.id)}
                  className={`px-4 py-1 rounded text-sm font-medium ${
                    note.read
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {note.read ? "Mark Unread" : "Mark Read"}
                </button>

                <button
                  onClick={() => deleteNotification(note.id)}
                  className="px-4 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm font-medium"
                >
                  Delete
                </button>
              </div>

              {/* Read indicator */}
              {!note.read && (
                <span className="absolute top-3 right-3 w-3 h-3 bg-blue-600 rounded-full"></span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
