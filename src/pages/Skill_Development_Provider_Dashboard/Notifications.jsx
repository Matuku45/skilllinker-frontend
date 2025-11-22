import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaBell,
  FaCheckCircle,
  FaTimesCircle,
  FaBriefcase,
  FaInfoCircle,
} from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";

const API_URL = "http://localhost:3000/api";

const Notifications = () => {
  const { token, currentUser } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch notifications from API
// Fetch notifications from API
const fetchNotifications = async () => {
  try {
    const res = await axios.get(`${API_URL}/messages`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Use all messages without filtering
    setNotifications(res.data);
    setLoading(false);
  } catch (error) {
    console.error("Error fetching messages:", error);
    setLoading(false);
  }
};


  useEffect(() => {
    fetchNotifications();
  }, []);

  // Mark as read/unread
  const toggleRead = async (id, readStatus) => {
    try {
      await axios.put(
        `${API_URL}/messages/${id}/read`,
        { read: !readStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: !readStatus } : n))
      );
    } catch (error) {
      console.error("Error updating read status:", error);
    }
  };

  // Delete a notification
  const deleteNotification = async (id) => {
    try {
      await axios.delete(`${API_URL}/messages/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setNotifications((prev) => prev.filter((n) => n.id !== id));
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  // Determine icon based on message type
  const getIcon = (type) => {
    if (type === "success")
      return <FaCheckCircle className="text-green-500 text-xl" />;
    if (type === "job")
      return <FaBriefcase className="text-blue-500 text-xl" />;
    return <FaInfoCircle className="text-yellow-500 text-xl" />;
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-500 text-lg">
        Loading notifications...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-6 md:px-20">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 flex items-center gap-2">
          <FaBell /> Notifications
        </h1>

        {notifications.length === 0 && (
          <div className="text-center py-20">
            <FaBell className="mx-auto text-gray-400 text-6xl mb-4" />
            <h2 className="text-xl font-semibold text-gray-600">
              No Notifications
            </h2>
            <p className="text-gray-500 mt-2">You're all caught up!</p>
          </div>
        )}

        <div className="space-y-6">
          {notifications.map((note) => (
            <div
              key={note.id}
              className={`p-5 rounded-lg shadow border relative ${
                note.read
                  ? "bg-gray-100"
                  : "bg-blue-50 border-blue-200"
              }`}
            >
              <div className="flex items-start gap-4">
                {getIcon("job")} {/* You can adjust based on job type */}

                <div className="flex-1">
                  <h2 className="text-lg font-semibold">
                    Job Notification
                  </h2>

                  <p className="text-gray-700 text-sm mt-1">
                    {note.content}
                  </p>

                  <p className="text-gray-400 text-xs mt-2">
                    {new Date(note.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-4 justify-end">
                <button
                  onClick={() => toggleRead(note.id, note.read)}
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
