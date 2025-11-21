import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { mockMessages, getUserById } from '../../data/mockData';
import { 
    FaArrowLeft, 
    FaBell, 
    FaUserCircle, 
    FaEnvelopeOpenText, 
    FaClock,
    FaExclamationCircle, // Added icon for unread
    FaCheckCircle,       // Added icon for read
    FaTag                // Added icon for notification type
} from 'react-icons/fa';

// Helper function to determine notification type based on content
const getNotificationType = (message) => {
    if (message.toLowerCase().includes('applied')) return 'Application';
    if (message.toLowerCase().includes('approved') || message.toLowerCase().includes('rejected')) return 'Status Update';
    if (message.toLowerCase().includes('job')) return 'Job Update';
    return 'General';
};

const Notifications = ({ onBack }) => {
    const { currentUser } = useAuth();
    // LOGIC: Filter messages directed to the current user (No Change)
    const messages = mockMessages.filter(msg => msg.toUserId === currentUser.id);

    return (
        // Gradient Background for an appealing context
        <div className="min-h-screen p-8 bg-gradient-to-br from-indigo-700 to-purple-800">
            <div className="max-w-4xl mx-auto">
                
                {/* Back Button - Styled for prominence */}
                <button 
                    onClick={onBack} 
                    className="flex items-center text-white/90 hover:text-white transition-colors mb-8 text-base font-bold p-3 rounded-xl bg-black/20 hover:bg-black/40 shadow-lg"
                >
                    <FaArrowLeft className="mr-3 text-xl" /> Back to Dashboard
                </button>

                {/* Main Notifications Card */}
                <div className="bg-white shadow-2xl rounded-3xl p-8 border-t-8 border-yellow-500">
                    <div className="flex items-center border-b pb-4 mb-8">
                        <FaBell className="text-5xl text-yellow-500 mr-4 animate-shake-slow" />
                        <h1 className="text-4xl font-black text-gray-900">Your Activity Feed</h1>
                    </div>
                    
                    {messages.length === 0 ? (
                        <div className="text-center py-16 border-4 border-dashed border-purple-300 rounded-2xl bg-purple-50">
                            <FaEnvelopeOpenText className="mx-auto text-purple-500 text-7xl mb-6" />
                            <p className="text-2xl font-extrabold text-gray-800">Peace & Quiet!</p>
                            <p className="text-gray-600 mt-2 text-lg">Your inbox is clear. Stay tuned for new applications!</p>
                        </div>
                    ) : (
                        <div className="space-y-5">
                            {/* Map through and display messages */}
                            {messages.map(message => {
                                // LOGIC: Fetch sender details (No Change)
                                const fromUser = getUserById(message.fromUserId);
                                const isUnread = !message.read;
                                const notificationType = getNotificationType(message.message);

                                return (
                                    <div 
                                        key={message.id} 
                                        className={`rounded-2xl p-6 transition-all duration-300 border-l-8 hover:scale-[1.01] 
                                            ${isUnread 
                                                ? 'bg-yellow-50 border-yellow-500 shadow-xl' 
                                                : 'bg-white border-gray-200 shadow-md'
                                            }`}
                                    >
                                        <div className="flex justify-between items-start mb-3">
                                            {/* Left Section: Icon, Sender, Type */}
                                            <div className="flex items-center space-x-3">
                                                {/* Status Icon */}
                                                {isUnread ? (
                                                    <FaExclamationCircle className="text-2xl text-red-500 animate-pulse-slow" />
                                                ) : (
                                                    <FaCheckCircle className="text-2xl text-green-500" />
                                                )}

                                                {/* Sender Info */}
                                                <div className="font-semibold text-lg text-gray-800">
                                                    {fromUser ? (
                                                        <span>
                                                            <FaUserCircle className="inline text-blue-500 mr-2" />
                                                            {fromUser.firstName} {fromUser.lastName}
                                                        </span>
                                                    ) : (
                                                        <span className="text-gray-600">System Update</span>
                                                    )}
                                                </div>
                                                
                                                {/* Type Tag */}
                                                <span className={`px-3 py-1 text-xs font-bold rounded-full flex items-center ${
                                                    notificationType === 'Application' ? 'bg-indigo-100 text-indigo-700' :
                                                    notificationType === 'Status Update' ? 'bg-green-100 text-green-700' :
                                                    'bg-gray-100 text-gray-500'
                                                }`}>
                                                    <FaTag className="mr-1" /> {notificationType}
                                                </span>
                                            </div>
                                            
                                            {/* Right Section: Timestamp */}
                                            <div className="flex items-center text-sm text-gray-500 flex-shrink-0 ml-4 pt-1">
                                                <FaClock className="mr-1.5" />
                                                {new Date(message.timestamp).toLocaleString()}
                                            </div>
                                        </div>
                                        
                                        {/* Message Body */}
                                        <p className="text-gray-700 ml-8 text-base pt-1">
                                            {message.message}
                                        </p>

                                        {/* Unread Indicator - only visible if unread */}
                                        {isUnread && (
                                            <div className="w-full h-1 bg-yellow-300 mt-4 rounded-full"></div>
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