// src/components/ChatBotModule.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ChatBotModule = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-lg font-bold mb-4">AI Chatbot</h2>
      <p className="mb-4">Click below to talk to Baagh, your AI assistant!</p>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={() => navigate('/chatbot')}
      >
        Go to Chatbot
      </button>
    </div>
  );
};

export default ChatBotModule;
