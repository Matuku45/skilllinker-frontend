import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { FaUser, FaEnvelope, FaPhone, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

// --- Detail Component (for status consistency) ---
const Detail = ({ icon, label, value, color }) => (
    <p className={`flex items-center text-sm mt-1 font-medium ${color}`}>
        {icon}
        <span className="ml-2 font-semibold">{label}:</span> {value}
    </p>
);

const Profile = () => {
  const { 
        currentUser, 
        resume, 
        uploadResume, 
        // Assuming your context provides a refresh function
        refreshCurrentUserStatus 
    } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [currentResumeName, setCurrentResumeName] = useState('');

  // 🚨 FORCE STATUS REFRESH ON MOUNT
  useEffect(() => {
    if (refreshCurrentUserStatus) {
      refreshCurrentUserStatus();
    }
  }, [refreshCurrentUserStatus]);

  // Show existing resume if available
  useEffect(() => {
    if (resume) {
      setCurrentResumeName(resume.name || 'Uploaded file');
    }
  }, [resume]);

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert('Please select a resume to upload.');
      return;
    }

    setUploading(true);
    try {
      const result = await uploadResume(selectedFile);
      if (result.success) {
        alert(`Resume uploaded successfully: ${selectedFile.name}`);
        setCurrentResumeName(selectedFile.name);
        setSelectedFile(null);
        // Optionally refresh user status after uploading
        if (refreshCurrentUserStatus) refreshCurrentUserStatus(); 
      } else {
        alert(`Upload failed: ${result.error}`);
      }
    } catch (err) {
      alert('An error occurred while uploading.');
    } finally {
      setUploading(false);
    }
  };

  if (!currentUser) {
    return <div className="text-center py-12">Loading user info...</div>;
  }

  // --- Status Logic (Uses latest fetched data) ---
  // Use '!!' to ensure it's treated as a boolean. Defaults to true if 'active' is undefined.
  const isVerified = !!currentUser.verified;
  const isActive = currentUser.active === undefined ? true : !!currentUser.active; 
  
  const verificationStatus = isVerified ? 'Verified' : 'Pending Verification';
  const activeStatus = isActive ? 'Active' : 'Inactive / Locked';
  const verificationColor = isVerified ? 'text-green-600' : 'text-yellow-600';
  const activeColor = isActive ? 'text-green-600' : 'text-red-600';


  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-md mt-6">
      <h2 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">👤 User Profile</h2>

      {/* User Info & Status */}
      <div className="flex items-start space-x-6">
        <FaUser className="h-16 w-16 text-gray-400 mt-1" />
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">
            {currentUser.firstName} {currentUser.lastName}
          </h1>
            
          {/* Verification Status */}
            <Detail 
                icon={isVerified ? <FaCheckCircle /> : <FaExclamationCircle />} 
                label="Verification" 
                value={verificationStatus} 
                color={verificationColor}
            />

          {/* Active Status */}
            <Detail 
                icon={isActive ? <FaCheckCircle /> : <FaExclamationCircle />} 
                label="Account Status" 
                value={activeStatus} 
                color={activeColor}
            />

        </div>
      </div>

        <hr className="my-6"/>

      {/* Contact Info */}
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Contact Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center text-gray-700">
          <FaEnvelope className="mr-2 h-4 w-4" /> **Email:** {currentUser.email}
        </div>
        <div className="flex items-center text-gray-700">
          <FaPhone className="mr-2 h-4 w-4" /> **Phone:** {currentUser.phone || 'Not provided'}
        </div>
        <div className="flex items-center text-gray-700">
          <FaUser className="mr-2 h-4 w-4" /> **User Type:** {currentUser.userType || 'N/A'}
        </div>
      </div>

        <hr className="my-6"/>

      {/* Resume Upload */}
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Resume Management</h3>
      <form onSubmit={handleSubmit}>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Your Resume
        </label>
        <div className="flex items-center space-x-4">
          <input
            type="file"
            accept=".pdf,.doc,.docx,.txt,.rtf"
            onChange={handleResumeChange}
            className="block w-full text-sm text-gray-500
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-md file:border-0
                       file:text-sm file:font-semibold
                       file:bg-blue-600 file:text-white
                       hover:file:bg-blue-700"
          />
          {selectedFile && (
            <span className="text-gray-700 text-sm flex-shrink-0">{selectedFile.name}</span>
          )}
          <button
            type="submit"
            disabled={uploading}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium flex-shrink-0"
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
        {currentResumeName && !selectedFile && (
          <p className="mt-2 text-sm text-gray-500">
            Current Resume: **{currentResumeName}**
          </p>
        )}
      </form>
    </div>
  );
};

export default Profile;