import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const SDP_Header = ({ onViewChange }) => {
  const { currentUser } = useAuth();

  return (
    <header className="bg-white shadow-md py-4 px-6">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-blue-600">SkillLinker SDP</h1>
          <span className="text-gray-600">Welcome, {currentUser.companyName || `${currentUser.firstName} ${currentUser.lastName}`}</span>
        </div>
        <nav className="flex space-x-4">
          <button
            onClick={() => onViewChange('dashboard')}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Dashboard
          </button>
          <button
            onClick={() => onViewChange('postJob')}
            className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
          >
            Post Job
          </button>
          <button
            onClick={() => onViewChange('notifications')}
            className="bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-700"
          >
            Notifications
          </button>
          <button
            onClick={() => onViewChange('profile')}
            className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700"
          >
            Profile
          </button>
        </nav>
      </div>
    </header>
  );
};

export default SDP_Header;
