import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';

const Profile = () => {
  const { currentUser, resume, uploadResume } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [currentResumeName, setCurrentResumeName] = useState('');

  // Show existing resume if available
  useEffect(() => {
    if (resume) {
      // If resume is a File object, use its name, otherwise show placeholder
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
        setSelectedFile(null); // Clear selected file
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

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-md mt-6">
      {/* User Info */}
      <div className="flex items-center space-x-6">
        <FaUser className="h-16 w-16 text-gray-400" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {currentUser.firstName} {currentUser.lastName}
          </h1>
          <p
            className={`text-sm ${
              currentUser.verified ? 'text-green-600' : 'text-yellow-600'
            }`}
          >
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
            <span className="text-gray-700 text-sm">{selectedFile.name}</span>
          )}
          <button
            type="submit"
            disabled={uploading}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
        {currentResumeName && !selectedFile && (
          <p className="mt-2 text-sm text-gray-500">
            Current Resume: {currentResumeName}
          </p>
        )}
      </form>
    </div>
  );
};

export default Profile;
