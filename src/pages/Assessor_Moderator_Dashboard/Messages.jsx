import React, { useState, useEffect } from "react";
import { FaPaperPlane, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";

// Mock data for conversations
const mockConversations = [
  {
    id: 1,
    participant: "John Doe",
    messages: [
      { id: 1, sender: "John Doe", text: "Hello, are you available for a project?", timestamp: "2025-11-12 10:00" },
      { id: 2, sender: "You", text: "Yes, I am available.", timestamp: "2025-11-12 10:05" },
    ],
  },
  {
    id: 2,
    participant: "Jane Smith",
    messages: [
      { id: 1, sender: "Jane Smith", text: "Can you upload your latest accreditation?", timestamp: "2025-11-13 09:30" },
    ],
  },
];

const Messages = () => {
  const { currentUser } = useAuth();
  const [conversations, setConversations] = useState(mockConversations);
  const [selectedConversationId, setSelectedConversationId] = useState(conversations[0]?.id || null);
  const [newMessage, setNewMessage] = useState("");

  const selectedConversation = conversations.find(conv => conv.id === selectedConversationId);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const updatedConversations = conversations.map(conv => {
      if (conv.id === selectedConversationId) {
        return {
          ...conv,
          messages: [
            ...conv.messages,
            { id: conv.messages.length + 1, sender: "You", text: newMessage, timestamp: new Date().toISOString() },
          ],
        };
      }
      return conv;
    });

    setConversations(updatedConversations);
    setNewMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto flex bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Conversations List */}
        <div className="w-1/3 border-r border-gray-200">
          <h2 className="text-xl font-semibold p-4 border-b border-gray-200">Conversations</h2>
          <ul>
            {conversations.map(conv => (
              <li
                key={conv.id}
                onClick={() => setSelectedConversationId(conv.id)}
                className={`p-4 cursor-pointer hover:bg-gray-100 flex items-center gap-3 ${
                  conv.id === selectedConversationId ? "bg-blue-50 font-medium" : ""
                }`}
              >
                <FaUserCircle className="text-2xl text-gray-400" />
                <span>{conv.participant}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col">
          {selectedConversation ? (
            <>
              <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-gray-50">
                {selectedConversation.messages.map(msg => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.sender === "You" ? "items-end" : "items-start"
                    }`}
                  >
                    <div
                      className={`px-4 py-2 rounded-lg max-w-xs ${
                        msg.sender === "You" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-900"
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-xs text-gray-400 mt-1">{new Date(msg.timestamp).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-200 flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyDown={e => e.key === "Enter" && handleSendMessage()}
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <FaPaperPlane />
                  Send
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400 text-lg">
              Select a conversation to start chatting
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
