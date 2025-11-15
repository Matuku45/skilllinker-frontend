import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { FaUser, FaEnvelope, FaPhone, FaFileUpload } from 'react-icons/fa';

const Messages = ({ messages }) => {
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
  const [messages] = useState([
    "Welcome to SkillLinker!",
    "Your profile verification is pending."
  ]);

  const [resume, setResume] = useState(null);

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResume(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!resume) {
      alert("Please select a resume to upload.");
      return;
    }
    // Implement actual upload logic here, e.g., API call
    alert(`Resume uploaded: ${resume.name}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-md mt-6">
      {/* User Info */}
      <div className="flex items-center space-x-6">
        <FaUser className="h-16 w-16 text-gray-400" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {currentUser.firstName} {currentUser.lastName}
          </h1>
          <p className="text-sm text-gray-500">
            {currentUser.verified ? 'Verified' : 'Pending Verification'}
          </p>
        </div>
      </div>

      {/* Contact Info */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center text-gray-700">
          <FaEnvelope className="mr-2" /> {currentUser.email}
        </div>
        <div className="flex items-center text-gray-700">
          <FaPhone className="mr-2" /> {currentUser.phone || 'Not provided'}
        </div>
      </div>

      {/* Resume Upload */}
      <form onSubmit={handleSubmit} className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Your Resume
        </label>
        <div className="flex items-center space-x-4">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleResumeUpload}
            className="block w-full text-sm text-gray-500
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-md file:border-0
                       file:text-sm file:font-semibold
                       file:bg-blue-600 file:text-white
                       hover:file:bg-blue-700"
          />
          {resume && (
            <span className="text-gray-700 text-sm">{resume.name}</span>
          )}
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            Upload
          </button>
        </div>
      </form>

      {/* Messages */}
      <Messages messages={messages} />
    </div>
  );
};

export default Profile;
