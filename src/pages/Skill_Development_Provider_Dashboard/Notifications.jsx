import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { mockMessages, getUserById } from '../../data/mockData';

const Notifications = ({ onBack }) => {
  const { currentUser } = useAuth();
  const messages = mockMessages.filter(msg => msg.toUserId === currentUser.id);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <button onClick={onBack} className="mb-4 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700">
          Back to Dashboard
        </button>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-4">Notifications</h1>
          {messages.length === 0 ? (
            <p className="text-gray-500">No notifications yet.</p>
          ) : (
            <div className="space-y-4">
              {messages.map(message => {
                const fromUser = getUserById(message.fromUserId);
                return (
                  <div key={message.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-semibold">From: {fromUser ? `${fromUser.firstName} ${fromUser.lastName}` : 'Unknown'}</p>
                      <p className="text-sm text-gray-500">{new Date(message.timestamp).toLocaleString()}</p>
                    </div>
                    <p className="text-gray-700">{message.message}</p>
                    {!message.read && (
                      <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        Unread
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
