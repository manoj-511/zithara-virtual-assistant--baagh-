import React, { useState, useRef, useEffect } from 'react';
import './chatbot.css';
import { useNavigate } from 'react-router-dom';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! I am Baagh, your AI shopping assistant. How can I help you today?', time: new Date().toLocaleTimeString() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const navigate = useNavigate();
  const chatEndRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = speechSynthesis.getVoices().find(voice => voice.lang === 'en-US');
    speechSynthesis.speak(utterance);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: 'user', text: input, time: new Date().toLocaleTimeString() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      const botMessage = data.reply || 'Sorry, I didn’t get that.';
      const botMessageObj = { sender: 'bot', text: botMessage, time: new Date().toLocaleTimeString() };

      setTimeout(() => {
        setMessages(prev => [...prev, botMessageObj]);
        speak(botMessage);
        setIsTyping(false);
      }, 1000); // Simulate typing
    } catch (error) {
      setMessages(prev => [...prev, { sender: 'bot', text: 'Error contacting the AI server.', time: new Date().toLocaleTimeString() }]);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert('Speech recognition not supported in this browser.');

    if (!recognitionRef.current) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = 'en-US';
      recognitionRef.current.interimResults = false;
      recognitionRef.current.maxAlternatives = 1;

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
      };
    }

    recognitionRef.current.start();
  };

  return (
    <div className="chatbot-container">
      {/* Chat Header */}
      <div className="chat-header">
        <h1>Baagh — AI Virtual Assistant</h1>
        <p>Your smart shopping guide</p>
      </div>

      {/* Chat Window */}
      <div className="chat-window">
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              <div>
                <strong>{msg.sender === 'bot' ? '🤖 Baagh' : '🧑 You'}</strong>
              </div>
              <div>{msg.text}</div>
              <div style={{ fontSize: '0.75rem', color: '#bbb', marginTop: '4px' }}>
                {msg.time}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="message bot">
              <strong>🤖 Baagh</strong>
              <div>Typing...</div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Chat Input */}
        <div className="chat-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button onClick={startListening} title="Speak">🎤</button>
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>

      {/* Back & Logout Buttons at bottom-right */}
      <div className="w-full flex justify-end gap-4 mt-4">
        <button onClick={() => navigate('/dashboard')} className="dashboard-button">
          Back to Dashboard
        </button>
        <button onClick={() => navigate('/')} className="dashboard-button">
          Logout
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
