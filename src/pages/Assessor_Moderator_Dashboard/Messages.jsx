import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';

// Simple Messages component
export const Messages = ({ messages = [] }) => {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Messages</h2>
      {messages.length === 0 ? (
        <p className="text-sm text-gray-500">No messages yet.</p>
      ) : (
        <ul className="space-y-2">
          {messages.map((msg, idx) => (
            <li key={idx} className="p-3 bg-gray-100 rounded-md">
              <p className="text-gray-800">{msg}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Profile = () => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([
    "Welcome to SkillLinker!",
    "Your profile verification is pending."
  ]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-md mt-6">
      <div className="flex items-center space-x-6">
        <FaUser className="h-16 w-16 text-gray-400" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {currentUser.firstName} {currentUser.lastName}
          </h1>
          <p className="text-sm text-gray-500">{currentUser.verified ? 'Verified' : 'Pending Verification'}</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center text-gray-700">
          <FaEnvelope className="mr-2" /> {currentUser.email}
        </div>
        <div className="flex items-center text-gray-700">
          <FaPhone className="mr-2" /> {currentUser.phone || 'Not provided'}
        </div>
      </div>

      {/* Messages Section */}
      <Messages messages={messages} />
    </div>
  );
};

export default Profile;
